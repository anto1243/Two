'use client'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?:'primary'|'secondary'|'ghost'|'danger'|'outline'; size?:'sm'|'md'|'lg'|'icon'; loading?:boolean; children:React.ReactNode }
export function Button({ variant='primary', size='md', loading, children, className, disabled, ...props }: ButtonProps) {
  return (
    <button disabled={disabled||loading} className={cn(
      'inline-flex items-center justify-center gap-1.5 font-medium rounded-lg transition-all duration-150 cursor-pointer select-none',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500/60',
      'disabled:opacity-40 disabled:cursor-not-allowed',
      size === 'sm'   && 'px-3 py-1.5 text-xs',
      size === 'md'   && 'px-4 py-2 text-sm',
      size === 'lg'   && 'px-5 py-2.5 text-sm',
      size === 'icon' && 'p-2 w-8 h-8',
      variant === 'primary'   && 'bg-blue-500 hover:bg-blue-400 text-white',
      variant === 'secondary' && 'bg-white/[0.06] hover:bg-white/[0.09] text-white/80 border border-white/[0.08]',
      variant === 'ghost'     && 'bg-transparent hover:bg-white/[0.05] text-white/50 hover:text-white/80',
      variant === 'danger'    && 'bg-red-500/10 hover:bg-red-500/15 text-red-400 border border-red-500/15',
      variant === 'outline'   && 'bg-transparent border border-white/10 text-white/70 hover:bg-white/[0.04]',
      className
    )} {...props}>
      {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
      {children}
    </button>
  )
}
