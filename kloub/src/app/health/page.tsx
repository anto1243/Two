'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import {
  AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip
} from 'recharts'
import { AlertTriangle, Shield, Activity, Calendar } from 'lucide-react'

const kpis = [
  { label: 'Effectif dispo', value: '20/23', sub: 'joueurs', icon: Shield },
  { label: 'Forme globale', value: '84', sub: '/ 100', icon: Activity },
  { label: 'À risque', value: '2', sub: 'joueurs', icon: AlertTriangle },
  { label: 'Jours sans blessure', value: '18', sub: 'jours', icon: Calendar },
]

const players = [
  { name: 'Mike Maignan', pos: 'GB', score: 94, status: 'optimal' },
  { name: 'William Saliba', pos: 'DC', score: 91, status: 'optimal' },
  { name: 'Kylian Mbappé', pos: 'ATT', score: 88, status: 'bon' },
  { name: 'Marcus Thuram', pos: 'ATT', score: 86, status: 'bon' },
  { name: 'Antoine Griezmann', pos: 'MIL', score: 83, status: 'bon' },
  { name: 'Aurélien Tchouaméni', pos: 'MIL', score: 41, status: 'blessé' },
]

const loadData = [
  { session: 'S1', charge: 72 },
  { session: 'S2', charge: 85 },
  { session: 'S3', charge: 68 },
  { session: 'S4', charge: 91 },
  { session: 'S5', charge: 78 },
  { session: 'S6', charge: 74 },
]

const alerts = [
  { player: 'Aurélien Tchouaméni', msg: 'Déchirure musculaire — retour estimé dans 3 semaines', level: 'critical' },
  { player: 'Benjamin Pavard', msg: "Surcharge à l'entraînement — surveillance accrue", level: 'warning' },
]

function statusColor(status: string) {
  if (status === 'optimal') return 'text-emerald-400'
  if (status === 'bon') return 'text-blue-400'
  if (status === 'blessé') return 'text-red-400'
  return 'text-white/40'
}

function scoreBarColor(score: number) {
  if (score >= 85) return 'bg-emerald-500'
  if (score >= 70) return 'bg-blue-500'
  if (score >= 50) return 'bg-amber-500'
  return 'bg-red-500'
}

export default function HealthPage() {
  return (
    <div className="min-h-screen bg-[#09090b]">
      <Topbar title="Santé & Performance" subtitle="Suivi médical et charge d'entraînement" />

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Wellness scores */}
          <div className="lg:col-span-2">
            <Card className="bg-[#111114] border-white/[0.06]">
              <CardHeader className="pb-4">
                <CardTitle className="text-[11px] uppercase tracking-widest text-white/30 font-normal">
                  Scores de forme — Joueurs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {players.map((p) => (
                  <div key={p.name} className="flex items-center gap-4">
                    <Avatar name={p.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-white/80 font-medium">{p.name}</span>
                          <span className="text-[10px] text-white/30 uppercase tracking-wider">{p.pos}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[11px] font-medium ${statusColor(p.status)}`}>
                            {p.status}
                          </span>
                          <span className="text-sm font-bold text-white/90 w-8 text-right">{p.score}</span>
                        </div>
                      </div>
                      <div className="h-[3px] w-full bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${scoreBarColor(p.score)}`}
                          style={{ width: `${p.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            {/* Load monitoring */}
            <Card className="bg-[#111114] border-white/[0.06]">
              <CardHeader className="pb-2">
                <CardTitle className="text-[11px] uppercase tracking-widest text-white/30 font-normal">
                  Charge d'entraînement — 6 sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-36">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={loadData} margin={{ top: 4, right: 0, left: -32, bottom: 0 }}>
                      <defs>
                        <linearGradient id="loadGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.08} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="session" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.25)' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.25)' }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ background: '#111114', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, fontSize: 11 }}
                        labelStyle={{ color: 'rgba(255,255,255,0.4)' }}
                        itemStyle={{ color: 'rgba(255,255,255,0.8)' }}
                      />
                      <Area type="monotone" dataKey="charge" stroke="#3b82f6" strokeWidth={1.5} fill="url(#loadGrad)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-white/30">
                  <span>Charge moyenne</span>
                  <span className="text-white/60 font-medium">78 UA</span>
                </div>
              </CardContent>
            </Card>

            {/* Alerts */}
            <Card className="bg-[#111114] border-white/[0.06]">
              <CardHeader className="pb-2">
                <CardTitle className="text-[11px] uppercase tracking-widest text-white/30 font-normal">
                  Alertes médicales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((a) => (
                  <div key={a.player} className={`p-3 rounded-lg border ${a.level === 'critical' ? 'border-red-500/20 bg-red-500/[0.04]' : 'border-amber-500/20 bg-amber-500/[0.04]'}`}>
                    <p className={`text-[11px] font-semibold mb-0.5 ${a.level === 'critical' ? 'text-red-400' : 'text-amber-400'}`}>{a.player}</p>
                    <p className="text-[11px] text-white/40 leading-relaxed">{a.msg}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Wellness legend */}
            <Card className="bg-[#111114] border-white/[0.06]">
              <CardContent className="pt-4 pb-4">
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-3">Légende</p>
                <div className="space-y-2">
                  {[
                    { color: 'bg-emerald-500', label: 'Optimal', range: '85–100' },
                    { color: 'bg-blue-500', label: 'Bon', range: '70–84' },
                    { color: 'bg-amber-500', label: 'Attention', range: '50–69' },
                    { color: 'bg-red-500', label: 'Blessé', range: '< 50' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span className="text-[11px] text-white/50">{item.label}</span>
                      </div>
                      <span className="text-[11px] text-white/25">{item.range}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
