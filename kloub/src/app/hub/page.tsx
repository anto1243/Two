'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Calendar, Clock, MapPin, Users, Plus, CheckCircle, XCircle, AlertCircle, ChevronRight, Filter } from 'lucide-react'
import { useState } from 'react'

const TABS = ['Planning', 'Effectif', 'Matchs', 'Terrains', 'Documents']

const SQUAD = [
  {name:'Kylian Mbappé',pos:'ATT',num:10,status:'available',age:26,nationality:'FR'},
  {name:'Antoine Griezmann',pos:'MIL',num:7,status:'injured',age:34,nationality:'FR'},
  {name:'Raphaël Varane',pos:'DEF',num:4,status:'available',age:31,nationality:'FR'},
  {name:'Hugo Lloris',pos:'GK',num:1,status:'available',age:38,nationality:'FR'},
  {name:'Ousmane Dembélé',pos:'ATT',num:11,status:'doubtful',age:27,nationality:'FR'},
  {name:'Paul Pogba',pos:'MIL',num:6,status:'suspended',age:31,nationality:'FR'},
  {name:'Kingsley Coman',pos:'ATT',num:20,status:'available',age:28,nationality:'FR'},
  {name:'Lucas Hernandez',pos:'DEF',num:21,status:'available',age:28,nationality:'FR'},
]

const EVENTS = [
  {date:'Lun 2',label:'Entraînement Physique',time:'10:00',type:'training',loc:'Stade Jean Bouin',att:22},
  {date:'Mer 4',label:'Entraînement Tactique',time:'09:30',type:'training',loc:"Centre d'entraînement",att:24},
  {date:'Sam 7',label:'AS Monaco',time:'20:45',type:'match',loc:'Parc des Princes',att:null},
  {date:'Lun 9',label:'Récupération',time:'11:00',type:'training',loc:'Centre médical',att:20},
  {date:'Mar 10',label:'OGC Nice',time:'19:00',type:'match',loc:'Allianz Riviera',att:null},
]

const statusColor = (s: string) => s==='available'?'success':s==='injured'?'danger':s==='doubtful'?'warning':'info'
const statusIcon = (s: string) => s==='available'?<CheckCircle className="w-3.5 h-3.5 text-emerald-400"/>:s==='injured'?<XCircle className="w-3.5 h-3.5 text-red-400"/>:<AlertCircle className="w-3.5 h-3.5 text-amber-400"/>

export default function HubPage() {
  const [tab, setTab] = useState('Planning')
  return (
    <div className="flex flex-col min-h-full">
      <Topbar title="Hub Organisationnel" subtitle="Gestion centralisée du club"/>
      <div className="p-6 space-y-6">

        <div className="grid grid-cols-4 gap-4">
          {[{label:'Joueurs',v:28,icon:Users,c:'text-sky-400',bg:'bg-sky-500/10'},{label:'Matchs ce mois',v:6,icon:Calendar,c:'text-violet-400',bg:'bg-violet-500/10'},{label:'Séances planifiées',v:12,icon:Clock,c:'text-emerald-400',bg:'bg-emerald-500/10'},{label:'Terrains dispo',v:3,icon:MapPin,c:'text-amber-400',bg:'bg-amber-500/10'}].map(k=>(
            <Card key={k.label} hover>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${k.bg} flex items-center justify-center shrink-0`}>
                  <k.icon className={`w-5 h-5 ${k.c}`}/>
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-100">{k.v}</p>
                  <p className="text-xs text-slate-500">{k.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-1 p-1 bg-[#0D1526] rounded-xl border border-[#1E2D4A] w-fit">
          {TABS.map(t=>(
            <button key={t} onClick={()=>setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${tab===t?'bg-sky-500 text-white shadow-lg':'text-slate-400 hover:text-slate-200'}`}>{t}</button>
          ))}
        </div>

        {tab==='Planning' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Calendrier Juin 2025</CardTitle>
                <Button size="sm"><Plus className="w-3.5 h-3.5"/>Ajouter</Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {EVENTS.map(e=>(
                  <div key={e.label+e.date} className="flex items-center gap-4 p-3 rounded-lg border border-[#2A3A5A] hover:border-sky-500/30 transition-colors cursor-pointer">
                    <div className="w-12 text-center shrink-0">
                      <p className="text-[10px] text-slate-500">{e.date.split(' ')[0]}</p>
                      <p className="text-lg font-bold text-slate-200">{e.date.split(' ')[1]}</p>
                    </div>
                    <div className={`w-1 h-10 rounded-full ${e.type==='match'?'bg-amber-400':'bg-sky-400'}`}/>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-200">{e.label}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <Clock className="w-3 h-3"/>{e.time}
                        <MapPin className="w-3 h-3"/>{e.loc}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {e.att && <Badge variant="info">{e.att} joueurs</Badge>}
                      <Badge variant={e.type==='match'?'warning':'success'}>{e.type==='match'?'Match':'Séance'}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Convocations en attente</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {SQUAD.slice(0,5).map(p=>(
                  <div key={p.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1E2D4A] transition-colors cursor-pointer">
                    <Avatar name={p.name} size="sm"/>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-200 truncate">{p.name}</p>
                      <p className="text-[10px] text-slate-500">{p.pos} · #{p.num}</p>
                    </div>
                    {statusIcon(p.status)}
                  </div>
                ))}
                <Button variant="secondary" className="w-full mt-2">Envoyer les convocations</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {tab==='Effectif' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Effectif complet ({SQUAD.length} joueurs)</CardTitle>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm"><Filter className="w-3.5 h-3.5"/>Filtrer</Button>
                <Button size="sm"><Plus className="w-3.5 h-3.5"/>Ajouter</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1E2D4A]">
                    {['#','Joueur','Poste','Âge','Nat.','Statut','Actions'].map(h=>(
                      <th key={h} className="px-4 py-3 text-left text-xs text-slate-500 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SQUAD.map(p=>(
                    <tr key={p.name} className="border-b border-[#1E2D4A]/50 hover:bg-[#1E2D4A]/30 transition-colors cursor-pointer">
                      <td className="px-4 py-3 text-sm font-bold text-slate-400">{p.num}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar name={p.name} size="xs"/>
                          <span className="text-sm font-medium text-slate-200">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3"><Badge variant="outline">{p.pos}</Badge></td>
                      <td className="px-4 py-3 text-sm text-slate-400">{p.age}</td>
                      <td className="px-4 py-3 text-sm text-slate-400">{p.nationality}</td>
                      <td className="px-4 py-3"><Badge variant={statusColor(p.status) as 'success'|'danger'|'warning'|'info'}>{p.status}</Badge></td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm">Voir <ChevronRight className="w-3 h-3"/></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        {(tab==='Matchs'||tab==='Terrains'||tab==='Documents') && (
          <div className="flex items-center justify-center h-64 text-slate-500 text-sm">
            Module {tab} — En cours de développement
          </div>
        )}
      </div>
    </div>
  )
}
