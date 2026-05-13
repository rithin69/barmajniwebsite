import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATURED_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4'

export default function FeaturedVideoSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-black overflow-hidden">
      <motion.div
        ref={ref}
        className="relative w-full min-h-screen"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9 }}
      >
        <video
          src={FEATURED_VIDEO}
          className="w-full h-full absolute inset-0 object-cover"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md">
            <p className="text-white/50 text-xs tracking-widest uppercase mb-3">Our Approach</p>
            <p className="text-white text-sm md:text-base leading-relaxed">
              We combine deep engineering with cutting-edge AI to build products that don't just automate tasks — they transform how businesses think, decide, and grow.
            </p>
          </div>

          <motion.button
            className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium cursor-pointer shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore more
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
