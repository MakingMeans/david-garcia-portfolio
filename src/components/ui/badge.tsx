import { cn } from '../../lib/cn'
import type { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'accent'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition-colors',
        variant === 'default' && 'bg-slate-800 text-slate-100',
        variant === 'outline' && 'border border-slate-700 text-slate-200 bg-transparent',
        variant === 'accent' && 'bg-blue-500/15 text-blue-300 border border-blue-500/20',
        className,
      )}
      {...props}
    />
  )
}
