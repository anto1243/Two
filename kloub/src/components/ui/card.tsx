import { cn } from '@/lib/utils'

interface CardProps { children: React.ReactNode; className?: string; hover?: boolean }
export function Card({ children, className, hover }: CardProps) {
  return (
    <div className={cn('bg-[#111114] border border-white/[0.06] rounded-2xl', hover && 'card-hover cursor-pointer', className)}>
      {children}
    </div>
  )
}
export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 pt-6 pb-4', className)}>{children}</div>
}
export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6 pb-6', className)}>{children}</div>
}
export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('text-sm font-semibold text-white/90 tracking-tight', className)}>{children}</h3>
}
