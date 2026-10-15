import { useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import { RANKS, formatDate, formatDelta, rankFor, type RatingPoint } from '../../lib/codeforces'
import { useElementWidth } from '../../lib/use-element-width'
import { cn } from '../../lib/cn'

const HEIGHT = 220
const MARGIN = { top: 14, right: 16, bottom: 26, left: 40 }
const DAY = 86_400_000
/** Amber stands apart from every rank band it crosses, as Codeforces' gold line does. */
const LINE = '#fbbf24'
/** The panel fill, used as the ring that lifts each dot off the line. */
const SURFACE = '#050B18'
const TOOLTIP_WIDTH = 240

function monthTicks(from: number, to: number, plotWidth: number) {
  const ticks: { time: number; label: string }[] = []
  const cursor = new Date(from)
  cursor.setHours(0, 0, 0, 0)
  cursor.setDate(1)
  cursor.setMonth(cursor.getMonth() + 1)
  for (; cursor.getTime() <= to; cursor.setMonth(cursor.getMonth() + 1)) {
    ticks.push({ time: cursor.getTime(), label: '' })
  }

  // Keep at least ~64px between labels; the year rides on the first one and on every January.
  const every = Math.max(1, Math.ceil((ticks.length * 64) / plotWidth))
  return ticks
    .filter((_, i) => i % every === 0)
    .map(({ time }, i) => {
      const date = new Date(time)
      const month = date.toLocaleDateString('en-US', { month: 'short' })
      return { time, label: i === 0 || date.getMonth() === 0 ? `${month} ${date.getFullYear()}` : month }
    })
}

/** Band thresholds first – they are what the reader steers by – then round values where none fall. */
function ratingTicks(lo: number, hi: number, y: (rating: number) => number) {
  const thresholds = RANKS.slice(1)
    .map((rank) => rank.min)
    .filter((value) => value > lo && value < hi)
  const step = hi - lo > 1600 ? 400 : 200
  const round: number[] = []
  for (let value = Math.ceil(lo / step) * step; value < hi; value += step) round.push(value)

  const ticks = [...thresholds]
  for (const value of round) {
    if (ticks.every((tick) => Math.abs(y(tick) - y(value)) >= 18)) ticks.push(value)
  }
  return ticks.sort((a, b) => a - b)
}

export function RatingChart({ history }: { history: RatingPoint[] }) {
  const [ref, width] = useElementWidth<HTMLDivElement>()
  const [active, setActive] = useState<number | null>(null)

  if (history.length === 0) {
    return <p className="py-10 text-center text-sm text-slate-500">No rated contests yet.</p>
  }

  const plotWidth = Math.max(0, width - MARGIN.left - MARGIN.right)
  const plotHeight = HEIGHT - MARGIN.top - MARGIN.bottom

  const first = history[0].time
  const last = history[history.length - 1].time
  const span = Math.max(last - first, 60 * DAY)
  const middle = (first + last) / 2
  const x0 = middle - span * 0.54
  const x1 = middle + span * 0.54

  const ratings = history.map((point) => point.rating)
  const top = Math.max(...ratings)
  const nextRank = RANKS.find((rank) => rank.min > top)?.min ?? top
  const lo = Math.max(0, Math.floor((Math.min(...ratings) - 100) / 100) * 100)
  // Leave the next rank's band in view: it is the one being climbed towards.
  const hi = Math.ceil(Math.max(top + 150, nextRank + 100) / 100) * 100

  const x = (time: number) => MARGIN.left + ((time - x0) / (x1 - x0)) * plotWidth
  const y = (rating: number) => MARGIN.top + ((hi - rating) / (hi - lo)) * plotHeight

  const bands = RANKS.flatMap((rank, i) => {
    const from = Math.max(lo, rank.min)
    const to = Math.min(hi, RANKS[i + 1]?.min ?? Infinity)
    return to > from ? [{ rank, top: y(to), height: y(from) - y(to) }] : []
  })

  const path = history.map((point, i) => `${i ? 'L' : 'M'}${x(point.time)} ${y(point.rating)}`).join(' ')
  const lastPoint = history[history.length - 1]

  const nearest = (px: number) =>
    history.reduce((best, point, i) => (Math.abs(x(point.time) - px) < Math.abs(x(history[best].time) - px) ? i : best), 0)

  const onPointerMove = (event: PointerEvent<SVGRectElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    setActive(nearest(event.clientX - bounds.left + MARGIN.left))
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = active ?? history.length - 1
    const next =
      event.key === 'ArrowLeft' ? current - 1
      : event.key === 'ArrowRight' ? current + 1
      : event.key === 'Home' ? 0
      : event.key === 'End' ? history.length - 1
      : null
    if (next === null) return
    event.preventDefault()
    setActive(Math.min(history.length - 1, Math.max(0, next)))
  }

  const point = active === null ? null : history[active]
  const pointX = point ? x(point.time) : 0
  const tooltipLeft =
    pointX + 12 + TOOLTIP_WIDTH <= width ? pointX + 12 : Math.max(0, pointX - 12 - TOOLTIP_WIDTH)

  return (
    <div
      ref={ref}
      tabIndex={0}
      role="group"
      aria-label={`Rating history across ${history.length} rated contests. Use the arrow keys to read each one.`}
      onKeyDown={onKeyDown}
      onFocus={() => setActive((value) => value ?? history.length - 1)}
      onBlur={() => setActive(null)}
      className="relative rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      style={{ height: HEIGHT }}
    >
      {width > 0 ? (
        <svg width={width} height={HEIGHT} className="block" aria-hidden>
          {bands.map(({ rank, top: bandTop, height }) => (
            <g key={rank.name}>
              <rect x={MARGIN.left} y={bandTop} width={plotWidth} height={height} fill={rank.color} fillOpacity={0.12} />
              {height >= 16 ? (
                // Named on the left: the latest point, and its label, sit on the right.
                <text x={MARGIN.left + 6} y={bandTop + 12} className="fill-slate-500 text-[10px]">
                  {rank.name}
                </text>
              ) : null}
            </g>
          ))}

          {ratingTicks(lo, hi, y).map((tick) => (
            <g key={tick}>
              <line x1={MARGIN.left} x2={MARGIN.left + plotWidth} y1={y(tick)} y2={y(tick)} stroke="white" strokeOpacity={0.07} />
              <text x={MARGIN.left - 8} y={y(tick)} dy="0.32em" textAnchor="end" className="fill-slate-500 font-mono text-[10px] tabular-nums">
                {tick}
              </text>
            </g>
          ))}

          {monthTicks(x0, x1, plotWidth).map((tick) => (
            <text
              key={tick.time}
              x={x(tick.time)}
              y={HEIGHT - 8}
              textAnchor="middle"
              className="fill-slate-500 text-[10px]"
            >
              {tick.label}
            </text>
          ))}

          {point ? (
            <line x1={pointX} x2={pointX} y1={MARGIN.top} y2={MARGIN.top + plotHeight} stroke="#94a3b8" strokeOpacity={0.5} />
          ) : null}

          <path d={path} fill="none" stroke={LINE} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          {history.map((entry, i) => (
            <circle
              key={entry.contestId}
              cx={x(entry.time)}
              cy={y(entry.rating)}
              r={i === active ? 6 : 4}
              fill={LINE}
              stroke={SURFACE}
              strokeWidth={2}
            />
          ))}

          {/* Only the latest value is labelled; the tooltip and the history below carry the rest. */}
          <text
            x={x(lastPoint.time)}
            y={y(lastPoint.rating) - 12}
            textAnchor="end"
            className={cn('fill-slate-100 text-xs font-semibold transition-opacity', point && 'opacity-0')}
          >
            {lastPoint.rating}
          </text>

          <rect
            x={MARGIN.left}
            y={MARGIN.top}
            width={plotWidth}
            height={plotHeight}
            fill="transparent"
            onPointerMove={onPointerMove}
            onPointerLeave={() => setActive(null)}
          />
        </svg>
      ) : null}

      <div aria-live="polite" className="sr-only">
        {point ? `${point.contestName}: ${point.rating} (${formatDelta(point.delta)}), ${formatDate(point.time)}` : ''}
      </div>

      {point ? (
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-lg bg-slate-900/95 px-3 py-2.5 shadow-xl shadow-black/40 ring-1 ring-white/10 backdrop-blur"
          style={{ left: tooltipLeft, top: MARGIN.top, width: TOOLTIP_WIDTH }}
        >
          <p className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-white">{point.rating}</span>
            <span
              className={cn(
                'font-mono text-xs font-medium',
                point.delta > 0 ? 'text-emerald-300' : point.delta < 0 ? 'text-rose-300' : 'text-slate-400',
              )}
            >
              {formatDelta(point.delta)}
            </span>
            <span className="ml-auto text-xs font-medium" style={{ color: rankFor(point.rating).color }}>
              {rankFor(point.rating).name}
            </span>
          </p>
          <p className="mt-1 line-clamp-2 text-xs text-slate-300">{point.contestName}</p>
          <p className="mt-1 font-mono text-[0.7rem] text-slate-500">
            {formatDate(point.time)} · Rank #{point.place.toLocaleString('en-US')}
          </p>
        </div>
      ) : null}
    </div>
  )
}
