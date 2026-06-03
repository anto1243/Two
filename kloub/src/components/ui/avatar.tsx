import { cn } from '@/lib/utils'
const COLORS=['bg-blue-600','bg-violet-600','bg-emerald-600','bg-amber-600','bg-rose-600','bg-indigo-600']
function getColor(name:string){return COLORS[name.charCodeAt(0)%COLORS.length]}
function getInitials(name:string){return name.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase()}
interface AvatarProps{name:string;src?:string;size?:'xs'|'sm'|'md'|'lg'|'xl';className?:string}
export function Avatar({name,size='md',className}:AvatarProps){
  const sizes={xs:'w-6 h-6 text-[9px]',sm:'w-7 h-7 text-[10px]',md:'w-9 h-9 text-xs',lg:'w-11 h-11 text-sm',xl:'w-14 h-14 text-base'}
  return(
    <div className={cn('rounded-full flex items-center justify-center font-semibold shrink-0 text-white',getColor(name),sizes[size],className)}>
      {getInitials(name)}
    </div>
  )
}
export function AvatarGroup({names,max=3}:{names:string[];max?:number}){
  const shown=names.slice(0,max); const rest=names.length-max
  return(
    <div className="flex -space-x-2">
      {shown.map((n,i)=><Avatar key={i} name={n} size="sm" className="border-2 border-[#09090b]"/>)}
      {rest>0&&<div className="w-7 h-7 rounded-full bg-white/[0.06] border-2 border-[#09090b] flex items-center justify-center text-[10px] font-medium text-white/50">+{rest}</div>}
    </div>
  )
}
