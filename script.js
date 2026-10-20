const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const projects = [
  { id: 'p1', no: '01', title: '三江源—品牌形象', type: 'BRAND IDENTITY / FULL CASE', cover: '项目五个/三江源.jpg', summary: '三江源活鱼现烤品牌全案升级，围绕品牌 IP、视觉系统与线上线下场景展开。', folder: '项目一', start: 4, end: 35 },
  { id: 'p2', no: '02', title: '医科大—UI 设计', type: 'PRODUCT UI / EXPERIENCE', cover: '项目五个/医科大.jpg', summary: '以医疗 APP 为核心，梳理产品结构、信息层级与移动端界面体验。', folder: '项目二', start: 36, end: 50 },
  { id: 'p3', no: '03', title: '轻拟美化—视觉优化', type: 'APP VISUAL / ART DIRECTION', cover: '项目五个/轻拟美化.jpg', summary: '面向轻拟桌面美化 APP 的视觉优化、组件设计与 IP 资产延展。', folder: '项目三', start: 51, end: 58 },
  { id: 'p4', no: '04', title: '秘密花园—品牌设计', type: 'BRAND DESIGN / CAMPAIGN', cover: '项目五个/秘密花园.jpg', summary: '从品牌定位到产品包装与传播场景，构建自然、轻盈的品牌视觉语言。', folder: '项目四', start: 59, end: 65, detailVideo: '秘密花园.mp4' },
  {
    id: 'p5',
    no: '05',
    title: '电商视觉图',
    type: 'E-COMMERCE VISUAL / IMAGE SYSTEM',
    cover: '项目五个/电商.jpg',
    summary: '以商品主体为入口，展示电商主图套图与详情页的系列化视觉呈现。',
    customDetail: true
  },
  { id: 'p6', no: '06', title: '个人成长提升', type: 'AI RESEARCH / PERSONAL GROWTH', cover: '项目五个/个人能力提升.jpg', summary: '持续进行 AIGC 研究、软件学习、小红书教程输出与个人资产库积累。', customImages: ['个人能力提升/Figma66.jpg', '个人能力提升/Figma67.jpg', '个人能力提升/Figma68.jpg', '个人能力提升/Figma69.jpg'] }
];

const commerceDetailSets = [
  {
    id: 'main', title: '电商主图套图', subtitle: 'Main Image Set',
    items: [
      { name: '沙发', folder: '电商/组1', cover: '电商/组1/沙发.png', images: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp'] },
      { name: '护肤品', folder: '电商/组2', cover: '电商/组2/护肤品.png', images: ['6.webp', '7.webp', '8.webp', '9.webp', '10.webp'] },
      { name: '玩具', folder: '电商/组3', cover: '电商/组3/玩具.png', images: ['11.webp', '12.webp', '13.webp', '14.webp', '15.webp'] }
    ]
  },
  {
    id: 'detail', title: '电商详情页', subtitle: 'Details Page',
    items: [
      { name: '椅子', folder: '电商/组4', cover: '电商/组4/椅子.png', images: ['16.webp', '17.webp', '18.webp', '19.webp', '20.webp', '21.webp'] },
      { name: '凳子', folder: '电商/组5', cover: '电商/组5/凳子.png', images: ['22.webp', '23.webp', '24.webp', '25.webp', '26.webp', '27.webp'] },
      { name: '零食', folder: '电商/组6', cover: '电商/组6/零食.png', images: ['28.webp', '29.webp', '30.webp', '31.webp', '32.webp', '33.webp'] }
    ]
  },
  {
    id: 'business-materials', title: '商业视觉物料设计', subtitle: 'Commercial Visual Materials',
    items: [
      { name: '电商商品图后期处理', folder: '电商/618产品/电商商品图后期处理', cover: '电商/618产品/电商商品图后期处理/1.webp', images: ['1.webp', '2.webp', '4.webp', '5.webp', '6.webp', '7.webp'] },
      { name: '短视频信息流封面', folder: '电商/618产品/短视频信息流封面', cover: '电商/618产品/短视频信息流封面/1.webp', images: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp', '7.webp', '8.webp'], layout: 'four' },
      { name: '电商活动海报', folder: '电商/618产品/电商活动海报', cover: '电商/618产品/电商活动海报/封面.jpg', images: ['8.webp', '9.webp', '10.webp'] },
      { name: '场景渲染图', folder: '电商/618产品/场景渲染图', cover: '电商/618产品/场景渲染图/13.webp', images: ['13.webp', '14.webp', '15.webp'] }
    ]
  }
];

const commerceOutputSets = [
  { name: '皮衣', input: '电商/组7/皮衣.jpg', output: '电商/组7/皮衣2.jpg', label: '商品精修' },
  { name: '护肤品', input: '电商/组7/护肤品.jpg', output: '电商/组7/护肤品2.jpg', label: '场景图' },
  { name: '人物', input: '电商/组7/Frame-84.jpg', output: '电商/组7/人物2.jpg', label: '模特图' }
];

const detailModal = $('#detail-modal');
const overviewList = $('#overview-list');
const detailGallery = $('#detail-gallery');
let lastFocused = null;
let detailVideoObserver = null;

// E-commerce case studies use one fixed 1320px composition.  Smaller
// browsers see the same composition scaled down as a whole instead of a
// different wrapped grid or a horizontal scroller.
function fitCommerceDetailCanvas() {
  const viewport = $('#detail-gallery .commerce-detail-viewport');
  if (!viewport) return;
  const canvas = $('.commerce-detail-scale', viewport);
  if (!canvas) return;

  const baseWidth = 1320;
  // One 1320px design canvas is used in every browser. The composition is
  // presented at 165% of its unified baseline, then only scales down as a
  // complete unit when a narrower viewport requires it.
  const scale = Math.min(1.65, Math.max(0.1, (detailGallery.clientWidth / baseWidth) * 1.65));
  detailGallery.style.setProperty('--commerce-canvas-scale', String(scale));

  // CSS transforms do not affect document flow, so reserve the transformed
  // height explicitly to keep the vertical project page continuous.
  requestAnimationFrame(() => {
    viewport.style.height = `${Math.ceil(canvas.scrollHeight * scale)}px`;
  });
}

window.addEventListener('resize', fitCommerceDetailCanvas, { passive: true });

// Stable portfolio layout: every portfolio page uses one 1920 × 1080 design
// canvas.  Browser width only scales that canvas as a whole, so individual
// labels, artwork and interactive layers never reflow independently.
const canvasSections = ['about', 'experience', 'works', 'strengths', 'contact']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

canvasSections.forEach((section) => {
  const canvas = document.createElement('div');
  canvas.className = 'desktop-canvas';
  while (section.firstChild) canvas.append(section.firstChild);
  section.append(canvas);
  section.classList.add('desktop-canvas-section');
});

function updateDesktopCanvasScale() {
  const scale = Math.min(window.innerWidth / 1920, 1);
  document.documentElement.style.setProperty('--desktop-scale', String(scale));
  document.documentElement.style.setProperty('--desktop-canvas-height', `${1080 * scale}px`);
}
updateDesktopCanvasScale();
window.addEventListener('resize', updateDesktopCanvasScale, { passive: true });

// Work-history heading follows the same one-character-at-a-time entrance as
// the project overview. Its two lines retain a fixed footprint while typing.
const experienceTitle = $('#experience .experience-work-title > span');
const experienceTitleLines = experienceTitle ? [
  { element: $('b:nth-child(1)', experienceTitle), text: '工作经历', delay: .11 },
  { element: $('b:nth-child(2)', experienceTitle), text: 'Multi-scenario visual design', delay: .055 }
] : [];
let experienceTitleTimeline = null;
let experienceTitleReadyToPlay = true;

function resetExperienceTitleTypewriter() {
  experienceTitleTimeline?.kill();
  experienceTitleTimeline = null;
  experienceTitleLines.forEach(({ element }) => element?.replaceChildren());
}

function showExperienceTitleImmediately() {
  experienceTitleLines.forEach(({ element, text }) => { if (element) element.textContent = text; });
}

function playExperienceTitleTypewriter() {
  resetExperienceTitleTypewriter();
  if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showExperienceTitleImmediately();
    return;
  }
  experienceTitleTimeline = gsap.timeline({ onComplete: () => { experienceTitleTimeline = null; } });
  let cursor = 0;
  experienceTitleLines.forEach(({ element, text, delay }) => {
    if (!element) return;
    Array.from(text).forEach((character) => {
      experienceTitleTimeline.call(() => element.append(document.createTextNode(character === ' ' ? '\u00a0' : character)), null, cursor);
      cursor += delay;
    });
    cursor += .2;
  });
}

const experienceSection = $('#experience');
if (experienceSection && experienceTitleLines.length && 'IntersectionObserver' in window) {
  const experienceTitleObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (experienceTitleReadyToPlay && !document.body.classList.contains('is-intro-active')) {
        experienceTitleReadyToPlay = false;
        playExperienceTitleTypewriter();
      }
    } else {
      resetExperienceTitleTypewriter();
      experienceTitleReadyToPlay = true;
    }
  }), { threshold: .2 });
  experienceTitleObserver.observe(experienceSection);
} else if (experienceTitleLines.length) {
  showExperienceTitleImmediately();
}

// Keep the four strengths cards on the supplied visual grid while their copy
// reflects the current portfolio positioning.
const strengthsCardContent = [
  {
    title: ['品牌', '视觉塑造'],
    english: 'VISUAL IDENTITY',
    copy: '拥有敏锐的设计审美与品牌意识，能够准确理解设计需求，保证设计产出既符合品牌调性，又具备市场识别度。',
    tags: ['创意表达', '视觉规范', '细节把控']
  },
  {
    title: ['商业', '价值转化'],
    english: 'BUSINESS IMPACT',
    copy: '深入理解业务目标与营销场景，用清晰的设计决策支持传播、转化和真实的商业结果。',
    tags: ['目标拆解', '商业思维', '结果导向']
  },
  {
    title: ['AIGC', '技术赋能'],
    english: 'AI WORKFLOW',
    copy: '熟练使用各类AI前沿工具。将 AI 深度融入设计工作流，实现创意方案的快速迭代与高质量产出，大幅提升效率。',
    tags: ['辅助设计', 'ComfyUI', '效率革新']
  },
  {
    title: ['跨部门', '协同交付'],
    english: 'COLLABORATION',
    copy: '具备良好的团队协作意识与沟通能力，能准确理解设计需求并快速响应，确保设计任务按时、保质完成。',
    tags: ['需求理解', '团队协作', '按时交付']
  }
];

$$('#strengths .strength-card').forEach((card, index) => {
  const content = strengthsCardContent[index];
  if (!content) return;
  const title = $('h3', card);
  const english = $('.strength-card__en', card);
  const copy = $('.strength-card__copy', card);
  const tags = $$('.strength-card__tags span', card);
  if (title) title.innerHTML = `${content.title[0]}<br />${content.title[1]}`;
  if (english) english.textContent = content.english;
  if (copy) copy.textContent = content.copy;
  tags.forEach((tag, tagIndex) => { tag.textContent = content.tags[tagIndex] || ''; });
});

// Personal strengths heading: keep its live text in the page so the desktop
// artboard can align the Chinese and English baselines precisely.
const strengthsHeading = $('#strengths .strengths-head h2');
const strengthsLead = $('#strengths .strengths-head p');
const strengthsTitleText = '我的技能树';
const strengthsSubtitleText = 'BEYOND DESIGN, STRATEGY DRIVEN.';
if (strengthsHeading) {
  strengthsHeading.setAttribute('aria-label', `${strengthsTitleText} ${strengthsSubtitleText}`);
  strengthsHeading.innerHTML = '<span class="strengths-title-typewriter__main"></span><em class="strengths-title-typewriter__subtitle"></em>';
}
if (strengthsLead) strengthsLead.innerHTML = '<span>从一个想法出发，走到它真正发生。</span><span>From an idea to making it real.</span>';

