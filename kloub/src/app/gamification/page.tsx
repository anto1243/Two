'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Avatar } from '@/components/ui/avatar'
import { Trophy, Zap, Target, Flame, Crown, Award, Star, Shield } from 'lucide-react'

const LEADERBOARD = [
  { name: 'Kylian Mbappé', club: 'Real Madrid', xp: 8420, level: 14, badges: 23, streak: 18, rank: 1 },
  { name: 'Antoine Griezmann', club: 'Atlético Madrid', xp: 7850, level: 13, badges: 19, streak: 12, rank: 2 },
  { name: 'Mike Maignan', club: 'AC Milan', xp: 7200, level: 12, badges: 17, streak: 9, rank: 3 },
  { name: 'William Saliba', club: 'Arsenal', xp: 6900, level: 12, badges: 15, streak: 7, rank: 4 },
  { name: 'Ousmane Dembélé', club: 'PSG', xp: 6100, level: 11, badges: 14, streak: 5, rank: 5 },
]

const CHALLENGES = [
  { title: '10 séances consécutives', desc: 'Présence à l\'entraînement', progress: 7, max: 10, xp: 500, expires: '3 jours', icon: Shield },
  { title: 'Précision passes > 92%', desc: 'Exactitude en match officiel', progress: 3, max: 5, xp: 800, expires: '18 jours', icon: Target },
  { title: 'Score travail d\'équipe', desc: 'Notation collective du staff', progress: 72, max: 100, xp: 300, expires: '7 jours', icon: Star },
]

const BADGES_COLLECTION = [
  { name: 'Premier But', desc: 'Marquer son 1er but', icon: Trophy, rarity: 'common', earned: true },
  { name: 'Hat-trick', desc: '3 buts en un match', icon: Star, rarity: 'rare', earned: true },
  { name: 'Ironman', desc: '30 séances consécutives', icon: Shield, rarity: 'epic', earned: false },
  { name: 'Légende', desc: '100 matchs joués', icon: Crown, rarity: 'legendary', earned: false },
  { name: "Passeur d'or", desc: '10 passes décisives', icon: Award, rarity: 'rare', earned: true },
  { name: 'Présence parfaite', desc: 'Mois sans absence', icon: Flame, rarity: 'epic', earned: true },
]

const rarityStyle = (r: string, earned: boolean) => {
  if (!earned) return 'text-white/20 border-white/[0.06] bg-white/[0.02]'
  if (r === 'legendary') return 'text-amber-400 border-amber-500/20 bg-amber-500/[0.05]'
  if (r === 'epic') return 'text-violet-400 border-violet-500/20 bg-violet-500/[0.05]'
  if (r === 'rare') return 'text-blue-400 border-blue-500/20 bg-blue-500/[0.05]'
  return 'text-white/50 border-white/[0.06] bg-white/[0.03]'
}

const rankDisplay = (r: number) => {
  if (r === 1) return <Crown className="w-4 h-4 text-amber-400" />
  if (r === 2) return <Trophy className="w-4 h-4 text-white/40" />
  if (r === 3) return <Award className="w-4 h-4 text-amber-600/70" />
  return <span className="text-xs text-white/30 font-bold">#{r}</span>
}

