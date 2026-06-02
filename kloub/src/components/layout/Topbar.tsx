'use client'
import { Bell, Search, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { useState } from 'react'

interface TopbarProps {
  title: string
  subtitle?: string
}

export function Topbar({ title, subtitle }: TopbarProps) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4 border-b border-[#1E2D4A] bg-[#060B18]/90 backdrop-blur-xl">
      <div className="flex-1">
        <h1 className="text-lg font-bold text-slate-100">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>

      {/* Search */}
      <div className={`relative flex items-center transition-all duration-200 ${searchOpen ? 'w-64' : 'w-9'}`}>
        {searchOpen ? (
          <input
            autoFocus
            onBlur={() => setSearchOpen(false)}
            placeholder="Rechercher..."
            className="w-full pl-4 pr-10 py-2 bg-[#0D1526] border border-[#1E2D4A] rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
          />
        ) : null}
        <button
          onClick={() => setSearchOpen(true)}
          className="absolute right-0 p-2 text-slate-400 hover:text-slate-200 cursor-pointer"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* AI indicator */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20">
        <Zap className="w-3 h-3 text-sky-400" />
        <span className="text-xs font-medium text-sky-400">IA Active</span>
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-400" />
        </span>
      </div>

      {/* Notifications */}
      <button className="relative p-2 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors rounded-lg hover:bg-[#1E2D4A]">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-sky-400 rounded-full" />
      </button>

      <Avatar name="Antoine Dupont" size="sm" />
    </header>
  )
}
