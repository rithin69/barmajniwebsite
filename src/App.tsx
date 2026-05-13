import { useEffect, useRef, useState } from 'react'
import { Globe, Camera, AtSign } from 'lucide-react'
import LoadingScreen from './components/LoadingScreen'
import AboutSection from './components/AboutSection'
import PhilosophySection from './components/PhilosophySection'
import LeadershipSection from './components/LeadershipSection'
import ThinkPage from './components/ThinkPage'

type Page = 'home' | 'think'

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4'

function animateFade(el: HTMLElement, from: number, to: number, duration: number) {
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min((now - start) / duration, 1)
    el.style.opacity = String(from + (to - from) * t)
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [page, setPage] = useState<Page>('home')
  const [showLoader, setShowLoader] = useState(() => {
    if (sessionStorage.getItem('barmajni_loaded')) return false
    sessionStorage.setItem('barmajni_loaded', 'true')
    return true
  })

  useEffect(() => {
    if (page !== 'home') return
    const video = videoRef.current
    if (!video) return
    const fadeIn = () => { video.play().catch(() => undefined); animateFade(video, 0, 1, 500) }
    video.style.opacity = '0'
    if (video.readyState >= 3) { fadeIn(); return }
    video.addEventListener('canplay', fadeIn, { once: true })
    return () => video.removeEventListener('canplay', fadeIn)
  }, [page])

  if (page === 'think') {
    return <ThinkPage onBack={() => { setPage('home'); window.scrollTo(0, 0) }} />
  }

  return (
    <>
      {showLoader && <LoadingScreen onComplete={() => setShowLoader(false)} />}

      <div className="bg-black">
        {/* HERO */}
        <div className="relative min-h-screen overflow-hidden flex flex-col">
          <video
            ref={videoRef}
            src={HERO_VIDEO}
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-bottom"
            style={{ opacity: 0 }}
          />

          {/* Navbar — absolute inside hero, scrolls with page */}
          <nav className="relative z-20 px-6 py-5" style={{ marginTop: '16px' }}>
            <div
              className="liquid-glass rounded-full flex items-center justify-between"
              style={{ maxWidth: '960px', margin: '0 auto', padding: '10px 24px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img
                    src="/logo.png"
                    alt="Barmajni"
                    style={{ width: 28, height: 28, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                  />
                  <span className="text-white font-semibold" style={{ fontSize: 17 }}>Barmajni</span>
                </div>
                <div className="hidden md:flex" style={{ gap: '28px' }}>
                  <button onClick={() => setPage('think')} className="text-white/80 hover:text-white text-sm font-medium transition-colors bg-transparent border-none cursor-pointer">Think</button>
                  <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Design</a>
                  <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Develop</a>
                  <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">About Us</a>
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

          {/* Hero content */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-start pt-6 px-6 text-center">
            <h1
              className="text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              We engineer <em className="italic">intelligence.</em>
            </h1>
            <p className="text-white/80 text-sm leading-relaxed mt-4 max-w-lg [text-shadow:0_1px_12px_rgba(0,0,0,1)]">
              Barmajni builds AI-powered SaaS products and enterprise software. Automate intelligently, scale confidently, and compete in a market reshaped by AI.
            </p>
          </div>

          {/* Social icons */}
          <div className="relative z-10 flex justify-center gap-4 pb-12">
            <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
              <Camera size={20} />
            </button>
            <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
              <AtSign size={20} />
            </button>
            <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
              <Globe size={20} />
            </button>
          </div>
        </div>

        {/* OTHER SECTIONS */}
        <AboutSection />
        <PhilosophySection />
        <LeadershipSection />

        {/* FOOTER */}
        <footer style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', padding: '0 28px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>

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

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '28px 0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <img src="/logo.png" alt="Barmajni" style={{ width: 18, height: 18, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.6 }} />
                <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Barmajni</span>
              </div>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {(['Think', 'Design', 'Develop', 'Manifesto', 'Studio'] as const).map(l => (
                  <button key={l} style={{ fontFamily: 'Arial, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)', background: 'transparent', border: 'none', cursor: 'pointer' }}>{l}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {(['Careers', 'Contact Us', 'Start a company'] as const).map(l => (
                  <button key={l} style={{ fontFamily: 'Arial, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)', background: 'transparent', border: 'none', cursor: 'pointer' }}>{l}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                {(['LinkedIn', 'Instagram', 'Twitter'] as const).map(l => (
                  <button key={l} style={{ fontFamily: 'Arial, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.35)', background: 'transparent', border: 'none', cursor: 'pointer' }}>{l}</button>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
