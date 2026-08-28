import { cn } from '../../lib/cn'
import type { ImgHTMLAttributes } from 'react'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
}

export function Avatar({ className, alt, fallback = 'Profile image', ...props }: AvatarProps) {
  return (
    // `flex`, not `inline-flex`: an inline-level box sits on its parent's text
    // baseline, which added half a line of leading above the portrait and made
    // it hang below the column of copy beside it.
    <div
      className={cn(
        'relative flex overflow-hidden rounded-3xl border border-slate-700 bg-slate-950',
        className,
      )}
    >
      <img
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
        alt={alt ?? fallback}
        {...props}
      />
    </div>
  )
}
