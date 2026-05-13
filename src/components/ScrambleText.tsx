import { useState, useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

interface Props {
  text: string
  active: boolean
  delay?: number
  duration?: number
  className?: string
}

export default function ScrambleText({
  text,
  active,
  delay = 0,
  duration = 1400,
  className,
}: Props) {
  const [output, setOutput] = useState('')
  const frameRef = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (!active) return

    timerRef.current = setTimeout(() => {
      const startTime = performance.now()

      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1)

        const result = text
          .split('')
          .map((char, i) => {
            if (char === ' ' || char === '\n') return char
            const revealAt = i / text.length
            if (progress >= revealAt + 0.08) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')

        setOutput(result)

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate)
        } else {
          setOutput(text)
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timerRef.current)
      cancelAnimationFrame(frameRef.current)
    }
  }, [active, text, delay, duration])

  return <span className={className}>{output || ' '.repeat(text.length)}</span>
}
