import { cn } from '../../lib/cn'
import type { ReactNode, HTMLAttributes } from 'react'

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  content: string
  children: ReactNode
}

export function Tooltip({ content, children, className, ...props }: TooltipProps) {
  return (
    <div className={cn('group relative inline-flex', className)} {...props}>
      {children}
      <span className="pointer-events-none absolute bottom-full mb-2 hidden w-max rounded-xl bg-slate-900 px-3 py-2 text-xs text-slate-100 opacity-0 transition-opacity duration-200 group-hover:block group-hover:opacity-100">
        {content}
      </span>
    </div>
  )
}
