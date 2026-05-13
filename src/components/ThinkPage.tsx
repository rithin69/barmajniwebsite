import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Particle canvas ───────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    const COUNT = 30, DIST = 130, DIST_SQ = DIST * DIST
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.2 + 0.4,
    }))
    let raf: number
    let active = true
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.fill()
      }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[j].x - pts[i].x, dy = pts[j].y - pts[i].y
        const dSq = dx * dx + dy * dy
        if (dSq < DIST_SQ) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `rgba(255,255,255,${0.1 * (1 - Math.sqrt(dSq) / DIST)})`
          ctx.lineWidth = 0.5; ctx.stroke()
        }
      }
      if (active) raf = requestAnimationFrame(draw)
    }
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight
      if (past && active) { active = false; cancelAnimationFrame(raf) }
      else if (!past && !active) { active = true; draw() }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    draw()
    return () => {
      active = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return <canvas ref={canvasRef} className="w-full h-full" />
}

// ── Data ──────────────────────────────────────────────────────────────────────

const CARDS = [
  {
    label: 'PRODUCT VISION',
    desc: 'Define a sharp digital product vision grounded in market reality. Barmajni aligns stakeholders, data and business goals to shape a winning product strategy.',
    items: [
      { title: 'Market Research', body: 'We analyse your market, competitors and benchmarks to reveal real opportunities. Our insights highlight gaps, trends and risks so you invest in features that create value from day one.' },
      { title: 'Stakeholder Interviews', body: 'We run structured interviews to surface conflicting priorities and hidden assumptions early, so alignment happens before development begins rather than during it.' },
      { title: 'Product Vision', body: 'Together we define a clear, inspiring product vision that connects user needs and business outcomes — your north star, guiding every strategic decision.' },
      { title: 'Product Strategy', body: 'We translate vision into an actionable strategy, with target audiences, positioning, value proposition and success metrics that link decisions directly to measurable business impact.' },
    ],
  },
  {
    label: 'PRODUCT DESIGN',
    desc: 'Turn strategy into user-centric experiences. Barmajni maps journeys, workflows and UX foundations that make your digital product intuitive and effective.',
    items: [
      { title: 'User Interviews', body: 'We talk directly with your users to uncover motivations, pain points and behaviours — ensuring features solve real problems instead of assumptions.' },
      { title: 'Workflows', body: 'We map every critical workflow so the product flows naturally for users, reducing friction and support overhead while increasing adoption.' },
      { title: 'User Journey', body: 'We chart the complete user journey from first awareness to deep engagement, identifying moments of delight and drop-off so we can optimise every touchpoint.' },
      { title: 'Technical Recommendations', body: 'Our team translates UX requirements into engineering-ready specs, so design and development stay in sync and nothing is lost in translation.' },
    ],
  },
  {
    label: 'PROTOTYPING',
    desc: 'Validate your ideas before you build them. We prototype, test and iterate until every interaction feels right and every feature earns its place.',
    items: [
      { title: 'Figma Prototyping', body: 'We build high-fidelity interactive prototypes that feel like the real product, enabling meaningful user testing and stakeholder sign-off before a line of code is written.' },
      { title: 'Visual Design Research', body: 'We explore visual directions grounded in brand, user expectations and industry context, so the final design system is both beautiful and functional.' },
      { title: 'User Testing', body: 'We run structured usability sessions with real users, capturing qualitative insight and behavioural data to validate assumptions and prioritise improvements.' },
      { title: 'Engineering Validations', body: 'We review prototypes with engineering early to flag technical risk, agree on feasibility and ensure the design is buildable within your timeline and budget.' },
    ],
  },
  {
    label: 'DELIVERY & PLANNING',
    desc: 'Bridge strategy and engineering with a clear, approved visual design and an actionable roadmap that keeps teams aligned and ships on time.',
    items: [
      { title: 'Visual Design Approval', body: 'We guide stakeholders through a structured approval process, ensuring the final design is signed off with confidence before handoff to engineering.' },
      { title: 'Roadmap', body: 'We produce a prioritised, phased roadmap that balances user value, business impact and engineering effort — a clear path from concept to launch.' },
      { title: 'Deliverables', body: 'We package all outputs — design files to documentation — into clean, engineering-ready deliverables so nothing slows down the build phase.' },
      { title: 'Milestones', body: 'We define clear milestones with success criteria, so every sprint has a goal, every release has a target and progress is measurable at every stage.' },
    ],
  },
]

const TICKER_TEXT = 'Ideas to a product plan  ·  '

// ── Component ─────────────────────────────────────────────────────────────────
interface ThinkPageProps { onBack?: () => void }

