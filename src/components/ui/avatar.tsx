import { cn } from '../../lib/cn'
import type { ImgHTMLAttributes } from 'react'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
}

/**
 * Round portrait. The source is a head-and-shoulders shot taller than it is
 * wide, so the crop is pinned to the top to keep the face centred in the
 * circle.
 */
export function Avatar({ className, alt, fallback = 'Profile image', ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full bg-slate-900 ring-1 ring-white/10',
        className,
      )}
    >
      <img
        className="h-full w-full object-cover object-top"
        decoding="async"
        alt={alt ?? fallback}
        {...props}
      />
    </div>
  )
}
