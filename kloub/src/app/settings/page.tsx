'use client'
import { Topbar } from '@/components/layout/Topbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Settings, Bell, Shield, Users, Globe, Palette } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Topbar title="Paramètres" subtitle="Configuration de votre espace KLoub"/>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            {icon:Settings,title:'Général',desc:'Informations du club, logo, fuseau horaire',items:['Nom du club','Logo & Couleurs','Fuseau horaire','Langue']},
            {icon:Bell,title:'Notifications',desc:'Email, push, alertes IA',items:['Notifications email','Alertes IA','Rappels matchs','Rapports hebdo']},
            {icon:Shield,title:'Sécurité',desc:'Authentification, sessions, 2FA',items:['Double authentification','Sessions actives','Historique connexions','Politique mots de passe']},
            {icon:Users,title:'Rôles & Accès',desc:'Gestion des permissions par rôle',items:['Rôles personnalisés','Permissions par module','Invitations','Audit log']},
          ].map(s=>(
            <Card key={s.title} hover>
              <CardHeader className="flex flex-row items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center">
                  <s.icon className="w-4 h-4 text-sky-400"/>
                </div>
                <div>
                  <CardTitle>{s.title}</CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 p-4">
                {s.items.map(item=>(
                  <div key={item} className="flex items-center justify-between py-2 border-b border-[#1E2D4A]/50">
                    <span className="text-xs text-slate-300">{item}</span>
                    <Button variant="ghost" size="sm">Configurer</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