// The title starts once on entry, then resets only after the section has left
// view. This makes each return feel intentional without looping in place.
const strengthsTitleTypeLines = strengthsHeading ? [
  { element: $('.strengths-title-typewriter__main', strengthsHeading), text: strengthsTitleText, delay: .1 },
  { element: $('.strengths-title-typewriter__subtitle', strengthsHeading), text: strengthsSubtitleText, delay: .037 }
] : [];
let strengthsTitleTypeTimeline = null;
function resetStrengthsTitleTypewriter() {
  strengthsTitleTypeTimeline?.kill();
  strengthsTitleTypeTimeline = null;
  strengthsTitleTypeLines.forEach(({ element }) => element?.replaceChildren());
}
function showStrengthsTitleImmediately() {
  strengthsTitleTypeLines.forEach(({ element, text }) => {
    if (element) element.textContent = text;
  });
}
function playStrengthsTitleTypewriter() {
  resetStrengthsTitleTypewriter();
  if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showStrengthsTitleImmediately();
    return;
  }
  strengthsTitleTypeTimeline = gsap.timeline({ onComplete: () => { strengthsTitleTypeTimeline = null; } });
  let cursor = 0;
  strengthsTitleTypeLines.forEach(({ element, text, delay }) => {
    if (!element) return;
    Array.from(text).forEach((character) => {
      strengthsTitleTypeTimeline.call(() => element.append(document.createTextNode(character === ' ' ? '\u00a0' : character)), null, cursor);
      cursor += delay;
    });
    // Finish one line before the next begins, rather than typing them in parallel.
    cursor += .2;
  });
}
const strengthsSection = $('#strengths');
let strengthsTitleReadyToPlay = true;
if (strengthsSection && strengthsTitleTypeLines.length && 'IntersectionObserver' in window) {
  const strengthsTitleObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (strengthsTitleReadyToPlay && !document.body.classList.contains('is-intro-active')) {
        strengthsTitleReadyToPlay = false;
        playStrengthsTitleTypewriter();
      }
    } else {
      resetStrengthsTitleTypewriter();
      strengthsTitleReadyToPlay = true;
    }
  }), { threshold: .2 });
  strengthsTitleObserver.observe(strengthsSection);
} else if (strengthsTitleTypeLines.length) {
  showStrengthsTitleImmediately();
}

// Global click sparks — the canvas is purely visual, so it never blocks the
// controls, links, or project cards beneath it.
function createClickSparks() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const sparkColor = '#fff';
  const sparkSize = 10;
  const sparkRadius = 15;
  const sparkCount = 8;
  const duration = 400;
  const canvas = document.createElement('canvas');
  canvas.className = 'click-spark-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.append(canvas);

  const context = canvas.getContext('2d');
  const sparks = [];
  let animationFrame = 0;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (timestamp) => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let index = sparks.length - 1; index >= 0; index -= 1) {
      const spark = sparks[index];
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= duration) {
        sparks.splice(index, 1);
        continue;
      }

      const eased = (elapsed / duration) * (2 - elapsed / duration);
      const distance = eased * sparkRadius;
      const lineLength = sparkSize * (1 - eased);
      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

      context.strokeStyle = sparkColor;
      context.lineWidth = 2;
      context.lineCap = 'round';
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    }

    animationFrame = sparks.length ? requestAnimationFrame(draw) : 0;
  };

  document.addEventListener('click', (event) => {
    // The selected-work directory is intentionally a static reading surface.
    if (event.target.closest('#works')) return;
    const now = performance.now();
    for (let index = 0; index < sparkCount; index += 1) {
      sparks.push({
        x: event.clientX,
        y: event.clientY,
        angle: (Math.PI * 2 * index) / sparkCount,
        startTime: now
      });
    }
    if (!animationFrame) animationFrame = requestAnimationFrame(draw);
  });

  window.addEventListener('resize', resize, { passive: true });
  resize();
}
createClickSparks();

function renderOverview() {
  const makeCard = (project, isLoopClone = false) => `
    <button class="overview-card works-directory-card" type="button" data-project="${project.id}" aria-label="查看${project.title}项目详情"${isLoopClone ? ' tabindex="-1" aria-hidden="true"' : ''}>
      <span class="works-directory-image"><img src="${project.cover}" alt="${project.title}项目概览" loading="eager" /></span>
      <span class="works-directory-copy"><small>${project.type}</small><strong>${project.title}</strong><i>${project.summary}</i></span>
    </button>
  `;
  // Render the actual five project records in each loop run.  This keeps
  // every card's title, cover and detail id bound to the same project.
  const featuredProjects = projects;
  // The first and last runs are visual clones. They make a five-card loop
  // seamless while the centre run remains the actual five-card sequence.
  const loopProjects = [...featuredProjects, ...featuredProjects, ...featuredProjects];
  overviewList.innerHTML = `<div class="works-directory-track">${loopProjects.map((project, index) => makeCard(project, index < featuredProjects.length || index >= featuredProjects.length * 2)).join('')}</div>`;
  return featuredProjects.length;
}

function openLayer(layer) {
  layer.classList.add('is-open');
  layer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('is-locked');
}

function stopDetailVideos() {
  $$('#detail-gallery video').forEach((video) => {
    video.pause();
    video.muted = true;
    try { video.currentTime = 0; } catch {}
  });
  detailVideoObserver?.disconnect();
  detailVideoObserver = null;
  if (document.fullscreenElement && detailModal.contains(document.fullscreenElement)) {
    const exitFullscreen = document.exitFullscreen?.();
    exitFullscreen?.catch?.(() => {});
  }
}

function closeLayer(layer) {
  layer.classList.remove('is-open');
  layer.setAttribute('aria-hidden', 'true');
  if (layer === detailModal) stopDetailVideos();
  if (!detailModal.classList.contains('is-open')) document.body.classList.remove('is-locked');
}

function imagePath(project, number) {
  return `${project.folder}/Figma${number}.jpg`;
}

function observeDetailVideos() {
  detailVideoObserver?.disconnect();
  const videos = $$('#detail-gallery .detail-gallery-video');
  if (!videos.length) return;
  const playVideo = (video) => {
    if (video.paused) video.play().catch(() => {});
  };
  if (!('IntersectionObserver' in window)) {
    videos.forEach(playVideo);
    return;
  }
  detailVideoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) playVideo(entry.target);
      else entry.target.pause();
    });
  }, { threshold: 0.2 });
  videos.forEach((video) => detailVideoObserver.observe(video));
}

function setupDetailFeatureVideo() {
  const feature = $('#detail-gallery .detail-video-feature');
  if (!feature) return;
  const video = $('.detail-feature-video', feature);
  const toggles = $$('[data-video-toggle]', feature);
  const stop = $('[data-video-stop]', feature);
  const mute = $('[data-video-mute]', feature);
  const back = $('[data-video-back]', feature);
  const forward = $('[data-video-forward]', feature);
  const fullscreen = $('[data-video-fullscreen]', feature);
  const seek = $('[data-video-seek]', feature);
  const current = $('[data-video-current]', feature);
  const duration = $('[data-video-duration]', feature);
  if (!video || !toggles.length) return;
  const formatTime = (value) => {
    if (!Number.isFinite(value)) return '00:00';
    const minutes = Math.floor(value / 60).toString().padStart(2, '0');
    const seconds = Math.floor(value % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };
  const sync = () => {
    feature.classList.toggle('is-playing', !video.paused);
    toggles.forEach((toggle) => {
      toggle.classList.toggle('is-playing', !video.paused);
      toggle.setAttribute('aria-label', video.paused ? '开始播放秘密花园商业TV' : '暂停秘密花园商业TV');
    });
    mute.textContent = video.muted ? '🔇' : '🔊';
    mute.setAttribute('aria-label', video.muted ? '打开声音' : '关闭声音');
    mute.setAttribute('aria-pressed', String(!video.muted));
    if (seek && video.duration) {
      const progress = (video.currentTime / video.duration) * 1000;
      seek.value = String(progress);
      seek.style.setProperty('--progress', `${progress / 10}%`);
    }
    if (current) current.textContent = formatTime(video.currentTime);
    if (duration) duration.textContent = formatTime(video.duration);
  };
  const play = () => video.play().catch(() => {});
  toggles.forEach((toggle) => toggle.addEventListener('click', () => { if (video.paused) play(); else video.pause(); }));
  stop.addEventListener('click', () => { video.pause(); video.currentTime = 0; sync(); });
  mute.addEventListener('click', () => { video.muted = !video.muted; sync(); if (!video.muted && video.paused) play(); });
  back?.addEventListener('click', () => { video.currentTime = Math.max(0, video.currentTime - 10); sync(); });
  forward?.addEventListener('click', () => { video.currentTime = Math.min(video.duration || 0, video.currentTime + 30); sync(); });
  fullscreen?.addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else feature.requestFullscreen?.();
  });
  seek?.addEventListener('input', () => { if (video.duration) video.currentTime = (Number(seek.value) / 1000) * video.duration; sync(); });
  ['loadedmetadata', 'timeupdate', 'play', 'pause', 'volumechange', 'ended'].forEach((event) => video.addEventListener(event, sync));
  video.addEventListener('click', () => { if (video.paused) play(); else video.pause(); });
  video.muted = false;
  sync();
  // The detail page is opened by a user click, so try to start immediately
  // with audio. Browsers that block unmuted autoplay leave the play button ready.
  play();
}

function commerceModuleMarkup(module, index) {
  const first = module.items[0];
  return `
    <section class="commerce-module commerce-module--${module.id}" data-commerce-module="${index}">
      <header class="commerce-module-heading"><div><span class="commerce-kicker">${String(index + 1).padStart(2, '0')} / E-COMMERCE</span><h3>${module.title}</h3></div><p>${module.subtitle}</p></header>
      <div class="commerce-module-layout">
        <aside class="commerce-picker" aria-label="${module.title}商品切换">
          <button class="commerce-product-switch" type="button" data-commerce-switch aria-label="切换商品">
            <img src="${first.cover}" alt="${first.name}" data-commerce-cover />
            <span class="commerce-switch-pill">点击切换</span>
          </button>
          <div class="commerce-pips" role="tablist" aria-label="选择商品">
            ${module.items.map((item, itemIndex) => `<button type="button" role="tab" class="commerce-pip${itemIndex === 0 ? ' is-active' : ''}" data-commerce-item="${itemIndex}" aria-label="选择${item.name}" aria-selected="${itemIndex === 0}"><img src="${item.cover}" alt="${item.name}" /><span>${item.name}</span></button>`).join('')}
          </div>
        </aside>
        <div class="commerce-series" data-commerce-series data-commerce-layout="${first.layout || 'three'}" aria-live="polite">
          ${first.images.map((image, imageIndex) => `<button class="commerce-image-button" type="button" data-commerce-image="${imageIndex}"><img src="${first.folder}/${image}" alt="${first.name} ${module.title} ${imageIndex + 1}" loading="eager" decoding="async" /><span class="commerce-image-zoom">放大 ↗</span></button>`).join('')}
        </div>
      </div>
    </section>
  `;
}

