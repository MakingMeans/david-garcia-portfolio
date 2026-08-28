import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/**
 * Accent-coloured key term with an underline that grows out from the centre on
 * hover. Keep the phrase short: it is `inline-block`, so it will not break
 * across lines.
 */
export function Highlight({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'relative inline-block font-medium text-blue-300',
        'after:absolute after:-bottom-0.5 after:left-1/2 after:h-px after:w-0 after:bg-blue-300',
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
