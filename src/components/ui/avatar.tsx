import { cn } from '../../lib/cn'
import type { ImgHTMLAttributes } from 'react'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
}

export function Avatar({ className, alt, fallback = 'Profile image', ...props }: AvatarProps) {
  return (
    <div className={cn('relative inline-flex overflow-hidden rounded-3xl border border-slate-700 bg-slate-950', className)}>
      <img
        className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
        alt={alt ?? fallback}
        {...props}
      />
    </div>
  )
}
