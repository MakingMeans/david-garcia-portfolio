import { cn } from '../../lib/cn'
import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'

interface NavLinkProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  active?: boolean
}

export function NavLink({ className, active, ...props }: NavLinkProps) {
  return (
    <a
      className={cn(
        'rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2',
        active ? 'bg-slate-800 text-white shadow-sm shadow-blue-400/20' : 'text-slate-300 hover:text-white hover:bg-slate-900/80',
        className,
      )}
      {...props}
    />
  )
}
