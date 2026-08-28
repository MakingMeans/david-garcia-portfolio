import { Card } from './card'
import { cn } from '../../lib/cn'
import type { ReactNode } from 'react'

interface BentoCardProps {
  title: string
  description: string
  detail?: string
  className?: string
  icon?: ReactNode
}

export function BentoCard({ title, description, detail, className, icon }: BentoCardProps) {
  return (
    <Card className={cn('group relative overflow-hidden border-slate-800/80 bg-slate-950/80', className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="relative space-y-4">
        {icon ? <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-300">{icon}</div> : null}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm leading-7 text-slate-400">{description}</p>
        </div>
        {detail ? <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">{detail}</p> : null}
      </div>
    </Card>
  )
}
