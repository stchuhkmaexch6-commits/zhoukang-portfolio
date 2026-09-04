import { localAiVideoBackground, localWorks } from './works'

export const media = {
  heroBlind: '/assets/hero-blind.png',
  heroUncovered: '/assets/hero-uncovered.png',
  heroReference: '/assets/hero-reference.png',
  hands: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1600&q=85',
  compositionLoose: '/assets/composition-loose.png',
  compositionWrapped: '/assets/composition-wrapped.png',
  compositionHomeStudyOne: '/assets/composition-home-01.jpg',
  city: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1800&q=85',
  video: localAiVideoBackground,
}

const posterColors = ['red', 'blue', 'yellow', 'mono', 'green', 'red', 'blue', 'yellow']
const homePosterTitles = ['龙形万象', '变色龙', '轻薄本', '降噪耳机', '白玫瑰精华', '数码狂欢节', '宠爱相伴', 'MUSIC']
const homePosterSources = ['poster-01.jpg', 'poster-02.jpg', 'poster-03.jpg', 'poster-04.jpg', 'poster-05.png', 'poster-06.png', 'poster-07.png', 'poster-08.jpg']
export const posters = homePosterSources.map((source, i) => ({ title: homePosterTitles[i], type: `Selected / ${String(i + 1).padStart(2, '0')}`, color: posterColors[i], image: `/assets/home-posters/${source}` }))

const pickLocal = (list, title, fallback = 0) => list.find((item) => item.title === title) || list[fallback]
const tagsFor = (item, module) => [module, item.meta?.split(' / ')[0], item.type === 'video' || item.video ? '视频' : '图片'].filter(Boolean)
const illustrationBodies = [
  'Illustration systems for stories that live between the real and the rendered.',
  'A visual language built from atmosphere, texture, and a little beautiful friction.',
  'Art direction for objects, worlds, and products that do not exist yet.',
  'A study in shape, rhythm, and quiet visual tension.',
  'Image-making for worlds that feel close enough to touch.',
  'Colour, texture, and form arranged with a little friction.',
]
const illustrationHome = [
  ['春', '春日形色 / SPRING FORMS'],
  ['夏', '夏日构成 / SUMMER FORMS'],
  ['秋', '秋色叙事 / AUTUMN STUDY'],
  ['冬', '冬日留白 / WINTER STUDY'],
]
export const illustrationSlides = illustrationHome.map(([sourceTitle, title], i) => { const item = pickLocal(localWorks.illustration, sourceTitle, i); return { kicker: `${String(i + 1).padStart(2, '0')} / VISUAL WORLD`, title, body: illustrationBodies[i], image: item.src } })

const aPlusHome = [
  ['背包', '旅途装备 / JOURNEY PACK'],
  ['吹放机', '无绳吹风机 / CORDLESS AIR DUSTER'],
  ['咖啡', '咖啡罐视觉系统 / COFFEE CANISTER'],
  ['宠物猫窝', '宠物猫窝 / LUXURY CAT BED'],
]
const aPlusHomeOverrides = {
  咖啡: '/assets/home-aplus-coffee.png',
}
export const aPlus = aPlusHome.map(([sourceTitle, title], i) => { const item = pickLocal(localWorks.aplus, sourceTitle, i); return { tag: String(i + 1).padStart(2, '0'), title, image: aPlusHomeOverrides[sourceTitle] || item.src } })

