import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, ChevronDown, Clock, Hourglass, Minus, TrendingDown, TrendingUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  formatDate,
  formatDelta,
  rankFor,
  type ContestEntry,
  type ContestOutcome,
  type ProblemAttempt,
} from '../../lib/codeforces'
import { RankEmblem } from './rank-emblem'
import { cn } from '../../lib/cn'

type Filter = 'all' | 'rated' | 'unrated'

const isRated = (contest: ContestEntry) =>
  contest.outcome === 'gain' || contest.outcome === 'loss' || contest.outcome === 'even'

const neutral = {
  row: 'from-slate-400/15 via-slate-400/[0.06] to-slate-400/[0.02] ring-white/10',
  bar: 'bg-slate-400',
  delta: 'text-slate-300',
}

/** Green when rating was gained, red when lost, grey when nothing moved. */
const OUTCOMES: Record<ContestOutcome, typeof neutral & { label: string; icon: LucideIcon }> = {
  gain: {
    row: 'from-emerald-500/25 via-emerald-500/10 to-emerald-500/[0.03] ring-emerald-400/20',
    bar: 'bg-emerald-400',
    delta: 'text-emerald-300',
    label: 'Rated',
    icon: TrendingUp,
  },
  loss: {
    row: 'from-rose-500/25 via-rose-500/10 to-rose-500/[0.03] ring-rose-400/20',
    bar: 'bg-rose-400',
    delta: 'text-rose-300',
    label: 'Rated',
    icon: TrendingDown,
  },
  even: { ...neutral, label: 'Rated', icon: Minus },
  unrated: { ...neutral, label: 'Unrated', icon: Minus },
  pending: { ...neutral, label: 'Pending', icon: Hourglass },
}

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.round((seconds % 3600) / 60)
  return [hours ? `${hours}h` : '', minutes ? `${minutes}m` : ''].filter(Boolean).join(' ')
}

function describe(problem: ProblemAttempt) {
  const tries = `${problem.failed} failed attempt${problem.failed === 1 ? '' : 's'}`
  if (problem.solved) return problem.failed ? `Solved after ${tries}` : 'Solved first try'
  return `Not solved, ${tries}`
}

function Problems({ problems }: { problems: ProblemAttempt[] }) {
  if (problems.length === 0) return <span>No submissions</span>

  return (
    <span className="flex flex-wrap gap-1">
      {problems.map((problem) => (
        <span
          key={problem.index}
          title={`${problem.index}. ${problem.name} — ${describe(problem)}`}
          className={cn(
            'rounded px-1.5 py-px font-mono text-[0.7rem] font-medium',
            problem.solved
              ? 'bg-white/10 text-slate-100'
              : 'text-slate-500 line-through ring-1 ring-inset ring-white/10',
          )}
        >
          {problem.index}
          <span className="sr-only">{problem.solved ? ' solved' : ' not solved'}</span>
        </span>
      ))}
    </span>
  )
}

function Ratings({ contest, className }: { contest: ContestEntry; className?: string }) {
  return (
    <span className={cn('font-mono tabular-nums', className)}>
      <span style={{ color: rankFor(contest.before).color }}>{contest.before}</span>
      <span className="text-slate-500"> → </span>
      {contest.outcome === 'pending' ? (
        <span className="text-slate-400">?</span>
      ) : (
        <span style={{ color: rankFor(contest.after).color }}>{contest.after}</span>
      )}
    </span>
  )
}

