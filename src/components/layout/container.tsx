import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/**
 * The single place the page's reading width is defined. Sections span the full
 * viewport so they can carry their own background, and wrap their content here.
 */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}
