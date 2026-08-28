import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { LoaderOne } from './loader'
import { cn } from '../../lib/cn'

interface ImageWithLoaderProps {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
}

/** Image that shows the Aceternity loader until the file has actually decoded. */
export function ImageWithLoader({ src, alt, className, wrapperClassName }: ImageWithLoaderProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cn('relative overflow-hidden bg-slate-900', wrapperClassName)}>
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
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className={cn('h-full w-full object-cover', className)}
      />
    </div>
  )
}
