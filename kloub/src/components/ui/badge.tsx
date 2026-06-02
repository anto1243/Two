'use client'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center font-medium rounded-full',
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
      variant === 'default' && 'bg-slate-800 text-slate-300 border border-slate-700',
      variant === 'success' && 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      variant === 'warning' && 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
      variant === 'danger' && 'bg-red-500/10 text-red-400 border border-red-500/20',
      variant === 'info' && 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
      variant === 'outline' && 'bg-transparent text-slate-400 border border-slate-600',
      className
    )}>
      {children}
    </span>
  )
}
