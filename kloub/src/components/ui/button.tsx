'use client'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  loading?: boolean
  children: React.ReactNode
}

export function Button({ variant = 'primary', size = 'md', loading, children, className, disabled, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 cursor-pointer select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060B18]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        size === 'sm' && 'px-3 py-1.5 text-xs',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-6 py-3 text-base',
        size === 'icon' && 'p-2 w-9 h-9',
        variant === 'primary' && 'bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20',
        variant === 'secondary' && 'bg-[#1E2D4A] hover:bg-[#253552] text-slate-200 border border-[#2A3A5A]',
        variant === 'ghost' && 'bg-transparent hover:bg-[#1E2D4A] text-slate-400 hover:text-slate-200',
        variant === 'danger' && 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20',
        variant === 'outline' && 'bg-transparent border border-sky-500/50 text-sky-400 hover:bg-sky-500/10',
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
}
