import { useEffect, useRef } from 'react'

interface Card {
  title: string
  desc: string
  img: string
}

const CARDS: Card[] = [
  { title: 'Simple solutions, real impact', desc: 'We create intuitive tools that cut through complexity, focusing only on what adds measurable value.', img: 'https://cdn.prod.website-files.com/68376a06cad09fdde4574f6c/6931dd777534cff6eff849c2_68bad2c416f5e295faf8e46c_Rectangle%20240648495.png' },
  { title: 'Practical intelligence', desc: 'We connect the physical and digital with clarity, using data wisely to make grounded, effective decisions.', img: 'https://cdn.prod.website-files.com/68376a06cad09fdde4574f6c/6931dd77a134bf12cdaf86e1_68bad2d8279ca395e651e77e_Rectangle%20240648495%20(4).png' },
  { title: 'Humanity at the centre', desc: 'We prioritise transparency, well-being and a safe culture where people thrive and excellence follows.', img: 'https://cdn.prod.website-files.com/68376a06cad09fdde4574f6c/6931dd7745dcda90713a89e9_68bad2eab81028c91813436d_Rectangle%20240648495%20(3).png' },
  { title: 'Meaningful innovation', desc: 'Purpose-driven technology designed to solve real problems and make everyday life simpler.', img: 'https://cdn.prod.website-files.com/68376a06cad09fdde4574f6c/6931dd77857efa29c461932f_68bad300ad39bf3cc75ac440_Rectangle%20240648495%20(2).png' },
  { title: 'Authentic closeness', desc: 'We listen, engage and build trust-based relationships, treating every client as a valued collaborator.', img: 'https://cdn.prod.website-files.com/68376a06cad09fdde4574f6c/6931dd77b388a30897548f9d_68bad316e62edb2a852400b8_Rectangle%20240648495%20(1).png' },
]

const CARD_W = 320
const CARD_H = 410
const GAP = 32
const CARD_REST_ANGLES = [-3, 2, -3, 2, -3]

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

const band = (p: number, a: number, b: number) =>
  Math.min(Math.max((p - a) / (b - a), 0), 1)

const TEXT1_LINES = ['Modernising unattended', 'services through smart,', 'connected solutions']
const TEXT2_LINES = ['Technology with simplicity,', 'humanity and purpose', 'at its core']

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

*{box-sizing:border-box;margin:0;padding:0}

.scroll-container{position:relative;height:700vh;background:#000}

.sticky{
  position:sticky;top:0;height:100vh;overflow:hidden;
  font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:#000;
}

.bg{
  position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  z-index:0;filter:brightness(.55) saturate(1.1);
}

.ov{
  position:absolute;inset:0;z-index:1;
  background:
    linear-gradient(to bottom,rgba(0,0,0,.15) 0%,rgba(0,0,0,.25) 50%,rgba(0,0,0,.65) 100%),
    linear-gradient(to right,rgba(0,0,0,.45) 0%,rgba(0,0,0,.1) 50%,rgba(0,0,0,.35) 100%);
}

.chip{
  position:absolute;top:32px;left:32px;z-index:8;
  display:inline-flex;align-items:center;gap:8px;
  color:#fff;font-size:14px;font-weight:500;
}
.chip svg{width:14px;height:14px}

.ribbon{
  position:absolute;top:50%;right:0;transform:translateY(-50%);z-index:8;
  background:#e8e84a;color:#0a0a0a;padding:18px 12px;
  writing-mode:vertical-rl;font-size:12px;font-weight:600;letter-spacing:.06em;
}
.ribbon span{display:block;margin-top:6px}

.text-wrap{
  position:absolute;top:90px;left:6vw;right:6vw;z-index:6;pointer-events:none;
}

.t1,.t2{
  position:absolute;top:0;left:0;color:#fff;font-family:'Inter',sans-serif;
  letter-spacing:-.035em;line-height:1.08;max-width:1100px;
  font-weight:800;font-size:clamp(2.2rem,6.2vw,5.5rem);
  will-change:opacity,transform;
}

.line-mask{
  display:block;overflow:hidden;
  padding:0.10em 0.05em;margin:-0.06em 0;
}

.line-inner{
  display:block;
  will-change:transform,opacity,filter;
}

.deck-viewport{
  position:absolute;left:0;right:0;bottom:8vh;z-index:5;
  overflow:hidden;height:${CARD_H + 80}px;pointer-events:none;
}

.deckwrap{
  position:absolute;left:0;bottom:0;display:flex;gap:${GAP}px;
  align-items:flex-end;will-change:transform;pointer-events:auto;
}

.card{
  width:${CARD_W}px;height:${CARD_H}px;background:#1a1040;
  border-radius:16px;overflow:hidden;display:flex;flex-direction:column;
  flex-shrink:0;transform-origin:50% 100%;
  box-shadow:0 30px 70px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.05);
  will-change:transform;transition:box-shadow .4s ease;
}

.card:hover{
  box-shadow:0 36px 90px rgba(120,60,255,.45),0 0 0 1px rgba(180,120,255,.25);
}

.cinfo{padding:26px 24px 16px;flex-shrink:0}

.ctitle{
  font-size:19px;font-weight:700;color:#fff;line-height:1.25;
  letter-spacing:-.02em;margin-bottom:10px;
}

