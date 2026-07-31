import type { ReactNode } from 'react'

interface SocialLinkProps {
  href: string
  label: string
  icon: ReactNode
}

export function SocialLink({ href, label, icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-slate-800/90 bg-slate-950/80 px-4 py-2 text-sm text-slate-200 transition hover:border-blue-400/40 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      aria-label={label}
    >
      {icon}
      <span>{label}</span>
    </a>
  )
}
