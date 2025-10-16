import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { 
  Users, 
  ClipboardList, 
  AlertTriangle, 
  Calendar,
  BookOpen,
  UserCheck,
  Clock,
  TrendingUp
} from 'lucide-react';

interface ProfessorDashboardProps {
  onPageChange: (page: string) => void;
}

export function ProfessorDashboard({ onPageChange }: ProfessorDashboardProps) {
  // Dados mockados para demonstração
  const turmas = [
    { nome: 'Algoritmos Avançados - Turma A', alunos: 35, periodo: '2024.1' },
    { nome: 'Estruturas de Dados - Turma B', alunos: 28, periodo: '2024.1' },
    { nome: 'Programação III - Turma C', alunos: 32, periodo: '2024.1' }
  ];

  const solicitacoesPendentes = [
    { aluno: 'João Silva', disciplina: 'Algoritmos Avançados', data: '2024-01-15' },
    { aluno: 'Maria Santos', disciplina: 'Estruturas de Dados', data: '2024-01-14' },
    { aluno: 'Pedro Costa', disciplina: 'Programação III', data: '2024-01-13' }
  ];

  const alunosRisco = [
    { nome: 'Ana Carolina', disciplina: 'Algoritmos Avançados', faltas: 8, percentual: 22.5 },
    { nome: 'Carlos Eduardo', disciplina: 'Estruturas de Dados', faltas: 9, percentual: 26.1 },
    { nome: 'Beatriz Lima', disciplina: 'Programação III', faltas: 7, percentual: 21.9 }
  ];

  const proximasAulas = [
    { turma: 'Algoritmos Avançados - Turma A', horario: '08:00', sala: 'Lab 1' },
    { turma: 'Estruturas de Dados - Turma B', horario: '14:00', sala: 'Lab 2' },
    { turma: 'Programação III - Turma C', horario: '16:00', sala: 'Sala 15' }
  ];

  const totalAlunos = turmas.reduce((acc, turma) => acc + turma.alunos, 0);

  return (
    <div className="space-y-6">
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-slate-300">Total de Turmas</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">{turmas.length}</div>
            <p className="text-xs text-slate-400">{totalAlunos} alunos total</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-slate-300">Solicitações Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">{solicitacoesPendentes.length}</div>
            <p className="text-xs text-slate-400">Aguardando avaliação</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-slate-300">Alunos em Risco</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">{alunosRisco.length}</div>
            <p className="text-xs text-slate-400">+20% de faltas</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-slate-300">Aulas Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">{proximasAulas.length}</div>
            <p className="text-xs text-slate-400">Próximas aulas</p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas */}
      {alunosRisco.length > 0 && (
        <Card className="bg-red-900/20 border-red-800">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Alunos em Risco de Reprovação por Falta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alunosRisco.map((aluno, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-red-300">{aluno.nome}</p>
                    <p className="text-red-400 text-sm">{aluno.disciplina}</p>
                  </div>
                  <Badge variant="destructive">
                    {aluno.faltas} faltas ({aluno.percentual}%)
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Minhas turmas */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Minhas Turmas</CardTitle>
            <CardDescription className="text-slate-400">
              Turmas sob sua responsabilidade
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {turmas.map((turma, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div>
                  <h4 className="text-white text-sm">{turma.nome}</h4>
                  <p className="text-slate-400 text-xs">{turma.periodo}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="bg-slate-600 text-slate-200">
                    <Users className="h-3 w-3 mr-1" />
                    {turma.alunos}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Solicitações pendentes */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Solicitações Pendentes</CardTitle>
            <CardDescription className="text-slate-400">
              Aguardando sua avaliação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {solicitacoesPendentes.map((solicitacao, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div>
                  <h4 className="text-white text-sm">{solicitacao.aluno}</h4>
                  <p className="text-slate-400 text-xs">{solicitacao.disciplina}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400 text-xs">{solicitacao.data}</p>
                  <Badge variant="outline" className="border-yellow-600 text-yellow-400 mt-1">
                    Pendente
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Próximas aulas */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Próximas Aulas - Hoje</CardTitle>
          <CardDescription className="text-slate-400">
            Sua agenda do dia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {proximasAulas.map((aula, index) => (
              <div key={index} className="p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {aula.horario}
                  </Badge>
                  <span className="text-slate-400 text-xs">{aula.sala}</span>
                </div>
                <h4 className="text-white text-sm">{aula.turma}</h4>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações rápidas */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Ações Rápidas</CardTitle>
          <CardDescription className="text-slate-400">
            Acesso rápido às principais funcionalidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              className="h-16 bg-blue-600 hover:bg-blue-700"
              onClick={() => onPageChange('presencas')}
            >
              <div className="flex flex-col items-center">
                <UserCheck className="h-5 w-5 mb-1" />
                <span className="text-sm">Registrar Presenças</span>
              </div>
            </Button>
            
            <Button 
              variant="outline"
              className="h-16 border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={() => onPageChange('avaliar-solicitacoes')}
            >
              <div className="flex flex-col items-center">
                <ClipboardList className="h-5 w-5 mb-1" />
                <span className="text-sm">Avaliar Solicitações</span>
              </div>
            </Button>
            
            <Button 
              variant="outline"
              className="h-16 border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={() => onPageChange('turmas')}
            >
              <div className="flex flex-col items-center">
                <Users className="h-5 w-5 mb-1" />
                <span className="text-sm">Gerenciar Turmas</span>
              </div>
            </Button>

            <Button 
              variant="outline"
              className="h-16 border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={() => onPageChange('grafo-turmas')}
            >
              <div className="flex flex-col items-center">
                <TrendingUp className="h-5 w-5 mb-1" />
                <span className="text-sm">Análise de Turmas</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