function commerceOutputMarkup() {
  return `
    <section class="commerce-output-module">
      <header class="commerce-module-heading"><div><span class="commerce-kicker">04 / E-COMMERCE</span><h3>商品精修 / 场景图 / 模特图视觉产出</h3></div><p>Product Retouching / Scene / Model Output</p></header>
      <div class="commerce-output-grid">
        ${commerceOutputSets.map((item) => `
          <article class="commerce-output-card">
            <button class="commerce-output-input" type="button" data-commerce-output-image data-commerce-caption="${item.name} · 原始商品图"><img src="${item.input}" alt="${item.name}原始商品图" /><span>原始商品图</span></button>
            <div class="commerce-output-arrow" aria-hidden="true"><img src="电商/组7/箭头.png" alt="" /></div>
            <button class="commerce-output-image" type="button" data-commerce-output-image data-commerce-caption="${item.name} · ${item.label}">
              <img src="${item.output}" alt="${item.name}${item.label}" /><span class="commerce-image-zoom">放大 ↗</span>
            </button>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function setupCommerceDetail() {
  const root = $('#detail-gallery .commerce-detail');
  if (!root) return;
  const refitCanvas = () => requestAnimationFrame(fitCommerceDetailCanvas);
  // A product set used to be replaced synchronously. That removed the old
  // images before the next set had downloaded and decoded, which briefly
  // exposed an empty grid. Keep the current set on screen until its
  // replacement is ready instead.
  const imagePreloadCache = new Map();
  const waitForImage = (image) => new Promise((resolve) => {
    const finish = () => {
      const decoded = image.decode?.();
      if (decoded?.then) decoded.catch(() => {}).then(resolve);
      else resolve();
    };
    if (image.complete) { finish(); return; }
    image.addEventListener('load', finish, { once: true });
    image.addEventListener('error', finish, { once: true });
  });
  const preloadImage = (src) => {
    if (!imagePreloadCache.has(src)) {
      const image = new Image();
      image.decoding = 'async';
      const ready = new Promise((resolve) => {
        image.addEventListener('load', () => {
          const decoded = image.decode?.();
          if (decoded?.then) decoded.catch(() => {}).then(resolve);
          else resolve();
        }, { once: true });
        image.addEventListener('error', resolve, { once: true });
        image.src = src;
      });
      imagePreloadCache.set(src, ready);
    }
    return imagePreloadCache.get(src);
  };
  const imageMarkup = (item, moduleData) => item.images.map((image, imageIndex) => `<button class="commerce-image-button" type="button" data-commerce-image="${imageIndex}"><img src="${item.folder}/${image}" alt="${item.name} ${moduleData.title} ${imageIndex + 1}" loading="eager" decoding="async" /><span class="commerce-image-zoom">放大 ↗</span></button>`).join('');
  const prepareItem = (item) => Promise.all([
    preloadImage(item.cover),
    ...item.images.map((image) => preloadImage(`${item.folder}/${image}`))
  ]);
  // The lightbox deliberately sits beside the scaled canvas so its fixed
  // full-screen preview keeps its true viewport size.
  const lightbox = $('#detail-gallery .commerce-lightbox');
  if (!lightbox) return;
  const lightboxImage = $('[data-commerce-lightbox-image]', lightbox);
  const lightboxCaption = $('[data-commerce-lightbox-caption]', lightbox);
  const closeLightbox = () => { lightbox.classList.remove('is-visible'); lightbox.setAttribute('aria-hidden', 'true'); };
  $('[data-commerce-lightbox-close]', lightbox)?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });

  $$('.commerce-module', root).forEach((module, moduleIndex) => {
    const moduleData = commerceDetailSets[moduleIndex];
    const switchButton = $('[data-commerce-switch]', module);
    const cover = $('[data-commerce-cover]', module);
    const series = $('[data-commerce-series]', module);
    let activeIndex = 0;
    let selectionVersion = 0;
    // Keep every set mounted from the start. Toggling a class is materially
    // smoother than destroying and rebuilding a complete grid of images on
    // every click, especially after the browser has discarded decoded frames.
    const seriesSets = moduleData.items.map((item, itemIndex) => {
      const set = document.createElement('div');
      set.className = 'commerce-series-set';
      set.dataset.commerceLayout = item.layout || 'three';
      set.dataset.commerceSet = String(itemIndex);
      set.innerHTML = imageMarkup(item, moduleData);
      return set;
    });
    series.replaceChildren(...seriesSets);
    const updatePips = () => {
      $$('.commerce-pip', module).forEach((pip, pipIndex) => {
        const selected = pipIndex === activeIndex;
        pip.classList.toggle('is-active', selected);
        pip.setAttribute('aria-selected', String(selected));
      });
    };
    const commitSelection = (nextIndex) => {
      activeIndex = (nextIndex + moduleData.items.length) % moduleData.items.length;
      const item = moduleData.items[activeIndex];
      cover.src = item.cover;
      cover.alt = item.name;
      series.dataset.commerceLayout = item.layout || 'three';
      seriesSets.forEach((set, setIndex) => set.classList.toggle('is-active', setIndex === activeIndex));
      updatePips();
      // Images may resolve in any order, but the canvas is fitted only once
      // after the complete visible set is stable.
      Promise.all([waitForImage(cover), ...$$('img', seriesSets[activeIndex]).map(waitForImage)]).then(refitCanvas);
    };
    const requestSelection = async (nextIndex) => {
      const normalizedIndex = (nextIndex + moduleData.items.length) % moduleData.items.length;
      const version = ++selectionVersion;
      const item = moduleData.items[normalizedIndex];
      module.setAttribute('aria-busy', 'true');
      await prepareItem(item);
      if (version !== selectionVersion) return;
      commitSelection(normalizedIndex);
      module.removeAttribute('aria-busy');
    };
    commitSelection(0);

    // Reserve the tallest first/second-module grid. The business-materials
    // module deliberately uses its authored fixed height instead: its lower
    // divider must not move when its active set changes.
    requestAnimationFrame(async () => {
      await Promise.all(moduleData.items.map(prepareItem));
      if (moduleData.id === 'business-materials') {
        refitCanvas();
        return;
      }
      const measuredHeights = seriesSets.map((set) => {
        const isActive = set.classList.contains('is-active');
        if (!isActive) {
          set.classList.add('is-measuring');
          set.style.width = `${series.clientWidth}px`;
        }
        const height = set.scrollHeight;
        if (!isActive) {
          set.classList.remove('is-measuring');
          set.style.removeProperty('width');
        }
        return height;
      });
      series.style.minHeight = `${Math.ceil(Math.max(...measuredHeights))}px`;
      refitCanvas();
    });

    switchButton.addEventListener('click', () => requestSelection(activeIndex + 1));
    $$('.commerce-pip', module).forEach((pip) => pip.addEventListener('click', () => requestSelection(Number(pip.dataset.commerceItem))));
    series.addEventListener('click', (event) => {
      const button = event.target.closest('[data-commerce-image]');
      if (!button) return;
      const image = $('img', button);
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = image.alt;
      lightbox.classList.add('is-visible');
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });
  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-commerce-output-image]');
    if (!button) return;
    const image = $('img', button);
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = button.dataset.commerceCaption || image.alt;
    lightbox.classList.add('is-visible');
    lightbox.setAttribute('aria-hidden', 'false');
  });
}

function renderDetail(project) {
  detailGallery.classList.remove('detail-gallery--commerce');
  detailGallery.style.removeProperty('--commerce-canvas-scale');
  $('.detail-panel')?.classList.remove('detail-panel--commerce');
  $('#detail-no').textContent = project.no;
  $('#detail-title').textContent = project.title;
  $('#detail-subtitle').textContent = project.summary;
  const featureVideoMarkup = project.detailVideo ? `
    <section class="detail-video-feature" aria-label="秘密花园商业TV视频">
      <div class="detail-video-stage">
      <video class="detail-feature-video" preload="metadata" playsinline autoplay>
        <source src="${project.detailVideo}" type="video/mp4" />
        你的浏览器不支持 MP4 视频播放。
      </video>
      <button class="detail-video-center-play" type="button" data-video-toggle aria-label="开始播放秘密花园商业TV"><span class="video-play-glyph" aria-hidden="true"></span></button>
      <div class="detail-video-controls" role="group" aria-label="视频控制">
        <div class="detail-video-progress"><label class="detail-video-seek"><span class="sr-only">视频进度</span><input type="range" data-video-seek min="0" max="1000" value="0" step="1" /></label></div>
        <div class="detail-video-control-row">
          <button class="detail-video-icon" type="button" data-video-mute aria-pressed="true" aria-label="关闭声音">🔊</button>
          <span class="detail-video-time"><span data-video-current>00:00</span><i>/</i><span data-video-duration>00:00</span></span>
          <span class="detail-video-control-spacer"></span>
          <button class="detail-video-icon detail-video-skip" type="button" data-video-back aria-label="后退十秒">↶<small>10</small></button>
          <button class="detail-video-icon detail-video-mini-play" type="button" data-video-toggle aria-label="开始播放秘密花园商业TV"><span class="video-play-glyph" aria-hidden="true"></span></button>
          <button class="detail-video-icon detail-video-skip" type="button" data-video-forward aria-label="前进三十秒">↷<small>30</small></button>
          <button class="detail-video-icon" type="button" data-video-stop aria-label="停止并回到开头">■</button>
          <button class="detail-video-icon" type="button" data-video-fullscreen aria-label="全屏播放">⛶</button>
        </div>
      </div>
      </div>
    </section>
  ` : '';
  if (project.customDetail) {
    detailGallery.classList.add('detail-gallery--commerce');
    $('.detail-panel')?.classList.add('detail-panel--commerce');
    detailGallery.innerHTML = `
      <div class="commerce-detail-viewport">
        <div class="commerce-detail-scale">
          <div class="commerce-detail">
            ${commerceDetailSets.map(commerceModuleMarkup).join('')}
            ${commerceOutputMarkup()}
          </div>
        </div>
        <div class="commerce-lightbox" aria-hidden="true">
          <button class="commerce-lightbox-close" type="button" data-commerce-lightbox-close aria-label="关闭图片预览">×</button>
          <figure><img data-commerce-lightbox-image alt="" /><figcaption data-commerce-lightbox-caption></figcaption></figure>
        </div>
      </div>
    `;
    setupCommerceDetail();
    return;
  }
  if (project.customImages) {
    detailGallery.innerHTML = project.customImages.map((src, index) => `<figure class="detail-image-wrap"><img src="${src}" alt="${project.title} ${index + 1}" loading="eager" /></figure>`).join('');
    return;
  }
  const numbers = Array.from({ length: project.end - project.start + 1 }, (_, index) => project.start + index)
    // Remove the fifth visual and the duplicate visual following the emoji
    // video (Figma8 and Figma29). The video itself occupies Figma28's slot.
    .filter((number) => project.id !== 'p1' || (number !== 8 && number !== 29));
  detailGallery.innerHTML = featureVideoMarkup + numbers.map((number, index) => {
    const detailVideo = project.id === 'p1' && {
      7: { source: '动态视频/烟火气.mp4', label: '三江源烟火气动态展示' },
      13: { source: '动态视频/AIGC.mp4', label: '三江源—品牌形象动态展示' },
      18: { source: '动态视频/年货节.mp4', label: '三江源年货节动态展示' },
      20: { source: '动态视频/新年形象.mp4', label: '三江源新年形象动态展示' },
      25: { source: '动态视频/弹窗.mp4', label: '三江源运营弹窗动态展示' },
      28: { source: '动态视频/表情包.mp4', label: '三江源表情包动态展示' }
    }[number];
    if (detailVideo) {
      return `<figure class="detail-image-wrap"><video class="detail-gallery-video" muted loop playsinline preload="metadata" aria-label="${detailVideo.label}"><source src="${detailVideo.source}" type="video/mp4" /></video></figure>`;
    }
    return `<figure class="detail-image-wrap"><img src="${imagePath(project, number)}" alt="${project.title} 第 ${index + 1} 张" loading="${index < 2 ? 'eager' : 'lazy'}" /></figure>`;
  }).join('');
  observeDetailVideos();
  setupDetailFeatureVideo();
}

function openDetail(project, trigger) {
  lastFocused = trigger;
  renderDetail(project);
  openLayer(detailModal);
  // The modal must be visible before its available width is measurable.
  // Measuring while display:none would incorrectly clamp the artboard to 10%.
  requestAnimationFrame(fitCommerceDetailCanvas);
  detailModal.scrollTop = 0;
  $('.detail-panel').scrollTop = 0;
  setTimeout(() => $('.detail-back').focus(), 80);
}

