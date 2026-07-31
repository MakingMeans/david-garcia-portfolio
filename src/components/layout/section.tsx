import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title: string
  subtitle?: string
  children: ReactNode
}

export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="py-24 sm:py-28">
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">{id}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
          </div>
          {subtitle ? <p className="max-w-2xl text-sm leading-6 text-slate-400">{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </section>
  )
}
