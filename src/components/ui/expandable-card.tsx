/**
 * Port of the Aceternity UI "Expandable Card"
 * (https://ui.aceternity.com/components/expandable-card), restyled for this
 * site's dark palette, laid out as a grid, and carrying a rotating gallery
 * instead of a single still.
 */
import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { ImageCarousel } from './image-carousel'
import { Reveal } from '../common/reveal'
import { useOutsideClick } from '../../lib/use-outside-click'
import { cn } from '../../lib/cn'

export interface ExpandableCardItem {
  title: string
  summary: string
  content: string
  /** Gallery images. When empty, `cover` is shown in their place. */
  images: string[]
  /** Artwork for items with no images yet; it should fill its box. */
  cover?: ReactNode
  tags: string[]
  ctaText: string
  ctaLink: string
  /** Optional line above the title – a date range, a client, a course. */
  meta?: string
  /**
   * Spans the full grid width with the media beside the text, under a
   * "Featured" label. Pass featured items first.
   */
  featured?: boolean
}

function Media({
  item,
  className,
  imageClassName,
  interactive,
}: {
  item: ExpandableCardItem
  className: string
  imageClassName?: string
  interactive?: boolean
}) {
  if (item.images.length === 0) {
    return <div className={cn('relative overflow-hidden', className)}>{item.cover}</div>
  }

  return (
    <ImageCarousel
      images={item.images}
      alt={item.title}
      className={className}
      imageClassName={imageClassName}
      interactive={interactive}
    />
  )
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md bg-slate-800/70 px-2 py-0.5 font-mono text-[0.7rem] text-slate-400">
      {children}
    </span>
  )
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

  // Featured cards span the grid. If the rest would end on a lone card, that
  // last one spans too, so the grid closes cleanly whatever the item count.
  const regular = items.filter((item) => !item.featured)
  const lastRegular = regular.length % 2 === 1 ? regular[regular.length - 1] : undefined
  const isWide = (item: ExpandableCardItem) => Boolean(item.featured) || item === lastRegular

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
              className="flex max-h-[92svh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-2xl shadow-black/60 ring-1 ring-white/10"
            >
              <motion.div layoutId={`image-${active.title}-${id}`} className="relative shrink-0">
                <Media item={active} className="h-48 w-full sm:h-64" interactive />
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close project details"
                  className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/70 text-slate-300 backdrop-blur transition hover:bg-slate-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>

              <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-1">
                    {active.meta ? (
                      <p className="font-mono text-xs text-slate-500">{active.meta}</p>
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
                    <Tag key={tag}>{tag}</Tag>
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

      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item, index) => {
          const wide = isWide(item)

          return (
            <Reveal
              key={item.title}
              delay={0.06 * index}
              className={cn('h-full', wide && 'md:col-span-2')}
            >
              <motion.button
                type="button"
                layoutId={`card-${item.title}-${id}`}
                onClick={() => setActive(item)}
                aria-label={`Open details for ${item.title}`}
                className={cn(
                  'group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-slate-900/50 text-left transition hover:-translate-y-1 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
                  wide && 'md:flex-row',
                )}
              >
                <motion.div
                  layoutId={`image-${item.title}-${id}`}
                  className={cn('w-full', wide && 'md:w-1/2 md:shrink-0')}
                >
                  <Media
                    item={item}
                    className={cn('h-44 w-full', wide && 'md:h-full md:min-h-72')}
                    imageClassName="transition duration-500 group-hover:scale-105"
                  />
                </motion.div>

                <div className={cn('flex flex-1 flex-col gap-2 p-5', wide && 'md:gap-3 md:p-8')}>
                  {item.meta || item.featured ? (
                    <p className="font-mono text-xs text-slate-500">
                      {item.featured ? <span className="text-blue-400">Featured</span> : null}
                      {item.featured && item.meta ? ' · ' : null}
                      {item.meta}
                    </p>
                  ) : null}
                  <motion.h3
                    layoutId={`title-${item.title}-${id}`}
                    className={cn('text-lg font-semibold text-white', wide && 'md:text-2xl')}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p layoutId={`summary-${item.title}-${id}`} className="text-sm text-slate-400">
                    {item.summary}
                  </motion.p>
                  {wide ? (
                    <p className="hidden text-sm leading-7 text-slate-400 md:line-clamp-4">{item.content}</p>
                  ) : null}

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
                    {item.tags.slice(0, wide ? 6 : 3).map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                    <motion.span
                      layoutId={`cta-${item.title}-${id}`}
                      className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-blue-400 transition group-hover:text-blue-300"
                    >
                      Details
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </motion.span>
                  </div>
                </div>
              </motion.button>
            </Reveal>
          )
        })}
      </div>
    </>
  )
}