// Selected work displays three cards at a time. Five logical cards cycle by
// one card per click, while invisible duplicate runs make either direction
// wrap without a visible jump.
const worksCarouselCount = renderOverview();
const worksCarouselTrack = $('.works-directory-track', overviewList);
const worksCarouselPrevious = $('[data-works-direction="previous"]');
const worksCarouselNext = $('[data-works-direction="next"]');
let worksCarouselIndex = worksCarouselCount;
let worksCarouselIsAnimating = false;

function getWorksCarouselStep() {
  const card = $('.works-directory-card', worksCarouselTrack);
  if (!card || !worksCarouselTrack) return 0;
  const gap = Number.parseFloat(getComputedStyle(worksCarouselTrack).columnGap || getComputedStyle(worksCarouselTrack).gap) || 0;
  return card.offsetWidth + gap;
}

function setWorksCarouselPosition(index) {
  const x = -index * getWorksCarouselStep();
  if (window.gsap) gsap.set(worksCarouselTrack, { x });
  else worksCarouselTrack.style.transform = `translateX(${x}px)`;
}

function setWorksCarouselControlsDisabled(disabled) {
  [worksCarouselPrevious, worksCarouselNext].forEach((button) => {
    if (button) button.disabled = disabled;
  });
}

function finishWorksCarouselMove() {
  if (worksCarouselIndex === 0 || worksCarouselIndex === worksCarouselCount * 2) {
    worksCarouselIndex = worksCarouselCount;
    setWorksCarouselPosition(worksCarouselIndex);
  }
  worksCarouselIsAnimating = false;
  setWorksCarouselControlsDisabled(false);
}

function moveWorksCarousel(direction) {
  if (!worksCarouselTrack || worksCarouselIsAnimating || !worksCarouselCount) return;
  const targetIndex = worksCarouselIndex + direction;
  const x = -targetIndex * getWorksCarouselStep();
  worksCarouselIndex = targetIndex;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!window.gsap || reduceMotion) {
    setWorksCarouselPosition(worksCarouselIndex);
    finishWorksCarouselMove();
    return;
  }

  worksCarouselIsAnimating = true;
  setWorksCarouselControlsDisabled(true);
  gsap.timeline({
    defaults: { duration: .58, ease: 'power2.inOut' },
    onComplete: finishWorksCarouselMove
  }).to(worksCarouselTrack, { x, overwrite: 'auto' });
}

if (worksCarouselTrack && worksCarouselCount) {
  setWorksCarouselPosition(worksCarouselIndex);
  worksCarouselPrevious?.addEventListener('click', () => moveWorksCarousel(-1));
  worksCarouselNext?.addEventListener('click', () => moveWorksCarousel(1));

  const openWorksDetail = (card) => {
    const project = projects.find(({ id }) => id === card.dataset.project);
    if (project) openDetail(project, card);
  };

  // Attach to every physical card instead of relying on delegated bubbling:
  // the three visible cards include loop copies as the carousel wraps.
  $$('.works-directory-card', worksCarouselTrack).forEach((card) => {
    card.addEventListener('click', () => openWorksDetail(card));
  });
}

// The works heading and its supporting copy are read as three deliberate
// lines: the title first, then the two visual lines below it.
const worksHeading = $('#works .works-directory-heading h2');
const worksHeadingCopy = $('#works .works-directory-heading p');
const worksHeadingTitle = '项目概述';
const worksHeadingCopyLines = [
  '项目主要聚焦视觉全链路设计，图统餐饮品牌、多终端交互到视觉营销',
  '价值与 AIGC 应用方向。构建线上线下视觉体验全链路。'
];

if (worksHeading) {
  worksHeading.setAttribute('aria-label', worksHeadingTitle);
  // Keep meaningful text in the first paint.  The animation clears and
  // rewrites these spans only when it actually begins; mobile browsers must
  // never depend on an observer callback just to show essential copy.
  worksHeading.innerHTML = `<span class="works-heading-typewriter__title">${worksHeadingTitle}</span><i aria-hidden="true">→</i>`;
}
if (worksHeadingCopy) {
  worksHeadingCopy.setAttribute('aria-label', worksHeadingCopyLines.join(''));
  worksHeadingCopy.innerHTML = worksHeadingCopyLines.map((line) => `<span class="works-heading-typewriter__line">${line}</span>`).join('');
}

const worksHeadingTypeLines = [
  { element: $('.works-heading-typewriter__title', worksHeading), text: worksHeadingTitle, delay: .1 },
  ...$$('.works-heading-typewriter__line', worksHeadingCopy).map((element, index) => ({
    element,
    text: worksHeadingCopyLines[index],
    delay: .032
  }))
].filter(({ element, text }) => element && text);
let worksHeadingTypeTimeline = null;
let worksHeadingTypeTimeouts = [];
let worksHeadingReadyToPlay = true;
let worksHeadingFallbackTimeout = null;

function resetWorksHeadingTypewriter() {
  worksHeadingTypeTimeline?.kill();
  worksHeadingTypeTimeline = null;
  worksHeadingTypeTimeouts.forEach((timeout) => window.clearTimeout(timeout));
  worksHeadingTypeTimeouts = [];
  worksHeadingTypeLines.forEach(({ element }) => element?.replaceChildren());
}

function showWorksHeadingImmediately() {
  worksHeadingTypeLines.forEach(({ element, text }) => {
    if (element) element.textContent = text;
  });
}

function playWorksHeadingTypewriter() {
  resetWorksHeadingTypewriter();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showWorksHeadingImmediately();
    return;
  }

  // The local page and the GitHub Pages version must still animate when an
  // in-app browser cannot load the external GSAP CDN. Keep this fallback
  // self-contained, so the heading never silently becomes static on mobile.
  if (!window.gsap) {
    let cursor = 0;
    worksHeadingTypeLines.forEach(({ element, text, delay }) => {
      Array.from(text).forEach((character) => {
        const timeout = window.setTimeout(() => {
          element.append(document.createTextNode(character === ' ' ? '\u00a0' : character));
        }, cursor * 1000);
        worksHeadingTypeTimeouts.push(timeout);
        cursor += /[，。]/.test(character) ? delay * 1.5 : delay;
      });
      cursor += .2;
    });
    return;
  }

  worksHeadingTypeTimeline = gsap.timeline({ onComplete: () => { worksHeadingTypeTimeline = null; } });
  let cursor = 0;
  worksHeadingTypeLines.forEach(({ element, text, delay }) => {
    Array.from(text).forEach((character) => {
      worksHeadingTypeTimeline.call(() => element.append(document.createTextNode(character === ' ' ? '\u00a0' : character)), null, cursor);
      cursor += /[，。]/.test(character) ? delay * 1.5 : delay;
    });
    cursor += .2;
  });
}

const worksSection = $('#works');
// The project directory is shown on a scaled 1920px artboard on phones. Its
// visible height is very short there, so the regular observer can reset the
// typewriter while the title is still on screen. On phones, play it once on
// first entry and retain the completed copy; desktop retains repeat-on-return.
// Some mobile browsers report a 760–900px CSS viewport (for example when
// opened inside an app browser). Treat that compact range as mobile too, so
// its heading never falls back to the reset-prone desktop observer.
const useSingleRunWorksHeading = window.matchMedia('(max-width: 960px)').matches;
let worksHeadingHasPlayed = false;
let worksHeadingIsVisible = false;

function tryPlayWorksHeading() {
  if (!worksHeadingIsVisible) return;
  const canPlay = useSingleRunWorksHeading
    ? !worksHeadingHasPlayed
    : worksHeadingReadyToPlay;
  if (!canPlay || document.body.classList.contains('is-intro-active')) return;

  worksHeadingReadyToPlay = false;
  worksHeadingHasPlayed = true;
  playWorksHeadingTypewriter();
}

function keepWorksHeadingVisible() {
  // IntersectionObserver is not consistently delivered by every mobile
  // in-app browser after the intro overlay has been removed.  Empty heading
  // spans are never an acceptable fallback: show the live copy, then allow
  // the observer to replace it with the typewriter when it becomes available.
  if (!worksHeadingHasPlayed && !worksHeadingIsVisible) {
    showWorksHeadingImmediately();
  }
}

if (worksSection && worksHeadingTypeLines.length && 'IntersectionObserver' in window) {
  const worksHeadingObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      worksHeadingIsVisible = true;
      tryPlayWorksHeading();
    } else if (!useSingleRunWorksHeading) {
      worksHeadingIsVisible = false;
      resetWorksHeadingTypewriter();
      worksHeadingReadyToPlay = true;
    } else {
      worksHeadingIsVisible = false;
    }
  }), { threshold: .25 });
  worksHeadingObserver.observe(worksSection);
  // Compact browsers can report this section as visible while the entrance
  // screen still owns the page. Re-check after that screen is truly gone.
  window.addEventListener('portfolio:entered', () => {
    tryPlayWorksHeading();
    window.clearTimeout(worksHeadingFallbackTimeout);
    worksHeadingFallbackTimeout = window.setTimeout(keepWorksHeadingVisible, 700);
  });
} else if (worksHeadingTypeLines.length) {
  showWorksHeadingImmediately();
}

// Project-direction marquee: two identical runs make a continuous loop
// without moving the readable source text out of the document.
const strengthsCanvas = $('#strengths .desktop-canvas');
const worksMarqueeItems = [
  'Brand visual experiences',
  'Selected work · 2026',
  'AIGC visual design',
  'Character IP systems',
  'AI + 3D exploration'
];
const worksMarqueeIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5S14.2 18.2 12 20.5C9.8 18.2 8.7 15.4 8.7 12S9.8 5.8 12 3.5"/></svg>';
const makeWorksMarqueeRun = (duplicate = false) => `<div class="strengths-marquee__group"${duplicate ? ' aria-hidden="true"' : ''}>${worksMarqueeItems.map((item) => `<span class="strengths-marquee__item">${worksMarqueeIcon}${item}</span>`).join('')}</div>`;
if (strengthsCanvas && !$('.strengths-marquee', strengthsCanvas)) {
  strengthsCanvas.insertAdjacentHTML('afterbegin', `<div class="strengths-marquee" aria-label="设计方向：${worksMarqueeItems.join('、')}"><div class="strengths-marquee__track">${makeWorksMarqueeRun()}${makeWorksMarqueeRun(true)}</div></div>`);
}
const worksMarqueeTrack = $('#strengths .strengths-marquee__track');
let worksMarqueeTween;
function startWorksMarquee() {
  worksMarqueeTween?.kill();
  worksMarqueeTween = undefined;
  if (!worksMarqueeTrack || !window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const firstRun = $('.strengths-marquee__group', worksMarqueeTrack);
  const distance = firstRun?.getBoundingClientRect().width || 0;
  if (!distance) return;
  gsap.set(worksMarqueeTrack, { x: 0 });
  worksMarqueeTween = gsap.to(worksMarqueeTrack, {
    x: -distance,
    duration: 36,
    ease: 'none',
    repeat: -1,
    overwrite: 'auto'
  });
}
startWorksMarquee();
if (document.fonts?.ready) document.fonts.ready.then(startWorksMarquee);
let worksMarqueeResizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(worksMarqueeResizeTimer);
  worksMarqueeResizeTimer = setTimeout(startWorksMarquee, 180);
}, { passive: true });

