import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, CircleArrowOutUpRight, Mail, Menu, MoveRight, Search, X } from 'lucide-react'
import { media, posters, illustrationSlides, aPlus, videoReels, caseStudies } from './data/portfolio'
import { localWorks } from './data/works'

function SectionLabel({ number, children, className = '' }) {
  return <div className={`section-label ${className}`.trim()}><span>{number}</span><i />{children}</div>
}

function MediaThumb({ src, poster, alt, autoPlay = true }) {
  const videoRef = useRef(null)
  const handleEnter = () => { const video = videoRef.current; if (video) { video.currentTime = 0; video.play().catch(() => {}) } }
  const handleLeave = () => { const video = videoRef.current; if (video && !autoPlay) { video.pause(); video.currentTime = 0 } }
  return src?.toLowerCase().endsWith('.mp4') ? <video ref={videoRef} src={src} poster={poster} muted loop autoPlay={autoPlay} playsInline preload={autoPlay ? 'auto' : 'metadata'} aria-label={alt} onMouseEnter={handleEnter} onMouseLeave={handleLeave} /> : <img src={src} alt={alt} />
}

function Nav() {
  const [open, setOpen] = useState(false)
  const jump = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false) }
  return <header className="nav">
    <button className="brand" onClick={() => jump('top')} aria-label="回到首页">ZHOU<span> / </span>KANG</button>
    <div className={`nav-links ${open ? 'is-open' : ''}`}>
      <button onClick={() => jump('about')}>About</button><button onClick={() => jump('work')}>Selected work</button><button onClick={() => jump('contact')}>Contact</button>
    </div>
    <button className="nav-menu" onClick={() => setOpen(!open)} aria-label="打开导航菜单">{open ? <X size={18} /> : <Menu size={18} />}</button>
  </header>
}

function HeroCanvasArt() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return undefined
    const ctx = canvas.getContext('2d')
    const drawCross = (x, y, size, color) => { ctx.strokeStyle = color; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x - size, y); ctx.lineTo(x + size, y); ctx.moveTo(x, y - size); ctx.lineTo(x, y + size); ctx.stroke() }
    const drawLamp = (x, y, scale) => { const cone = ctx.createRadialGradient(x, y + 8 * scale, 1, x, y + 46 * scale, 42 * scale); cone.addColorStop(0, 'rgba(238,235,229,.15)'); cone.addColorStop(1, 'rgba(238,235,229,0)'); ctx.fillStyle = cone; ctx.beginPath(); ctx.moveTo(x - 35 * scale, y + 55 * scale); ctx.lineTo(x + 35 * scale, y + 55 * scale); ctx.lineTo(x + 10 * scale, y + 5 * scale); ctx.lineTo(x - 10 * scale, y + 5 * scale); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(220,218,213,.5)'; ctx.fillRect(x - 7 * scale, y, 14 * scale, 4 * scale); ctx.strokeStyle = 'rgba(220,218,213,.35)'; ctx.beginPath(); ctx.moveTo(x, y - 24 * scale); ctx.lineTo(x, y); ctx.stroke() }
    const drawGlobe = (x, y, width, height) => { ctx.strokeStyle = 'rgba(231,228,223,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x, y, width * .55, height, 0, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.ellipse(x, y, width * .22, height, 0, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - width, y); ctx.lineTo(x + width, y); ctx.moveTo(x, y - height); ctx.lineTo(x, y + height); ctx.stroke() }
    const drawBars = (x, y, count, width, height, gap, color) => { ctx.fillStyle = color; for (let i = 0; i < count; i += 1) ctx.fillRect(x + i * (width + gap), y, width, height) }
    const draw = () => {
      const rect = host.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(rect.width * dpr); canvas.height = Math.floor(rect.height * dpr); canvas.style.width = `${rect.width}px`; canvas.style.height = `${rect.height}px`; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, rect.width, rect.height)
      const w = rect.width; const h = rect.height
      ctx.strokeStyle = 'rgba(255,255,255,.035)'; ctx.lineWidth = 1
      for (let x = 0; x < w; x += 72) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke() }
      for (let y = 0; y < h; y += 72) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke() }
      drawLamp(w * .25, 7, Math.max(.75, w / 1500)); drawLamp(w * .75, 7, Math.max(.75, w / 1500)); drawGlobe(w * .5, h * .205, Math.min(56, w * .045), 22)
      drawCross(w * .026, h * .2, 18, 'rgba(231,228,223,.42)'); drawCross(w * .965, h * .69, 18, 'rgba(231,228,223,.36)')
      drawBars(w * .025, h - 82, 22, 3, 47, 5, 'rgba(231,228,223,.78)')
      ctx.strokeStyle = 'rgba(231,228,223,.45)'; ctx.beginPath(); ctx.arc(w * .25, h - 78, 42, 0, Math.PI * 2); ctx.stroke(); drawCross(w * .25, h - 78, 51, 'rgba(231,228,223,.35)')
      const fadeX = w * .72; const fadeY = h - 72; for (let i = 0; i < 12; i += 1) { ctx.fillStyle = `rgba(231,228,223,${.82 - i * .065})`; ctx.fillRect(fadeX + i * 9, fadeY, 6, 12) }
      ctx.fillStyle = 'rgba(231,228,223,.75)'; const px = w * .95; const py = h * .075; [[0, 0], [22, 0], [0, 22], [22, 22], [44, 0], [44, 22]].forEach(([dx, dy]) => ctx.fillRect(px + dx, py + dy, 13, 13))
    }
    const observer = new ResizeObserver(draw); observer.observe(host); draw(); return () => observer.disconnect()
  }, [])
  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
}

