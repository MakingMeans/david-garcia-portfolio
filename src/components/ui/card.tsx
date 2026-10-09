import { cn } from '../../lib/cn'
import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent'
}

/**
 * Static surface. Told apart from the page by a lighter fill rather than an
 * outline, and it does not lift on hover – nothing here is clickable, so it
 * should not pretend to be.
 */
export function Card({ className, variant = 'default', ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-slate-900/50 p-6',
        variant === 'accent' && 'bg-blue-500/[0.08]',
        className,
      )}
      {...props}
    />
  )
}