// Keep the centred navigation pill aligned with the section in view.
const navLinks = $$('.desktop-nav a');
const navSections = navLinks.map((link) => $(link.getAttribute('href'))).filter(Boolean);
function setActiveNav(section) {
  navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${section.id}`));
}
if ('IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver((entries) => {
    const active = entries.filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (active) setActiveNav(active.target);
  }, { rootMargin: '-22% 0px -62% 0px', threshold: [0, .1, .35, .65] });
  navSections.forEach((section) => navObserver.observe(section));
}
function scrollToNavSection(section) {
  const navHeight = $('.site-nav')?.offsetHeight || 0;
  const targetTop = section.getBoundingClientRect().top + window.scrollY - navHeight - 8;
  window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
}

navLinks.forEach((link) => link.addEventListener('click', (event) => {
  const section = $(link.getAttribute('href'));
  if (!section) return;
  event.preventDefault();
  setActiveNav(section);
  if (window.location.hash !== link.getAttribute('href')) {
    window.history.pushState(null, '', link.getAttribute('href'));
  }
  scrollToNavSection(section);
}));

function focusAccordionCard(activeCard) {
  const cards = $$('.overview-card', overviewList);
  const activeIndex = cards.indexOf(activeCard);
  if (activeIndex < 0) return;
  overviewList.dataset.active = String(activeIndex);
  cards.forEach((card) => card.classList.toggle('is-active', card === activeCard));
}

function resetAccordionCards() {
  const cards = $$('.overview-card', overviewList);
  const activeIndex = Number(overviewList.dataset.active || 0);
  focusAccordionCard(cards[activeIndex] || cards[0]);
}

function setupAccordion() {
  // The directory is page-based rather than the previous expanding accordion.
}

setupAccordion();

$('.detail-back').addEventListener('click', () => { closeLayer(detailModal); lastFocused?.focus(); });
$('.detail-panel').addEventListener('click', (event) => { if (event.target === $('.detail-panel')) { closeLayer(detailModal); lastFocused?.focus(); } });

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (detailModal.classList.contains('is-open')) { closeLayer(detailModal); lastFocused?.focus(); }
  }
});

$$('.copy-trigger').forEach((button) => button.addEventListener('click', async () => {
  const value = button.dataset.copy;
  try { await navigator.clipboard.writeText(value); } catch { const input = document.createElement('textarea'); input.value = value; document.body.appendChild(input); input.select(); document.execCommand('copy'); input.remove(); }
  const original = button.innerHTML;
  button.innerHTML = `${value} <span>已复制</span>`;
  setTimeout(() => { button.innerHTML = original; }, 1600);
}));

async function copyContactValue(button) {
  const value = button.dataset.copyValue || '';
  if (!value) return;
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const input = document.createElement('textarea');
    input.value = value;
    document.body.append(input);
    input.select();
    document.execCommand('copy');
    input.remove();
  }
  const toast = $('.contact-copy-toast');
  if (toast) {
    const buttonBounds = button.getBoundingClientRect();
    toast.textContent = `已复制：${value}`;
    // Put the toast at document level so it is never clipped or layered below
    // the contact card. Its pointer tip sits 3px above the chosen circle.
    if (toast.parentElement !== document.body) document.body.append(toast);
    const targetCenter = buttonBounds.left + buttonBounds.width / 2;
    // The element is measurable while transparent, so clamp the final centre
    // against the viewport before it becomes visible.
    const toastWidth = toast.offsetWidth;
    const toastHeight = toast.offsetHeight;
    const sidePadding = 16;
    const safeCenter = Math.min(
      Math.max(targetCenter, toastWidth / 2 + sidePadding),
      window.innerWidth - toastWidth / 2 - sidePadding
    );
    toast.style.left = `${safeCenter}px`;
    toast.style.top = `${Math.max(buttonBounds.top, toastHeight + 28)}px`;
    toast.classList.add('is-visible');
    window.clearTimeout(copyContactValue.toastTimer);
    copyContactValue.toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2000);
  }
  const originalLabel = button.getAttribute('aria-label');
  button.setAttribute('aria-label', `已复制：${value}`);
  window.setTimeout(() => {
    button.setAttribute('aria-label', originalLabel || `复制联系方式 ${value}`);
  }, 2000);
}
$$('.contact-channel-copy').forEach((button) => button.addEventListener('click', () => copyContactValue(button)));

if (window.gsap) {
  gsap.defaults({ ease: 'power2.out', duration: .7 });
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    gsap.from('.intro-aura, .intro-content, .intro-portfolio-mark, .intro-sound-toggle', { y: 18, autoAlpha: 0, stagger: .12, duration: .72, ease: 'power2.out' });
  }
}

const revealItems = $$('.about, .experience, .strengths, .works, .contact, .job, .strength-grid article, .overview-card');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } }), { threshold: .12 });
  revealItems.forEach((element) => { element.classList.add('reveal'); revealObserver.observe(element); });
} else revealItems.forEach((element) => element.classList.add('is-visible'));

// Personal-strengths image trail. It is intentionally limited to the open
// canvas around the cards; the cards stay readable and retain their own hover.
function setupStrengthImageTrail() {
  const strengths = $('#strengths');
  if (!strengths || !window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const stage = $('.desktop-canvas', strengths);
  const trail = $('.strength-image-trail', strengths);
  if (!stage || !trail) return;

  const imageSources = [
    '个人优势/0b00e1f6d296bcd124b184c9472e991d.jpg',
    '个人优势/3e765960e7cc13495ea986ae68ab4abe.jpg',
    '个人优势/41b651715892f18ef0c642fb8f7ce1ff.jpg',
    '个人优势/5b26f1ad0bf03f7dbe9bf1ebcb6faaf4.jpg',
    '个人优势/7c758d10a5b1b41d92521d9b834a41dd.jpg',
    '个人优势/9532b83f62f34c1c718974bcabe92e07.jpg'
  ];
  const items = $$('.strength-image-trail__item', trail).map((item, index) => {
    const image = $('img', item);
    image.src = imageSources[index];
    const visual = document.createElement('div');
    visual.className = 'strength-image-trail__visual';
    image.before(visual);
    visual.append(image);
    return { item, visual, image };
  });
  if (!items.length) return;

  const mouse = { x: 0, y: 0 };
  const cached = { x: 0, y: 0 };
  const previous = { x: 0, y: 0 };
  const threshold = 76;
  let itemIndex = 0;
  let zIndex = 3;
  let frame = 0;
  let isTracking = false;
  let activeItems = [];

  const pointInStage = (event) => {
    const rect = stage.getBoundingClientRect();
    const scaleX = stage.offsetWidth / rect.width;
    const scaleY = stage.offsetHeight / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    };
  };

  const setPoint = (event) => {
    const point = pointInStage(event);
    mouse.x = point.x;
    mouse.y = point.y;
    return point;
  };

  const wouldOverlapCard = (startX, startY, endX, endY, width, height) => {
    const stageRect = stage.getBoundingClientRect();
    const scaleX = stage.offsetWidth / stageRect.width;
    const scaleY = stage.offsetHeight / stageRect.height;
    const largestScale = 1.22;
    const overhangX = (width * largestScale - width) / 2;
    const overhangY = (height * largestScale - height) / 2;
    const safetyGap = 10;
    const trailBounds = {
      left: Math.min(startX, endX) - overhangX,
      top: Math.min(startY, endY) - overhangY,
      right: Math.max(startX, endX) + width + overhangX,
      bottom: Math.max(startY, endY) + height + overhangY
    };

    return $$('.strength-card', stage).some((card) => {
      const rect = card.getBoundingClientRect();
      const cardBounds = {
        left: (rect.left - stageRect.left) * scaleX - safetyGap,
        top: (rect.top - stageRect.top) * scaleY - safetyGap,
        right: (rect.right - stageRect.left) * scaleX + safetyGap,
        bottom: (rect.bottom - stageRect.top) * scaleY + safetyGap
      };
      return trailBounds.left < cardBounds.right && trailBounds.right > cardBounds.left
        && trailBounds.top < cardBounds.bottom && trailBounds.bottom > cardBounds.top;
    });
  };

  const hideActiveImages = () => {
    activeItems.forEach(({ item }) => {
      gsap.killTweensOf(item);
      gsap.to(item, { duration: .14, ease: 'power1.out', autoAlpha: 0 });
    });
    activeItems = [];
  };

  const showNextImage = () => {
    const entry = items[itemIndex];
    const { item, visual, image } = entry;
    itemIndex = (itemIndex + 1) % items.length;
    zIndex = zIndex > 80 ? 3 : zIndex + 1;
    const width = item.offsetWidth;
    const height = item.offsetHeight;
    const startX = cached.x - width / 2;
    const startY = cached.y - height / 2;
    const endX = mouse.x - width / 2;
    const endY = mouse.y - height / 2;
    if (wouldOverlapCard(startX, startY, endX, endY, width, height)) return;

    activeItems = activeItems.filter((active) => active.item !== item);
    activeItems.forEach((active, index) => {
      gsap.to(active.visual, {
        duration: .2,
        ease: 'power2.out',
        scale: Math.max(.48, .82 - index * .15)
      });
    });
    activeItems.unshift(entry);

    gsap.killTweensOf([item, visual, image]);
    gsap.timeline({ onComplete: () => { activeItems = activeItems.filter((active) => active.item !== item); } })
      .fromTo(item,
        { autoAlpha: 1, x: startX, y: startY, zIndex },
        { duration: .32, ease: 'power2.out', x: endX, y: endY },
        0)
      .fromTo(visual,
        { scale: .76 },
        { duration: .32, ease: 'power2.out', scale: 1.22 },
        0)
      .fromTo(image,
        { scale: 1.18, filter: 'brightness(132%) saturate(1.18)' },
        { duration: .32, ease: 'power2.out', scale: 1, filter: 'brightness(100%) saturate(1)' },
        0)
      .to(item, { duration: .48, ease: 'power3.in', autoAlpha: 0 }, .38);
  };

  const render = () => {
    if (!isTracking) return;
    cached.x += (mouse.x - cached.x) * .14;
    cached.y += (mouse.y - cached.y) * .14;
    if (Math.hypot(mouse.x - previous.x, mouse.y - previous.y) > threshold) {
      showNextImage();
      previous.x = mouse.x;
      previous.y = mouse.y;
    }
    frame = requestAnimationFrame(render);
  };

  stage.addEventListener('pointerenter', (event) => {
    if (event.pointerType && event.pointerType !== 'mouse') return;
    const point = setPoint(event);
    cached.x = previous.x = point.x;
    cached.y = previous.y = point.y;
    if (!isTracking) {
      isTracking = true;
      frame = requestAnimationFrame(render);
    }
  });
  stage.addEventListener('pointermove', (event) => {
    if (!isTracking || (event.pointerType && event.pointerType !== 'mouse')) return;
    const point = setPoint(event);
    if (event.target.closest('.strength-card')) {
      cached.x = previous.x = point.x;
      cached.y = previous.y = point.y;
      hideActiveImages();
    }
  });
  stage.addEventListener('pointerleave', () => {
    isTracking = false;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  });
}

setupStrengthImageTrail();

// Reuse the same mirror-like WebGL rim used by the entry controls on the four
// strength cards.  It replaces the earlier coloured mesh glow completely.
function setupStrengthSpecularEdges() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  $$('#strengths .strength-card').forEach((card) => {
    // Keep this idempotent for live reloads and repeat script execution.
    if (card.querySelector('.strength-specular-fx')) return;
    const effect = document.createElement('span');
    effect.className = 'strength-specular-fx';
    effect.setAttribute('aria-hidden', 'true');
    card.append(effect);
    // The neutral highlight and charcoal base match the supplied specular
    // button treatment, while the card itself retains the site's pink accent.
    createSpecularEdgeEffect(card, effect, { line: [1, 1, 1], base: [.32, .32, .32] }, {
      radius: 21,
      proximityRadius: 300,
      intensity: 1.05
    });
  });
}

setupStrengthSpecularEdges();

// The contact video is decorative and plays only while its page is in view.
// It remains muted and loops naturally, without downloading or playing audio.
const contactSection = $('#contact');
const contactVideo = $('.contact-video', contactSection);
if (contactSection && contactVideo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // iOS only allows programmatic autoplay when these flags are set on the
  // live video element itself before play() is called.
  contactVideo.muted = true;
  contactVideo.defaultMuted = true;
  contactVideo.playsInline = true;
  contactVideo.setAttribute('muted', '');
  contactVideo.setAttribute('playsinline', '');
  contactVideo.setAttribute('webkit-playsinline', '');

  let contactIsVisible = false;
  const startContactVideo = () => {
    if (!contactIsVisible || document.hidden) return;
    contactVideo.play().catch(() => {});
  };
  const setContactVideoPlayback = (shouldPlay) => {
    contactIsVisible = shouldPlay;
    if (shouldPlay) startContactVideo();
    else contactVideo.pause();
  };
  const contactVideoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => setContactVideoPlayback(entry.isIntersecting));
  }, { threshold: .12 });
  contactVideoObserver.observe(contactSection);
  contactVideo.addEventListener('loadeddata', startContactVideo);
  contactVideo.addEventListener('canplay', startContactVideo);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) contactVideo.pause();
    else startContactVideo();
  });
}
// The contact message is replayed only after its section has fully left the
// viewport and the visitor enters it again. Keeping the source string in data
// preserves a readable no-JavaScript fallback in the HTML.
const contactTypeLines = [
  $('.contact-card__copy', contactSection)
].map((element) => ({ element, text: element?.dataset.typeText || '' }))
  .filter(({ element, text }) => element && text);
let contactCopyTimeline = null;

function appendContactTypeCharacter(element, character) {
  if (character === '\n') element.append(document.createElement('br'));
  else element.append(document.createTextNode(character));
}

function showContactCopyImmediately() {
  contactTypeLines.forEach(({ element, text }) => {
    element.replaceChildren();
    Array.from(text).forEach((character) => appendContactTypeCharacter(element, character));
  });
}

function playContactCopyTypewriter() {
  if (!contactTypeLines.length) return;
  contactCopyTimeline?.kill();
  contactTypeLines.forEach(({ element, text }) => {
    element.replaceChildren();
    element.setAttribute('aria-label', text.replace(/\n/g, ''));
  });

  if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showContactCopyImmediately();
    return;
  }

  let cursor = 0;
  contactCopyTimeline = gsap.timeline({ onComplete: () => { contactCopyTimeline = null; } });
  contactTypeLines.forEach(({ element, text }) => {
    Array.from(text).forEach((character) => {
      contactCopyTimeline.call(() => appendContactTypeCharacter(element, character), null, cursor);
      cursor += character === '\n' ? .11 : /[，。]/.test(character) ? .095 : .042;
    });
    cursor += .22;
  });
}

function resetContactCopyTypewriter() {
  contactCopyTimeline?.kill();
  contactCopyTimeline = null;
  contactTypeLines.forEach(({ element }) => element.replaceChildren());
}

if (contactTypeLines.length && 'IntersectionObserver' in window) {
  const contactCopyObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) playContactCopyTypewriter();
    else resetContactCopyTypewriter();
  }), { threshold: .35 });
  contactCopyObserver.observe(contactSection);
} else if (contactTypeLines.length) {
  playContactCopyTypewriter();
}

// The profile heading and all three live copy lines share a single typewriter
// start, so the profile information reads as one coordinated introduction.
const aboutProfileTitle = $('#about .about-profile-title');
const aboutCopyLines = $$('.about-copy-motion [data-fold-text]');
let aboutCopyPlayed = false;
let aboutCarousel = null;
let aboutCarouselCards = [];
let aboutCarouselEntrancePrepared = false;
let aboutCarouselEntrancePlayed = false;
const aboutCarouselEntranceTargets = new Map();

const aboutTypeLines = [
  { element: aboutProfileTitle, text: aboutProfileTitle?.textContent.trim() || '角色档案', delay: .095 },
  ...aboutCopyLines.map((element, index) => ({
    element,
    text: element.dataset.foldText || '',
    delay: index === 0 ? .055 : .034
  }))
].filter(({ element, text }) => element && text);
let aboutCopyTypeTimeline = null;

function appendAboutTypeCharacter(element, character) {
  if (character === '\n') element.append(document.createElement('br'));
  else element.append(document.createTextNode(character === ' ' ? '\u00a0' : character));
}

function showAboutCopyImmediately() {
  aboutTypeLines.forEach(({ element, text }) => {
    element.replaceChildren();
    Array.from(text).forEach((character) => appendAboutTypeCharacter(element, character));
  });
}

function playAboutCopyTypewriter() {
  if (aboutCopyPlayed || !aboutTypeLines.length) return;
  aboutCopyPlayed = true;
  // The portrait begins on the same frame as the first character, so the left
  // visual and right-side introduction read as one opening gesture.
  playAboutCarouselEntrance();
  aboutCopyTypeTimeline?.kill();
  aboutTypeLines.forEach(({ element, text }) => {
    element.replaceChildren();
    element.setAttribute('aria-label', text.replace(/\n/g, ' '));
  });
  if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showAboutCopyImmediately();
    return;
  }
  aboutCopyTypeTimeline = gsap.timeline({ onComplete: () => { aboutCopyTypeTimeline = null; } });
  let cursor = 0;
  aboutTypeLines.forEach(({ element, text, delay }) => {
    Array.from(text).forEach((character) => {
      aboutCopyTypeTimeline.call(() => appendAboutTypeCharacter(element, character), null, cursor);
      cursor += character === '\n' ? .08 : /[，。]/.test(character) ? delay * 1.6 : delay;
    });
    // Keep the profile copy legible as a sequence: each block starts only
    // after the previous block has completed its typewriter pass.
    cursor += .2;
  });
}

const intro = $('#home');
const introVideo = $('.intro-video', intro);
const introMobilePoster = $('.intro-mobile-poster', intro);
const introExplore = $('.intro-explore', intro);
const introShade = $('.intro-shade', intro);
const introMission = $('.intro-mission', intro);
const introSoundToggle = $('.intro-sound-toggle', intro);
const introRippleCanvas = $('.intro-ripple-canvas', intro);
let introDismissed = false;
let introSoundEnabled = false;
let introMissionRun = 0;

/*
 * Paused-screen ripples. The supplied OGL example uses a displacement texture.
 * This is the standalone equivalent: a transparent canvas redraws just the
 * narrow refracted rings over the paused video, rather than replacing it.
 */
function createIntroRipples() {
  if (!intro || !introVideo || !introRippleCanvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return { stop() {} };
  }

  const context = introRippleCanvas.getContext('2d');
  const snapshot = document.createElement('canvas');
  const snapshotContext = snapshot.getContext('2d');
  if (!context || !snapshotContext) return { stop() {} };

  const waves = [];
  const maxWaves = 12;
  const minimumSpacing = 42;
  const rippleLife = 760;
  const rippleRadius = 118;
  let lastX = -Infinity;
  let lastY = -Infinity;
  let animationFrame = 0;
  let isStopped = false;

  function resize() {
    const width = Math.max(1, intro.offsetWidth);
    const height = Math.max(1, intro.offsetHeight);
    if (introRippleCanvas.width === width && introRippleCanvas.height === height) return;
    introRippleCanvas.width = width;
    introRippleCanvas.height = height;
    snapshot.width = width;
    snapshot.height = height;
  }

  function drawVideoCover(target, width, height) {
    const sourceWidth = introVideo.videoWidth;
    const sourceHeight = introVideo.videoHeight;
    if (!sourceWidth || !sourceHeight || introVideo.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return false;
    const scale = Math.max(width / sourceWidth, height / sourceHeight);
    const drawWidth = sourceWidth * scale;
    const drawHeight = sourceHeight * scale;
    target.clearRect(0, 0, width, height);
    target.drawImage(introVideo, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
    return true;
  }

  function capturePausedFrame() {
    resize();
    return drawVideoCover(snapshotContext, snapshot.width, snapshot.height);
  }

  function drawWave(wave, now) {
    const progress = Math.min(1, (now - wave.startedAt) / rippleLife);
    const eased = 1 - Math.pow(1 - progress, 2.15);
    const radius = 10 + rippleRadius * eased;
    const visibility = Math.pow(1 - progress, 1.55);
    const band = 2.4 + visibility * 2.2;
    const offset = 6.4 * visibility;
    const segments = 30;

    for (let index = 0; index < segments; index += 1) {
      const start = (index / segments) * Math.PI * 2;
      const end = ((index + 1) / segments) * Math.PI * 2 + .012;
      const angle = (start + end) / 2;
      context.save();
      context.beginPath();
      context.arc(wave.x, wave.y, radius + band, start, end);
      context.arc(wave.x, wave.y, Math.max(0, radius - band), end, start, true);
      context.closePath();
      context.clip();
      context.globalAlpha = visibility * .75;
      context.drawImage(snapshot, Math.cos(angle) * offset, Math.sin(angle) * offset);
      context.restore();
    }

    context.save();
    context.beginPath();
    context.arc(wave.x, wave.y, radius, 0, Math.PI * 2);
    context.strokeStyle = `rgba(218, 240, 255, ${visibility * .14})`;
    context.lineWidth = .7;
    context.stroke();
    context.restore();
  }

  function render(now) {
    animationFrame = 0;
    if (isStopped) return;
    context.clearRect(0, 0, introRippleCanvas.width, introRippleCanvas.height);
    for (let index = waves.length - 1; index >= 0; index -= 1) {
      if (now - waves[index].startedAt >= rippleLife) waves.splice(index, 1);
    }
    waves.forEach((wave) => drawWave(wave, now));
    if (waves.length) animationFrame = requestAnimationFrame(render);
  }

  function addWave(event) {
    if (isStopped || intro.classList.contains('is-playing') || introDismissed) return;
    const rect = introRippleCanvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = (event.clientX - rect.left) * (introRippleCanvas.width / rect.width);
    const y = (event.clientY - rect.top) * (introRippleCanvas.height / rect.height);
    if (x < 0 || y < 0 || x > introRippleCanvas.width || y > introRippleCanvas.height) return;
    if (Math.hypot(x - lastX, y - lastY) < minimumSpacing) return;
    if (!capturePausedFrame()) return;
    lastX = x;
    lastY = y;
    waves.push({ x, y, startedAt: performance.now() });
    if (waves.length > maxWaves) waves.shift();
    if (!animationFrame) animationFrame = requestAnimationFrame(render);
  }

  function stop() {
    isStopped = true;
    waves.length = 0;
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    context.clearRect(0, 0, introRippleCanvas.width, introRippleCanvas.height);
    intro.removeEventListener('pointermove', addWave);
    window.removeEventListener('resize', resize);
  }

  intro.addEventListener('pointermove', addWave, { passive: true });
  window.addEventListener('resize', resize, { passive: true });
  resize();
  return { stop };
}

let introRipples = createIntroRipples();

/* Standalone WebGL2 port of the supplied specular-button component.  The
   visual canvas is a child of each existing control, so a resume link stays a
   real downloadable link and the explore control stays a real button. */
function createSpecularEdgeEffect(target, effect, palette, { radius = 15, proximityRadius = 250, intensity = 1.15 } = {}) {
  if (!target || !effect || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return { stop() {} };
  const gl = document.createElement('canvas').getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: true });
  if (!gl) return { stop() {} };
  const canvas = gl.canvas;
  effect.append(canvas);
  const vertex = `#version 300 es
    in vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
  const fragment = `#version 300 es
    precision highp float;
    uniform vec2 uCenter,uHalfSize; uniform float uRadius,uAngle,uPx,uIntensity,uShineSize,uShineFade,uThickness,uBaseWidth; uniform vec3 uLineColor,uBaseColor; out vec4 fragColor;
    float sdRoundedRect(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
    float gaussianLine(float d,float sigma){float x=d/(sigma+1e-6);float k=mix(1.,1.6,smoothstep(0.,1.5,x));return exp(-k*x*x);}
    void main(){vec2 p=gl_FragCoord.xy-uCenter;float d=sdRoundedRect(p,uHalfSize,uRadius);vec2 L=vec2(cos(uAngle),sin(uAngle));float base=(1.-smoothstep(0.,uBaseWidth,abs(d)))*.45;vec2 nEll=normalize(p/(uHalfSize*uHalfSize)+1e-6);float phi=acos(clamp(abs(dot(nEll,L)),0.,1.));float rim=1.-smoothstep(uShineSize-uShineFade,uShineSize+uShineFade+1e-4,phi);float line=gaussianLine(d,uThickness);float edgeClamp=1.-smoothstep(.5*uPx,3.*uPx,abs(d));float hi=line*rim*edgeClamp*uIntensity;vec3 col=uBaseColor*base+uLineColor*hi;float a=clamp(base+hi,0.,1.);fragColor=vec4(col,a);}`;
  const compile = (type, source) => { const shader = gl.createShader(type); gl.shaderSource(shader, source); gl.compileShader(shader); return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null; };
  const vs = compile(gl.VERTEX_SHADER, vertex);
  const fs = compile(gl.FRAGMENT_SHADER, fragment);
  const program = gl.createProgram();
  if (!vs || !fs) return { stop() {} };
  gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return { stop() {} };
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position');
  const uniform = (name) => gl.getUniformLocation(program, name);
  const u = Object.fromEntries(['uCenter', 'uHalfSize', 'uRadius', 'uAngle', 'uPx', 'uLineColor', 'uBaseColor', 'uIntensity', 'uShineSize', 'uShineFade', 'uThickness', 'uBaseWidth'].map((name) => [name, uniform(name)]));
  const PAD = 20;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 1;
  let height = 1;
  let pointerAngle = null;
  let proximity = 0;
  let angle = 2.4;
  let idleAngle = 2.4;
  let brightness = 0;
  let previousTime = performance.now();
  let frame = 0;
  let stopped = false;

  function resize() {
    // offset dimensions retain the 1920-artboard geometry under CSS scaling.
    width = target.offsetWidth;
    height = target.offsetHeight;
    canvas.width = Math.round((width + PAD * 2) * dpr);
    canvas.height = Math.round((height + PAD * 2) * dpr);
  }
  function pointerMove(event) {
    const rect = target.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = Math.max(rect.left - event.clientX, 0, event.clientX - rect.right);
    const dy = Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom);
    const stageScale = rect.width ? width / rect.width : 1;
    const distance = Math.hypot(dx, dy) * stageScale;
    if (distance === 0) {
      const nx = (event.clientX - cx) / (rect.width / 2);
      const ny = (cy - event.clientY) / (rect.height / 2);
      pointerAngle = Math.atan2(2 / height, -2 / width) + nx * .3 + ny * .15;
    } else pointerAngle = Math.atan2(cy - event.clientY, event.clientX - cx);
    const t = Math.max(0, 1 - distance / proximityRadius);
    proximity = t * t * (3 - 2 * t);
  }
  function render(now) {
    if (stopped) return;
    frame = requestAnimationFrame(render);
    const delta = Math.min((now - previousTime) / 1000, .05);
    previousTime = now;
    idleAngle += .35 * delta;
    const target = pointerAngle !== null && proximity > 0 ? pointerAngle : idleAngle;
    const difference = ((target - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    angle += difference * (1 - Math.exp(-delta * 7));
    brightness += (proximity - brightness) * (1 - Math.exp(-delta * 8));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.useProgram(program); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(u.uCenter, (PAD + width / 2) * dpr, (PAD + height / 2) * dpr);
    gl.uniform2f(u.uHalfSize, (width / 2) * dpr, (height / 2) * dpr);
    gl.uniform1f(u.uRadius, Math.min(radius, Math.min(width, height) / 2) * dpr);
    gl.uniform1f(u.uAngle, angle); gl.uniform1f(u.uPx, dpr); gl.uniform3fv(u.uLineColor, palette.line); gl.uniform3fv(u.uBaseColor, palette.base);
    gl.uniform1f(u.uIntensity, intensity * brightness); gl.uniform1f(u.uShineSize, 10 * Math.PI / 180); gl.uniform1f(u.uShineFade, 40 * Math.PI / 180); gl.uniform1f(u.uThickness, dpr); gl.uniform1f(u.uBaseWidth, dpr);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(target);
  window.addEventListener('pointermove', pointerMove, { passive: true });
  resize();
  frame = requestAnimationFrame(render);
  return { stop() { stopped = true; cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener('pointermove', pointerMove); if (canvas.parentNode === effect) effect.removeChild(canvas); gl.getExtension('WEBGL_lose_context')?.loseContext(); } };
}

function createIntroSpecularButton(button, palette) {
  return createSpecularEdgeEffect(button, $('.intro-specular-fx', button), palette);
}

let introButtonEffects = [
  createIntroSpecularButton(introExplore, { line: [1, .78, .92], base: [.55, .1, .35] }),
  createIntroSpecularButton($('.intro-resume', intro), { line: [.94, .98, 1], base: [.24, .25, .32] })
];

// Reuse the same pointer-following specular rim on the two contact actions.
// The interactive link and copy button remain their native elements.
function setupContactActionSpecularButtons() {
  return $$('#contact .contact-card__actions a, #contact .contact-card__actions button').map((button) => {
    if ($('.contact-action-specular-fx', button)) return { stop() {} };
    const effect = document.createElement('span');
    effect.className = 'contact-action-specular-fx';
    effect.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.className = 'contact-action-label';
    label.textContent = button.textContent.trim();
    button.replaceChildren(effect, label);
    const isPrimary = button.classList.contains('contact-card__primary');
    return createSpecularEdgeEffect(
      button,
      effect,
      isPrimary ? { line: [1, .78, .92], base: [.55, .1, .35] } : { line: [.94, .98, 1], base: [.24, .25, .32] },
      { radius: 10, proximityRadius: 230, intensity: 1.05 }
    );
  });
}

const contactActionButtonEffects = setupContactActionSpecularButtons();

if (window.location.hash) {
  history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  window.scrollTo(0, 0);
}

function typeIntroMission() {
  if (!introMission) return;
  const run = ++introMissionRun;
  const text = introMission.dataset.typeText || '';
  introMission.replaceChildren();
  introMission.classList.remove('is-typed');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    introMission.textContent = text;
    introMission.classList.add('is-typed');
    return;
  }
  let index = 0;
  const typeNext = () => {
    if (run !== introMissionRun) return;
    const character = text[index++];
    if (character === '\n') introMission.append(document.createElement('br'));
    else introMission.append(document.createTextNode(character));
    if (index < text.length) window.setTimeout(typeNext, character === '，' || character === '：' ? 115 : 48);
    else introMission.classList.add('is-typed');
  };
  window.setTimeout(typeNext, 260);
}

function setIntroSound(enabled) {
  introSoundEnabled = Boolean(enabled);
  if (introVideo) {
    introVideo.muted = !introSoundEnabled;
    introVideo.volume = 1;
  }
  if (!introSoundToggle) return;
  introSoundToggle.classList.toggle('is-sound-on', introSoundEnabled);
  introSoundToggle.classList.toggle('is-sound-off', !introSoundEnabled);
  introSoundToggle.setAttribute('aria-pressed', String(introSoundEnabled));
  introSoundToggle.setAttribute('aria-label', introSoundEnabled ? '声音开启，点击关闭声音' : '声音关闭，点击开启声音');
  $('.intro-sound-label', introSoundToggle).textContent = introSoundEnabled ? '声音开' : '声音关';
}

function dismissIntro() {
  if (introDismissed) return;
  introDismissed = true;
  introRipples.stop();
  introButtonEffects.forEach((effect) => effect.stop());
  document.body.classList.add('is-intro-leaving');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const about = $('#about');
  // The About section uses its own Figma artboard rather than the shared
  // `.desktop-canvas` wrapper, so animate the node that is actually visible.
  const aboutCanvas = $('.about-figma-canvas', about);
  const complete = () => {
    document.body.classList.remove('is-intro-active', 'is-intro-leaving');
    document.body.classList.add('is-intro-dismissed');
    about?.classList.add('is-visible');
    window.dispatchEvent(new Event('portfolio:entered'));
    playAboutCopyTypewriter();
  };
  if (window.gsap && !reduceMotion && introShade) {
    gsap.set(introShade, { autoAlpha: 1, scaleY: 0, transformOrigin: 'center bottom' });
    // The next page is staged behind the black cover before it is revealed.
    // This avoids a frame where the video has vanished but the next artboard
    // has not yet painted.
    if (about) gsap.set(about, { autoAlpha: 1, y: 0 });
    if (aboutCanvas) gsap.set(aboutCanvas, { autoAlpha: 0, y: 110 });
    const prepareAboutUnderCover = () => {
      // The fixed intro does not occupy document flow. Lock scrolling only
      // after the black cover is fully opaque, so the browser never paints an
      // intermediate document position during the visible hand-off.
      if (about) window.scrollTo({ top: about.offsetTop, behavior: 'auto' });
    };
    const transition = gsap.timeline({ onComplete: complete });
    transition
      .to('.intro-aura, .intro-content, .intro-portfolio-mark, .intro-sound-toggle', { autoAlpha: 0, duration: .22, ease: 'power1.out', overwrite: 'auto' }, 0)
      // Stage 1: cover the final video frame completely before anything below
      // the intro is allowed to move or repaint.
      .to(introShade, { scaleY: 1, duration: .68, ease: 'power2.in', overwrite: 'auto' }, 0)
      // Stage 2: the new page is positioned and painted behind that opaque
      // cover. This prevents a compositor frame with neither page visible.
      .call(prepareAboutUnderCover, null, .68)
      .to(introVideo, { autoAlpha: 0, duration: .01, ease: 'none', overwrite: 'auto' }, .68)
      .to(aboutCanvas, { autoAlpha: 1, y: 0, duration: .42, ease: 'power3.out', overwrite: 'auto' }, .72)
      // Stage 3: reveal only after the About artboard has reached its final
      // rendered state; keep the intro container opaque until this is done.
      .to(introShade, { autoAlpha: 0, duration: .36, ease: 'power1.out', overwrite: 'auto' }, 1.16)
      .set(intro, { autoAlpha: 0 }, 1.52);
  } else complete();
}

// This restores the actual first-visit entrance screen, rather than merely
// navigating to #home after the portfolio has already been unlocked.
function returnToIntro() {
  if (!intro || !introDismissed) return;

  introVideo?.pause();
  if (introVideo) {
    introVideo.currentTime = 0;
    introVideo.muted = true;
  }
  introDismissed = false;
  setIntroSound(false);
  intro.classList.remove('is-playing');
  introExplore?.removeAttribute('aria-disabled');

  // Clear the temporary states left by the intro-to-portfolio handoff.
  intro.removeAttribute('style');
  introVideo?.removeAttribute('style');
  introShade?.removeAttribute('style');
  $$('.intro-aura, .intro-content, .intro-portfolio-mark, .intro-sound-toggle', intro)
    .forEach((element) => element.removeAttribute('style'));
  document.body.classList.remove('is-intro-dismissed', 'is-intro-leaving');
  document.body.classList.add('is-intro-active');
  window.scrollTo({ top: 0, behavior: 'auto' });

  // These effects are intentionally disposed during exploration. Recreate
  // them so returning here behaves like a fresh visit to the entrance screen.
  introRipples = createIntroRipples();
  introButtonEffects = [
    createIntroSpecularButton(introExplore, { line: [1, .78, .92], base: [.55, .1, .35] }),
    createIntroSpecularButton($('.intro-resume', intro), { line: [.94, .98, 1], base: [.24, .25, .32] })
  ];
  typeIntroMission();
}

function startExploration() {
  if (!introVideo || introDismissed || intro.classList.contains('is-playing')) return;
  intro.classList.add('is-playing');
  introVideo.dataset.introStarted = 'true';
  introExplore?.setAttribute('aria-disabled', 'true');
  introVideo.currentTime = 0;
  setIntroSound(true);
  introVideo.play()
    .then(() => {
      introMobilePoster?.classList.add('is-hidden');
      introRipples.stop();
      introButtonEffects.forEach((effect) => effect.stop());
    })
    .catch(() => {
      // If playback was rejected, restore the paused-screen experience too.
      intro.classList.remove('is-playing');
      introMobilePoster?.classList.remove('is-hidden');
      introExplore?.removeAttribute('aria-disabled');
      setIntroSound(false);
    });
}

introExplore?.addEventListener('click', startExploration);
$('.contact-card__secondary')?.addEventListener('click', (event) => {
  event.preventDefault();
  returnToIntro();
});
introSoundToggle?.addEventListener('click', () => setIntroSound(!introSoundEnabled));
setIntroSound(false);

// A paused mobile video is often left as a black compositor surface until it
// receives a user gesture.  Briefly play the muted, inline video until its
// first decoded frame is actually painted, then freeze it.  This is the video
// frame itself — not a poster image — and the exploration click restarts the
// same video normally from time zero.
let introOpeningFrameIsReady = introVideo?.dataset.openingFrameReady === 'true';
function primeIntroOpeningVideoFrame() {
  // Phones and tablets use the still image above the video; avoid decoding
  // video before the user gesture, which is what produces the black surface.
  if (window.matchMedia('(max-width: 960px)').matches) return;
  if (!introVideo || introDismissed || introOpeningFrameIsReady) return;

  const freezeAfterFirstPaint = () => {
    const freeze = () => {
      if (introDismissed || intro.classList.contains('is-playing')) return;
      introVideo.pause();
      introOpeningFrameIsReady = true;
    };

    if ('requestVideoFrameCallback' in introVideo) {
      introVideo.requestVideoFrameCallback(freeze);
    } else {
      // Older mobile browsers do not expose the frame callback. Two paint
      // frames give the video compositor time to show its decoded first frame.
      requestAnimationFrame(() => requestAnimationFrame(freeze));
    }
  };

  const startMutedFrameDecode = () => {
    if (introDismissed || intro.classList.contains('is-playing')) return;
    introVideo.muted = true;
    introVideo.play().then(freezeAfterFirstPaint).catch(() => {
      // If a browser disallows muted priming, retain its native paused frame.
      // The explicit exploration click will still start playback normally.
    });
  };

  if (introVideo.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    startMutedFrameDecode();
  } else {
    introVideo.addEventListener('loadeddata', startMutedFrameDecode, { once: true });
    introVideo.load();
  }
}

primeIntroOpeningVideoFrame();
// Start the hand-off while the video is still running, so the bottom-up black
// gradient can bridge the final frames into the About artboard.
introVideo?.addEventListener('timeupdate', () => {
  if (!Number.isFinite(introVideo.duration) || introVideo.duration - introVideo.currentTime > 1.45) return;
  dismissIntro();
});
introVideo?.addEventListener('ended', dismissIntro);
typeIntroMission();

if ('IntersectionObserver' in window) {
  const aboutTypeObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
    // The fixed intro overlays the About section on first load.  Do not spend
    // its one-time fold animation while it is still hidden behind that screen.
    if (entry.isIntersecting && document.body.classList.contains('is-intro-dismissed')) {
      playAboutCopyTypewriter();
      aboutTypeObserver.unobserve(entry.target);
    }
  }), { threshold: .28 });
  const aboutSection = $('#about');
  if (aboutSection) aboutTypeObserver.observe(aboutSection);
} else playAboutCopyTypewriter();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// This is the only work-history accordion left in the page. The source order
// always remains 01 → 04; hovering expands a row in its own position.
const experienceRecords = $$('#experience .experience-record');
function setExperienceRecord(activeRecord) {
  if (!activeRecord) return;
  experienceRecords.forEach((record) => {
    const expanded = record === activeRecord;
    record.classList.toggle('is-expanded', expanded);
    record.querySelector('.experience-record__trigger')?.setAttribute('aria-expanded', String(expanded));
    const icon = record.querySelector('.experience-record__trigger b');
    if (icon) icon.textContent = expanded ? '−' : '+';
  });

  // Keep the ordering stable, using a small transform lift only for emphasis.
  if (!window.gsap || reducedMotion) return;
  experienceRecords.forEach((record) => {
    window.gsap.killTweensOf(record);
    window.gsap.to(record, { y: record === activeRecord ? -10 : 0, duration: .42, ease: 'power3.out', overwrite: 'auto' });
  });
}
experienceRecords.forEach((record) => {
  record.addEventListener('mouseenter', () => setExperienceRecord(record));
  record.addEventListener('focusin', () => setExperienceRecord(record));
  record.querySelector('.experience-record__trigger')?.addEventListener('click', () => setExperienceRecord(record));
});

