import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/**
 * Key term, set brighter than the copy around it, with an underline in the
 * term's own colour that grows out from the centre on hover. Blue is kept for
 * things you can click, so the term stays neutral. Use two or three per
 * paragraph at most, and keep the phrase short: it is `inline-block`, so it
 * will not break across lines.
 */
export function Highlight({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'relative inline-block font-medium text-slate-100',
        'after:absolute after:-bottom-0.5 after:left-1/2 after:h-px after:w-0 after:bg-current',
        'after:transition-all after:duration-300 after:content-[""]',
        'hover:after:left-0 hover:after:w-full',
        'motion-reduce:after:transition-none',
        className,
      )}
    >
      {children}
    </span>
  )
}
