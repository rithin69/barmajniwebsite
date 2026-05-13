import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ABOUT_VIDEO = '/typing.mp4'

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Left panel fades out early
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const textY      = useTransform(scrollYProgress, [0, 0.25], [0, -40])

  // Video expands to fullscreen
  const videoLeft          = useTransform(scrollYProgress, [0.1, 0.68], ['37vw', '0vw'])
  const videoTop           = useTransform(scrollYProgress, [0.1, 0.68], ['12.5vh', '0vh'])
  const videoWidth         = useTransform(scrollYProgress, [0.1, 0.68], ['61vw', '100vw'])
  const videoHeight        = useTransform(scrollYProgress, [0.1, 0.68], ['75vh', '100vh'])
  const videoBorderRadius  = useTransform(scrollYProgress, [0.1, 0.68], [20, 0])

  // Overlay text — fades in RIGHT as video hits fullscreen
  const overlayOpacity = useTransform(scrollYProgress, [0.68, 0.80], [0, 1])
  const overlayY       = useTransform(scrollYProgress, [0.68, 0.80], [30, 0])

  return (
    <div ref={containerRef} className="relative bg-black" style={{ height: '260vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Left panel text — white, on dark bg */}
        <motion.div style={{
          position: 'absolute', left: 0, top: 0,
          height: '100%', width: '36vw',
          display: 'flex', alignItems: 'center',
          padding: '0 4vw',
          opacity: textOpacity, y: textY,
          zIndex: 10,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <span style={{ display: 'block', width: 28, height: 1, background: 'rgba(255,255,255,0.3)' }} />
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 400, margin: 0 }}>
                About Us
              </p>
            </div>
            <h2 style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 3.2rem)', color: '#fff', lineHeight: 1.2, fontWeight: 700, margin: '0 0 20px' }}>
              Engineering intelligent software for businesses that automate, scale, and lead.
            </h2>
            <p style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, maxWidth: 270, margin: 0 }}>
              We build AI-powered software that transforms how businesses operate, compete, and grow.
            </p>
          </div>
        </motion.div>

        {/* Expanding video */}
        <motion.div style={{
          position: 'absolute',
          left: videoLeft, top: videoTop,
          width: videoWidth, height: videoHeight,
          borderRadius: videoBorderRadius,
          overflow: 'hidden',
          zIndex: 20,
        }}>
          <video
            src={ABOUT_VIDEO}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            muted autoPlay loop playsInline preload="auto"
          />
        </motion.div>

        {/* Overlay text — sits ABOVE video, black text for white video */}
        <motion.div style={{
          position: 'absolute',
          bottom: '10%',
          left: '6vw',
          right: '6vw',
          zIndex: 30,
          opacity: overlayOpacity,
          y: overlayY,
          pointerEvents: 'none',
        }}>
          <p style={{
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#000000',
            fontWeight: 500,
            margin: '0 0 14px',
          }}>
            About Us
          </p>
          <h2 style={{
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 4.5rem)',
            color: '#000000',
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            fontWeight: 700,
            maxWidth: 750,
            margin: '0 0 18px',
          }}>
            Engineering intelligent software for businesses that automate, scale, and lead.
          </h2>
          <p style={{
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: 15,
            color: '#111111',
            lineHeight: 1.75,
            fontWeight: 400,
            maxWidth: 460,
            margin: 0,
          }}>
            We build AI-powered software that transforms how businesses operate, compete, and grow.
          </p>
        </motion.div>

      </div>
    </div>
  )
}
