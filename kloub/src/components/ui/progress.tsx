'use client'
import { cn } from '@/lib/utils'
interface ProgressProps { value:number; max?:number; color?:'primary'|'success'|'warning'|'danger'|'accent'|'info'; size?:'xs'|'sm'|'md'; className?:string }
export function Progress({ value, max=100, color='primary', size='sm', className }: ProgressProps) {
  const pct = Math.min(100, (value/max)*100)
  return (
    <div className={cn('w-full bg-white/[0.05] rounded-full overflow-hidden', size==='xs'&&'h-0.5', size==='sm'&&'h-[3px]', size==='md'&&'h-1.5', className)}>
      <div className={cn('h-full rounded-full transition-all duration-700',
        color==='primary'&&'bg-blue-500',
        color==='accent' &&'bg-blue-400',
        color==='success'&&'bg-emerald-500',
        color==='warning'&&'bg-amber-500',
        color==='danger' &&'bg-red-500',
        color==='info'   &&'bg-blue-400',
      )} style={{width:`${pct}%`}}/>
    </div>
  )
}
