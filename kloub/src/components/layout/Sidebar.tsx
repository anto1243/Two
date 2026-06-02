'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Users, Calendar, Brain, Gamepad2, MessageSquare,
  Heart, BarChart3, Video, CreditCard, Settings, ChevronLeft, ChevronRight,
  Trophy, Zap, Shield, Bell
} from 'lucide-react'
import { useState } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const NAV = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Hub Organisationnel', href: '/hub', icon: Calendar },
  { label: 'Coach IA', href: '/coach', icon: Brain },
  { label: 'Gamification', href: '/gamification', icon: Gamepad2 },
  { label: 'Réseau Social', href: '/social', icon: MessageSquare, badge: 4 },
  { label: 'Suivi Santé', href: '/health', icon: Heart },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Analyse Vidéo', href: '/video', icon: Video },
]

const BOTTOM_NAV = [
  { label: 'Facturation', href: '/billing', icon: CreditCard },
  { label: 'Paramètres', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={cn(
      'flex flex-col h-screen sticky top-0 border-r border-[#1E2D4A] bg-[#060B18] transition-all duration-300 shrink-0',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo */}
      <div className={cn('flex items-center gap-3 px-4 py-5 border-b border-[#1E2D4A]', collapsed && 'justify-center px-0')}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400 flex items-center justify-center shrink-0 glow-primary">
          <Shield className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div>
            <span className="text-lg font-bold gradient-text">KLoub</span>
            <span className="block text-[10px] text-slate-500 -mt-0.5">Sports Intelligence</span>
          </div>
        )}
      </div>

      {/* Club info */}
      {!collapsed && (
        <div className="mx-3 mt-3 p-3 rounded-lg bg-[#0D1526] border border-[#1E2D4A]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-xs font-bold text-white">FC</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">FC Olympique Paris</p>
              <p className="text-[10px] text-slate-500">Ligue 1 • Saison 2025/26</p>
            </div>
            <Badge variant="success" size="sm">Pro</Badge>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3 overflow-y-auto space-y-0.5">
        {NAV.map(({ label, href, icon: Icon, badge }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer group',
                collapsed && 'justify-center px-0',
                active
                  ? 'bg-sky-500/10 text-sky-400 border-l-2 border-sky-500 pl-[10px]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#1E2D4A]'
              )}
            >
              <Icon className={cn('shrink-0', collapsed ? 'w-5 h-5' : 'w-4 h-4')} />
              {!collapsed && (
                <>
                  <span className="flex-1 font-medium">{label}</span>
                  {badge && <span className="w-5 h-5 rounded-full bg-sky-500 text-white text-[10px] font-bold flex items-center justify-center">{badge}</span>}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 pb-2 space-y-0.5 border-t border-[#1E2D4A] pt-2">
        {BOTTOM_NAV.map(({ label, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all cursor-pointer',
                collapsed && 'justify-center px-0',
                active ? 'text-sky-400' : 'text-slate-500 hover:text-slate-300 hover:bg-[#1E2D4A]'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          )
        })}

        {/* User */}
        <div className={cn('flex items-center gap-3 px-3 py-3 rounded-lg mt-1 border border-[#1E2D4A] bg-[#0D1526]', collapsed && 'justify-center px-0')}>
          <Avatar name="Antoine Dupont" size="sm" />
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">Antoine Dupont</p>
              <p className="text-[10px] text-slate-500">Directeur Sportif</p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse btn */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#1E2D4A] border border-[#2A3A5A] flex items-center justify-center cursor-pointer hover:bg-[#253552] transition-colors z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3 text-slate-400" /> : <ChevronLeft className="w-3 h-3 text-slate-400" />}
      </button>
    </aside>
  )
}
