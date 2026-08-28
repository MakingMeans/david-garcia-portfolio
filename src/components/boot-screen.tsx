import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { LoaderFive, LoaderOne } from './ui/loader'

/** Never flash the loader for a page that was already cached. */
const MINIMUM_VISIBLE_MS = 550
/** Never trap the visitor behind it either, if some asset stalls. */
const MAXIMUM_VISIBLE_MS = 4000

export function BootScreen() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const startedAt = Date.now()
    let timer: number | undefined

    const finish = () => {
      const elapsed = Date.now() - startedAt
      timer = window.setTimeout(() => setDone(true), Math.max(0, MINIMUM_VISIBLE_MS - elapsed))
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })

    const failsafe = window.setTimeout(() => setDone(true), MAXIMUM_VISIBLE_MS)

    return () => {
      window.removeEventListener('load', finish)
      window.clearTimeout(failsafe)
      if (timer) window.clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = done ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [done])

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="boot"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-slate-950"
          role="status"
          aria-live="polite"
        >
          <LoaderOne />
          <LoaderFive text="LOADING" className="text-xs" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
