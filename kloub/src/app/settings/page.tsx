'use client'
import { useState } from 'react'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import {
  User, Bell, Settings, Plug, Shield, ChevronRight, Check, X
} from 'lucide-react'

const navItems = [
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'team', label: "Préférences équipe", icon: Settings },
  { id: 'integrations', label: 'Intégrations', icon: Plug },
  { id: 'security', label: 'Sécurité', icon: Shield },
]

const integrations = [
  {
    name: 'Wyscout',
    desc: "Analyse vidéo et données de scouting",
    status: 'connected',
    color: 'bg-blue-500/10',
    dot: 'bg-blue-400',
  },
  {
    name: 'GPS Catapult',
    desc: "Données de charge et tracking physique",
    status: 'connected',
    color: 'bg-emerald-500/10',
    dot: 'bg-emerald-400',
  },
  {
    name: 'Polar Team Pro',
    desc: "Monitoring cardiaque et récupération",
    status: 'disconnected',
    color: 'bg-white/[0.04]',
    dot: 'bg-white/20',
  },
]

type Toggle = {
  label: string
  desc: string
  key: string
}

const notifToggles: Toggle[] = [
  { label: 'Alertes médicales', desc: 'Notifications immédiates pour blessures et risques', key: 'medical' },
  { label: 'Résultats en direct', desc: 'Scores et stats en temps réel', key: 'live' },
  { label: 'Rapports hebdomadaires', desc: 'Synthèse performance chaque lundi', key: 'weekly' },
  { label: 'Mises à jour système', desc: "Nouvelles fonctionnalités et maintenance", key: 'system' },
]

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer ${on ? 'bg-blue-500' : 'bg-white/10'}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? 'translate-x-4' : 'translate-x-0.5'}`} />
    </button>
  )
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    medical: true, live: true, weekly: false, system: false,
  })
  const [language, setLanguage] = useState('Français')
  const [timezone, setTimezone] = useState('Europe/Paris')

  const flipToggle = (key: string) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="min-h-screen bg-[#09090b]">
      <Topbar title="Paramètres" subtitle="Configuration du compte et préférences" />

      <div className="px-8 py-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Left nav */}
          <div className="lg:col-span-1">
            <Card className="bg-[#111114] border-white/[0.06]">
              <CardContent className="pt-3 pb-3">
                <nav className="space-y-0.5">
                  {navItems.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveSection(id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                        activeSection === id
                          ? 'bg-white/[0.07] text-white/90'
                          : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${activeSection === id ? 'text-blue-400' : ''}`} />
                      <span className="font-medium">{label}</span>
                      {activeSection === id && <ChevronRight className="w-3.5 h-3.5 ml-auto text-white/25" />}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Right content */}
          <div className="lg:col-span-3 space-y-4">

            {/* Profile */}
            {activeSection === 'profile' && (
              <>
                <Card className="bg-[#111114] border-white/[0.06]">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-[11px] uppercase tracking-widest text-white/30 font-normal">
                      Informations personnelles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-5 mb-8">
                      <div className="relative">
                        <Avatar name="Didier Deschamps" size="lg" />
                        <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer">
                          <span className="text-white text-[10px] font-bold">+</span>
                        </button>
                      </div>
                      <div>
                        <p className="text-base font-semibold text-white/90">Didier Deschamps</p>
                        <p className="text-sm text-white/40">Sélectionneur — Équipe de France</p>
                        <Badge className="mt-1.5 text-[10px] bg-blue-500/10 text-blue-400 border-blue-500/20">Admin</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { label: 'Nom complet', value: 'Didier Deschamps', type: 'text' },
                        { label: 'Email', value: 'deschamps@fff.fr', type: 'email' },
                        { label: 'Rôle', value: 'Sélectionneur', type: 'text' },
                        { label: 'Organisation', value: 'Fédération Française de Football', type: 'text' },
                      ].map(({ label, value, type }) => (
                        <div key={label}>
                          <label className="text-[11px] uppercase tracking-widest text-white/30 block mb-1.5">{label}</label>
                          <input
                            type={type}
                            defaultValue={value}
                            className="w-full px-3 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white/70 focus:outline-none focus:border-blue-500/40 transition-colors"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex gap-3">
                      <Button className="bg-blue-500/15 text-blue-400 border border-blue-500/25 hover:bg-blue-500/25 text-sm">
                        Sauvegarder
                      </Button>
                      <Button variant="outline" className="text-xs border-white/[0.08] text-white/40 hover:text-white/70">
                        Annuler
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Notifications */}
            {activeSection === 'notifications' && (
              <Card className="bg-[#111114] border-white/[0.06]">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[11px] uppercase tracking-widest text-white/30 font-normal">
                    Préférences de notification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-0">
                  {notifToggles.map(({ label, desc, key }) => (
                    <div key={key} className="flex items-center justify-between py-4 border-b border-white/[0.04] last:border-0">
                      <div>
                        <p className="text-sm text-white/80 font-medium">{label}</p>
                        <p className="text-[12px] text-white/35 mt-0.5">{desc}</p>
                      </div>
                      <Toggle on={toggles[key]} onToggle={() => flipToggle(key)} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Team preferences */}
            {activeSection === 'team' && (
              <Card className="bg-[#111114] border-white/[0.06]">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[11px] uppercase tracking-widest text-white/30 font-normal">
                    Préférences équipe
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {[
                    { label: 'Formation par défaut', value: '4-3-3' },
                    { label: "Langue d'interface", value: language },
                    { label: 'Fuseau horaire', value: timezone },
                    { label: 'Devise', value: 'EUR (€)' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm text-white/70">{label}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white/40">{value}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-white/20" />
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-white/[0.04]">
                    <Button className="bg-blue-500/15 text-blue-400 border border-blue-500/25 hover:bg-blue-500/25 text-sm">
                      Sauvegarder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Integrations */}
            {activeSection === 'integrations' && (
              <Card className="bg-[#111114] border-white/[0.06]">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[11px] uppercase tracking-widest text-white/30 font-normal">
                    Intégrations connectées
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {integrations.map((intg) => (
                    <div key={intg.name} className={`flex items-center justify-between p-4 rounded-xl border border-white/[0.06] ${intg.color}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${intg.dot}`} />
                        <div>
                          <p className="text-sm text-white/80 font-medium">{intg.name}</p>
                          <p className="text-[11px] text-white/35 mt-0.5">{intg.desc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {intg.status === 'connected' ? (
                          <>
                            <Badge className="text-[10px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Connecté</Badge>
                            <button className="p-1.5 text-white/20 hover:text-red-400 transition-colors cursor-pointer">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : (
                          <Button className="text-xs bg-white/[0.04] text-white/50 border border-white/[0.08] hover:text-white/80 hover:bg-white/[0.07]">
                            Connecter
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="pt-3">
                    <button className="w-full py-3 rounded-xl border border-dashed border-white/[0.08] text-[12px] text-white/30 hover:text-white/50 hover:border-white/15 transition-colors cursor-pointer">
                      + Ajouter une intégration
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security */}
            {activeSection === 'security' && (
              <Card className="bg-[#111114] border-white/[0.06]">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[11px] uppercase tracking-widest text-white/30 font-normal">
                    Sécurité & Accès
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'Authentification à deux facteurs', status: 'Activé', ok: true },
                    { label: 'Sessions actives', status: '2 appareils', ok: true },
                    { label: 'Dernière connexion', status: "Aujourd'hui, 09:14", ok: true },
                  ].map(({ label, status, ok }) => (
                    <div key={label} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                      <p className="text-sm text-white/70">{label}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] text-white/40">{status}</span>
                        {ok && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                    </div>
                  ))}
                  <div className="pt-2">
                    <Button variant="outline" className="text-xs border-white/[0.08] text-white/40 hover:text-white/70">
                      Changer le mot de passe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
