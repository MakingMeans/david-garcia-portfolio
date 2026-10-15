import { useState } from 'react'
import type { PointerEvent } from 'react'
import { dayKey } from '../../lib/codeforces'
import { useElementWidth } from '../../lib/use-element-width'

const CELL = 11
const GAP = 3
const STEP = CELL + GAP
const LABEL_WIDTH = 28
const TOP = 16
const TOOLTIP_WIDTH = 184
const DAY_LABELS = ['Mon', '', 'Wed', '', 'Fri', '', '']

/** Empty cell, then one green from dim to bright (validated against the panel fill). */
const LEVELS = ['#1e293b', '#166534', '#15803d', '#22c55e', '#86efac']
const LEVEL_HINTS = ['No submissions', '1 submission', '2–3 submissions', '4–6 submissions', '7 or more submissions']
const levelFor = (count: number) => (count === 0 ? 0 : count === 1 ? 1 : count <= 3 ? 2 : count <= 6 ? 3 : 4)

const addDays = (date: Date, days: number) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)

interface Cell {
  week: number
  weekday: number
  date: Date
  count: number
}

/**
 * Submissions per day, one column per week (Monday on top) ending today, as on
 * the Codeforces profile. It shows as many weeks as fit, up to a year.
 */
export function ActivityHeatmap({ perDay }: { perDay: Map<string, number> }) {
  const [ref, width] = useElementWidth<HTMLDivElement>()
  const [hovered, setHovered] = useState<Cell | null>(null)

  const weeks = Math.max(12, Math.min(53, Math.floor((width - LABEL_WIDTH + GAP) / STEP)))
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const start = addDays(today, -((today.getDay() + 6) % 7) - (weeks - 1) * 7)

  const cells: Cell[] = []
  for (let week = 0; week < weeks; week++) {
    for (let weekday = 0; weekday < 7; weekday++) {
      const date = addDays(start, week * 7 + weekday)
      if (date > today) break
      cells.push({ week, weekday, date, count: perDay.get(dayKey(date)) ?? 0 })
    }
  }

  // A month is named over the first week that starts in it, unless it would crowd the edge.
  const months = Array.from({ length: weeks }, (_, week) => addDays(start, week * 7)).flatMap((monday, week, all) =>
    week > 0 && week < weeks - 2 && monday.getMonth() !== all[week - 1].getMonth()
      ? [{ week, label: monday.toLocaleDateString('en-US', { month: 'short' }) }]
      : [],
  )

  const svgWidth = LABEL_WIDTH + weeks * STEP - GAP
  const svgHeight = TOP + 7 * STEP - GAP

  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const week = Math.floor((event.clientX - bounds.left - LABEL_WIDTH) / STEP)
    const weekday = Math.floor((event.clientY - bounds.top - TOP) / STEP)
    setHovered(cells.find((cell) => cell.week === week && cell.weekday === weekday) ?? null)
  }

  const tooltipCenter = hovered
    ? Math.min(Math.max(LABEL_WIDTH + hovered.week * STEP + CELL / 2, TOOLTIP_WIDTH / 2), width - TOOLTIP_WIDTH / 2)
    : 0

  return (
    <div>
      <div ref={ref} className="relative" style={{ height: svgHeight }}>
        {width > 0 ? (
          <svg
            width={svgWidth}
            height={svgHeight}
            role="img"
            aria-label={`Daily submissions over the last ${weeks} weeks`}
            className="block"
            onPointerMove={onPointerMove}
            onPointerLeave={() => setHovered(null)}
          >
            {months.map(({ week, label }) => (
              <text key={week} x={LABEL_WIDTH + week * STEP} y={10} className="fill-slate-500 text-[10px]">
                {label}
              </text>
            ))}
            {DAY_LABELS.map((label, weekday) =>
              label ? (
                <text key={label} x={0} y={TOP + weekday * STEP + CELL - 2} className="fill-slate-500 text-[10px]">
                  {label}
                </text>
              ) : null,
            )}
            {cells.map((cell) => (
              <rect
                key={cell.week * 7 + cell.weekday}
                x={LABEL_WIDTH + cell.week * STEP}
                y={TOP + cell.weekday * STEP}
                width={CELL}
                height={CELL}
                rx={2}
                fill={LEVELS[levelFor(cell.count)]}
                stroke={cell === hovered ? '#e2e8f0' : 'none'}
                strokeWidth={1.5}
              />
            ))}
          </svg>
        ) : null}

        {hovered ? (
          <div
            aria-hidden
            className="pointer-events-none absolute z-10 rounded-lg bg-slate-900/95 px-3 py-2 text-center shadow-xl shadow-black/40 ring-1 ring-white/10 backdrop-blur"
            style={{
              left: tooltipCenter - TOOLTIP_WIDTH / 2,
              top: TOP + hovered.weekday * STEP - 8,
              width: TOOLTIP_WIDTH,
              transform: 'translateY(-100%)',
            }}
          >
            <p className="text-sm font-semibold text-white">
              {hovered.count === 0 ? 'No' : hovered.count} submission{hovered.count === 1 ? '' : 's'}
            </p>
            <p className="font-mono text-[0.7rem] text-slate-400">
              {hovered.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-2 flex items-center justify-end gap-1.5 text-[0.7rem] text-slate-500">
        <span>Less</span>
        {LEVELS.map((color, level) => (
          <span
            key={color}
            title={LEVEL_HINTS[level]}
            className="h-[11px] w-[11px] rounded-[2px]"
            style={{ backgroundColor: color }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}