function ContestRow({ contest }: { contest: ContestEntry }) {
  const style = OUTCOMES[contest.outcome]
  const Icon = style.icon
  const url = `https://codeforces.com/contest/${contest.id}`
  const date = formatDate(contest.start)
  const duration = formatDuration(contest.duration)
  // The rank held going into the contest, not the one it led to.
  const rank = rankFor(contest.before)

  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-gradient-to-r py-3 pl-5 pr-3 ring-1 ring-inset sm:pr-4', style.row)}>
      <span aria-hidden className={cn('absolute inset-y-0 left-0 w-1', style.bar)} />

      <div className="flex items-center gap-4 sm:gap-5">
        <div className="hidden w-24 shrink-0 sm:block">
          <p className="text-sm font-medium text-slate-100">{date}</p>
          {duration ? (
            <p className="mt-0.5 inline-flex items-center gap-1 font-mono text-xs text-slate-400">
              <Clock className="h-3 w-3" aria-hidden />
              {duration}
            </p>
          ) : null}
        </div>

        <span title={rank.name} className="shrink-0">
          <RankEmblem rank={rank} className="h-9 w-9 sm:h-10 sm:w-10" />
        </span>

        <div className="min-w-0 flex-1">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={contest.name}
            className="line-clamp-2 rounded text-sm font-medium md:line-clamp-1 text-white underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            {contest.name}
          </a>
          <p className="mt-0.5 font-mono text-xs text-slate-400 sm:hidden">
            {date}
            {duration ? ` · ${duration}` : ''}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-400">
            <Problems problems={contest.problems} />
            <span>
              {contest.failed === 0
                ? 'No failed attempts'
                : `${contest.failed} failed attempt${contest.failed === 1 ? '' : 's'}`}
            </span>
            {contest.place ? <span>Rank #{contest.place.toLocaleString('en-US')}</span> : null}
            <Ratings contest={contest} className="md:hidden" />
          </div>
        </div>

        <div className="hidden w-28 shrink-0 text-right md:block">
          <Ratings contest={contest} className="text-sm" />
          <p className="mt-0.5 text-[0.7rem] uppercase tracking-wider text-slate-500">Rating</p>
        </div>

        <div className="w-16 shrink-0 text-right sm:w-20">
          <p className={cn('text-xl font-semibold tabular-nums', style.delta)}>
            {contest.outcome === 'pending' ? '—' : formatDelta(contest.after - contest.before)}
          </p>
          <p className="mt-0.5 inline-flex items-center gap-1 text-[0.65rem] font-medium uppercase tracking-wider text-slate-400">
            <Icon className="h-3 w-3" aria-hidden />
            {style.label}
          </p>
        </div>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden
          className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-white/10 hover:text-white sm:flex"
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

/** Every contest entered live, most recent first, coloured by what it did to the rating. */
export function ContestHistory({ contests }: { contests: ContestEntry[] }) {
  const [filter, setFilter] = useState<Filter>('all')

  const rated = contests.filter(isRated)
  const counts: Record<Filter, number> = {
    all: contests.length,
    rated: rated.length,
    unrated: contests.length - rated.length,
  }
  const visible = filter === 'all' ? contests : contests.filter((contest) => isRated(contest) === (filter === 'rated'))

  return (
    <section aria-labelledby="contest-history-title">
      <div className="space-y-1">
        <h3 id="contest-history-title" className="text-lg font-semibold text-white">
          Contest history
        </h3>
        <p className="text-sm text-slate-400">Every contest I have entered live, most recent first.</p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <label className="relative inline-flex">
          <span className="sr-only">Show contests</span>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value as Filter)}
            className="cursor-pointer appearance-none rounded-lg bg-slate-800/80 py-2 pl-3.5 pr-9 text-xs font-medium uppercase tracking-[0.14em] text-slate-200 ring-1 ring-white/10 transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <option value="all">All contests ({counts.all})</option>
            <option value="rated">Rated ({counts.rated})</option>
            <option value="unrated">Unrated ({counts.unrated})</option>
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
          />
        </label>
        <p className="font-mono text-xs text-slate-500">
          {visible.length} contest{visible.length === 1 ? '' : 's'}
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="mt-4 rounded-xl bg-white/[0.03] py-10 text-center text-sm text-slate-500">
          No {filter === 'all' ? '' : `${filter} `}contests yet.
        </p>
      ) : (
        <ol className="mt-4 space-y-2">
          <AnimatePresence mode="popLayout">
            {visible.map((contest, index) => (
              <motion.li
                key={contest.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: { delay: Math.min(index, 10) * 0.03 } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                <ContestRow contest={contest} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
      )}
    </section>
  )
}
