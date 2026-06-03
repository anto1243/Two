'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trophy, Target, TrendingUp, Layers, Download } from 'lucide-react'
import {
  BarChart, Bar, AreaChart, Area,
  ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
} from 'recharts'

const RESULTATS = [
  { match: 'BEL', buts: 2, encaissés: 1, note: 78 },
  { match: 'ISR', buts: 4, encaissés: 1, note: 92 },
  { match: 'ITA', buts: 3, encaissés: 1, note: 85 },
  { match: 'BEL', buts: 3, encaissés: 2, note: 88 },
  { match: 'ITA', buts: 3, encaissés: 1, note: 91 },
]

const BUTEURS = [
  { nom: 'K. Mbappé',     buts: 8 },
  { nom: 'M. Thuram',     buts: 6 },
  { nom: 'A. Griezmann',  buts: 5 },
  { nom: 'O. Dembélé',    buts: 3 },
  { nom: 'E. Camavinga',  buts: 2 },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Tip = ({ active, payload, label }: any) =>
  active && payload?.length ? (
    <div className="bg-[#111114] border border-white/[0.06] px-3 py-2 rounded-lg text-xs shadow-xl">
      <p className="text-white/30 mb-1.5">{label}</p>
      {payload.map((p: { name: string; value: number; color: string }, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-medium">{p.name}: {p.value}</p>
      ))}
    </div>
  ) : null

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col min-h-full bg-[#09090b]">
      <Topbar title="Analytics" subtitle="Ligue des Nations 2024/25 · Groupe A2 · Phase de groupes" />

      <div className="p-6 space-y-5">

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Victoires',       value: '5/5',   sub: 'Groupe A2 · Rang #1', icon: Trophy,    accent: 'text-amber-400' },
            { label: 'Buts marqués',    value: '19',    sub: '3.2 buts / match',    icon: Target,    accent: 'text-emerald-400' },
            { label: 'Possession moy.', value: '62%',   sub: '+6% vs adversaires',  icon: Layers,    accent: 'text-blue-400' },
            { label: 'Tirs cadrés',     value: '7.1',   sub: 'par match · 3 clean sheets', icon: TrendingUp, accent: 'text-white/60' },
          ].map(k => (
            <Card key={k.label}>
              <CardContent className="p-5">
                <k.icon className={`w-4 h-4 ${k.accent} mb-4`} />
                <p className="text-3xl font-bold text-white/90 tabular-nums">{k.value}</p>
                <p className="text-xs font-medium text-white/60 mt-1">{k.label}</p>
                <p className="text-[11px] text-white/20 mt-0.5">{k.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Résultats LDN */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">LDN 2024/25</p>
              <CardTitle>Résultats · Phase de groupes</CardTitle>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { opp: 'BEL', score: '2-1', res: 'V' },
                { opp: 'ISR', score: '4-1', res: 'V' },
                { opp: 'ITA', score: '3-1', res: 'V' },
                { opp: 'BEL', score: '3-2', res: 'V' },
                { opp: 'ITA', score: '3-1', res: 'V' },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                  <span className="text-[11px] text-white/30">{r.opp}</span>
                  <span className="text-[11px] font-semibold text-white/90">{r.score}</span>
                  <Badge variant="success">{r.res}</Badge>
                </div>
              ))}
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Buts par match */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Performance</p>
                <CardTitle>Buts par match</CardTitle>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="w-3.5 h-3.5" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={RESULTATS} barSize={16} barGap={4} margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="match" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.2)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.2)' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<Tip />} />
                  <Bar dataKey="buts"      name="Buts marqués"   fill="#3b82f6"             radius={[3, 3, 0, 0]} />
                  <Bar dataKey="encaissés" name="Buts encaissés"  fill="rgba(255,255,255,0.08)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance over time */}
          <Card>
            <CardHeader className="pb-2">
              <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Tendance</p>
              <CardTitle>Note collective par match</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={210}>
                <AreaChart data={RESULTATS} margin={{ left: -20 }}>
                  <defs>
                    <linearGradient id="noteGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.08} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="match" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.2)' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[70, 100]} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.2)' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<Tip />} />
                  <Area
                    type="monotone" dataKey="note" name="Note collective"
                    stroke="#3b82f6" strokeWidth={1.5} fill="url(#noteGrad)"
                    dot={{ fill: '#3b82f6', r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: '#60a5fa', strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Top scorers bar chart */}
          <Card>
            <CardHeader className="pb-2">
              <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Buteurs</p>
              <CardTitle>Classement des buteurs</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={170}>
                <BarChart data={BUTEURS} layout="vertical" barSize={10} margin={{ left: 4, right: 24 }}>
                  <XAxis type="number" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.2)' }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="nom" width={82} tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.6)' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<Tip />} />
                  <Bar dataKey="buts" name="Buts" fill="#3b82f6" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Stats grid */}
          <Card>
            <CardHeader className="pb-2">
              <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Statistiques clés</p>
              <CardTitle>Groupe A2 · Rang #1</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-px bg-white/[0.04] rounded-xl overflow-hidden">
                {[
                  { label: 'Buts totaux',    value: '19' },
                  { label: 'Moy./match',     value: '3.2' },
                  { label: 'Possession',     value: '62%' },
                  { label: 'Tirs cadrés',    value: '7.1/m' },
                  { label: 'Clean sheets',   value: '3' },
                  { label: 'xG moyen',       value: '2.9' },
                  { label: 'Passes réussies', value: '89%' },
                  { label: 'Duels gagnés',   value: '54%' },
                ].map(s => (
                  <div key={s.label} className="bg-[#111114] px-4 py-3">
                    <p className="text-xl font-bold text-white/90 tabular-nums">{s.value}</p>
                    <p className="text-[11px] text-white/30 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
