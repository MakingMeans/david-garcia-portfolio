interface SectionHeadingProps {
  number: string
  title: string
  description?: string
}

export function SectionHeading({ number, title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-300">
          {number}
        </span>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
      </div>
      {description ? <p className="max-w-3xl text-slate-400">{description}</p> : null}
    </div>
  )
}
