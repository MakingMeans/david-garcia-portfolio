import { cn } from '../../lib/cn'
import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent'
}

export function Card({ className, variant = 'default', ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-slate-800/70 bg-slate-950/80 p-6 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-transform hover:-translate-y-1',
        variant === 'accent' && 'border-blue-500/30 bg-blue-500/10',
        className,
      )}
      {...props}
    />
  )
}