function Hero() {
  const [cursor, setCursor] = useState({ x: 50, y: 48 })
  const [isRevealing, setIsRevealing] = useState(false)
  const [heroCursor, setHeroCursor] = useState({ x: 50, y: 50 })
  const [isHeroHovered, setIsHeroHovered] = useState(false)
  const onHeroMove = (event) => { const r = event.currentTarget.getBoundingClientRect(); setHeroCursor({ x: ((event.clientX - r.left) / r.width) * 100, y: ((event.clientY - r.top) / r.height) * 100 }) }
  const onMove = (event) => { const r = event.currentTarget.getBoundingClientRect(); const x = ((event.clientX - r.left) / r.width) * 100; const y = ((event.clientY - r.top) / r.height) * 100; setCursor({ x, y }); setIsRevealing(Math.abs(x - 50) < 18 && Math.abs(y - 53) < 16) }
  return <section id="top" className="hero" onMouseEnter={() => setIsHeroHovered(true)} onMouseMove={onHeroMove} onMouseLeave={() => setIsHeroHovered(false)}>
    <div className="hero-noise" />
    <div className={`hero-cursor-glow ${isHeroHovered ? 'is-active' : ''}`} style={{ left: `${heroCursor.x}%`, top: `${heroCursor.y}%` }} />
    <HeroCanvasArt />
    <div className="hero-topline"><span className="hero-top-block">AI<br /><strong>DESIGNER</strong></span><span className="hero-top-block">ONLY<br /><strong>GOD</strong></span></div>
    <div className="hero-center-copy"><strong>AI DESIGNER</strong><p>MAKE IDEAS <i>REAL</i></p><small>VISUAL SYSTEMS FOR PEOPLE<br />WHO LOOK CLOSER.</small></div>
    <div className="hero-wordmark" aria-hidden="true">PORTFOLIO</div>
    <div className="hero-person-aura" aria-hidden="true" />
    <div className="hero-person-occluder" aria-hidden="true" />
    <div className="hero-image-wrap" onMouseMove={onMove} onMouseLeave={() => setIsRevealing(false)}>
      <img className="hero-person hero-person-blind" src={media.heroBlind} alt="正面黑白雕像与红色布条人物素材" />
      <div className={`reveal-portrait ${isRevealing ? 'is-active' : ''}`} style={{ clipPath: `circle(${isRevealing ? 126 : 0}px at ${cursor.x}% ${cursor.y}%)`, WebkitMaskImage: `radial-gradient(circle 150px at ${cursor.x}% ${cursor.y}%, #000 34%, transparent 76%)`, maskImage: `radial-gradient(circle 150px at ${cursor.x}% ${cursor.y}%, #000 34%, transparent 76%)` }}><img src={media.heroUncovered} alt="去掉红色布条的正面人物素材" /></div>
      <div className={`hero-eye-hint ${isRevealing ? 'is-active' : ''}`} style={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}><span>LOOK CLOSER</span></div>
    </div>
    <div className="hero-aside"><span>01</span><p>IMAGE<br />/ IDENTITY<br />/ MOTION</p></div>
    <div className="hero-bottomline"><div className="barcode" /><span>DESIGN<br />IS THINKING</span><span className="focus-mark">FOCUS<br />ON<br />VALUE</span><span className="level-mark"><b>LEVEL<br /><strong>UP.</strong></b><i /></span><span>LESS DISTRACTION<br />MORE CREATION</span></div>
  </section>
}

