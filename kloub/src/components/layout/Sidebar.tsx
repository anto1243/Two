'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Calendar, Brain, Gamepad2, MessageSquare,
  Heart, BarChart3, Video, CreditCard, Settings, Shield
} from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const NAV_NAVIGATION = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
]

const NAV_MODULES = [
  { label: 'Hub', href: '/hub', icon: Calendar },
  { label: 'Coach IA', href: '/coach', icon: Brain },
  { label: 'Gamification', href: '/gamification', icon: Gamepad2 },
  { label: 'Social', href: '/social', icon: MessageSquare, badge: 4 },
  { label: 'Santé', href: '/health', icon: Heart },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Vidéo', href: '/video', icon: Video },
]

const NAV_GESTION = [
  { label: 'Facturation', href: '/billing', icon: CreditCard },
  { label: 'Paramètres', href: '/settings', icon: Settings },
]

function NavItem({ label, href, icon: Icon, badge }: {
  label: string
  href: string
  icon: React.ElementType
  badge?: number
}) {
  const pathname = usePathname()
  const active = href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
        active
          ? 'bg-gradient-to-r from-sky-500/20 to-transparent border-l-2 border-sky-400 text-sky-300 font-semibold'
          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
      )}
    >
      <Icon className={cn('w-5 h-5 shrink-0', active ? 'text-sky-400' : 'text-slate-500')} />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="w-5 h-5 rounded-full bg-sky-500 text-white text-[10px] font-bold flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  )
}

export function Sidebar() {
  return (
    <aside className="flex flex-col h-screen sticky top-0 border-r border-[#1E2D4A] bg-[#060B18] shrink-0 w-72">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#1E2D4A]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center shrink-0">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <div>
          <span className="text-lg font-bold gradient-text">KLoub</span>
          <span className="block text-[10px] text-slate-500 -mt-0.5">Sports Intelligence</span>
        </div>
      </div>

      {/* Team info card */}
      <div className="mx-3 mt-3 p-3 rounded-lg bg-[#0D1526] border border-[#1E2D4A]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-xs font-bold text-white shrink-0">
            FF
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">Équipe de France</p>
            <p className="text-[10px] text-slate-500">FIFA #2 · Saison 2024/25</p>
          </div>
          <Badge variant="success" size="sm">Elite</Badge>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto space-y-4">
        {/* NAVIGATION section */}
        <div>
          <p className="px-3 mb-1 text-[10px] font-semibold tracking-widest text-slate-600 uppercase">Navigation</p>
          <div className="space-y-0.5">
            {NAV_NAVIGATION.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </div>
        </div>

        {/* MODULES section */}
        <div>
          <p className="px-3 mb-1 text-[10px] font-semibold tracking-widest text-slate-600 uppercase">Modules</p>
          <div className="space-y-0.5">
            {NAV_MODULES.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </div>
        </div>

        {/* GESTION section */}
        <div>
          <p className="px-3 mb-1 text-[10px] font-semibold tracking-widest text-slate-600 uppercase">Gestion</p>
          <div className="space-y-0.5">
            {NAV_GESTION.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </div>
        </div>
      </nav>

      {/* User profile */}
      <div className="px-2 pb-3 pt-2 border-t border-[#1E2D4A]">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl border border-[#1E2D4A] bg-[#0D1526]">
          <Avatar name="Didier Deschamps" size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">Didier Deschamps</p>
            <p className="text-[10px] text-slate-500">Sélectionneur National</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