export default function ThinkPage({ onBack }: ThinkPageProps) {
  const [expanded, setExpanded] = useState<number | null>(null)

  const tickerText = TICKER_TEXT.repeat(8)

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">

      {/* Fixed background — video + particles overlay */}
      <div className="fixed top-0 left-0 w-screen z-0" style={{ height: '100vh', pointerEvents: 'none' }}>
        {/* Background video */}
        <video
          src="/think.mp4"
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Dark overlay so text stays readable */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
        {/* Particle canvas on top */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <ParticleCanvas />
        </div>
      </div>

      {/* Navbar — same as home, scrolls with page */}
      <nav className="relative z-10 px-6 py-5" style={{ marginTop: '16px' }}>
        <div
          className="liquid-glass rounded-full flex items-center justify-between"
          style={{ maxWidth: '960px', margin: '0 auto', padding: '10px 24px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <img
                src="/logo.png"
                alt="Barmajni"
                style={{ width: 28, height: 28, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
              />
              <span className="text-white font-semibold" style={{ fontSize: 17 }}>Barmajni</span>
            </button>
            <div className="hidden md:flex" style={{ gap: '28px' }}>
              <button className="text-white text-sm font-medium bg-transparent border-none cursor-pointer" style={{ opacity: 1 }}>Think</button>
              <button className="text-white/80 hover:text-white text-sm font-medium bg-transparent border-none cursor-pointer transition-colors">Design</button>
              <button className="text-white/80 hover:text-white text-sm font-medium bg-transparent border-none cursor-pointer transition-colors">Develop</button>
              <button onClick={onBack} className="text-white/80 hover:text-white text-sm font-medium bg-transparent border-none cursor-pointer transition-colors">About Us</button>
            </div>
          </div>
          <button
            className="liquid-glass rounded-full text-white text-sm font-medium cursor-pointer hover:bg-white/10 transition-colors"
            style={{ padding: '8px 20px' }}
          >
            Contact Us
          </button>
        </div>
      </nav>

      {/* ── Content ── */}
      <div className="relative z-10">

        {/* HERO */}
        <section className="min-h-screen flex flex-col justify-start pt-24 pb-0" style={{ paddingLeft: '3vw', background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.9) 100%)' }}>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 300, fontSize: 'clamp(2rem, 4.5vw, 4rem)', lineHeight: 1.15, letterSpacing: '-0.01em' }}
          >
            Making something<br />that people want.
          </motion.h1>
        </section>

        {/* WHITE SECTION */}
        <main className="bg-white text-black cursor-default">

          {/* Product Consulting */}
          <div className="flex justify-end max-w-4xl mx-auto px-4 py-10 lg:pt-20 lg:pb-18">
            <div className="w-full">
              <motion.p
                className="text-sm opacity-50 mb-4"
                style={{ fontFamily: "'Courier New', monospace" }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 0.5, y: 0 }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                PRODUCT CONSULTING
              </motion.p>
              <div className="text-4xl mt-4 tracking-[0.03rem] leading-[120%] sm:leading-[140%]">
                <p>
                  {`Choose Barmajni to turn scattered ideas, market insight and stakeholder needs into a sharp, validated product strategy that reduces risk and maximizes business impact.`.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 + i * 0.035 }}
                      style={{ display: 'inline-block', marginRight: '0.28em' }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          {/* Full-width video */}
          <div className="relative">
            <video
              src="/thinkpart2.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full object-cover object-center lg:mt-10"
              style={{ maxHeight: '80dvh', display: 'block' }}
            />
          </div>

          {/* Unleash split */}
          <div className="flex flex-col md:flex-row justify-between max-w-6xl mx-auto px-4 pt-10 lg:pt-20 pb-4 lg:pb-18 gap-2 lg:gap-8">
            <p className="w-full md:w-1/2 text-5xl mb-4 max-w-xl" style={{ fontFamily: "'Courier New', monospace" }}>Unleash Your Product's Potential</p>
            <div className="w-full md:w-1/2 text-xl max-w-md">
              <p>Unleash your product's potential by grounding every decision in research, strategy and real user needs, so you only invest in digital products the market actually wants.</p>
            </div>
          </div>

          {/* Expandable cards — 2-col grid collapsed, full-width blue panel when open */}
          <div className="max-w-6xl mx-auto px-4 my-6">

            {/* Collapsed grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CARDS.map((card, i) => (
                <div
                  key={i}
                  onClick={() => setExpanded(i)}
                  className="relative cursor-pointer bg-[#F2F2F2] hover:bg-[#EAEAEA] transition-colors"
                  style={{ padding: '40px 24px 32px' }}
                >
                  {/* Expand icon — corner arrows */}
                  <div className="absolute top-5 left-5 opacity-40">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M1 5V1H5" stroke="#000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11 1H15V5" stroke="#000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 11V15H11" stroke="#000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 15H1V11" stroke="#000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div style={{ minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 12 }}>
                    <p className="text-xs font-medium" style={{ fontFamily: "'Courier New', monospace", color: 'rgba(0,0,0,0.45)', letterSpacing: '0.08em' }}>{card.label}</p>
                    <p className="text-lg md:text-2xl leading-[135%] tracking-[0.48px] mt-6">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Expanded overlay panel */}
            <AnimatePresence>
              {expanded !== null && (
                <>
                  {/* Backdrop — click to close */}
                  <motion.div
                    key="backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-40"
                    style={{ background: 'rgba(0,0,0,0.3)' }}
                    onClick={() => setExpanded(null)}
                  />

                  {/* Panel */}
                  <motion.div
                    key="panel"
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 32 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="fixed inset-x-4 md:inset-x-8 z-50 overflow-y-auto"
                    style={{ top: '8vh', bottom: '8vh', background: '#5C5CF5', borderRadius: 4 }}
                  >
                    <div style={{ padding: '40px 40px 60px', height: '100%' }}>
                      {/* Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
                        <p style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                          {CARDS[expanded].label}
                        </p>
                        <button
                          onClick={() => setExpanded(null)}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#fff', fontSize: 22, lineHeight: 1, opacity: 0.7 }}
                        >
                          ×
                        </button>
                      </div>

                      {/* Large heading */}
                      <p style={{ fontSize: 'clamp(1.4rem, 3vw, 2.5rem)', color: '#fff', lineHeight: 1.3, fontWeight: 400, marginBottom: 64, maxWidth: 900 }}>
                        {CARDS[expanded].desc}
                      </p>

                      {/* 4-column sub-items */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
                        {CARDS[expanded].items.map((item, j) => (
                          <div key={j}>
                            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.25)', marginBottom: 20 }} />
                            <p style={{ fontSize: 17, color: '#fff', fontWeight: 500, marginBottom: 14 }}>{item.title}</p>
                            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65 }}>{item.body}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Scrolling ticker */}
          <div className="overflow-hidden border-t border-b border-black/10 my-10">
            <div className="flex whitespace-nowrap animate-marquee">
              {[...Array(2)].map((_, k) => (
                <span key={k} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 300, color: '#111', letterSpacing: '-0.03em', paddingRight: 40 }}>
                  {tickerText}
                </span>
              ))}
            </div>
          </div>

          {/* CTA cards */}
          <div className="max-w-6xl mx-auto px-4 pb-6 grid grid-cols-1 md:grid-cols-2 gap-2">
            {[
              { tag: 'BARMAJNI THINK', headline: 'Want to automate your business with AI?', cta: 'Start here' },
              { tag: 'BARMAJNI BUILD', headline: 'Want to build your own AI SaaS product?', cta: "Let's talk" },
            ].map((c, i) => (
              <div
                key={i}
                className="bg-[#F2F2F2] p-10 cursor-pointer hover:bg-[#E8E8E8] transition-colors"
              >
                <p style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: 'rgba(0,0,0,0.35)', letterSpacing: '0.1em', marginBottom: 24 }}>{c.tag}</p>
                <p className="font-light leading-snug mb-8" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>{c.headline}</p>
                <p style={{ fontFamily: "'Courier New', monospace", fontSize: 12, color: 'rgba(0,0,0,0.35)' }}>{c.cta} →</p>
              </div>
            ))}
          </div>

          {/* Bottom nav links */}
          <div className="flex justify-between items-center px-4 lg:px-8 py-6 border-t border-black/10 max-w-6xl mx-auto mt-6">
            <button style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: 'rgba(0,0,0,0.4)', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              ← Next consulting way
            </button>
            <button style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: 'rgba(0,0,0,0.4)', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              Design Workflow →
            </button>
          </div>

        </main>

        {/* FOOTER */}
        <footer style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '0 28px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>

            {/* Big CTA — grows to fill space */}
            <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, paddingTop: 80, paddingBottom: 60 }}>
              <h2 style={{ fontFamily: "'Courier New', monospace", fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 300, lineHeight: 1.1, color: '#fff', letterSpacing: '-0.02em', maxWidth: 600 }}>
                Let's build<br />something<br />great...
              </h2>
              <button style={{
                fontFamily: 'Arial, sans-serif', fontSize: 14, color: '#fff', display: 'flex', alignItems: 'center', gap: 10,
                border: '1px solid rgba(255,255,255,0.2)', padding: '14px 28px', cursor: 'pointer', background: 'transparent',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                Work together <span>→</span>
              </button>
            </div>

            {/* Footer bottom bar — pinned to bottom */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '28px 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <img src="/logo.png" alt="Barmajni" style={{ width: 18, height: 18, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.6 }} />
                <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Barmajni</span>
              </div>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {['Think', 'Design', 'Develop', 'Manifesto', 'Studio'].map(l => (
                  <button key={l} style={{ fontFamily: 'Arial, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)', background: 'transparent', border: 'none', cursor: 'pointer' }}>{l}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {['Careers', 'Contact Us', 'Start a company'].map(l => (
                  <button key={l} style={{ fontFamily: 'Arial, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)', background: 'transparent', border: 'none', cursor: 'pointer' }}>{l}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                {['LinkedIn', 'Instagram', 'Twitter'].map(l => (
                  <button key={l} style={{ fontFamily: 'Arial, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)', background: 'transparent', border: 'none', cursor: 'pointer' }}>{l}</button>
                ))}
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}
