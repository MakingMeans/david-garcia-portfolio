import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { LoaderOne } from './loader'
import { cn } from '../../lib/cn'

interface ImageCarouselProps {
  images: string[]
  alt: string
  /** Sizing for the frame; the images fill it. */
  className?: string
  /** Class applied to each image, e.g. a hover zoom. */
  imageClassName?: string
  /**
   * Adds dots the visitor can click. Leave it off inside a <button>, where
   * nested controls would be invalid markup.
   */
  interactive?: boolean
  intervalMs?: number
}

export function ImageCarousel({
  images,
  alt,
  className,
  imageClassName,
  interactive = false,
  intervalMs = 3500,
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()

  const total = images.length

  useEffect(() => {
    if (total < 2 || paused || reduceMotion) return
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % total), intervalMs)
    return () => window.clearInterval(timer)
  }, [total, paused, reduceMotion, intervalMs])

  return (
    <div
      className={cn('relative overflow-hidden bg-slate-900', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence>
        {!loaded ? (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900"
          >
            <LoaderOne />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={total > 1 ? `${alt} (${index + 1} of ${total})` : alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: 'easeInOut' }}
          className={cn('absolute inset-0 h-full w-full object-cover', imageClassName)}
        />
      </AnimatePresence>

      {total > 1 ? (
        <div className="absolute inset-x-0 bottom-2 z-20 flex justify-center gap-1.5">
          {images.map((image, i) =>
            interactive ? (
              <button
                key={image}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  'h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
                  i === index ? 'w-5 bg-blue-400' : 'w-1.5 bg-slate-500/70 hover:bg-slate-400',
                )}
              />
            ) : (
              <span
                key={image}
                aria-hidden
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  i === index ? 'w-5 bg-blue-400' : 'w-1.5 bg-slate-500/70',
                )}
              />
            ),
          )}
        </div>
      ) : null}
    </div>
  )
}
