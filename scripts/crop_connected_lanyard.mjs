import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const root = path.resolve(import.meta.dirname, '..');
const sourceName = process.argv[2] || '吊牌.png';
const targetName = process.argv[3] || 'lanyard-tag-connected.png';
const source = path.join(root, '个人技能', sourceName);
const target = path.join(root, 'src', 'assets', 'lanyard', targetName);
const png = fs.readFileSync(source);

const chunks = [];
let offset = 8;
while (offset < png.length) {
  const length = png.readUInt32BE(offset);
  const type = png.subarray(offset + 4, offset + 8).toString('ascii');
  chunks.push({ type, data: png.subarray(offset + 8, offset + 8 + length) });
  offset += length + 12;
}

const ihdr = chunks.find(chunk => chunk.type === 'IHDR')?.data;
if (!ihdr) throw new Error('The source does not contain an IHDR chunk.');
const width = ihdr.readUInt32BE(0);
const height = ihdr.readUInt32BE(4);
if (ihdr[8] !== 8 || ihdr[9] !== 6 || ihdr[12] !== 0) {
  throw new Error('Expected a non-interlaced 8-bit RGBA PNG.');
}

const stride = width * 4;
const packed = zlib.inflateSync(Buffer.concat(chunks.filter(chunk => chunk.type === 'IDAT').map(chunk => chunk.data)));
const pixels = Buffer.allocUnsafe(width * height * 4);
const previous = Buffer.alloc(stride);
const row = Buffer.alloc(stride);
let sourceOffset = 0;
let minX = width;
let minY = height;
let maxX = -1;
let maxY = -1;

for (let y = 0; y < height; y += 1) {
  const filter = packed[sourceOffset++];
  for (let x = 0; x < stride; x += 1) {
    const value = packed[sourceOffset++];
    const left = x >= 4 ? row[x - 4] : 0;
    const up = previous[x];
    const upLeft = x >= 4 ? previous[x - 4] : 0;
    let decoded = value;
    if (filter === 1) decoded += left;
    if (filter === 2) decoded += up;
    if (filter === 3) decoded += Math.floor((left + up) / 2);
    if (filter === 4) {
      const estimate = left + up - upLeft;
      const leftDistance = Math.abs(estimate - left);
      const upDistance = Math.abs(estimate - up);
      const upLeftDistance = Math.abs(estimate - upLeft);
      decoded += leftDistance <= upDistance && leftDistance <= upLeftDistance
        ? left
        : upDistance <= upLeftDistance ? up : upLeft;
    }
    row[x] = decoded & 0xff;
  }
  row.copy(pixels, y * stride);
  for (let x = 0; x < width; x += 1) {
    if (row[x * 4 + 3] === 0) continue;
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }
  row.copy(previous);
}

if (maxX < 0) throw new Error('The source has no visible pixels.');
const cropWidth = maxX - minX + 1;
const cropHeight = maxY - minY + 1;
const output = Buffer.alloc((cropWidth * 4 + 1) * cropHeight);
for (let y = 0; y < cropHeight; y += 1) {
  const outputOffset = y * (cropWidth * 4 + 1);
  output[outputOffset] = 0;
  pixels.copy(output, outputOffset + 1, ((minY + y) * width + minX) * 4, ((minY + y) * width + minX + cropWidth) * 4);
}

const crcTable = Uint32Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});
const crc32 = buffer => {
  let value = 0xffffffff;
  for (const byte of buffer) value = crcTable[(value ^ byte) & 0xff] ^ (value >>> 8);
  return (value ^ 0xffffffff) >>> 0;
};
const makeChunk = (type, data) => {
  const body = Buffer.concat([Buffer.from(type), data]);
  const chunk = Buffer.alloc(data.length + 12);
  chunk.writeUInt32BE(data.length, 0);
  body.copy(chunk, 4);
  chunk.writeUInt32BE(crc32(body), data.length + 8);
  return chunk;
};

const outputHeader = Buffer.alloc(13);
outputHeader.writeUInt32BE(cropWidth, 0);
outputHeader.writeUInt32BE(cropHeight, 4);
outputHeader[8] = 8;
outputHeader[9] = 6;
const encoded = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  makeChunk('IHDR', outputHeader),
  makeChunk('IDAT', zlib.deflateSync(output, { level: 9 })),
  makeChunk('IEND', Buffer.alloc(0))
]);

fs.writeFileSync(target, encoded);
console.log(`Created ${path.relative(root, target)} (${cropWidth}×${cropHeight})`);
