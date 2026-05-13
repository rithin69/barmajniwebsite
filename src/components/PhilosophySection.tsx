import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PHILOSOPHY_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'

export default function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.h2
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Innovation{' '}
          <em className="italic text-white/40">x</em>{' '}
          Intelligence
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Video */}
          <motion.div
            className="rounded-3xl overflow-hidden aspect-[4/3]"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <video
              src={PHILOSOPHY_VIDEO}
              className="w-full h-full object-cover"
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            className="flex flex-col justify-center gap-8"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Build with precision</p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Every product we ship starts with a clear problem. We don't build AI for the sake of it — we engineer systems that eliminate bottlenecks, reduce overhead, and create measurable value for businesses that trust us with their growth.
              </p>
            </div>

            <div className="w-full h-px bg-white/10" />

            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Scale with confidence</p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                From early-stage SaaS to enterprise-grade platforms, our architecture is built to grow. We design for scale from day one — so our clients never have to choose between moving fast and building it right.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
