import { cn } from '@/lib/utils'

interface AvatarProps {
  name: string
  src?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const COLORS = [
  'from-sky-500 to-cyan-500',
  'from-violet-500 to-purple-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-amber-500',
  'from-rose-500 to-pink-500',
  'from-blue-500 to-indigo-500',
]

function getColor(name: string) {
  const i = name.charCodeAt(0) % COLORS.length
  return COLORS[i]
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const sizes = { xs: 'w-6 h-6 text-xs', sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-lg' }
  return (
    <div className={cn('rounded-full flex items-center justify-center font-semibold shrink-0 bg-gradient-to-br', getColor(name), sizes[size], className)}>
      {getInitials(name)}
    </div>
  )
}

export function AvatarGroup({ names, max = 3 }: { names: string[]; max?: number }) {
  const shown = names.slice(0, max)
  const rest = names.length - max
  return (
    <div className="flex -space-x-2">
      {shown.map((name, i) => (
        <Avatar key={i} name={name} size="sm" className="border-2 border-[#060B18]" />
      ))}
      {rest > 0 && (
        <div className="w-8 h-8 rounded-full bg-[#1E2D4A] border-2 border-[#060B18] flex items-center justify-center text-xs font-medium text-slate-400">
          +{rest}
        </div>
      )}
    </div>
  )
}
