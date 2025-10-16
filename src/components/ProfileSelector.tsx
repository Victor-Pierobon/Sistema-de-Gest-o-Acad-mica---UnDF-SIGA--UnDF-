import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { User, GraduationCap, BookOpen, Settings } from 'lucide-react';

interface ProfileSelectorProps {
  onSelectProfile: (profile: string) => void;
}

export function ProfileSelector({ onSelectProfile }: ProfileSelectorProps) {
  const profiles = [
    {
      id: 'aluno',
      title: 'Aluno',
      description: 'Visualize seu histórico acadêmico e solicite recuperações',
      icon: GraduationCap,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'professor',
      title: 'Professor',
      description: 'Gerencie turmas e registre presenças',
      icon: BookOpen,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 'secretaria',
      title: 'Secretaria',
      description: 'Administre solicitações e gere relatórios',
      icon: User,
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      id: 'administrador',
      title: 'Administrador',
      description: 'Controle total do sistema',
      icon: Settings,
      color: 'bg-red-600 hover:bg-red-700'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Sistema de Gestão Acadêmica
          </h1>
          <p className="text-slate-400">
            Selecione um perfil para demonstração
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profiles.map((profile) => {
            const Icon = profile.icon;
            return (
              <Card key={profile.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-slate-700 w-fit">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white">{profile.title}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {profile.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => onSelectProfile(profile.id)}
                    className={`w-full ${profile.color} text-white`}
                  >
                    Acessar como {profile.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
