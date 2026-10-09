import { cn } from '../../lib/cn'
import type { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'accent'
}

/** Mono, sentence case: tech names keep their real spelling (C++, PostgreSQL). */
export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2.5 py-1 font-mono text-xs transition-colors',
        variant === 'default' && 'bg-slate-800/70 text-slate-300',
        variant === 'outline' && 'bg-transparent text-slate-300 ring-1 ring-inset ring-slate-700',
        variant === 'accent' && 'bg-blue-500/10 text-blue-200',
        className,
      )}
      {...props}
    />
  )
}
