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
    <Card className={cn('flex flex-col gap-4', className)}>
      {icon ? <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">{icon}</div> : null}
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="text-sm leading-6 text-slate-400">{description}</p>
      </div>
      {detail ? <p className="mt-auto font-mono text-xs leading-5 text-slate-500">{detail}</p> : null}
    </Card>
  )
}
