/**
 * Port of the Aceternity UI "Expandable Card"
 * (https://ui.aceternity.com/components/expandable-card), restyled for this
 * site's dark palette, laid out as a grid, and carrying a rotating gallery
 * instead of a single still.
 */
import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { ImageCarousel } from './image-carousel'
import { Reveal } from '../common/reveal'
import { useOutsideClick } from '../../lib/use-outside-click'

export interface ExpandableCardItem {
  title: string
  summary: string
  content: string
  images: string[]
  tags: string[]
  ctaText: string
  ctaLink: string
  /** Optional line above the title – a date range, a client, a course. */
  meta?: string
}

export function ExpandableCards({ items }: { items: ExpandableCardItem[] }) {
  const [active, setActive] = useState<ExpandableCardItem | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  // Only touch body scroll while a card is open, so this does not fight the
  // boot screen's own lock on mount.
  useEffect(() => {
    if (!active) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setActive(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [active])

  useOutsideClick(ref, () => setActive(null))

  const overlay = (
    <>
      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] h-full w-full bg-slate-950/80 backdrop-blur-sm"
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 z-[70] grid place-items-center p-3 sm:p-6">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              className="flex max-h-[92svh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-black/60 sm:rounded-3xl"
            >
              <motion.div layoutId={`image-${active.title}-${id}`} className="relative shrink-0">
                <ImageCarousel
                  images={active.images}
                  alt={active.title}
                  className="h-48 w-full sm:h-64"
                  interactive
                />
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close project details"
                  className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-950/80 text-slate-200 backdrop-blur transition hover:border-blue-400/50 hover:text-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>

              <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-1">
                    {active.meta ? (
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                        {active.meta}
                      </p>
                    ) : null}
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="text-lg font-semibold text-white sm:text-xl"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`summary-${active.title}-${id}`}
                      className="text-sm text-slate-400"
                    >
                      {active.summary}
                    </motion.p>
                  </div>
                  <motion.a
                    layoutId={`cta-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  >
                    {active.ctaText}
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.a>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm leading-7 text-slate-300"
                >
                  {active.content}
                </motion.p>

                <div className="flex flex-wrap gap-2">
                  {active.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  )

  return (
    <>
      {/* Portalled to body: a transformed ancestor would make these fixed
          layers position against it instead of the viewport. */}
      {typeof document !== 'undefined' ? createPortal(overlay, document.body) : null}

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={0.06 * index} className="h-full">
            <motion.button
              type="button"
              layoutId={`card-${item.title}-${id}`}
              onClick={() => setActive(item)}
              aria-label={`Open details for ${item.title}`}
              className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-950/80 text-left shadow-[0_24px_60px_-32px_rgba(0,0,0,0.65)] transition hover:-translate-y-1 hover:border-blue-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <motion.div layoutId={`image-${item.title}-${id}`} className="w-full">
                <ImageCarousel
                  images={item.images}
                  alt={item.title}
                  className="h-44 w-full"
                  imageClassName="transition duration-500 group-hover:scale-105"
                />
              </motion.div>

              <div className="flex flex-1 flex-col gap-3 p-5">
                {item.meta ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                    {item.meta}
                  </p>
                ) : null}
                <motion.h3
                  layoutId={`title-${item.title}-${id}`}
                  className="text-lg font-semibold text-white"
                >
                  {item.title}
                </motion.h3>
                <motion.p layoutId={`summary-${item.title}-${id}`} className="text-sm text-slate-400">
                  {item.summary}
                </motion.p>

                <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-800 px-2.5 py-1 text-[0.7rem] font-medium text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                  <motion.span
                    layoutId={`cta-${item.title}-${id}`}
                    className="ml-auto inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-400 transition group-hover:text-blue-300"
                  >
                    Details
                  </motion.span>
                </div>
              </div>
            </motion.button>
          </Reveal>
        ))}
      </div>
    </>
  )
}