export default function GamificationPage() {
  return (
    <div className="flex flex-col min-h-full bg-[#09090b]">
      <Topbar title="Gamification" subtitle="Engagement et progression des joueurs · Équipe de France" />
      <div className="p-6 space-y-6">

        {/* KPI strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'XP total groupe', v: '124.8K', sub: 'Cette saison', icon: Zap },
            { label: 'Badges débloqués', v: '347', sub: 'Sur 500 disponibles', icon: Trophy },
            { label: 'Défis actifs', v: '12', sub: 'En cours ce mois', icon: Target },
            { label: 'Streak record', v: '18j', sub: 'Mbappé · en cours', icon: Flame },
          ].map(k => (
            <Card key={k.label} className="bg-[#111114] border border-white/[0.06]">
              <CardContent className="p-5">
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-3">{k.label}</p>
                <p className="text-3xl font-bold text-white/90 leading-none">{k.v}</p>
                <p className="text-xs text-white/40 mt-2">{k.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Leaderboard */}
          <Card className="lg:col-span-2 bg-[#111114] border border-white/[0.06]">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/[0.06]">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Classement</p>
                <CardTitle className="text-white/90 text-base font-semibold">Top joueurs · XP</CardTitle>
              </div>
              <span className="text-[11px] text-white/30 px-2.5 py-1 rounded-lg border border-white/[0.06] bg-white/[0.02]">Semaine en cours</span>
            </CardHeader>
            <CardContent className="pt-4 space-y-2">
              {LEADERBOARD.map((p, i) => (
                <div
                  key={p.name}
                  className={`flex items-center gap-4 p-3.5 rounded-xl transition-colors cursor-pointer ${
                    i === 0
                      ? 'bg-amber-500/[0.05] border border-amber-500/10'
                      : 'hover:bg-white/[0.03] border border-transparent'
                  }`}
                >
                  <div className="w-7 flex items-center justify-center shrink-0">{rankDisplay(p.rank)}</div>
                  <Avatar name={p.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/80">{p.name}</p>
                    <p className="text-[11px] text-white/30 mt-0.5">{p.club}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500/40 rounded-full"
                          style={{ width: `${(p.xp / 10000) * 100}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-white/40 whitespace-nowrap font-medium">{p.xp.toLocaleString('fr-FR')} XP</span>
                    </div>
                  </div>
                  <div className="flex gap-5 shrink-0 text-center">
                    <div>
                      <p className="text-sm font-bold text-blue-400">Lv.{p.level}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">Niveau</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white/60">{p.streak}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">Streak</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white/60">{p.badges}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">Badges</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Right column */}
          <div className="space-y-4">

            {/* Player of the week */}
            <Card className="bg-[#111114] border border-white/[0.06]">
              <CardHeader className="pb-3">
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Joueur de la semaine</p>
                <CardTitle className="text-white/90 text-sm font-semibold">Spotlight</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar name="Kylian Mbappé" size="lg" />
                  <div>
                    <p className="text-base font-bold text-white/90">Kylian Mbappé</p>
                    <p className="text-xs text-blue-400 mt-0.5">Real Madrid · ATT</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Crown className="w-3 h-3 text-amber-400" />
                      <span className="text-[11px] text-amber-400 font-medium">Rang #1 · Lv.14</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.06]">
                  {[
                    { label: 'XP', v: '8 420' },
                    { label: 'Badges', v: '23' },
                    { label: 'Streak', v: '18j' },
                  ].map(s => (
                    <div key={s.label} className="text-center">
                      <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">{s.label}</p>
                      <p className="text-xl font-bold text-white/90">{s.v}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Challenges */}
            <Card className="bg-[#111114] border border-white/[0.06]">
              <CardHeader className="pb-3">
                <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Défis actifs</p>
                <CardTitle className="text-white/90 text-sm font-semibold">3 en cours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 pt-0">
                {CHALLENGES.map(c => (
                  <div key={c.title} className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="text-xs font-medium text-white/80">{c.title}</p>
                        <p className="text-[11px] text-white/30 mt-0.5">{c.desc}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Zap className="w-3 h-3 text-blue-400" />
                        <span className="text-[11px] font-bold text-blue-400">+{c.xp}</span>
                      </div>
                    </div>
                    <div className="h-0.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500/50 rounded-full transition-all"
                        style={{ width: `${(c.progress / c.max) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-white/30">
                      <span>{c.progress}/{c.max}</span>
                      <span>Expire dans {c.expires}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>
        </div>

        {/* Badge collection */}
        <Card className="bg-[#111114] border border-white/[0.06]">
          <CardHeader className="pb-4 border-b border-white/[0.06]">
            <p className="text-[11px] uppercase tracking-widest text-white/30 mb-1">Collection</p>
            <CardTitle className="text-white/90 text-base font-semibold">Badges · 4 sur 6 débloqués</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
              {BADGES_COLLECTION.map(b => (
                <div
                  key={b.name}
                  className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${rarityStyle(b.rarity, b.earned)} ${!b.earned ? 'opacity-40' : ''}`}
                >
                  <b.icon className="w-7 h-7 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-white/80 leading-tight">{b.name}</p>
                  <p className="text-[10px] text-white/30 mt-0.5">{b.desc}</p>
                  <span className="inline-block mt-2 text-[10px] px-1.5 py-0.5 rounded border border-current opacity-60 uppercase tracking-wider">
                    {b.rarity}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
