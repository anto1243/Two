'use client'
import { Bell, Search } from 'lucide-react'
import { Avatar } from '@/components/ui/avatar'
import { useState } from 'react'

interface TopbarProps { title: string; subtitle?: string }

export function Topbar({ title, subtitle }: TopbarProps) {
  const [s, setS] = useState(false)
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-8 py-4 border-b border-white/[0.05] bg-[#09090b]/95 backdrop-blur-md">
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-semibold text-white/90 tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-white/30 mt-0.5 truncate">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-1">
        {s ? (
          <input autoFocus onBlur={() => setS(false)} placeholder="Rechercher..."
            className="w-52 px-3 py-1.5 bg-white/[0.05] border border-white/10 rounded-lg text-xs text-white/80 placeholder-white/30 focus:outline-none focus:border-white/20" />
        ) : (
          <button onClick={() => setS(true)} className="p-2 text-white/30 hover:text-white/60 cursor-pointer transition-colors rounded-lg hover:bg-white/[0.04]">
            <Search className="w-4 h-4" />
          </button>
        )}
        <button className="relative p-2 text-white/30 hover:text-white/60 cursor-pointer transition-colors rounded-lg hover:bg-white/[0.04]">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full" />
        </button>
        <Avatar name="Didier Deschamps" size="sm" className="ml-1" />
      </div>
    </header>
  )
}
