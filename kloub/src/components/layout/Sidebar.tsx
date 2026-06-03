'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Calendar, Brain, Gamepad2, MessageSquare, Heart, BarChart3, Video, CreditCard, Settings, Shield } from 'lucide-react'

const SECTIONS = [
  {
    label: 'Général',
    items: [{ label: 'Dashboard', href: '/', icon: LayoutDashboard }],
  },
  {
    label: 'Modules',
    items: [
      { label: 'Hub', href: '/hub', icon: Calendar },
      { label: 'Coach IA', href: '/coach', icon: Brain },
      { label: 'Gamification', href: '/gamification', icon: Gamepad2 },
      { label: 'Social', href: '/social', icon: MessageSquare, badge: 4 },
      { label: 'Santé', href: '/health', icon: Heart },
      { label: 'Analytics', href: '/analytics', icon: BarChart3 },
      { label: 'Vidéo', href: '/video', icon: Video },
    ],
  },
  {
    label: 'Gestion',
    items: [
      { label: 'Facturation', href: '/billing', icon: CreditCard },
      { label: 'Paramètres', href: '/settings', icon: Settings },
    ],
  },
]

function NavItem({ label, href, icon: Icon, badge }: { label: string; href: string; icon: React.ElementType; badge?: number }) {
  const pathname = usePathname()
  const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
  return (
    <Link href={href} className={cn(
      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-100 group',
      active ? 'bg-white/[0.06] text-white/90' : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
    )}>
      <Icon className={cn('w-4 h-4 shrink-0', active ? 'text-white/80' : 'text-white/30 group-hover:text-white/50')} />
      <span className={cn('flex-1 font-medium', active ? 'font-semibold' : '')}>{label}</span>
      {badge && (
        <span className="w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center">{badge}</span>
      )}
      {active && <div className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />}
    </Link>
  )
}

export function Sidebar() {
  return (
    <aside className="flex flex-col h-screen sticky top-0 w-60 shrink-0 bg-[#09090b] border-r border-white/[0.05]">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.05]">
        <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
          <Shield className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <span className="text-sm font-bold text-white tracking-tight">KLoub</span>
          <span className="block text-[10px] text-white/30 leading-none mt-0.5">Sports Intelligence</span>
        </div>
      </div>

      {/* Team */}
      <div className="px-3 pt-4 pb-2">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">FF</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white/80 truncate leading-tight">Équipe de France</p>
            <p className="text-[10px] text-white/30 leading-tight mt-0.5">FIFA #2 · Saison 2024/25</p>
          </div>
          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md border border-emerald-500/15">Elite</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        {SECTIONS.map(section => (
          <div key={section.label} className="mb-5">
            <p className="px-3 mb-1.5 text-[10px] font-semibold tracking-[0.08em] text-white/20 uppercase">{section.label}</p>
            <div className="space-y-0.5">
              {section.items.map(item => <NavItem key={item.href} {...item} />)}
            </div>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 pb-4 pt-2 border-t border-white/[0.05]">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">DD</div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white/80 truncate leading-tight">Didier Deschamps</p>
            <p className="text-[10px] text-white/30 leading-tight mt-0.5">Sélectionneur National</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
