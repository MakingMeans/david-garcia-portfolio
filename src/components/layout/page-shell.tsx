import type { ReactNode } from 'react'

/** Page background only – width is owned by each section via `Container`. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {children}
    </div>
  )
}
