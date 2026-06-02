'use client'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export function Card({ children, className, hover, glow }: CardProps) {
  return (
    <div className={cn(
      'bg-[#0D1526] border border-[#1E2D4A] rounded-xl',
      hover && 'card-hover cursor-pointer',
      glow && 'glow-primary',
      className
    )}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-5 border-b border-[#1E2D4A]', className)}>{children}</div>
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('p-5', className)}>{children}</div>
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('text-sm font-semibold text-slate-200', className)}>{children}</h3>
}