// The progress tracks are complete by default.  Entering this area redraws only
// the coloured fill; the muted rose track underneath remains static.
const aboutAttributes = $('.about-attributes');
const attributeBars = $$('.about-attribute-bar', aboutAttributes);
function playAttributeFill() {
  attributeBars.forEach((bar, index) => {
    const rawProgress = Number.parseFloat(getComputedStyle(bar).getPropertyValue('--progress'));
    const progress = rawProgress > 1 ? rawProgress / 100 : rawProgress;
    if (!Number.isFinite(progress)) return;
    if (reducedMotion || !window.gsap) {
      bar.style.setProperty('--fill', progress);
      return;
    }
    window.gsap.killTweensOf(bar);
    window.gsap.set(bar, { '--fill': 0 });
    window.gsap.to(bar, {
      '--fill': progress,
      duration: 0.65,
      delay: index * 0.1,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  });
}
function restoreAttributeFill() {
  attributeBars.forEach((bar) => {
    const rawProgress = Number.parseFloat(getComputedStyle(bar).getPropertyValue('--progress'));
    const progress = rawProgress > 1 ? rawProgress / 100 : rawProgress;
    if (!Number.isFinite(progress)) return;
    window.gsap?.killTweensOf(bar);
    bar.style.setProperty('--fill', progress);
  });
}

// Each bar has a permanent muted-red base track. The colour layer is complete
// at rest, redraws from zero on entry, and returns to complete on leave.
restoreAttributeFill();
aboutAttributes?.addEventListener('pointerenter', playAttributeFill);
aboutAttributes?.addEventListener('pointerleave', restoreAttributeFill);

// The four highlighted traits are part of the supplied artwork and remain static.

// Right-side portrait cover flow: the visual positions are derived from the
// selected centre image, so both arrow directions loop through all three cards.
aboutCarousel = $('.about-carousel');
aboutCarouselCards = $$('.about-carousel-card', aboutCarousel);
let aboutCarouselIndex = 0;
let aboutCarouselAnimating = false;
let aboutCarouselLoop = null;

function prepareAboutCarouselEntrance() {
  if (aboutCarouselEntrancePrepared || !aboutCarouselCards.length || !window.gsap) return;
  aboutCarouselEntrancePrepared = true;
  aboutCarouselCards.forEach((card) => {
    const finalX = Number(window.gsap.getProperty(card, 'x')) || 0;
    aboutCarouselEntranceTargets.set(card, finalX);
    window.gsap.set(card, { x: finalX - 360, autoAlpha: 0 });
  });
}

function playAboutCarouselEntrance() {
  if (aboutCarouselEntrancePlayed || !aboutCarouselCards.length) return;
  aboutCarouselEntrancePlayed = true;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!window.gsap) return;
  window.gsap.to(aboutCarouselCards, {
    x: (index, card) => aboutCarouselEntranceTargets.get(card) ?? (Number(window.gsap.getProperty(card, 'x')) || 0),
    autoAlpha: 1,
    duration: reduceMotion ? 0 : 1.5,
    ease: 'power3.out',
    overwrite: 'auto'
  });
}

function renderAboutCarousel(animate = false) {
  if (!aboutCarouselCards.length) return;
  const total = aboutCarouselCards.length;
  const positions = [
    { xPercent: -50, yPercent: -50, x: -12, y: -16, scale: .95, rotation: 0, opacity: 1, zIndex: 3, pointerEvents: 'auto' },
    { xPercent: -50, yPercent: -50, x: 7, y: -3, scale: .893, rotation: 4, opacity: .92, zIndex: 2, pointerEvents: 'none' },
    { xPercent: -50, yPercent: -50, x: 24, y: 9, scale: .836, rotation: 8, opacity: .78, zIndex: 1, pointerEvents: 'none' }
  ];

  aboutCarouselCards.forEach((card, index) => {
    const offset = (index - aboutCarouselIndex + total) % total;
    const position = positions[offset];
    if (animate && window.gsap && !reducedMotion) {
      gsap.set(card, { zIndex: position.zIndex });
      gsap.to(card, { ...position, duration: .5, ease: 'power3.inOut', overwrite: 'auto' });
    } else if (window.gsap) {
      gsap.set(card, position);
    } else {
      card.style.transform = `translateX(${position.xPercent}%) scale(${position.scale}) rotateY(${position.rotationY}deg)`;
      card.style.opacity = position.opacity;
      card.style.zIndex = position.zIndex;
    }
  });
}

function moveAboutCarousel(direction) {
  if (aboutCarouselAnimating || !aboutCarouselCards.length) return;
  aboutCarouselAnimating = true;
  aboutCarouselIndex = (aboutCarouselIndex + direction + aboutCarouselCards.length) % aboutCarouselCards.length;
  renderAboutCarousel(true);
  window.setTimeout(() => { aboutCarouselAnimating = false; }, reducedMotion ? 0 : 510);
}

renderAboutCarousel();
if (aboutCopyPlayed) playAboutCarouselEntrance();
else prepareAboutCarouselEntrance();
aboutCarouselCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    if (index === aboutCarouselIndex) moveAboutCarousel(1);
  });
});
// The portrait is intentionally click-driven: hovering must never change the
// selected image. Clicking anywhere in the photo stage advances 2 → 1 → 3.
aboutCarousel?.addEventListener('click', (event) => {
  if (event.target.closest('.about-carousel-card')) return;
  moveAboutCarousel(1);
});

