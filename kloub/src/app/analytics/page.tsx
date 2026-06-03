'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart3, TrendingUp, Target, Clock, Download, Trophy } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts'

const RESULTATS = [
  { match: 'vs BEL', buts: 2, encaissés: 1, possession: 60, note: 78 },
  { match: 'vs ISR', buts: 4, encaissés: 1, possession: 67, note: 92 },
  { match: 'vs ITA', buts: 3, encaissés: 1, possession: 58, note: 85 },
  { match: 'vs BEL', buts: 3, encaissés: 2, possession: 63, note: 88 },
  { match: 'vs ITA', buts: 3, encaissés: 1, possession: 65, note: 82 },
  { match: 'vs ISR', buts: 4, encaissés: 1, possession: 70, note: 94 },
]

const RADAR_DATA = [
  { attr: 'Possession', val: 64 }, { attr: 'Pressing', val: 81 },
  { attr: 'Transition', val: 78 }, { attr: 'Duels gagnés', val: 72 },
  { attr: 'Tirs cadrés', val: 86 }, { attr: 'Organisation défensive', val: 75 },
]

const BUTEURS = [
  { nom: 'K. Mbappé', buts: 8, passes: 4, min_but: 112 },
  { nom: 'M. Thuram', buts: 6, passes: 3, min_but: 149 },
  { nom: 'A. Griezmann', buts: 5, passes: 9, min_but: 178 },
  { nom: 'B. Barcola', buts: 3, passes: 2, min_but: 235 },
  { nom: 'O. Dembélé', buts: 2, passes: 5, min_but: 354 },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Tip = ({ active, payload, label }: any) => active && payload?.length ? (
  <div className="bg-[#0D1526] border border-[#2A3A5A] px-3 py-2 rounded-lg text-xs shadow-xl">
    <p className="text-slate-400 mb-1 font-medium">{label}</p>
    {payload.map((p: { name: string; value: number; color: string }, i: number) => (
      <p key={i} style={{ color: p.color }} className="font-semibold">{p.name}: {p.value}</p>
    ))}
  </div>
) : null

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Topbar title="Analytics" subtitle="Statistiques détaillées · Ligue des Nations 2024/25 · Groupe A2" />
      <div className="p-6 space-y-5">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Victoires consécutives', value: '6', sub: 'Phase de groupes — 6/6', icon: Trophy, color: 'text-amber-400', bg: 'bg-amber-500/10' },
            { label: 'Buts marqués', value: '19', sub: '3.2 par match', icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
            { label: 'Buts encaissés', value: '7', sub: '1.2 par match', icon: BarChart3, color: 'text-sky-400', bg: 'bg-sky-500/10' },
            { label: 'Possession moyenne', value: '64%', sub: '+6% vs adversaires', icon: TrendingUp, color: 'text-violet-400', bg: 'bg-violet-500/10' },
          ].map(k => (
            <Card key={k.label} hover>
              <CardContent className="p-4">
                <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center mb-3`}>
                  <k.icon className={`w-4 h-4 ${k.color}`} />
                </div>
                <p className="text-2xl font-black text-slate-100">{k.value}</p>
                <p className="text-xs font-semibold text-slate-400 mt-1">{k.label}</p>
                <p className="text-[11px] text-slate-600 mt-0.5">{k.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Buts marqués / encaissés par match</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">Ligue des Nations 2024/25 — Phase de groupes</p>
              </div>
              <Button variant="ghost" size="sm"><Download className="w-3.5 h-3.5" />Export</Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={RESULTATS} barSize={20} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2D4A" vertical={false} />
                  <XAxis dataKey="match" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<Tip />} />
                  <Legend wrapperStyle={{ fontSize: 11, color: '#8B9FC0' }} />
                  <Bar dataKey="buts" name="Buts marqués" fill="#22C55E" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="encaissés" name="Buts encaissés" fill="#EF4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profil tactique collectif</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">Analyse IA sur les 6 matchs de phase de groupes</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <RadarChart data={RADAR_DATA}>
                  <PolarGrid stroke="#1E2D4A" />
                  <PolarAngleAxis dataKey="attr" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <Radar dataKey="val" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.2} strokeWidth={2}
                    dot={{ fill: '#0EA5E9', r: 3 }} />
                  <Tooltip contentStyle={{ background: '#0D1526', border: '1px solid #1E2D4A', borderRadius: 8, fontSize: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Évolution de la note collective</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">Score IA par match — tendance haussière</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={RESULTATS} margin={{ left: -20 }}>
                  <defs>
                    <linearGradient id="ng" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2D4A" vertical={false} />
                  <XAxis dataKey="match" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[70, 100]} tick={{ fontSize: 10, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<Tip />} />
                  <Area type="monotone" dataKey="note" name="Note collective" stroke="#0EA5E9" fill="url(#ng)" strokeWidth={2.5}
                    dot={{ fill: '#0EA5E9', r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: '#22D3EE', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Classement des buteurs</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">Ligue des Nations 2024/25 — Équipe de France</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {BUTEURS.map((b, i) => (
                <div key={b.nom} className="flex items-center gap-4">
                  <span className={`text-sm font-black w-5 text-center ${i === 0 ? 'text-amber-400' : 'text-slate-600'}`}>{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-semibold text-slate-200">{b.nom}</span>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-emerald-400 font-bold">{b.buts} buts</span>
                        <span className="text-sky-400">{b.passes} passes</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-[#1E2D4A] rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-700"
                        style={{ width: `${(b.buts / 8) * 100}%` }} />
                    </div>
                    <p className="text-[10px] text-slate-600 mt-1">1 but toutes les {b.min_but} min</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
