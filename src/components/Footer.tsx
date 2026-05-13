import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Camera, AtSign, Globe } from 'lucide-react'

const LINKS = {
  Products: ['AI Automation', 'SaaS Platform', 'Enterprise Solutions', 'API & Integrations', 'Roadmap'],
  Company: ['Our Story', 'The Team', 'Newsroom', 'Careers'],
  Support: ['Get in Touch', 'Privacy Policy', 'Terms of Use', 'Report Issue'],
}

const SOCIAL = [Camera, AtSign, Globe]

const FOOTER_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4'

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      {/* Full-screen background video */}
      <video
        src={FOOTER_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.7) 100%)' }} />

      {/* Footer card */}
      <div ref={ref} style={{ position: 'relative', zIndex: 10, width: '100%', padding: '0 24px 24px' }}>
        <motion.footer
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="liquid-glass"
          style={{ width: '100%', borderRadius: 24, padding: '40px 48px', color: '#fff', background: 'rgba(0,0,0,0.45)' }}
        >
          {/* Top row */}
          <div style={{ display: 'flex', gap: 48, marginBottom: 40, flexWrap: 'wrap' }}>

            {/* Brand */}
            <div style={{ flex: '0 0 280px', minWidth: 220 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <img
                  src="/logo.png"
                  alt="Barmajni"
                  style={{ width: 32, height: 32, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                />
                <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Barmajni</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', maxWidth: 280 }}>
                Barmajni engineers AI-powered SaaS products and enterprise software — built to scale, designed to last, and shipped to win.
              </p>
            </div>

            {/* Links */}
            <div style={{ flex: 1, display: 'flex', gap: 48, flexWrap: 'wrap' }}>
              {Object.entries(LINKS).map(([heading, links]) => (
                <div key={heading} style={{ minWidth: 120 }}>
                  <h4 style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff', marginBottom: 16 }}>
                    {heading}
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
              © 2025 Barmajni. All rights reserved.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>Follow Us</span>
              <div style={{ display: 'flex', gap: 16 }}>
                {SOCIAL.map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  )
}
