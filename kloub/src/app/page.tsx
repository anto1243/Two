'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Users, Calendar, Heart, TrendingUp, AlertTriangle, Zap, Trophy, ArrowUpRight, ArrowDownRight, Activity, Clock, MapPin, Target, ChevronRight, Flame, Star } from 'lucide-react'
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const PERF = [{ day:'L',v:72},{day:'M',v:68},{day:'Me',v:75},{day:'J',v:80},{day:'V',v:77},{day:'S',v:85},{day:'D',v:82}]
const ATT = [{w:'S1',p:88},{w:'S2',p:92},{w:'S3',p:85},{w:'S4',p:94},{w:'S5',p:90},{w:'S6',p:96}]
const MATCHES = [
  {opponent:'AS Monaco',date:'Sam 7 Juin',time:'20:45',type:'home',comp:'Ligue 1',logo:'AM'},
  {opponent:'OGC Nice',date:'Mar 10 Juin',time:'19:00',type:'away',comp:'Ligue 1',logo:'ON'},
  {opponent:'Stade Rennais',date:'Sam 14 Juin',time:'17:00',type:'home',comp:'Coupe de France',logo:'SR'},
]
const TRAININGS = [
  {type:'Physique',time:"Aujourd'hui 10:00",dur:'90 min',att:22,tot:24,loc:'Stade Jean Bouin'},
  {type:'Tactique',time:'Demain 09:30',dur:'75 min',att:0,tot:24,loc:"Centre d'entraînement"},
]
const ALERTS = [
  {t:'warning',player:'K. Mbappé',msg:"Charge d'entraînement élevée",detail:"Risque de fatigue détecté par l'IA"},
  {t:'danger',player:'A. Griezmann',msg:'Blessure musculaire',detail:'Absent 2-3 semaines'},
  {t:'info',player:'O. Giroud',msg:'Retour de suspension',detail:'Disponible pour le prochain match'},
]
const PLAYERS = [
  {name:'Kylian Mbappé',pos:'ATT',rating:9.1,goals:22,assists:8,trend:'up'},
  {name:'Antoine Griezmann',pos:'MIL',rating:8.7,goals:12,assists:14,trend:'up'},
  {name:'Raphaël Varane',pos:'DEF',rating:8.4,goals:1,assists:2,trend:'down'},
  {name:'Hugo Lloris',pos:'GK',rating:8.2,goals:0,assists:0,trend:'stable'},
]
const KPIS = [
  {label:'Joueurs Actifs',value:'28',sub:'+2 ce mois',icon:Users,trend:'up',color:'text-sky-400',bg:'bg-sky-500/10'},
  {label:'Matchs ce mois',value:'6',sub:'3V 1N 2D',icon:Calendar,trend:'neutral',color:'text-violet-400',bg:'bg-violet-500/10'},
  {label:'Santé globale',value:'84%',sub:'+3% vs sem. passée',icon:Heart,trend:'up',color:'text-emerald-400',bg:'bg-emerald-500/10'},
  {label:'Engagement club',value:'92%',sub:'Score IA KLoub',icon:TrendingUp,trend:'up',color:'text-amber-400',bg:'bg-amber-500/10'},
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Tip = ({active,payload,label}:any) => active && payload?.length ? (
  <div className="glass px-3 py-2 rounded-lg text-xs">
    <p className="text-slate-400">{label}</p>
    <p className="text-sky-400 font-semibold">{payload[0].value}</p>
  </div>
) : null

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Topbar title="Dashboard" subtitle="Vue d'ensemble · FC Olympique Paris · Saison 2025/26" />
      <div className="p-6 space-y-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {KPIS.map((k) => (
            <Card key={k.label} hover className="relative overflow-hidden">
              <CardContent className="p-5">
                <div className={`w-10 h-10 rounded-xl ${k.bg} flex items-center justify-center mb-4`}>
                  <k.icon className={`w-5 h-5 ${k.color}`} />
                </div>
                <p className="text-2xl font-bold text-slate-100">{k.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{k.label}</p>
                <div className={`flex items-center gap-1 mt-2 text-xs ${k.trend==='up'?'text-emerald-400':'text-slate-500'}`}>
                  {k.trend==='up' && <ArrowUpRight className="w-3 h-3" />}
                  <span>{k.sub}</span>
                </div>
                <div className={`absolute top-0 right-0 w-20 h-20 ${k.bg} rounded-full blur-2xl opacity-30 -translate-y-4 translate-x-4`} />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Performance de l&apos;équipe</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">Score moyen cette semaine</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-slate-100">79.6</span>
                <Badge variant="success">+5.2</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={PERF}>
                  <defs>
                    <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                      <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" tick={{fontSize:11,fill:'#8B9FC0'}} axisLine={false} tickLine={false}/>
                  <YAxis domain={[60,100]} tick={{fontSize:11,fill:'#8B9FC0'}} axisLine={false} tickLine={false}/>
                  <Tooltip content={<Tip/>}/>
                  <Area type="monotone" dataKey="v" stroke="#0EA5E9" strokeWidth={2} fill="url(#pg)" dot={{fill:'#0EA5E9',r:3,strokeWidth:0}} activeDot={{r:5,fill:'#22D3EE',strokeWidth:0}}/>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Santé de l&apos;équipe</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                {label:'Disponibles',count:22,total:28,color:'success' as const},
                {label:'Blessés',count:3,total:28,color:'danger' as const},
                {label:'Douteux',count:2,total:28,color:'warning' as const},
                {label:'Suspendus',count:1,total:28,color:'info' as const},
              ].map(item => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-slate-200 font-semibold">{item.count}</span>
                  </div>
                  <Progress value={item.count} max={item.total} color={item.color}/>
                </div>
              ))}
              <div className="mt-4 p-3 rounded-lg bg-[#1E2D4A]/50 border border-sky-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-3.5 h-3.5 text-sky-400"/>
                  <span className="text-xs font-medium text-sky-400">Analyse IA</span>
                </div>
                <p className="text-xs text-slate-400">L&apos;équipe est en bonne forme. Attention à K. Mbappé — charge élevée cette semaine.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Prochains matchs</CardTitle>
              <Button variant="ghost" size="sm">Voir tous <ChevronRight className="w-3 h-3"/></Button>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              {MATCHES.map((m) => (
                <div key={m.opponent} className="flex items-center gap-3 p-3 rounded-lg bg-[#1E2D4A]/50 hover:bg-[#1E2D4A] transition-colors cursor-pointer">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">{m.logo}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-200 truncate">{m.opponent}</p>
                    <p className="text-xs text-slate-500">{m.date} · {m.time}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={m.type==='home'?'success':'info'} size="sm">{m.type==='home'?'Dom.':'Ext.'}</Badge>
                    <span className="text-[10px] text-slate-500">{m.comp}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Entraînements</CardTitle>
              <Badge variant="info">2 à venir</Badge>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              {TRAININGS.map((s) => (
                <div key={s.type} className="p-3 rounded-lg border border-[#2A3A5A] space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-slate-200">{s.type}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3"/> {s.time} · {s.dur}
                      </p>
                    </div>
                    {s.att>0 && <Badge variant="success">{s.att}/{s.tot}</Badge>}
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3"/> {s.loc}
                  </p>
                  {s.att>0 && <Progress value={s.att} max={s.tot} color="success"/>}
                </div>
              ))}
              <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                <p className="text-xs text-emerald-400 font-medium">Taux de présence semaine</p>
                <div className="flex items-end gap-2 mt-1">
                  <span className="text-xl font-bold text-slate-100">92%</span>
                  <span className="text-xs text-emerald-400 mb-0.5">↑ +4% vs semaine passée</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Alertes IA</CardTitle>
              <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 text-xs flex items-center justify-center font-bold">3</span>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              {ALERTS.map((a) => (
                <div key={a.player} className={`p-3 rounded-lg border flex gap-3 ${a.t==='danger'?'bg-red-500/5 border-red-500/20':a.t==='warning'?'bg-amber-500/5 border-amber-500/20':'bg-sky-500/5 border-sky-500/20'}`}>
                  <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${a.t==='danger'?'text-red-400':a.t==='warning'?'text-amber-400':'text-sky-400'}`}/>
                  <div>
                    <p className="text-xs font-semibold text-slate-200">{a.player} — {a.msg}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{a.detail}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Joueurs</CardTitle>
              <Button variant="ghost" size="sm">Voir l&apos;effectif <ChevronRight className="w-3 h-3"/></Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1E2D4A]">
                    {['Joueur','Pos.','Note','Buts','Passes','Forme'].map(h=>(
                      <th key={h} className="px-4 py-2.5 text-left text-xs text-slate-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PLAYERS.map((p) => (
                    <tr key={p.name} className="border-b border-[#1E2D4A]/50 hover:bg-[#1E2D4A]/30 transition-colors cursor-pointer">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar name={p.name} size="xs"/>
                          <span className="text-xs font-medium text-slate-200">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3"><Badge variant="outline">{p.pos}</Badge></td>
                      <td className="px-4 py-3"><span className="text-xs font-bold text-amber-400">{p.rating}</span></td>
                      <td className="px-4 py-3 text-xs text-slate-300">{p.goals}</td>
                      <td className="px-4 py-3 text-xs text-slate-300">{p.assists}</td>
                      <td className="px-4 py-3">
                        {p.trend==='up'?<ArrowUpRight className="w-4 h-4 text-emerald-400"/>:p.trend==='down'?<ArrowDownRight className="w-4 h-4 text-red-400"/>:<Activity className="w-4 h-4 text-slate-500"/>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Engagement &amp; Gamification</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  {label:'XP Total',value:'124.8K',icon:Zap,color:'text-amber-400',bg:'bg-amber-500/10'},
                  {label:'Badges',value:'347',icon:Trophy,color:'text-violet-400',bg:'bg-violet-500/10'},
                  {label:'Défis actifs',value:'12',icon:Target,color:'text-emerald-400',bg:'bg-emerald-500/10'},
                ].map(item=>(
                  <div key={item.label} className={`p-3 rounded-xl ${item.bg} text-center`}>
                    <item.icon className={`w-5 h-5 ${item.color} mx-auto mb-2`}/>
                    <p className="text-base font-bold text-slate-100">{item.value}</p>
                    <p className="text-[10px] text-slate-500">{item.label}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400 mb-3">Présence par semaine</p>
                <ResponsiveContainer width="100%" height={80}>
                  <AreaChart data={ATT}>
                    <defs>
                      <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.3}/>
                        <stop offset="100%" stopColor="#22D3EE" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="w" tick={{fontSize:10,fill:'#8B9FC0'}} axisLine={false} tickLine={false}/>
                    <Tooltip content={<Tip/>}/>
                    <Area type="monotone" dataKey="p" stroke="#22D3EE" strokeWidth={1.5} fill="url(#ag)" dot={false}/>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-sky-500/10 to-cyan-500/10 border border-sky-500/20">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-400"/>
                  <span className="text-xs font-medium text-slate-200">Streak de présence record</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400"/>
                  <span className="text-sm font-bold text-amber-400">14 jours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
