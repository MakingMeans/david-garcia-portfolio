import type { SVGProps } from 'react'

/**
 * The Codeforces mark – three bars of rising and falling height – drawn as an
 * outline so it sits beside the lucide icons without looking heavier.
 */
export function CodeforcesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="2.5" y="10" width="5" height="11" rx="1.5" />
      <rect x="9.5" y="3" width="5" height="18" rx="1.5" />
      <rect x="16.5" y="7" width="5" height="14" rx="1.5" />
    </svg>
  )
}
