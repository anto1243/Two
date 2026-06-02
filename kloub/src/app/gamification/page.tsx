'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar } from '@/components/ui/avatar'
import { Trophy, Zap, Star, Target, Flame, Crown, Shield, Award } from 'lucide-react'

const LEADERBOARD = [
  {name:'Kylian Mbappé',xp:8420,level:14,badges:23,streak:18,rank:1},
  {name:'Antoine Griezmann',xp:7850,level:13,badges:19,streak:12,rank:2},
  {name:'Hugo Lloris',xp:7200,level:12,badges:17,streak:9,rank:3},
  {name:'Raphaël Varane',xp:6900,level:12,badges:15,streak:7,rank:4},
  {name:'Ousmane Dembélé',xp:6100,level:11,badges:14,streak:5,rank:5},
  {name:'Kingsley Coman',xp:5800,level:10,badges:12,streak:14,rank:6},
]

const BADGES = [
  {name:'Premier But',desc:'Marquer son 1er but',icon:Trophy,rarity:'common',earned:true},
  {name:'Hat-trick',desc:'3 buts en un match',icon:Star,rarity:'rare',earned:true},
  {name:'Ironman',desc:'30 séances consécutives',icon:Shield,rarity:'epic',earned:false},
  {name:'Légende',desc:'100 matchs joués',icon:Crown,rarity:'legendary',earned:false},
  {name:'Passeur d\'or',desc:'10 passes décisives',icon:Award,rarity:'rare',earned:true},
  {name:'Présence parfaite',desc:'Mois sans absence',icon:Flame,rarity:'epic',earned:true},
]

const CHALLENGES = [
  {title:'10 séances consécutives',progress:7,max:10,xp:500,expires:'3 jours',color:'sky'},
  {title:'5 buts ce mois',progress:3,max:5,xp:800,expires:'18 jours',color:'violet'},
  {title:'Score santé > 80',progress:72,max:80,xp:300,expires:'7 jours',color:'emerald'},
  {title:'30 jours sans absence',progress:18,max:30,xp:1200,expires:'12 jours',color:'amber'},
]

const rarityColor = (r: string) => r==='legendary'?'text-amber-400 bg-amber-500/10 border-amber-500/30':r==='epic'?'text-violet-400 bg-violet-500/10 border-violet-500/30':r==='rare'?'text-sky-400 bg-sky-500/10 border-sky-500/20':'text-slate-400 bg-slate-500/10 border-slate-500/20'
const rankIcon = (r: number) => r===1?<Crown className="w-4 h-4 text-amber-400"/>:r===2?<Trophy className="w-4 h-4 text-slate-300"/>:r===3?<Award className="w-4 h-4 text-amber-600"/>:<span className="text-xs text-slate-500 font-bold">#{r}</span>

export default function GamificationPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Topbar title="Gamification" subtitle="Engagement et progression des joueurs"/>
      <div className="p-6 space-y-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {label:'XP Total club',value:'124.8K',icon:Zap,color:'text-amber-400',bg:'bg-amber-500/10'},
            {label:'Badges débloqués',value:'347',icon:Trophy,color:'text-violet-400',bg:'bg-violet-500/10'},
            {label:'Défis actifs',value:'12',icon:Target,color:'text-emerald-400',bg:'bg-emerald-500/10'},
            {label:'Streak record',value:'18j',icon:Flame,color:'text-orange-400',bg:'bg-orange-500/10'},
          ].map(k=>(
            <Card key={k.label} hover>
              <CardContent className="p-4">
                <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center mb-3`}>
                  <k.icon className={`w-4 h-4 ${k.color}`}/>
                </div>
                <p className="text-xl font-bold text-slate-100">{k.value}</p>
                <p className="text-xs text-slate-500">{k.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Classement XP</CardTitle>
              <Badge variant="warning">Semaine en cours</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {LEADERBOARD.map((p,i)=>(
                <div key={p.name} className={`flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer ${i===0?'bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20':'hover:bg-[#1E2D4A] border border-transparent'}`}>
                  <div className="w-8 flex items-center justify-center shrink-0">{rankIcon(p.rank)}</div>
                  <Avatar name={p.name} size="sm"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-200">{p.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <Progress value={p.xp} max={10000} color="warning" size="xs" className="flex-1"/>
                      <span className="text-xs text-amber-400 font-bold whitespace-nowrap">{p.xp.toLocaleString()} XP</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-center">
                      <p className="text-xs font-bold text-violet-400">Lv.{p.level}</p>
                      <p className="text-[10px] text-slate-500">Niveau</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-sky-400">{p.streak}</p>
                      <p className="text-[10px] text-slate-500">Streak</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-emerald-400">{p.badges}</p>
                      <p className="text-[10px] text-slate-500">Badges</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Défis actifs</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {CHALLENGES.map(c=>(
                  <div key={c.title} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-medium text-slate-300 leading-tight">{c.title}</p>
                      <div className="flex items-center gap-1 shrink-0 ml-2">
                        <Zap className="w-3 h-3 text-amber-400"/>
                        <span className="text-xs font-bold text-amber-400">+{c.xp}</span>
                      </div>
                    </div>
                    <Progress value={c.progress} max={c.max} color="primary"/>
                    <div className="flex justify-between">
                      <span className="text-[10px] text-slate-500">{c.progress}/{c.max}</span>
                      <span className="text-[10px] text-slate-500">Expire dans {c.expires}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader><CardTitle>Collection de badges</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
              {BADGES.map(b=>(
                <div key={b.name} className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${b.earned?rarityColor(b.rarity):'opacity-40 bg-[#1E2D4A] border-[#2A3A5A]'}`}>
                  <b.icon className={`w-8 h-8 mx-auto mb-2 ${b.earned?'':'text-slate-600'}`}/>
                  <p className="text-xs font-semibold text-slate-200">{b.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{b.desc}</p>
                  <Badge variant={b.rarity==='legendary'?'warning':b.rarity==='epic'?'info':'default'} size="sm" className="mt-2">{b.rarity}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
