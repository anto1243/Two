'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar } from '@/components/ui/avatar'
import { AlertTriangle, Activity, Shield, Calendar } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

const JOUEURS = [
  { nom: 'Mike Maignan',        club: 'AC Milan',    pos: 'G',   score: 94, statut: 'good' },
  { nom: 'William Saliba',      club: 'Arsenal',     pos: 'DC',  score: 91, statut: 'good' },
  { nom: 'Kylian Mbappé',       club: 'Real Madrid', pos: 'ATT', score: 88, statut: 'good' },
  { nom: 'Marcus Thuram',       club: 'Inter Milan', pos: 'ATT', score: 86, statut: 'good' },
  { nom: 'Antoine Griezmann',   club: 'Atlético',    pos: 'ATT', score: 83, statut: 'good' },
  { nom: 'Aurélien Tchouaméni', club: 'Real Madrid', pos: 'MDC', score: 41, statut: 'danger' },
]

const LOAD_DATA = [
  { s: 'S1', charge: 620 },
  { s: 'S2', charge: 740 },
  { s: 'S3', charge: 580 },
  { s: 'S4', charge: 810 },
  { s: 'S5', charge: 690 },
  { s: 'S6', charge: 750 },
]

const scoreColor = (s: number) =>
  s >= 80 ? 'text-emerald-400' : s >= 60 ? 'text-amber-400' : 'text-red-400'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Tip = ({ active, payload, label }: any) =>
  active && payload?.length ? (
    <div className="bg-[#111114] border border-white/[0.06] px-3 py-2 rounded-lg text-xs">
      <p className="text-white/30 mb-1">{label}</p>
      <p className="text-blue-400 font-semibold">{payload[0].value} UA</p>
    </div>
  ) : null

export default function HealthPage() {
  return (
    <div className="flex flex-col min-h-full bg-[#09090b]">
      <Topbar title="Suivi Santé" subtitle="Monitoring temps réel · Prévention blessures · Rassemblement juin 2025" />

      <div className="p-6 space-y-5">

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Effectif disponible', value: '20/23', sub: 'Groupe de 23', icon: Shield, accent: 'text-blue-400' },
            { label: 'Forme globale', value: '84/100', sub: 'Indice équipe', icon: Activity, accent: 'text-emerald-400' },
            { label: 'À risque', value: '2', sub: 'Surveillance active', icon: AlertTriangle, accent: 'text-amber-400' },
            { label: 'Jours sans blessure', value: '18', sub: 'Série en cours', icon: Calendar, accent: 'text-white/60' },
          ].map(k => (
            <Card key={k.label}>
              <CardContent className="p-5">
                <k.icon className={`w-4 h-4 ${k.accent} mb-4`} />
                <p className={`text-3xl font-bold text-white/90 tabular-nums`}>{k.value}</p>
                <p className="text-xs font-medium text-white/60 mt-1">{k.label}</p>
                <p className="text-[11px] text-white/20 mt-0.5">{k.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Player list */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Wellness Scores</p>
              <CardTitle>Joueurs · Groupe de 23</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 pb-4">
              {JOUEURS.map(j => (
                <div
                  key={j.nom}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl border transition-colors cursor-pointer
                    ${j.statut === 'danger'
                      ? 'border-red-500/20 bg-red-500/[0.04]'
                      : 'border-transparent hover:bg-white/[0.02]'}`}
                >
                  <Avatar name={j.nom} size="sm" />

                  <div className="w-36 shrink-0">
                    <p className="text-sm font-medium text-white/90 truncate">{j.nom}</p>
                    <p className="text-[11px] text-white/30">{j.club} · {j.pos}</p>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-bold tabular-nums ${scoreColor(j.score)}`}>
                        {j.score}<span className="text-white/20 font-normal">/100</span>
                      </span>
                      {j.statut === 'danger' && (
                        <Badge variant="danger">Blessé</Badge>
                      )}
                      {j.statut === 'good' && (
                        <Badge variant="success">Disponible</Badge>
                      )}
                    </div>
                    <Progress
                      value={j.score}
                      max={100}
                      color={j.score >= 80 ? 'success' : j.score >= 60 ? 'warning' : 'danger'}
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Right column */}
          <div className="space-y-4">

            {/* Load monitoring chart */}
            <Card>
              <CardHeader>
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Load Monitoring</p>
                <CardTitle>Charge d'entraînement</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-3xl font-bold text-white/90">750</span>
                  <span className="text-sm text-white/30 mb-1">UA · session 6</span>
                </div>
                <ResponsiveContainer width="100%" height={90}>
                  <AreaChart data={LOAD_DATA} margin={{ left: -30, right: 4, bottom: 0, top: 4 }}>
                    <defs>
                      <linearGradient id="loadGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.08} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="s" tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.2)' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<Tip />} />
                    <Area type="monotone" dataKey="charge" stroke="#3b82f6" strokeWidth={1.5} fill="url(#loadGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Injury alerts */}
            <Card>
              <CardHeader>
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Alertes</p>
                <CardTitle>Surveillance médicale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="flex items-start gap-3 p-3 rounded-xl border border-red-500/20 bg-red-500/[0.04]">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0 animate-pulse" />
                  <div>
                    <p className="text-xs font-medium text-white/90">A. Tchouaméni — Cuisse droite</p>
                    <p className="text-[11px] text-white/30 mt-0.5">Blessé · Retour estimé J+14</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.04]">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-white/90">K. Mbappé — Charge élevée</p>
                    <p className="text-[11px] text-white/30 mt-0.5">Surveillance · Repos préventif conseillé</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl border border-white/[0.06]">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-white/60">Groupe · 20 joueurs disponibles</p>
                    <p className="text-[11px] text-white/20 mt-0.5">Forme globale optimale</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Devices */}
            <Card>
              <CardHeader>
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Capteurs</p>
                <CardTitle>Appareils connectés</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {[
                  { name: 'GPS Catapult', joueurs: 23 },
                  { name: 'Polar Vantage', joueurs: 14 },
                  { name: 'Whoop 4.0', joueurs: 6 },
                  { name: 'Apple Watch Ultra', joueurs: 3 },
                ].map(d => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-xs text-white/60">{d.name}</span>
                    </div>
                    <span className="text-[11px] text-white/30">{d.joueurs} joueurs</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
