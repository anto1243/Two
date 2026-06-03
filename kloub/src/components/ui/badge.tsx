'use client'
import { cn } from '@/lib/utils'
interface BadgeProps { children: React.ReactNode; variant?: 'default'|'success'|'warning'|'danger'|'info'|'outline'; size?: 'sm'|'md'; className?: string }
export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center font-medium rounded-md tracking-tight',
      size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
      variant === 'default' && 'bg-white/5 text-white/50 border border-white/10',
      variant === 'success' && 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15',
      variant === 'warning' && 'bg-amber-500/10 text-amber-400 border border-amber-500/15',
      variant === 'danger'  && 'bg-red-500/10 text-red-400 border border-red-500/15',
      variant === 'info'    && 'bg-blue-500/10 text-blue-400 border border-blue-500/15',
      variant === 'outline' && 'bg-transparent text-white/40 border border-white/10',
      className
    )}>{children}</span>
  )
}
