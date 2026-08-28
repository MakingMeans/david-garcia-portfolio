import type { ReactNode } from 'react'

/** Page background only – width is owned by each section via `Container`. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {children}
    </div>
  )
}