.cdesc{font-size:12px;color:rgba(255,255,255,.55);line-height:1.65;font-weight:400}

.cimg{flex:1;overflow:hidden;position:relative}
.cimg img{width:100%;height:100%;object-fit:cover;display:block}

@media (max-width:768px){
  .deck-viewport{bottom:5vh}
  .chip{top:20px;left:20px}
  .text-wrap{top:70px}
  .ribbon{padding:14px 8px;font-size:11px}
}
`

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const t1Ref = useRef<HTMLDivElement>(null)
  const t2Ref = useRef<HTMLDivElement>(null)
  const t1Lines = useRef<(HTMLSpanElement | null)[]>([])
  const t2Lines = useRef<(HTMLSpanElement | null)[]>([])
  const deckwrapRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const rafRef = useRef<number | null>(null)
  const targetP = useRef(0)
  const vwRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 1440)

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const total = containerRef.current.offsetHeight - window.innerHeight
      targetP.current = Math.min(Math.max(-rect.top / total, 0), 1)
    }

    const onResize = () => { vwRef.current = window.innerWidth }

    const tick = () => {
      const pt = targetP.current
      const vw = vwRef.current

      // ── TEXT 1 ──
      for (let i = 0; i < TEXT1_LINES.length; i++) {
        const r = easeOutCubic(band(pt, 0.01 + i * 0.006, 0.01 + i * 0.006 + 0.022))
        const el = t1Lines.current[i]
        if (el) {
          el.style.transform = `translateY(${(1 - r) * 112}%)`
          el.style.opacity = String(r)
          el.style.filter = `blur(${(1 - r) * 6}px)`
        }
      }
      const t1Exit = easeInOutCubic(band(pt, 0.055, 0.09))
      if (t1Ref.current) {
        t1Ref.current.style.opacity = String(1 - t1Exit)
        t1Ref.current.style.transform = `translateY(${t1Exit * -56}px)`
      }

      // ── TEXT 2 ──
      for (let i = 0; i < TEXT2_LINES.length; i++) {
        const r = easeOutCubic(band(pt, 0.10 + i * 0.006, 0.10 + i * 0.006 + 0.022))
        const el = t2Lines.current[i]
        if (el) {
          el.style.transform = `translateY(${(1 - r) * 112}%)`
          el.style.opacity = String(r)
          el.style.filter = `blur(${(1 - r) * 6}px)`
        }
      }
      const t2Exit = easeInOutCubic(band(pt, 0.145, 0.18))
      if (t2Ref.current) {
        t2Ref.current.style.opacity = String(1 - t2Exit)
        t2Ref.current.style.transform = `translateY(${t2Exit * -56}px)`
      }

      // ── CARDS ── starts immediately after text 2 exits, ends when container ends
      const totalDeckW = CARDS.length * CARD_W + (CARDS.length - 1) * GAP
      const deckP = easeInOutCubic(band(pt, 0.18, 1.0))
      const dx = -totalDeckW + (vw - (-totalDeckW)) * deckP

      if (deckwrapRef.current) {
        deckwrapRef.current.style.transform = `translateX(${dx}px)`
      }

      for (let i = 0; i < CARDS.length; i++) {
        const el = cardRefs.current[i]
        if (!el) continue
        const cardCenterX = i * (CARD_W + GAP) + CARD_W / 2
        const worldX = dx + cardCenterX
        const dist = (worldX - vw / 2) / (vw / 2)
        const proximity = Math.max(0, 1 - Math.abs(dist))
        const angle = CARD_REST_ANGLES[i] * proximity + (-dist * 8) * (1 - proximity)
        el.style.transform = `translateY(${-proximity * 24}px) rotate(${angle}deg)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    onScroll()
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div ref={containerRef} className="scroll-container">
      <style>{CSS}</style>
      <div className="sticky">

        <video
          className="bg"
          src="/typing.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="ov" />

        <div className="chip">
          Values
          <svg viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#f5a623" />
          </svg>
        </div>

        <div className="ribbon">W. <span>Winner</span></div>

        <div className="text-wrap">
          <div ref={t1Ref} className="t1">
            {TEXT1_LINES.map((line, i) => (
              <span key={`t1-${i}`} className="line-mask">
                <span
                  ref={el => { t1Lines.current[i] = el }}
                  className="line-inner"
                  style={{ transform: 'translateY(112%)', opacity: 0, filter: 'blur(6px)' }}
                >
                  {line}
                </span>
              </span>
            ))}
          </div>

          <div ref={t2Ref} className="t2">
            {TEXT2_LINES.map((line, i) => (
              <span key={`t2-${i}`} className="line-mask">
                <span
                  ref={el => { t2Lines.current[i] = el }}
                  className="line-inner"
                  style={{ transform: 'translateY(112%)', opacity: 0, filter: 'blur(6px)' }}
                >
                  {line}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="deck-viewport">
          <div ref={deckwrapRef} className="deckwrap">
            {CARDS.map((card, i) => (
              <div
                key={i}
                ref={el => { cardRefs.current[i] = el }}
                className="card"
              >
                <div className="cinfo">
                  <div className="ctitle">{card.title}</div>
                  <p className="cdesc">{card.desc}</p>
                </div>
                <div className="cimg">
                  <img src={card.img} alt={card.title} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
