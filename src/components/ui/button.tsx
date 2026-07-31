import { cn } from '../../lib/cn'
import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'ghost'
}

export function Button({
  className,
  variant = 'default',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        variant === 'default' && 'bg-blue-500 text-white hover:bg-blue-400',
        variant === 'secondary' && 'border border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-500 hover:bg-slate-800',
        variant === 'ghost' && 'bg-transparent text-slate-200 hover:bg-slate-800',
        className,
      )}
      {...props}
    />
  )
}
