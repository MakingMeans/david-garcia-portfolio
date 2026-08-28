import { useEffect, useState } from 'react'

/**
 * Tracks which of the given section ids is currently in view and returns it as
 * a hash (`#about`) so it can be compared directly against nav hrefs.
 */
export function useActiveSection(ids: string[]): string | undefined {
  const [active, setActive] = useState<string | undefined>(undefined)

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActive(`#${visible.target.id}`)
      },
      // Bias the viewport towards its middle so a section counts as "current"
      // only once it actually dominates the screen.
      { rootMargin: '-40% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])

  return active
}
