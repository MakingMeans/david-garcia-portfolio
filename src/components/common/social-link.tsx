import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface SocialLinkProps {
  href: string
  label: string
  icon: ReactNode
  /** `mailto:` links should not open a blank tab. */
  external?: boolean
  className?: string
}

export function SocialLink({ href, label, icon, external = true, className }: SocialLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full border border-slate-800/90 bg-slate-950/80 px-4 py-2 text-sm text-slate-200 transition hover:border-blue-400/40 hover:bg-slate-900 hover:text-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
        className,
      )}
      aria-label={label}
    >
      {icon}
      <span>{label}</span>
    </a>
  )
}
