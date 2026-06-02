'use client'
import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number
  max?: number
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'accent' | 'info'
  size?: 'xs' | 'sm' | 'md'
  animated?: boolean
  className?: string
}

export function Progress({ value, max = 100, color = 'primary', size = 'sm', animated, className }: ProgressProps) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className={cn('w-full bg-[#1E2D4A] rounded-full overflow-hidden', size === 'xs' && 'h-1', size === 'sm' && 'h-1.5', size === 'md' && 'h-2.5', className)}>
      <div
        className={cn(
          'h-full rounded-full transition-all duration-700',
          color === 'primary' && 'bg-gradient-to-r from-sky-500 to-sky-400',
          color === 'accent' && 'bg-gradient-to-r from-cyan-500 to-teal-400',
          color === 'success' && 'bg-gradient-to-r from-emerald-500 to-emerald-400',
          color === 'warning' && 'bg-gradient-to-r from-amber-500 to-amber-400',
          color === 'danger' && 'bg-gradient-to-r from-red-500 to-red-400',
          color === 'info' && 'bg-gradient-to-r from-sky-400 to-blue-400',
          animated && 'animate-pulse',
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
