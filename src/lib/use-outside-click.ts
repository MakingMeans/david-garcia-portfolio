import { useEffect } from 'react'
import type { RefObject } from 'react'

/**
 * Port of the Aceternity UI `use-outside-click` hook
 * (https://ui.aceternity.com/registry/use-outside-click.json), typed properly
 * instead of leaning on `any`/`Function`.
 */
export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: (event: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if the click landed on the element itself or its children.
      if (!ref.current || ref.current.contains(event.target as Node)) return
      callback(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, callback])
}
