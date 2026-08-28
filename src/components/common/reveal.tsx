import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

/**
 * Fades content up as it scrolls into view, and replays every time – not just
 * the first.
 *
 * The catch with a plain `whileInView` loop is that it also animates *out*,
 * which reads as a fade-out at the edge of the screen. So the reset only fires
 * when the element leaves through the bottom (the visitor scrolled back up past
 * it), where it is off-screen and the reset is invisible. Leaving through the
 * top keeps it visible.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || reduceMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShown(true)
        else if (entry.boundingClientRect.top > 0) setShown(false)
      },
      { threshold: 0.15 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [reduceMotion])

  const visible = reduceMotion || shown

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
      // Fading in is the animation; resetting is a snap, so it is never seen.
      transition={visible ? { duration: 0.6, delay, ease: 'easeOut' } : { duration: 0 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
