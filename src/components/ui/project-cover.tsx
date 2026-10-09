import { cn } from '../../lib/cn'

interface ProjectCoverProps {
  /** Full GitHub URL; shown as the path you would clone. */
  repo: string
  stack: string[]
  className?: string
}

/**
 * Stand-in artwork for a project with no screenshots yet: a terminal line that
 * clones the real repository, over a faint grid. Everything on it comes from
 * the project's own data, so it never repeats the card title or promises an
 * image that does not exist.
 */
export function ProjectCover({ repo, stack, className }: ProjectCoverProps) {
  const path = repo.replace(/^https?:\/\/(www\.)?github\.com\//, '')

  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col justify-center gap-3 overflow-hidden bg-[#0B1324] px-6 text-left font-mono sm:px-8',
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:32px_32px]"
      />
      <div
        aria-hidden
        className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl transition duration-500 group-hover:bg-blue-500/25"
      />

      <div aria-hidden className="relative flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-600/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-600/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-600/70" />
      </div>
      <p className="relative text-sm leading-6 text-slate-300 [overflow-wrap:anywhere]">
        <span className="text-blue-400">$</span> git clone {path}
      </p>
      <p className="relative text-xs text-slate-500">{stack.join(' · ')}</p>
    </div>
  )
}
