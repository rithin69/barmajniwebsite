import { useEffect, useRef } from 'react'
import { Globe, Camera, AtSign, ArrowRight } from 'lucide-react'
import AboutSection from './components/AboutSection'
import FeaturedVideoSection from './components/FeaturedVideoSection'
import PhilosophySection from './components/PhilosophySection'
import ServicesSection from './components/ServicesSection'

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4'

function animateFade(
  el: HTMLElement,
  from: number,
  to: number,
  duration: number,
  onComplete?: () => void
) {
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min((now - start) / duration, 1)
    el.style.opacity = String(from + (to - from) * t)
    if (t < 1) {
      requestAnimationFrame(step)
    } else {
      onComplete?.()
    }
  }
  requestAnimationFrame(step)
}

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const fadeOutStarted = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      video.play().catch(() => undefined)
      animateFade(video, 0, 1, 500)
    }

    const handleTimeUpdate = () => {
      if (!video.duration) return
      const remaining = video.duration - video.currentTime
      if (remaining <= 0.55 && !fadeOutStarted.current) {
        fadeOutStarted.current = true
        animateFade(video, parseFloat(video.style.opacity) || 1, 0, 500)
      }
    }

    const handleEnded = () => {
      video.style.opacity = '0'
      fadeOutStarted.current = false
      setTimeout(() => {
        video.currentTime = 0
        video.play().catch(() => undefined)
        animateFade(video, 0, 1, 500)
      }, 100)
    }

    video.style.opacity = '0'
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <div className="bg-black">
      {/* HERO */}
      <div className="relative min-h-screen overflow-hidden flex flex-col">
        {/* Background video */}
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          muted
          autoPlay
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          style={{ opacity: 0 }}
        />

        {/* Navbar */}
        <div className="relative z-20 px-6 py-6">
          <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center">
              <Globe size={24} className="text-white" />
              <span className="text-white font-semibold text-lg ml-2">Asme</span>
              <div className="hidden md:flex items-center gap-8 ml-8">
                <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Features</a>
                <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Pricing</a>
                <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">About</a>
              </div>
            </div>
            {/* Right */}
            <div className="flex items-center gap-4">
              <button className="text-white text-sm font-medium cursor-pointer bg-transparent border-none">
                Sign Up
              </button>
              <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium cursor-pointer">
                Login
              </button>
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
          <h1
            className="text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Know it then <em className="italic">all</em>.
          </h1>

          <div className="max-w-xl w-full mt-8">
            <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none text-sm"
              />
              <button className="bg-white rounded-full p-3 text-black cursor-pointer flex items-center justify-center shrink-0">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          <p className="text-white text-sm leading-relaxed px-4 mt-6 max-w-md">
            Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
          </p>

          <button className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors mt-6 cursor-pointer">
            Manifesto
          </button>
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
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
    </div>
  )
}