const selectedVideoUrl = (name) => `/selected-videos/${encodeURIComponent(name)}`
const aiVideoByTitle = (title) => localWorks.aiVideo.find((item) => item.title === title)
const homeVideoSources = [
  { title: '6月3日第一版未修改', src: selectedVideoUrl('6月3日第一版未修改.mp4') },
  { title: '6月5日单人美黑', src: selectedVideoUrl('6月5日单人美黑.mp4') },
  { title: '7月10日美国', src: selectedVideoUrl('7月10日美国.mp4') },
  { title: '智闻（20M）', src: aiVideoByTitle('智闻（20M）')?.src },
  { title: '包包展示 (2)', src: aiVideoByTitle('包包展示 (2)')?.src },
  { title: '饮料tvc (2)', src: aiVideoByTitle('饮料tvc (2)')?.src },
  { title: '眼睛变装', src: aiVideoByTitle('眼睛变装')?.src },
  { title: '七龙珠悟空与龟大师互打', src: aiVideoByTitle('七龙珠悟空与龟大师互打')?.src },
  { title: '铠甲变身', src: aiVideoByTitle('铠甲变身')?.src },
  { title: 'ai测评视频', src: aiVideoByTitle('ai测评视频')?.src },
  { title: 'ai动漫去皱带货视频', src: aiVideoByTitle('ai动漫去皱带货视频')?.src },
  { title: '6月5日双人美黑水印01', src: aiVideoByTitle('6月5日双人美黑水印01')?.src },
]
export const videoReels = homeVideoSources.filter((item) => item.src).map((item) => ({ title: item.title, image: item.src, video: item.src }))

const featuredEffects = ['斗破苍穹文字', '科技芯片', '个人介绍小动画', '星球粒子']
const filmCases = [...featuredEffects.map((title) => localWorks.effects.find((item) => item.title === title)).filter(Boolean), ...localWorks.effects.filter((item) => !featuredEffects.includes(item.title))].map((item) => ({ title: item.title, meta: item.meta, image: item.type === 'image' ? item.src : null, video: item.type === 'video' ? item.src : null }))

export const caseStudies = {
  posters: {
    number: '03',
    label: '海报设计 / POSTER DESIGN',
    title: 'Images that stay with you.',
    intro: 'Campaign images, editorial fragments, and visual systems built to hold attention a little longer.',
    mode: 'image',
    items: localWorks.posters.map((item) => ({ title: item.title, meta: item.meta, tags: tagsFor(item, '海报设计'), image: item.src })),
  },
  illustration: {
    number: '04',
    label: '插画设计 / ILLUSTRATION',
    title: 'Let the image breathe.',
    intro: 'A visual language built from atmosphere, texture, colour, and a little beautiful friction.',
    mode: 'image',
    items: localWorks.illustration.map((item, i) => ({ title: item.title, meta: `Visual world / ${String(i + 1).padStart(2, '0')}`, tags: tagsFor(item, '插画设计'), image: item.src })),
  },
  composition: {
    number: '05',
    label: '平面构成 / GRAPHIC COMPOSITION',
    title: 'The space between us.',
    intro: 'Studies in distance, rhythm, and the graphic tension between a gesture and its echo.',
    mode: 'image',
    items: localWorks.composition.map((item, i) => ({ title: item.title, meta: `Composition / ${String(i + 1).padStart(2, '0')}`, tags: tagsFor(item, '平面构成'), image: item.src })),
  },
  aplus: {
    number: '06',
    label: '亚马逊 A+ / AMAZON A+',
    title: 'Make the ordinary desired.',
    intro: 'Product stories designed to earn a second look, and a place in the cart.',
    mode: 'image',
    items: localWorks.aplus.map((item, i) => ({ title: item.title, meta: `A+ system / ${String(i + 1).padStart(2, '0')}`, tags: tagsFor(item, '亚马逊 A+'), image: item.src })),
  },
  video: {
    number: '07',
    label: 'AI 视频 / AI VIDEO',
    title: 'Design in motion.',
    intro: 'AI-assisted moving image studies made for atmosphere, rhythm, and a strong first frame.',
    mode: 'video',
    items: localWorks.aiVideo.map((item, i) => ({ title: item.title, meta: `${item.meta?.split(' / ')[0] || 'AI video'} / ${String(i + 1).padStart(2, '0')}`, tags: tagsFor(item, 'AI 视频'), image: null, video: item.src })),
  },
  effects: {
    number: '08',
    label: '传统影视和特效合成展示 / FILM & VFX',
    title: 'Make magic practical.',
    intro: 'Compositing, matte painting, and impossible rooms for brands with somewhere else to go.',
    mode: 'video',
    items: filmCases.map((item) => ({ ...item, tags: tagsFor(item, '传统影视和特效') })),
  },
}
