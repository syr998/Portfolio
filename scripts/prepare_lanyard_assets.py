"""Crop the supplied transparent source artwork into WebGL-ready textures."""

from pathlib import Path
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "src" / "assets" / "lanyard"
SOURCES = {
    "lanyard-shiyaru.png": Path(r"C:\Users\86158\Desktop\Frame 78.png"),
    "clip-shiyaru.png": Path(r"D:\xwechat_files\wxid_blq996n6ej8o22_5338\temp\RWTemp\2026-09\6cbedce1f5bcfde8d5411615e76c427f\637f7380418ddfbff71a1f73714a2a22.png"),
    "card-shiyaru-front.png": Path(r"C:\Users\86158\Desktop\Frame 84.png"),
}
MAX_HEIGHT = {
    "lanyard-shiyaru.png": 214,
    "clip-shiyaru.png": 1280,
    "card-shiyaru-front.png": 2048,
}


def crop_visible(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    bbox = rgba.getchannel("A").getbbox()
    if not bbox:
        raise ValueError("Source artwork has no visible pixels")
    return rgba.crop(bbox)


def resize_to_height(image: Image.Image, max_height: int) -> Image.Image:
    if image.height <= max_height:
        return image
    width = round(image.width * max_height / image.height)
    return image.resize((width, max_height), Image.Resampling.LANCZOS)


TARGET.mkdir(parents=True, exist_ok=True)
for output_name, source in SOURCES.items():
    if not source.is_file():
        raise FileNotFoundError(source)
    prepared = resize_to_height(crop_visible(Image.open(source)), MAX_HEIGHT[output_name])
    prepared.save(TARGET / output_name, optimize=True)
    print(f"{output_name}: {prepared.width}x{prepared.height}")

# The hook and card are delivered as separate transparent images, but the
# Lanyard model has one moving rigid body.  Building one transparent visual
# assembly lets their silhouettes overlap cleanly while the official body,
# joints and drag physics remain exactly as-is.
card = Image.open(TARGET / "card-shiyaru-front.png").convert("RGBA")
clip = Image.open(TARGET / "clip-shiyaru.png").convert("RGBA")
overlap = 288
assembly_height = clip.height + card.height - overlap
assembly = Image.new("RGBA", (card.width, assembly_height), (0, 0, 0, 0))
assembly.alpha_composite(clip, ((card.width - clip.width) // 2, 0))
assembly.alpha_composite(card, (0, clip.height - overlap))
assembly.save(TARGET / "lanyard-shiyaru-assembly.png", optimize=True)
print(f"lanyard-shiyaru-assembly.png: {assembly.width}x{assembly.height}")
