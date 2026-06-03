'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  BarChart, Bar, AreaChart, Area, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts'
import { Trophy, Target, TrendingUp, Shield } from 'lucide-react'

const kpis = [
  { label: 'Buts marqués', value: '19', sub: 'LDN 2024/25', icon: Target },
  { label: 'Moy. par match', value: '3.2', sub: 'buts / match', icon: TrendingUp },
  { label: 'Possession', value: '62%', sub: 'moyenne', icon: Shield },
  { label: 'Tirs cadrés', value: '7.1', sub: '/ match', icon: Trophy },
]

const results = [
  { match: 'BEL', result: 'V', score: '2-1', date: 'Sept 24' },
  { match: 'ISR', result: 'V', score: '4-1', date: 'Oct 24' },
  { match: 'ITA', result: 'V', score: '3-1', date: 'Oct 24' },
  { match: 'BEL', result: 'V', score: '3-2', date: 'Nov 24' },
  { match: 'ITA', result: 'V', score: '3-1', date: 'Nov 24' },
]

const scorers = [
  { name: 'Mbappé', goals: 8 },
  { name: 'Thuram', goals: 6 },
  { name: 'Griezmann', goals: 5 },
  { name: 'Dembélé', goals: 3 },
  { name: 'Camavinga', goals: 2 },
]

const perfOverTime = [
  { match: 'BEL (A)', buts: 2, possession: 58, tirs: 6 },
  { match: 'ISR (D)', buts: 4, possession: 65, tirs: 9 },
  { match: 'ITA (D)', buts: 3, possession: 63, tirs: 7 },
  { match: 'BEL (D)', buts: 3, possession: 61, tirs: 7 },
  { match: 'ITA (A)', buts: 3, possession: 64, tirs: 8 },
]

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#09090b]">
      <Topbar title="Analytiques" subtitle="Ligue des Nations 2024/25 — Groupe A2 · Rang #1" />

      <div className="px-8 py-8 space-y-8 max-w-7xl mx-auto">

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(({ label, value, sub, icon: Icon }) => (
            <Card key={label} className="bg-[#111114] border-white/[0.06]">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-white/30 mb-2">{label}</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-bold text-white/90">{value}</span>
                      <span className="text-xs text-white/30">{sub}</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.04]">
                    <Icon className="w-4 h-4 text-white/30" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Top row: results + scorers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Results */}
          <Card className="bg-[#111114] border-white/[0.06]">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[11px] uppercase tracking-widest text-white/30 font-normal">
                  Résultats LDN
                </CardTitle>
                <Badge className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  5V 0N 0D
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {results.map((r, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded flex items-center justify-center bg-emerald-500/10">
                      <span className="text-[10px] font-bold text-emerald-400">V</span>
                    </div>
                    <div>
                      <p className="text-sm text-white/80 font-medium">France vs {r.match}</p>
                      <p className="text-[11px] text-white/30">{r.date}</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-white/70">{r.score}</span>
                </div>
              ))}
              <div className="pt-3 flex items-center justify-between text-[11px]">
                <span className="text-white/30">Clean sheets</span>
                <span className="text-white/60 font-medium">3 / 5</span>
              </div>
            </CardContent>
          </Card>

          {/* Top scorers */}
          <div className="lg:col-span-2">
            <Card className="bg-[#111114] border-white/[0.06] h-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-[11px] uppercase tracking-widest text-white/30 font-normal">
                  Buteurs — LDN 2024/25
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scorers} margin={{ top: 4, right: 4, left: -28, bottom: 0 }} barSize={28}>
                      <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.35)' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.25)' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                        contentStyle={{ background: '#111114', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, fontSize: 11 }}
                        labelStyle={{ color: 'rgba(255,255,255,0.4)' }}
                        itemStyle={{ color: 'rgba(255,255,255,0.8)' }}
                        formatter={(v) => [`${v} buts`, '']}
                      />
                      <Bar dataKey="goals" fill="#3b82f6" fillOpacity={0.7} radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {scorers.map((s) => (
                    <div key={s.name} className="text-center">
                      <p className="text-lg font-bold text-white/90">{s.goals}</p>
                      <p className="text-[10px] text-white/30 truncate">{s.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance over time */}
        <Card className="bg-[#111114] border-white/[0.06]">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[11px] uppercase tracking-widest text-white/30 font-normal">
                Performance match par match
              </CardTitle>
              <div className="flex items-center gap-4 text-[11px] text-white/30">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-[2px] bg-blue-400 rounded" />
                  <span>Buts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-[2px] bg-white/20 rounded" />
                  <span>Possession %</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={perfOverTime} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <defs>
                    <linearGradient id="butsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.08} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="possGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.04} />
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="0" vertical={false} />
                  <XAxis dataKey="match" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.30)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.25)' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#111114', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, fontSize: 11 }}
                    labelStyle={{ color: 'rgba(255,255,255,0.4)' }}
                    itemStyle={{ color: 'rgba(255,255,255,0.8)' }}
                  />
                  <Area type="monotone" dataKey="possession" stroke="rgba(255,255,255,0.2)" strokeWidth={1} fill="url(#possGrad)" dot={false} />
                  <Area type="monotone" dataKey="buts" stroke="#3b82f6" strokeWidth={1.5} fill="url(#butsGrad)" dot={{ fill: '#3b82f6', r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Additional stats row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Tirs totaux', value: '185', sub: 'sur 5 matchs' },
            { label: 'Passes réussies', value: '89%', sub: 'précision moy.' },
            { label: 'Fautes subies', value: '68', sub: 'sur 5 matchs' },
          ].map((stat) => (
            <Card key={stat.label} className="bg-[#111114] border-white/[0.06]">
              <CardContent className="pt-5 pb-5 text-center">
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-2">{stat.label}</p>
                <p className="text-4xl font-bold text-white/90">{stat.value}</p>
                <p className="text-xs text-white/30 mt-1">{stat.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  )
}
