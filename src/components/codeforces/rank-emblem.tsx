import { useId } from 'react'
import type { Rank } from '../../lib/codeforces'

/** Points of a regular polygon or star centred in the 64×64 box, pointing up. */
function ring(count: number, radius: (i: number) => number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = ((Math.PI * 2) / count) * i - Math.PI / 2
    return `${(32 + radius(i) * Math.cos(angle)).toFixed(2)},${(32 + radius(i) * Math.sin(angle)).toFixed(2)}`
  }).join(' ')
}

const hexagon = (radius: number) => ring(6, () => radius)
const star = (points: number, outer: number, inner: number) => ring(points * 2, (i) => (i % 2 ? inner : outer))

const OUTER = hexagon(26)
const INNER = hexagon(20.5)

/**
 * The mark inside the gem climbs with the rank: chevrons for the first three,
 * a cut gem for expert, stars for the master tiers and a crown for the
 * grandmasters.
 */
function Glyph({ tier }: { tier: number }) {
  if (tier <= 2) {
    const count = tier + 1
    return (
      <g fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
        {Array.from({ length: count }, (_, i) => {
          const y = 32 - (7 * (count - 1)) / 2 + 7 * i
          return <path key={i} d={`M23 ${y + 4} L32 ${y - 4} L41 ${y + 4}`} />
        })}
      </g>
    )
  }

  if (tier === 3) {
    return (
      <g>
        <polygon points="32,17 44,32 32,47 20,32" fill="currentColor" />
        <path
          d="M20 32 H44 M32 17 L26.5 32 L32 47 M32 17 L37.5 32 L32 47"
          fill="none"
          stroke="#0b1220"
          strokeOpacity={0.45}
          strokeWidth={1.2}
        />
      </g>
    )
  }

  if (tier === 4) return <polygon points={star(4, 15, 5)} fill="currentColor" />
  if (tier <= 6) return <polygon points={star(5, 14, 6)} fill="currentColor" />

  return (
    <g fill="currentColor">
      <path d="M19 41 L17.5 23.5 L25.5 30 L32 19.5 L38.5 30 L46.5 23.5 L45 41 Z" strokeLinejoin="round" />
      <rect x="19" y="43.5" width="26" height="3.5" rx="1.5" />
    </g>
  )
}

/**
 * Codeforces has no rank artwork of its own, so this draws one: a dark gem
 * framed in the rank's colour. Wings mark the master tiers, a crest the
 * grandmasters, a ring the "international" step within each, and a filled
 * medallion the legendary one.
 */
export function RankEmblem({ rank, className }: { rank: Rank; className?: string }) {
  const gradientId = `emblem-${useId().replace(/[^\w-]/g, '')}`
  const winged = rank.tier >= 4
  const crested = rank.tier >= 7
  const ringed = rank.tier === 6 || rank.tier >= 8
  const legendary = rank.tier === 9

  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={`${rank.name} emblem`}
      className={className}
      style={{ color: rank.color, filter: crested ? `drop-shadow(0 0 6px ${rank.color}66)` : undefined }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity={0.32} />
          <stop offset="1" stopColor="currentColor" stopOpacity={0.06} />
        </linearGradient>
      </defs>

      {winged ? (
        <g fill="currentColor" opacity={0.85}>
          <polygon points="9,21 1.5,27 5.5,32 1.5,37 9,43" />
          <polygon points="55,21 62.5,27 58.5,32 62.5,37 55,43" />
        </g>
      ) : null}
      {crested ? <polygon points="25,10 32,0.5 39,10" fill="currentColor" /> : null}

      <polygon points={OUTER} fill="#0b1220" />
      <polygon
        points={OUTER}
        fill={`url(#${gradientId})`}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <polygon points={INNER} fill="none" stroke="currentColor" strokeOpacity={0.35} strokeWidth={1} />
      {ringed ? (
        <circle cx="32" cy="32" r="15.5" fill={legendary ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.75} />
      ) : null}

      <g
        transform={ringed ? 'translate(32 32) scale(0.7) translate(-32 -32)' : undefined}
        style={legendary ? { color: '#0b1220' } : undefined}
      >
        <Glyph tier={rank.tier} />
      </g>
    </svg>
  )
}
