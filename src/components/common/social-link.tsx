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

/** Icon plus label as a plain text link – no pill around it. */
export function SocialLink({ href, label, icon, external = true, className }: SocialLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'inline-flex items-center gap-2 rounded-md text-sm text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
        className,
      )}
    >
      {icon}
      <span>{label}</span>
    </a>
  )
}
