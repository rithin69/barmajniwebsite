import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LETTERS = 'BARMAJNI'.split('')

function Letter({ char, index }: { char: string; index: number }) {
  return (
    <span
      className="inline-block overflow-hidden"
      style={{ lineHeight: 1.1, paddingBottom: '0.05em' }}
    >
      <motion.span
        className="inline-block text-white font-extralight"
        style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
        initial={{ y: '115%' }}
        animate={{ y: '0%' }}
        transition={{
          duration: 0.75,
          delay: 0.5 + index * 0.065,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {char}
      </motion.span>
    </span>
  )
}

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-200 bg-black flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Ambient glow behind logo */}
          <motion.div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 280,
              height: 280,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.1, ease: 'easeOut' }}
          />

          {/* Expanding ring ping */}
          <motion.div
            className="absolute pointer-events-none rounded-full border border-white/20"
            initial={{ width: 64, height: 64, opacity: 0.8 }}
            animate={{ width: 200, height: 200, opacity: 0 }}
            transition={{ duration: 1.6, delay: 0.3, ease: 'easeOut' }}
          />
          {/* Second ring, delayed */}
          <motion.div
            className="absolute pointer-events-none rounded-full border border-white/10"
            initial={{ width: 64, height: 64, opacity: 0.5 }}
            animate={{ width: 300, height: 300, opacity: 0 }}
            transition={{ duration: 2.0, delay: 0.6, ease: 'easeOut' }}
          />

          {/* Logo */}
          <motion.img
            src="/logo.png"
            alt="Barmajni"
            className="relative z-10 object-contain mb-8"
            style={{ width: 56, height: 56 }}
            initial={{ opacity: 0, scale: 0.35, filter: 'blur(14px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Letters — clip/mask reveal */}
          <div className="flex items-end" style={{ letterSpacing: '0.42em' }}>
            {LETTERS.map((char, i) => (
              <Letter key={i} char={char} index={i} />
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            className="text-white/30 text-[10px] tracking-[0.3em] uppercase mt-5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.45 }}
          >
            Engineering Intelligence
          </motion.p>

          {/* Progress bar — slides in from left */}
          <div className="absolute bottom-10 w-28 h-px bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-white/50 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.4, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
