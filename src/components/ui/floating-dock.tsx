/**
 * Port of the Aceternity UI "Floating Dock" (https://ui.aceternity.com/components/floating-dock),
 * adapted so the label sits *below* the icon instead of floating above it, and so the section
 * currently in view can be highlighted.
 */
import { Fragment, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { ChevronUp } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface FloatingDockItem {
  title: string
  icon: ReactNode
  href: string
  /** Set for links that leave the page (CV, GitHub, LinkedIn…). */
  external?: boolean
  /** Renders a hairline separator before this item. */
  startsGroup?: boolean
}

interface FloatingDockProps {
  items: FloatingDockItem[]
  /** Which item is currently in view — matched against `href`. */
  activeHref?: string
  /** `hover` reveals the label on hover; `always` keeps every label visible. */
  labelMode?: 'hover' | 'always'
  desktopClassName?: string
  mobileClassName?: string
}

const linkProps = (item: FloatingDockItem) =>
  item.external ? { target: '_blank' as const, rel: 'noopener noreferrer' } : {}

export function FloatingDock({
  items,
  activeHref,
  labelMode = 'hover',
  desktopClassName,
  mobileClassName,
}: FloatingDockProps) {
  return (
    <>
      <FloatingDockDesktop
        items={items}
        activeHref={activeHref}
        labelMode={labelMode}
        className={desktopClassName}
      />
      <FloatingDockMobile items={items} activeHref={activeHref} className={mobileClassName} />
    </>
  )
}

function FloatingDockDesktop({
  items,
  activeHref,
  labelMode,
  className,
}: {
  items: FloatingDockItem[]
  activeHref?: string
  labelMode: 'hover' | 'always'
  className?: string
}) {
  const mouseX = useMotionValue(Infinity)

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 hidden justify-center px-4 md:flex">
      <motion.nav
        aria-label="Section navigation"
        onMouseMove={(event) => mouseX.set(event.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          'pointer-events-auto flex h-20 items-end gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/90 px-4 pb-8 shadow-2xl shadow-black/40 ring-1 ring-white/5 backdrop-blur-xl',
          className,
        )}
      >
        {items.map((item) => (
          <Fragment key={item.href}>
            {/* Fixed-height rule so the separator does not stretch with the magnified icons. */}
            {item.startsGroup ? <span aria-hidden className="mx-1 h-8 w-px shrink-0 bg-slate-800" /> : null}
            <IconContainer
              mouseX={mouseX}
              item={item}
              active={activeHref === item.href}
              labelMode={labelMode}
            />
          </Fragment>
        ))}
      </motion.nav>
    </div>
  )
}

function IconContainer({
  mouseX,
  item,
  active,
  labelMode,
}: {
  mouseX: MotionValue<number>
  item: FloatingDockItem
  active: boolean
  labelMode: 'hover' | 'always'
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [hovered, setHovered] = useState(false)

  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return value - bounds.x - bounds.width / 2
  })

  const spring = { mass: 0.1, stiffness: 150, damping: 12 }
  const size = useSpring(useTransform(distance, [-150, 0, 150], [40, 72, 40]), spring)
  const iconSize = useSpring(useTransform(distance, [-150, 0, 150], [20, 34, 20]), spring)

  const showLabel = labelMode === 'always' || hovered || active

  return (
    <a
      ref={ref}
      href={item.href}
      {...linkProps(item)}
      aria-label={item.title}
      aria-current={active ? 'true' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="relative rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
    >
      <motion.div
        style={{ width: size, height: size }}
        className={cn(
          'relative flex aspect-square items-center justify-center rounded-full border transition-colors duration-200',
          active
            ? 'border-blue-400/50 bg-blue-500/15 text-blue-200'
            : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-blue-400/40 hover:text-blue-200',
        )}
      >
        <motion.div
          style={{ width: iconSize, height: iconSize }}
          className="flex items-center justify-center [&>svg]:h-full [&>svg]:w-full"
        >
          {item.icon}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showLabel ? (
          <motion.span
            initial={{ opacity: 0, y: -6, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -4, x: '-50%' }}
            transition={{ duration: 0.15 }}
            className={cn(
              'pointer-events-none absolute -bottom-6 left-1/2 whitespace-pre text-[0.625rem] font-semibold uppercase tracking-[0.18em]',
              active ? 'text-blue-300' : 'text-slate-400',
            )}
          >
            {item.title}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </a>
  )
}

function FloatingDockMobile({
  items,
  activeHref,
  className,
}: {
  items: FloatingDockItem[]
  activeHref?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className={cn('fixed bottom-5 right-5 z-50 md:hidden', className)}>
      <AnimatePresence>
        {open ? (
          <motion.div className="absolute bottom-full right-0 mb-3 flex flex-col items-end gap-2">
            {items.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                {...linkProps(item)}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { delay: index * 0.03 } }}
                transition={{ delay: (items.length - 1 - index) * 0.03 }}
                className={cn(
                  'flex items-center gap-3 rounded-full border py-2 pl-3 pr-4 text-xs font-semibold uppercase tracking-[0.18em] shadow-lg shadow-black/30 backdrop-blur-xl',
                  activeHref === item.href
                    ? 'border-blue-400/50 bg-blue-500/15 text-blue-200'
                    : 'border-slate-800 bg-slate-950/90 text-slate-300',
                )}
              >
                <span className="flex h-5 w-5 items-center justify-center [&>svg]:h-full [&>svg]:w-full">
                  {item.icon}
                </span>
                {item.title}
              </motion.a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-800 bg-slate-950/90 text-slate-200 shadow-2xl shadow-black/40 backdrop-blur-xl transition hover:border-blue-400/40 hover:text-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      >
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex">
          <ChevronUp className="h-5 w-5" />
        </motion.span>
      </button>
    </div>
  )
}
