import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, RotateCw, WifiOff, X } from 'lucide-react'
import { CodeforcesIcon } from '../common/codeforces-icon'
import { LoaderOne } from '../ui/loader'
import { RankEmblem } from './rank-emblem'
import { RatingChart } from './rating-chart'
import { ActivityHeatmap } from './activity-heatmap'
import { ContestHistory } from './contest-history'
import { CodeforcesModalContext } from '../../lib/codeforces-modal'
import { dayKey, type CodeforcesProfile } from '../../lib/codeforces'
import { useCodeforcesProfile } from '../../lib/use-codeforces-profile'
import { useOutsideClick } from '../../lib/use-outside-click'
import { asset, site } from '../../data/site'

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`

function Panel({ title, aside, children }: { title: string; aside?: string; children: ReactNode }) {
  return (
    <section className="rounded-xl bg-[#050B18] p-4 ring-1 ring-white/5 sm:p-5">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        {aside ? <p className="font-mono text-xs text-slate-500">{aside}</p> : null}
      </div>
      {children}
    </section>
  )
}

/** Shown when userpic.codeforces.org serves none of the profile's photos. */
const FALLBACK_PHOTO = asset('codeforces-fallback.jpg')

/**
 * The current Codeforces photo, framed in the rank's colour. Each source is
 * tried in turn and the stored picture only stands in when all of them fail;
 * the next opening tries Codeforces again.
 */
function ProfilePhoto({ sources, color, className }: { sources: string[]; color: string; className: string }) {
  const [attempt, setAttempt] = useState(0)

  return (
    <img
      src={sources[attempt] ?? FALLBACK_PHOTO}
      onError={() => setAttempt((value) => Math.min(value + 1, sources.length))}
      alt="Codeforces profile photo"
      referrerPolicy="no-referrer"
      decoding="async"
      className={`rounded-2xl bg-slate-950 object-cover object-top ${className}`}
      style={{ boxShadow: `0 0 0 1px ${color}80, 0 16px 40px -16px ${color}80` }}
    />
  )
}

function Profile({ profile }: { profile: CodeforcesProfile }) {
  const { rank, maxRank, handle } = profile

  return (
    <aside className="flex gap-5 lg:flex-col">
      <ProfilePhoto
        sources={profile.photos}
        color={rank.color}
        className="h-28 w-28 shrink-0 sm:h-36 sm:w-36 lg:aspect-square lg:h-auto lg:w-full"
      />

      <div className="min-w-0 space-y-4">
        <div className="space-y-1">
          <h2 className="truncate text-2xl font-semibold" style={{ color: rank.color }}>
            {/* Legendary grandmasters wear their first letter in the opposite ink, as on Codeforces. */}
            {rank.tier === 9 ? (
              <>
                <span className="text-white">{handle[0]}</span>
                {handle.slice(1)}
              </>
            ) : (
              handle
            )}
          </h2>
          {profile.organization || profile.location ? (
            <p className="text-sm text-slate-500">
              {[profile.organization, profile.location].filter(Boolean).join(' · ')}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-[#050B18] ring-1 ring-white/5">
            <RankEmblem rank={rank} className="h-12 w-12" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium" style={{ color: rank.color }}>
              {rank.name}
            </p>
            <p className="text-3xl font-semibold leading-tight text-white">{profile.rating}</p>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          Max {profile.maxRating} · <span style={{ color: maxRank.color }}>{maxRank.name}</span>
        </p>
      </div>
    </aside>
  )
}

function Stats({ profile }: { profile: CodeforcesProfile }) {
  const { solved, streak } = profile.activity
  const stats = [
    { value: solved.all, unit: 'problem', label: 'solved, all time' },
    { value: solved.year, unit: 'problem', label: 'solved, last year' },
    { value: solved.month, unit: 'problem', label: 'solved, last month' },
    { value: streak.all, unit: 'day', label: 'in a row, best' },
    { value: streak.year, unit: 'day', label: 'in a row, last year' },
    { value: streak.month, unit: 'day', label: 'in a row, last month' },
  ]

  return (
    <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-white/5 pt-5 sm:grid-cols-3">
      {stats.map(({ value, unit, label }) => (
        <div key={label} className="flex flex-col-reverse">
          <dt className="text-xs text-slate-500">{label}</dt>
          <dd className="text-lg font-semibold text-white">
            {value} <span className="text-sm font-normal text-slate-400">{unit + (value === 1 ? '' : 's')}</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}

function ProfileView({ profile }: { profile: CodeforcesProfile }) {
  const yearAgo = new Date()
  yearAgo.setFullYear(yearAgo.getFullYear() - 1)
  const since = dayKey(yearAgo)
  const submissionsThisYear = [...profile.activity.perDay].reduce(
    (total, [day, count]) => (day >= since ? total + count : total),
    0,
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <Profile profile={profile} />
        <div className="min-w-0 space-y-5">
          <Panel title="Rating" aside={plural(profile.ratingHistory.length, 'rated contest')}>
            <RatingChart history={profile.ratingHistory} />
          </Panel>
          <Panel title="Activity" aside={`${plural(submissionsThisYear, 'submission')} in the last year`}>
            <ActivityHeatmap perDay={profile.activity.perDay} />
            <Stats profile={profile} />
          </Panel>
        </div>
      </div>

      <div className="border-t border-white/5 p-4 sm:p-6">
        <ContestHistory contests={profile.contests} />
      </div>

      <p className="px-4 pb-5 font-mono text-[0.7rem] text-slate-600 sm:px-6">
        Live from the Codeforces API · fetched at{' '}
        {new Date(profile.fetchedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
      </p>
    </motion.div>
  )
}

function CodeforcesModal({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const { state, retry } = useCodeforcesProfile()

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    ref.current?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previous?.focus({ preventScroll: true })
    }
  }, [onClose])

  useOutsideClick(ref, onClose)

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] h-full w-full bg-slate-950/80 backdrop-blur-sm"
      />

      <div className="fixed inset-0 z-[70] grid place-items-center p-3 sm:p-6">
        <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="Codeforces profile"
          tabIndex={-1}
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-2xl shadow-black/60 ring-1 ring-white/10 focus:outline-none"
        >
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/5 px-4 py-3 sm:px-5">
            <a
              href={site.codeforces}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              <CodeforcesIcon className="h-4 w-4" />
              Open on Codeforces
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <div className="flex items-center gap-4">
              {state.status === 'ready' ? (
                <span className="hidden items-center gap-2 font-mono text-xs text-slate-500 sm:inline-flex">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Live data
                </span>
              ) : null}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Codeforces profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-x-hidden overflow-y-auto overscroll-contain">
            {state.status === 'ready' ? (
              <ProfileView profile={state.profile} />
            ) : state.status === 'error' ? (
              <div className="flex min-h-[50svh] flex-col items-center justify-center gap-4 p-6 text-center">
                <WifiOff className="h-8 w-8 text-slate-500" aria-hidden />
                <div className="space-y-1">
                  <p className="font-semibold text-white">Couldn’t reach Codeforces</p>
                  <p className="font-mono text-xs text-slate-500">{state.message}</p>
                </div>
                <button
                  type="button"
                  onClick={retry}
                  className="inline-flex items-center gap-2 rounded-full bg-white/5 px-5 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <RotateCw className="h-4 w-4" />
                  Try again
                </button>
              </div>
            ) : (
              <div className="flex min-h-[50svh] flex-col items-center justify-center gap-6">
                <LoaderOne />
                <p className="font-mono text-xs text-slate-500">Fetching live data from Codeforces…</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  )
}

/** Makes the profile modal available to every Codeforces link inside it. */
export function CodeforcesModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const show = useCallback(() => setOpen(true), [])
  const hide = useCallback(() => setOpen(false), [])

  return (
    <CodeforcesModalContext value={show}>
      {children}
      {/* Portalled to body so no transformed ancestor can trap the fixed layers. */}
      {typeof document !== 'undefined'
        ? createPortal(<AnimatePresence>{open ? <CodeforcesModal key="codeforces" onClose={hide} /> : null}</AnimatePresence>, document.body)
        : null}
    </CodeforcesModalContext>
  )
}
