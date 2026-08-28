/**
 * Loaders from Aceternity UI (https://ui.aceternity.com/components/loader),
 * recoloured for this site's slate/blue palette.
 */
import { motion } from 'motion/react'
import { cn } from '../../lib/cn'

const bounce = (index: number) => ({
  duration: 1,
  repeat: Infinity,
  repeatType: 'loop' as const,
  delay: index * 0.2,
  ease: 'easeInOut' as const,
})

/** Three dots bouncing in sequence – the site's default spinner. */
export function LoaderOne({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)} role="status" aria-label="Loading">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={bounce(index)}
          className="h-3 w-3 rounded-full border border-blue-400/40 bg-gradient-to-b from-blue-400 to-blue-600"
        />
      ))}
    </div>
  )
}

/** Letter-by-letter pulse, used under the boot screen. */
export function LoaderFive({ text, className }: { text: string; className?: string }) {
  return (
    <div
      className={cn(
        'font-semibold tracking-[0.3em] text-slate-300 [--shadow-color:var(--color-blue-400)]',
        className,
      )}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{
            scale: [1, 1.1, 1],
            textShadow: [
              '0 0 0 var(--shadow-color)',
              '0 0 8px var(--shadow-color)',
              '0 0 0 var(--shadow-color)',
            ],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'loop',
            delay: index * 0.05,
            ease: 'easeInOut',
            repeatDelay: 2,
          }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </div>
  )
}