function About() {
  const profileFacts = [
    ['专业', '数字媒体技术'],
    ['院校', '广东农工商职业技术学院'],
    ['出生年月', '2003.11'],
    ['籍贯', '湖南衡阳'],
    ['政治面貌', '中共党员'],
    ['微信号', 'wxid_9pdpshpojw0a21'],
  ]
  return <section id="about" className="about section-pad">
    <div className="content-grid"><div><SectionLabel number="01">个人信息 / Profile</SectionLabel><h2>周康<br /><i>ZHOU KANG.</i></h2></div><div className="about-intro"><p className="lede">AI 视觉设计师、影视创作者与电商运营。</p><p>数字媒体技术专业毕业，兼具影视视觉设计、AI 内容生产与电商运营经验。擅长将提示词、工作流与设计工具沉淀为可复用方法，并以作品能否落地、服务业务作为判断标准。</p><a className="text-link" href="mailto:2246921198@qq.com">2246921198@qq.com <ArrowUpRight size={15} /></a></div></div>
    <div className="profile-facts">{profileFacts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
    <div className="about-stats"><div><strong>3,184</strong><span>张图片<br />独立交付</span></div><div><strong>982</strong><span>项视频<br />制作交付</span></div><div><strong>0.57%</strong><span>专业成绩<br />保持第一</span></div><div className="stat-note">国家级 3 项 / 省级 8 项<br />国家奖学金 / 优秀毕业生</div></div>
  </section>
}

function Timeline() {
  const jobs = [
    ['2026.05-2026.07.17', '骏弘科技技术有限公司 / 运营', '转正考核首月前 15 天完成“3 个月累计纯利润 10 万元”指标。负责独立站店铺装修与页面落地、AI 产品迁移复刻、数据分析及 Facebook 投流转化。'],
    ['2025.11-2026.05', '骏弘科技技术有限公司 / AI视觉设计师', '独立完成 3,184 张图片与 982 项视频制作，覆盖电商视觉、宣传素材及多场景内容。搭建个人提示词库、工作流 Skills 与 AI 设计画布，沉淀可复用生产流程。'],
    ['实习经历 / 01', '爱纳影视传媒有限公司 / 影视后期编导', '结合 AI 技术与 Premiere、After Effects、DaVinci Resolve、剪映完成视频策划制作，涵盖 AI 卡通形象定制、企业宣传片、应急急救宣传片与 AI 短视频。'],
    ['实习经历 / 02', '志会嘉科技有限公司 / AI电商美工', '使用 ComfyUI 等 AI 与设计工具，制作亚马逊旗舰店主页、批量 A+ 套图、产品及模特场景图，并完成电商产品投流广告。'],
  ]
  const awards = ['第十四届“挑战杯”秦创原中国大学生创业计划竞赛国家金奖', '广东省数字媒体技术职业技能大赛融媒体策划与制作省级二等奖', '广东省蓝桥杯视觉设计二等奖', '广东省互联网+银奖', '国家奖学金、优秀毕业生']
  return <section className="timeline section-pad"><div className="timeline-head"><SectionLabel number="02">工作与实习 / Experience</SectionLabel><p>AI 视觉、影视制作<br />与电商运营的完整实践。</p></div><div className="timeline-line" />
    <div className="jobs">{jobs.map(([year, role, copy], i) => <article className="job" key={role}><span className="job-dot" /><span className="job-year">{year}</span><h3>{role}</h3><p>{copy}</p><span className="job-no">0{i + 1}</span></article>)}</div>
    <div className="honors"><SectionLabel number="A">竞赛与荣誉 / Honors</SectionLabel><div className="honors-list">{awards.map((award, i) => <div key={award}><span>0{i + 1}</span><p>{award}</p></div>)}</div></div>
  </section>
}

function PosterGallery({ onOpen, onViewCases }) {
  const [active, setActive] = useState(posters.length)
  const [paused, setPaused] = useState(false)
  const [metrics, setMetrics] = useState({ width: 210, gap: 19 })
  useEffect(() => {
    const updateMetrics = () => { const mobile = window.innerWidth <= 760; setMetrics({ width: mobile ? window.innerWidth * .22 : Math.min(window.innerWidth * .15, 210), gap: mobile ? 5 : 19 }) }
    updateMetrics(); window.addEventListener('resize', updateMetrics); return () => window.removeEventListener('resize', updateMetrics)
  }, [])
  useEffect(() => { const id = setInterval(() => { if (!paused) setActive((v) => (v >= posters.length * 2 - 1 ? posters.length : v + 1)) }, 4200); return () => clearInterval(id) }, [paused])
  const loopPosters = [...posters, ...posters, ...posters]
  const trackOffset = active * (metrics.width + metrics.gap) + metrics.width / 2
  return <section className="posters section-pad" id="work"><div className="section-heading"><SectionLabel number="03">海报设计 / POSTER DESIGN</SectionLabel><h2>Images that<br /><i>stay with you.</i></h2><p>Five visual studies in tension, texture, and the useful pause.</p></div><div className="poster-arc poster-carousel"><div className="poster-track" style={{ transform: `translateX(-${trackOffset}px)` }}>{loopPosters.map((poster, i) => <button className={`poster poster-${(i % posters.length) + 1} ${i === active ? 'is-centered' : ''}`} key={`${poster.title}-${i}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onClick={() => { setActive(posters.length + (i % posters.length)); onOpen(poster.image, poster.title) }}><div className={`poster-image poster-${poster.color}`}><img src={poster.image} alt={poster.title} /></div><span>{poster.type}</span><strong>{poster.title}</strong><ArrowUpRight size={14} /></button>)}</div><button className="poster-more" onClick={() => onViewCases('posters')} aria-label="查看更多海报案例"><strong>查看更多案例</strong><small>VIEW MORE CASES</small><ArrowUpRight size={14} /></button></div></section>
}

function Illustration({ onOpen, onViewCases }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => { const id = setInterval(() => { if (!paused) setActive((v) => (v + 1) % illustrationSlides.length) }, 4200); return () => clearInterval(id) }, [paused])
  const slide = illustrationSlides[active]
  return <section className="illustration section-pad"><div className="illus-frame"><div className="illus-stack">{illustrationSlides.map((item, i) => <button className={`illus-card card-${i} ${active === i ? 'active' : ''}`} key={item.title} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onClick={() => { setActive(i); onOpen(item.image, item.title) }}><img src={item.image} alt={item.title} /></button>)}</div><div className="illus-copy"><SectionLabel number="04">插画设计 / ILLUSTRATION</SectionLabel><div className="illus-copy-text" key={active}><span className="illus-kicker">{slide.kicker}</span><h2>{slide.title}</h2><p>{slide.body}</p></div><div className="illus-controls"><button onClick={() => setActive((active + illustrationSlides.length - 1) % illustrationSlides.length)} aria-label="上一张"><ChevronLeft size={16} /></button><span>0{active + 1} / 0{illustrationSlides.length}</span><button onClick={() => setActive((active + 1) % illustrationSlides.length)} aria-label="下一张"><ChevronRight size={16} /></button><button className="illus-more" onClick={() => onViewCases('illustration')} aria-label="查看更多插画案例"><strong>查看更多案例</strong><small>VIEW MORE CASES</small><ArrowUpRight size={14} /></button></div></div></div></section>
}

function Composition({ onOpen, onViewCases }) {
  const [wrapProgress, setWrapProgress] = useState(0)
  const compositionWorks = localWorks.composition
  const clamp = (value) => Math.min(1, Math.max(0, value))
  const onCompositionWheel = (event) => {
    const maxScrollProgress = .8
    const next = Math.min(maxScrollProgress, Math.max(0, wrapProgress + event.deltaY / 900))
    const shouldHoldPage = (event.deltaY > 0 && wrapProgress < maxScrollProgress) || (event.deltaY < 0 && wrapProgress > 0)
    if (shouldHoldPage) event.preventDefault()
    setWrapProgress(next)
  }
  const displayProgress = clamp(wrapProgress / .8)
  const detailStyle = (start, duration) => {
    const progress = clamp((displayProgress - start) / duration)
    const edge = Math.round(progress * 100)
    return { opacity: progress, transform: `translateY(${(1 - progress) * 18}px) scale(${.92 + progress * .08})`, filter: `blur(${(1 - progress) * 2.8}px)`, WebkitMaskImage: `linear-gradient(to bottom, #000 0%, #000 ${Math.max(0, edge - 28)}%, rgba(0,0,0,.72) ${Math.max(0, edge - 10)}%, transparent ${Math.min(100, edge + 24)}%, transparent 100%)`, maskImage: `linear-gradient(to bottom, #000 0%, #000 ${Math.max(0, edge - 28)}%, rgba(0,0,0,.72) ${Math.max(0, edge - 10)}%, transparent ${Math.min(100, edge + 24)}%, transparent 100%)` }
  }
  return <section className={`composition section-pad ${displayProgress > 0.02 ? 'is-wrapping' : ''} ${displayProgress > 0.98 ? 'is-wrapped' : ''}`} onWheel={onCompositionWheel}>
    <SectionLabel number="05">平面构成 / GRAPHIC COMPOSITION</SectionLabel>
    <div className="composition-stage">
      <img className="composition-state composition-state-loose" src={media.compositionLoose} alt="双手与松散线条的平面构成" style={{ opacity: 1 - displayProgress }} />
      <img className="composition-state composition-state-wrapped" src={media.compositionWrapped} alt="线条缠绕双手的平面构成" style={{ opacity: displayProgress > 0 ? 1 : 0, filter: `blur(${(1 - displayProgress) * 2.2}px)`, WebkitMaskImage: `linear-gradient(to bottom, #000 0%, #000 ${Math.max(0, displayProgress * 100 - 28)}%, rgba(0,0,0,.72) ${Math.max(0, displayProgress * 100 - 10)}%, transparent ${Math.min(100, displayProgress * 100 + 24)}%, transparent 100%)`, maskImage: `linear-gradient(to bottom, #000 0%, #000 ${Math.max(0, displayProgress * 100 - 28)}%, rgba(0,0,0,.72) ${Math.max(0, displayProgress * 100 - 10)}%, transparent ${Math.min(100, displayProgress * 100 + 24)}%, transparent 100%)` }} />
      <div className="composition-detail detail-title" style={detailStyle(0, .18)}><h3>THE SPACE<br />BETWEEN<br />US</h3></div>
      <div className="composition-detail detail-moments" style={detailStyle(.12, .24)}><span>///</span><span>moments<br />of<br />clarity</span></div>
      <button className="composition-detail composition-image detail-eye" style={detailStyle(.24, .25)} onClick={() => onOpen(media.compositionHomeStudyOne, '平面构成图片 1')} aria-label="放大查看平面构成图片"><img src={media.compositionHomeStudyOne} alt="平面构成图片 1" /></button>
      <button className="composition-detail composition-image detail-cloud" style={detailStyle(.33, .24)} onClick={() => onOpen(compositionWorks[1]?.src, compositionWorks[1]?.title || 'Composition / Study 02')} aria-label="放大查看平面构成图片"><img src={compositionWorks[1]?.src} alt={compositionWorks[1]?.title || '平面构成作品二'} /></button>
      <button className="composition-detail composition-image detail-poster" style={detailStyle(.48, .25)} onClick={() => onOpen(compositionWorks[2]?.src, compositionWorks[2]?.title || 'Composition / Study 03')} aria-label="放大查看平面构成图片"><img src={compositionWorks[2]?.src} alt={compositionWorks[2]?.title || '平面构成作品三'} /><span>GRAPHIC STUDY</span></button>
      <button className="composition-detail composition-image detail-portrait" style={detailStyle(.54, .25)} onClick={() => onOpen(compositionWorks[3]?.src, compositionWorks[3]?.title || 'Composition / Study 04')} aria-label="放大查看平面构成图片"><img src={compositionWorks[3]?.src} alt={compositionWorks[3]?.title || '平面构成作品四'} /></button>
      <div className="composition-detail detail-fragment" style={detailStyle(.58, .24)}><h3>frag·ment</h3><span>[frag·mant]<br />noun</span><i /><p>a small part<br />broken off<br />from something<br />larger.</p></div>
      <div className="composition-detail detail-connection" style={detailStyle(.7, .22)}>c<br />o<br />n<br />n<br />e<br />c<br />t<br />i<br />o<br />n</div>
    </div>
    <div className="composition-footer"><p>A study in the pull between<br />the thing and the feeling.</p><button className="outline-button" onClick={() => onViewCases('composition')}><strong>查看更多案例</strong><small>VIEW MORE CASES</small><ArrowUpRight size={15} /></button></div>
  </section>
}

function APlus({ onOpen, onViewCases }) {
  return <section className="aplus section-pad"><div className="aplus-head"><div><SectionLabel number="06">亚马逊 A+ / AMAZON A+</SectionLabel><h2>Make the<br /><i>ordinary desired.</i></h2></div><p>Product stories designed to earn a second look, and a place in the cart.</p></div><div className="aplus-grid">{aPlus.map((item) => <article className="aplus-card" key={item.tag}><button className="aplus-image-button" onClick={() => onOpen(item.image, item.title)} aria-label={`放大查看${item.title}`}><img src={item.image} alt={item.title} /></button><div><span>{item.tag}</span><h3>{item.title}</h3><ArrowUpRight size={15} /></div></article>)}</div><button className="wide-button" onClick={() => onViewCases('aplus')}><span>查看更多案例 / VIEW MORE CASES</span><MoveRight size={17} /></button></section>
}

function VideoShowcase({ onOpen, onViewCases }) {
  const [active, setActive] = useState(videoReels.length)
  const [paused, setPaused] = useState(false)
  const loopReels = [...videoReels, ...videoReels, ...videoReels]
  useEffect(() => { const id = setInterval(() => { if (!paused) setActive((v) => (v >= videoReels.length * 2 - 1 ? videoReels.length : v + 1)) }, 4200); return () => clearInterval(id) }, [paused])
  return <section className="video-showcase"><div className="video-backdrop" /><video className="video-backdrop-video" src={media.video} autoPlay muted loop playsInline /><div className="video-overlay" /><div className="video-copy"><SectionLabel number="07">AI 视频 / AI VIDEO</SectionLabel><h2>DESIGN<br /><i>IN MOTION.</i></h2></div><div className="video-meta"><span>DIRECTOR / MOTION DESIGNER</span><span>2024-2026</span></div><div className="reel-rail"><div className="reel-track" style={{ '--reel-shift': `${active * 126}px`, '--reel-shift-mobile': `${active * 91}px` }}>{loopReels.map((reel, i) => <button className={i === active ? 'active' : ''} key={`${reel.title}-${i}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onClick={() => { setActive(videoReels.length + (i % videoReels.length)); onOpen(reel.video, reel.title, 'video') }}><MediaThumb src={reel.video} alt={reel.title} autoPlay={i === active} /><span>{reel.title}</span></button>)}</div><button className="reel-more" onClick={() => onViewCases('video')} aria-label="查看更多视频案例"><span className="reel-more-art" aria-hidden="true"><i /><i /><i /><i /></span><strong>查看更多案例</strong><small>VIEW MORE CASES</small><ArrowUpRight size={14} /></button></div></section>
}

function Effects({ onOpen, onViewCases }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const featuredTitles = ['斗破苍穹文字', '科技芯片', '个人介绍小动画', '星球粒子']
  const items = featuredTitles.map((title) => localWorks.effects.find((item) => item.title === title)).filter(Boolean).map((item) => ({ name: item.title, image: item.type === 'image' ? item.src : null, video: item.type === 'video' ? item.src : null }))
  useEffect(() => { const id = setInterval(() => { if (!paused) setActive((v) => (v + 1) % items.length) }, 4200); return () => clearInterval(id) }, [items.length, paused])
  return <section className="effects section-pad"><div className="effects-copy"><SectionLabel number="08" className="section-label-wide">传统影视和特效合成展示 / FILM & VFX</SectionLabel><h2>Make<br /><i>magic</i> practical.</h2><p>Compositing, matte painting, and impossible rooms for brands with somewhere else to go.</p><button className="outline-button effect-more" onClick={() => onViewCases('effects')} aria-label="查看更多影视特效案例"><strong>查看更多案例</strong><small>VIEW MORE CASES</small><ArrowUpRight size={15} /></button></div><div className="effects-stack">{items.map((item, i) => <button key={`${item.name}-${i}`} className={`effect-card effect-${i} ${active === i ? 'active' : ''}`} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onClick={() => { setActive(i); onOpen(item.video || item.image, item.name, item.video ? 'video' : 'image') }}><MediaThumb src={item.video || item.image} alt={item.name} autoPlay={i === active} /><span>{item.name}</span></button>)}</div></section>
}

function Contact() {
  return <footer id="contact" className="contact section-pad"><div className="contact-head"><div><SectionLabel number="09">联系方式 / CONTACT</SectionLabel><div className="contact-mark">LET'S MAKE<br /><i>ideas</i><br />happen.</div></div><p className="contact-intro">AI 视觉设计、影视制作<br />与电商视觉合作。</p></div><div className="contact-grid"><div className="contact-item"><span>WECHAT / 微信号</span><p>wxid_9pdpshpojw0a21</p></div><div className="contact-item"><span>EMAIL / 邮箱</span><a href="mailto:2246921198@qq.com">2246921198@qq.com <Mail size={16} /></a></div><div className="contact-item"><span>ADDRESS / 地址</span><p>深圳 / Remote</p></div><div className="contact-item"><span>AVAILABLE / 合作方向</span><p>视觉系统 · AI 内容 · 电商视觉</p></div></div><div className="contact-footerline"><span>ZHOU KANG / VISUAL DESIGNER</span><span>© 2026 周康</span></div></footer>
}

function CaseStudy({ caseId, onBack, onOpen }) {
  const study = caseStudies[caseId] || caseStudies.posters
  const featured = study.items.slice(0, 5)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('全部')
  const [carouselPaused, setCarouselPaused] = useState(false)
  const allTags = ['全部', ...new Set(study.items.flatMap((item) => item.tags || []).filter(Boolean))]
  const normalizedQuery = query.trim().toLowerCase()
  const filteredItems = study.items.filter((item) => {
    const searchable = [item.title, item.meta, ...(item.tags || [])].join(' ').toLowerCase()
    return (!normalizedQuery || searchable.includes(normalizedQuery)) && (activeTag === '全部' || item.tags?.includes(activeTag))
  })
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    document.title = `${study.label} / ZHOU KANG`
    return () => { document.title = 'VOID / AI DESIGNER' }
  }, [caseId, study.label])
  useEffect(() => {
    const id = setInterval(() => { if (!carouselPaused) setCarouselIndex((value) => (value + 1) % featured.length) }, 4800)
    return () => clearInterval(id)
  }, [featured.length, carouselPaused])
  const moveCarousel = (direction) => setCarouselIndex((value) => (value + featured.length + direction) % featured.length)
  return <div className={`case-page case-page-${caseId}`}>
    <header className="case-nav">
      <button className="case-brand" onClick={onBack} aria-label="返回首页">ZHOU <span>/</span> KANG</button>
      <div className="case-nav-meta"><span>SELECTED WORK</span><span>{study.number} / 08</span></div>
      <button className="case-back-top" onClick={onBack}><ChevronLeft size={15} /> 返回首页 <small>BACK HOME</small></button>
    </header>
    <main>
      <section className={`case-carousel case-carousel-${caseId}`}>
        <div className="case-intro-compact"><div><SectionLabel number={study.number}>{study.label}</SectionLabel><span className="case-overline">SELECTED CASES / ARCHIVE</span><h1>{study.title}</h1><p>{study.intro}</p></div><div className="case-intro-mark"><strong>{study.number}</strong><span>CURATED<br />WORKS</span></div></div>
        <div className="case-carousel-head"><span>FEATURED / 05</span><div className="case-carousel-controls"><button onClick={() => moveCarousel(-1)} aria-label="上一组精选作品"><ChevronLeft size={16} /></button><span>0{carouselIndex + 1} / 05</span><button onClick={() => moveCarousel(1)} aria-label="下一组精选作品"><ChevronRight size={16} /></button></div></div>
         <div className="case-carousel-stage">{featured.map((item, i) => { const position = (i - carouselIndex + featured.length) % featured.length; return <button className={`case-slide case-slide-${i}`} data-position={position} key={`${item.title}-${i}`} onMouseEnter={() => setCarouselPaused(true)} onMouseLeave={() => setCarouselPaused(false)} onClick={() => onOpen(item.video || item.image, item.title, item.video ? 'video' : 'image')} aria-label={`打开精选作品 ${item.title}`}><MediaThumb src={item.video || item.image} alt={item.title} autoPlay={position === 0 && Boolean(item.video)} /><span className="case-slide-shade" /><span className="case-slide-info"><small>{item.meta}</small><strong>{item.title}</strong></span><span className="case-slide-tags">{(item.tags || []).slice(0, 2).map((tag) => <em key={tag}>{tag}</em>)}</span></button> })}</div>
      </section>
      <section className={`case-gallery case-gallery-${study.mode}`}>
        <div className="case-gallery-head"><span>ARCHIVE / 2024—2026</span><span>{String(filteredItems.length).padStart(2, '0')} / {String(study.items.length).padStart(2, '0')} WORKS</span></div>
        <div className="case-gallery-tools"><label className="case-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索作品 / SEARCH WORKS" aria-label="搜索作品" /></label><div className="case-tags">{allTags.map((tag) => <button className={activeTag === tag ? 'active' : ''} key={tag} onClick={() => setActiveTag(tag)}>{tag}</button>)}</div></div>
        {filteredItems.length ? <div className="case-grid">{filteredItems.map((item, i) => <button className={`case-media case-media-${i % 6}`} key={`${item.title}-${i}`} onClick={() => onOpen(item.video || item.image, item.title, item.video ? 'video' : 'image')} aria-label={`打开${item.title}`}>
          <MediaThumb src={item.video || item.image} alt={item.title} autoPlay={false} />{item.video && <span className="case-media-play">PLAY FILM</span>}
          <span className="case-media-shade" /><span className="case-media-info"><small>{item.meta}</small><strong>{item.title}</strong><ArrowUpRight size={16} /></span><span className="case-media-tags">{(item.tags || []).map((tag) => <em key={tag}>{tag}</em>)}</span><span className="case-media-index">{String(i + 1).padStart(2, '0')}</span>
        </button>)}</div> : <div className="case-empty">NO MATCHING WORKS / 暂无匹配作品</div>}
      </section>
      <footer className="case-footer section-pad"><button className="case-footer-back" onClick={onBack}><ChevronLeft size={16} /> <span>返回作品展示</span><small>BACK TO SELECTED WORK</small></button><div><span>MORE TO EXPLORE</span><strong>保持好奇，继续向下。</strong></div></footer>
    </main>
  </div>
}

function Modal({ modal, onClose }) {
  if (!modal) return null
  return <div className="modal" role="dialog" aria-modal="true" onClick={onClose}><div className="modal-inner" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="关闭"><X size={20} /></button>{modal.type === 'video' ? <video src={modal.src} controls autoPlay /> : <img src={modal.src} alt={modal.label} />}<span>{modal.label}</span></div></div>
}

function getCaseId() {
  const match = window.location.pathname.match(/^\/cases\/([^/]+)/)
  return match && caseStudies[match[1]] ? match[1] : null
}

export default function App() {
  const [modal, setModal] = useState(null)
  const [caseId, setCaseId] = useState(() => getCaseId())
  const [pageCursor, setPageCursor] = useState({ x: 50, y: 50 })
  const [cursorTrail, setCursorTrail] = useState([])
  useEffect(() => { document.body.classList.toggle('modal-open', Boolean(modal)); return () => document.body.classList.remove('modal-open') }, [modal])
  useEffect(() => {
    const onPopState = () => { setCaseId(getCaseId()); setModal(null) }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])
  const onPageMove = (event) => {
    const next = { x: event.clientX, y: event.clientY }
    setPageCursor(next)
    setCursorTrail((trail) => [next, ...trail].slice(0, 9))
  }
  const openCase = (nextCaseId) => { window.history.pushState({ caseId: nextCaseId }, '', `/cases/${nextCaseId}`); setCaseId(nextCaseId); setModal(null); window.scrollTo({ top: 0, behavior: 'auto' }) }
  const closeCase = () => { window.history.pushState({}, '', '/'); setCaseId(null); setModal(null); window.scrollTo({ top: 0, behavior: 'auto' }) }
  const openMedia = (src, label, type = 'image') => setModal({ src, label, type })
  return <div className={`site-shell ${caseId ? 'case-shell' : ''}`} onMouseMove={onPageMove}><div className="page-cursor-trail" aria-hidden="true">{cursorTrail.map((point, index) => { const previous = cursorTrail[index - 1] || point; const distance = Math.hypot(previous.x - point.x, previous.y - point.y); const angle = Math.atan2(previous.y - point.y, previous.x - point.x) * 180 / Math.PI; return <span className="page-cursor-trail-line" key={`${point.x}-${point.y}-${index}`} style={{ left: point.x, top: point.y, width: Math.max(10, Math.min(125, distance * 2.4 * (1 - index * .08))), opacity: Math.max(.035, .42 - index * .045), transform: `translate(-100%, -50%) rotate(${angle}deg)` }} /> })}</div><div className="page-cursor-glow" style={{ left: pageCursor.x, top: pageCursor.y }} />{caseId ? <CaseStudy caseId={caseId} onBack={closeCase} onOpen={openMedia} /> : <><Nav /><main><Hero /><About /><Timeline /><PosterGallery onOpen={openMedia} onViewCases={openCase} /><Illustration onOpen={openMedia} onViewCases={openCase} /><Composition onOpen={openMedia} onViewCases={openCase} /><APlus onOpen={openMedia} onViewCases={openCase} /><VideoShowcase onOpen={openMedia} onViewCases={openCase} /><Effects onOpen={openMedia} onViewCases={openCase} /><Contact /></main></>}<Modal modal={modal} onClose={() => setModal(null)} /></div>
}
