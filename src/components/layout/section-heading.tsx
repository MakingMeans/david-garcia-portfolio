interface SectionHeadingProps {
  number: string
  title: string
  description?: string
}

export function SectionHeading({ number, title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm text-blue-400">{number}</span>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
      </div>
      {description ? <p className="max-w-2xl leading-7 text-slate-400">{description}</p> : null}
    </div>
  )
}
