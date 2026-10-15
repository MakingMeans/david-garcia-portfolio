import { createContext, useContext } from 'react'
import type { MouseEvent } from 'react'

/** Opens the Codeforces profile modal; null outside its provider. */
export const CodeforcesModalContext = createContext<(() => void) | null>(null)

/**
 * Click handler for a link to the Codeforces profile: a plain click opens the
 * modal, while modified clicks (new tab, new window) are left to the browser so
 * the link itself keeps working.
 */
export function useCodeforcesClick() {
  const open = useContext(CodeforcesModalContext)

  return (event: MouseEvent<HTMLAnchorElement>) => {
    if (!open || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    open()
  }
}
