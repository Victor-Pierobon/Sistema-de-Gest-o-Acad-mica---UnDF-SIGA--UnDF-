import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  ClipboardList, 
  BarChart3, 
  Users, 
  AlertTriangle,
  TrendingUp,
  FileText,
  Download,
  Network,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface SecretariaDashboardProps {
  onPageChange: (page: string) => void;
}

export function SecretariaDashboard({ onPageChange }: SecretariaDashboardProps) {
  const { isDark } = useTheme();
  
  const solicitacoes = {
    pendentes: 15,
    aprovadas_professor: 8,
    deferidas: 45,
    indeferidas: 12
  };

  const metricas = {
    totalAlunos: 1250,
    alunosRisco: 87,
    disciplinasProblematicas: 12,
    taxaAbandono: 8.5
  };

  const cursosStats = [
    { nome: 'Ciência da Computação', alunos: 420, materiasPerdidas: 23, abandono: 6.2 },
    { nome: 'Engenharia de Software', alunos: 380, materiasPerdidas: 18, abandono: 5.8 },
    { nome: 'Sistemas de Informação', alunos: 320, materiasPerdidas: 15, abandono: 7.1 },
    { nome: 'Análise e Desenvolvimento', alunos: 130, materiasPerdidas: 8, abandono: 12.3 }
  ];

  const solicitacoesRecentes = [
    { aluno: 'João Silva', disciplina: 'Algoritmos Avançados', status: 'aprovada_professor', data: '2024-01-15' },
    { aluno: 'Maria Santos', disciplina: 'Banco de Dados', status: 'pendente', data: '2024-01-14' },
    { aluno: 'Pedro Costa', disciplina: 'Redes', status: 'aprovada_professor', data: '2024-01-13' },
    { aluno: 'Ana Lima', disciplina: 'Engenharia de Software', status: 'pendente', data: '2024-01-12' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Badge variant="outline" className="border-yellow-600 text-yellow-400">Pendente</Badge>;
      case 'aprovada_professor':
        return <Badge variant="outline" className="border-blue-600 text-blue-400">Aprovada pelo Professor</Badge>;
      case 'deferida':
        return <Badge variant="outline" className="border-green-600 text-green-400">Deferida</Badge>;
      case 'indeferida':
        return <Badge variant="outline" className="border-red-600 text-red-400">Indeferida</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>SIGA-UnDF</h1>
        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Dashboard da Secretaria</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Solicitações Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>{solicitacoes.pendentes}</div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {solicitacoes.aprovadas_professor} aguardando deferimento
            </p>
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>{metricas.totalAlunos.toLocaleString()}</div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{metricas.alunosRisco} em risco</p>
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Taxa de Abandono</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>{metricas.taxaAbandono}%</div>
            <Progress value={metricas.taxaAbandono} className="mt-2" />
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Últimos 6 meses</p>
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Disciplinas Problemáticas</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>{metricas.disciplinasProblematicas}</div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Alta taxa de reprovação</p>
          </CardContent>
        </Card>
      </div>

      <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
        <CardHeader>
          <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Estatísticas por Curso</CardTitle>
          <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
            Métricas consolidadas de cada curso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cursosStats.map((curso, index) => (
              <div key={index} className={`p-4 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className={isDark ? 'text-white' : 'text-slate-900'}>{curso.nome}</h4>
                  <Badge variant="secondary" className={isDark ? 'bg-slate-600 text-slate-200' : 'bg-slate-200 text-slate-700'}>
                    {curso.alunos} alunos
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Matérias Perdidas</p>
                    <p className={isDark ? 'text-white' : 'text-slate-900'}>{curso.materiasPerdidas}</p>
                  </div>
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Taxa de Abandono</p>
                    <p className={`${curso.abandono > 10 ? 'text-red-400' : 'text-green-400'}`}>
                      {curso.abandono}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Solicitações Recentes</CardTitle>
            <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Últimas solicitações de recuperação
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {solicitacoesRecentes.map((solicitacao, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                <div>
                  <h4 className={`text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{solicitacao.aluno}</h4>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{solicitacao.disciplina}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{solicitacao.data}</p>
                  {getStatusBadge(solicitacao.status)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Status das Solicitações</CardTitle>
            <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Distribuição por status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-yellow-500 mr-2" />
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Pendentes</span>
              </div>
              <Badge variant="outline" className="border-yellow-600 text-yellow-400">
                {solicitacoes.pendentes}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Aprovadas pelo Professor</span>
              </div>
              <Badge variant="outline" className="border-blue-600 text-blue-400">
                {solicitacoes.aprovadas_professor}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Deferidas</span>
              </div>
              <Badge variant="outline" className="border-green-600 text-green-400">
                {solicitacoes.deferidas}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <XCircle className="h-4 w-4 text-red-500 mr-2" />
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Indeferidas</span>
              </div>
              <Badge variant="outline" className="border-red-600 text-red-400">
                {solicitacoes.indeferidas}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
        <CardHeader>
          <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Ações Rápidas</CardTitle>
          <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
            Acesso rápido às principais funcionalidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              className="h-16 bg-blue-600 hover:bg-blue-700"
              onClick={() => onPageChange('gestao-solicitacoes')}
            >
              <div className="flex flex-col items-center">
                <ClipboardList className="h-5 w-5 mb-1" />
                <span className="text-sm">Gestão de Solicitações</span>
              </div>
            </Button>
            
            <Button 
              variant="outline"
              className={`h-16 ${isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}
              onClick={() => onPageChange('relatorios')}
            >
              <div className="flex flex-col items-center">
                <FileText className="h-5 w-5 mb-1" />
                <span className="text-sm">Gerar Relatórios</span>
              </div>
            </Button>
            
            <Button 
              variant="outline"
              className={`h-16 ${isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}
              onClick={() => onPageChange('analises-grafo')}
            >
              <div className="flex flex-col items-center">
                <Network className="h-5 w-5 mb-1" />
                <span className="text-sm">Análises em Grafo</span>
              </div>
            </Button>

            <Button 
              variant="outline"
              className={`h-16 ${isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}
              onClick={() => onPageChange('metricas')}
            >
              <div className="flex flex-col items-center">
                <BarChart3 className="h-5 w-5 mb-1" />
                <span className="text-sm">Métricas Consolidadas</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}