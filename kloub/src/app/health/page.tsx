'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar } from '@/components/ui/avatar'
import { Heart, Activity, Moon, Droplets, Zap, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, AreaChart, Area } from 'recharts'

const PLAYERS_HEALTH = [
  {name:'Kylian Mbappé',score:72,hr:62,sleep:6.2,hydration:65,fatigue:72,status:'warning'},
  {name:'Hugo Lloris',score:91,hr:58,sleep:8.1,hydration:90,fatigue:25,status:'good'},
  {name:'Raphaël Varane',score:85,hr:61,sleep:7.8,hydration:82,fatigue:40,status:'good'},
  {name:'A. Griezmann',score:34,hr:78,sleep:5.5,hydration:45,fatigue:88,status:'danger'},
  {name:'Ousmane Dembélé',score:78,hr:65,sleep:7.2,hydration:74,fatigue:52,status:'good'},
  {name:'Paul Pogba',score:60,hr:70,sleep:6.8,hydration:60,fatigue:64,status:'warning'},
]

const HRDATA = [{t:'00',v:58},{t:'04',v:55},{t:'08',v:75},{t:'12',v:95},{t:'16',v:110},{t:'20',v:80},{t:'23',v:62}]
const SLEEPDATA = [{d:'L',v:7.5},{d:'M',v:6.2},{d:'Me',v:7.8},{d:'J',v:5.9},{d:'V',v:8.1},{d:'S',v:7.3},{d:'D',v:6.8}]

const scoreColor = (s: number) => s>=80?'text-emerald-400':s>=60?'text-amber-400':'text-red-400'
const statusBg = (s: string) => s==='good'?'border-emerald-500/20':s==='warning'?'border-amber-500/20':'border-red-500/20'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Tip = ({active,payload,label}:any) => active && payload?.length ? (
  <div className="glass px-3 py-2 rounded-lg text-xs">
    <p className="text-slate-400">{label}</p>
    <p className="text-sky-400 font-semibold">{payload[0].value}</p>
  </div>
) : null

export default function HealthPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Topbar title="Suivi Santé" subtitle="Monitoring en temps réel · Prévention des blessures"/>
      <div className="p-6 space-y-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {label:'Health Score moyen',value:'72/100',icon:Heart,color:'text-emerald-400',bg:'bg-emerald-500/10',sub:'Équipe · 28 joueurs'},
            {label:'FC moyen',value:'68 bpm',icon:Activity,color:'text-red-400',bg:'bg-red-500/10',sub:'Repos · Normal'},
            {label:'Sommeil moyen',value:'7.1h',icon:Moon,color:'text-indigo-400',bg:'bg-indigo-500/10',sub:'Sur 7 jours'},
            {label:'Joueurs à risque',value:'2',icon:AlertTriangle,color:'text-amber-400',bg:'bg-amber-500/10',sub:'Suivi renforcé'},
          ].map(k=>(
            <Card key={k.label} hover>
              <CardContent className="p-4">
                <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center mb-3`}>
                  <k.icon className={`w-4 h-4 ${k.color}`}/>
                </div>
                <p className="text-xl font-bold text-slate-100">{k.value}</p>
                <p className="text-xs text-slate-500">{k.label}</p>
                <p className="text-[10px] text-slate-600 mt-1">{k.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Health Score — Effectif</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {PLAYERS_HEALTH.map(p=>(
                <div key={p.name} className={`flex items-center gap-4 p-3 rounded-xl border ${statusBg(p.status)} hover:bg-[#1E2D4A]/30 transition-colors cursor-pointer`}>
                  <Avatar name={p.name} size="sm"/>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-medium text-slate-200">{p.name}</p>
                      <span className={`text-sm font-bold ${scoreColor(p.score)}`}>{p.score}/100</span>
                    </div>
                    <Progress value={p.score} max={100} color={p.score>=80?'success':p.score>=60?'warning':'danger'}/>
                  </div>
                  <div className="hidden lg:flex items-center gap-4 shrink-0 text-xs">
                    <div className="text-center">
                      <p className="text-red-400 font-semibold">{p.hr}</p>
                      <p className="text-slate-600">bpm</p>
                    </div>
                    <div className="text-center">
                      <p className="text-indigo-400 font-semibold">{p.sleep}h</p>
                      <p className="text-slate-600">sommeil</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sky-400 font-semibold">{p.hydration}%</p>
                      <p className="text-slate-600">hydrat.</p>
                    </div>
                    <Badge variant={p.status==='good'?'success':p.status==='warning'?'warning':'danger'}>
                      {p.status==='good'?'OK':p.status==='warning'?'Attention':'Risque'}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Fréquence cardiaque 24h</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={120}>
                  <AreaChart data={HRDATA}>
                    <defs>
                      <linearGradient id="hrg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3}/>
                        <stop offset="100%" stopColor="#EF4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="t" tick={{fontSize:10,fill:'#8B9FC0'}} axisLine={false} tickLine={false}/>
                    <Tooltip content={<Tip/>}/>
                    <Area type="monotone" dataKey="v" stroke="#EF4444" strokeWidth={1.5} fill="url(#hrg)" dot={false}/>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Qualité du sommeil</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={120}>
                  <AreaChart data={SLEEPDATA}>
                    <defs>
                      <linearGradient id="slg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3}/>
                        <stop offset="100%" stopColor="#6366F1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="d" tick={{fontSize:10,fill:'#8B9FC0'}} axisLine={false} tickLine={false}/>
                    <Tooltip content={<Tip/>}/>
                    <Area type="monotone" dataKey="v" stroke="#6366F1" strokeWidth={1.5} fill="url(#slg)" dot={false}/>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Connexions appareils</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {[
                  {name:'Apple Watch',status:true,players:12},
                  {name:'Garmin',status:true,players:8},
                  {name:'Whoop',status:true,players:5},
                  {name:'Polar',status:false,players:3},
                ].map(d=>(
                  <div key={d.name} className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${d.status?'bg-emerald-400':'bg-slate-600'}`}/>
                      <span className="text-xs text-slate-300">{d.name}</span>
                    </div>
                    <span className="text-xs text-slate-500">{d.players} joueurs</span>
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