// Two identical groups make the skills strip loop horizontally without a
// visible reset between the final and first card.
const skillImages = ['个人优势1', '个人优势2'].flatMap((set) => (
  Array.from({ length: 10 }, (_, index) => {
    const card = String(index + 1).padStart(2, '0');
    return `个人技能/软件卡片_裁剪/${set}-${card}.png`;
  })
));
const skillsTrack = $('#experience-skills-track');
const skillsWindow = $('.experience-skills-window');
let skillsTween;

function renderExperienceSkills() {
  if (!skillsTrack) return;
  const markup = (src, index, duplicate = false) => `<img class="experience-skill-image" src="${src}" alt="${duplicate ? '' : `软件技能卡片 ${index + 1}`}"${duplicate ? ' aria-hidden="true"' : ''} />`;
  const makeGroup = (duplicate = false) => `<div class="experience-skills-loop-group"${duplicate ? ' aria-hidden="true"' : ''}>${skillImages.map((src, index) => markup(src, index, duplicate)).join('')}</div>`;
  skillsTrack.innerHTML = `${makeGroup()}${makeGroup(true)}`;
}

function startExperienceSkillsLoop() {
  if (!skillsTrack || !skillsWindow) return;
  skillsTween?.kill();
  skillsTween = undefined;
  if (!window.gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const firstGroup = $('.experience-skills-loop-group', skillsTrack);
  if (!firstGroup) return;
  const groupGap = Number.parseFloat(getComputedStyle(skillsTrack).gap) || 0;
  const loopDistance = firstGroup.getBoundingClientRect().width + groupGap;
  if (!loopDistance) return;
  gsap.set(skillsTrack, { x: -loopDistance });
  skillsTween = gsap.to(skillsTrack, {
    x: 0,
    duration: 22,
    ease: 'none',
    repeat: -1,
    overwrite: 'auto'
  });
}

renderExperienceSkills();
startExperienceSkillsLoop();
skillsTrack?.querySelectorAll('img').forEach((image) => {
  image.addEventListener('load', () => startExperienceSkillsLoop(), { once: true });
});
let skillResizeTimer;
window.addEventListener('resize', () => { clearTimeout(skillResizeTimer); skillResizeTimer = setTimeout(startExperienceSkillsLoop, 180); });
