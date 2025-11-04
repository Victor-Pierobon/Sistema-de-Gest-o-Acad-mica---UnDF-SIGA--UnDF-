import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  BookOpen, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  FileText,
  TrendingUp,
  Calendar,
  GraduationCap,
  BarChart3,
  Target
} from 'lucide-react';

interface AlunoDashboardProps {
  onPageChange: (page: string) => void;
}

export function AlunoDashboard({ onPageChange }: AlunoDashboardProps) {
  const { isDark } = useTheme();
  
  const statusSolicitacoes = {
    pendentes: 2,
    aprovadas: 1,
    rejeitadas: 0
  };

  const metricas = {
    progressoCurso: 42.5, // Porcentagem do curso concluída
    mediaGeral: 8.4, // Coeficiente de Rendimento (CR)
    presencaGlobal: 85.2, // Porcentagem de presença global
    creditosConcluidos: 96, // Total de créditos concluídos
    creditosTotais: 240, // Total de créditos do curso
    situacaoFaltas: 'regular' // 'regular', 'atencao', 'critico'
  };

  const presencas = {
    total: 120,
    presentes: 95,
    faltas: 25,
    percentualFaltas: 20.8
  };

  const disciplinasAndamento = [
    { 
      nome: 'Algoritmos Avançados', 
      faltas: 2, 
      totalAulas: 40, 
      nota: 8.5,
      atividadesEntregues: 8,
      totalAtividades: 10,
      professor: 'Dr. Carlos Silva',
      status: 'regular' // 'regular', 'atencao', 'critico'
    },
    { 
      nome: 'Engenharia de Software', 
      faltas: 1, 
      totalAulas: 36, 
      nota: 9.0,
      atividadesEntregues: 12,
      totalAtividades: 12,
      professor: 'Dra. Ana Santos',
      status: 'regular'
    },
    { 
      nome: 'Banco de Dados II', 
      faltas: 5, 
      totalAulas: 32, 
      nota: 7.8,
      atividadesEntregues: 6,
      totalAtividades: 8,
      professor: 'Dr. Pedro Costa',
      status: 'atencao'
    },
    { 
      nome: 'Redes de Computadores', 
      faltas: 3, 
      totalAulas: 38, 
      nota: 8.2,
      atividadesEntregues: 7,
      totalAtividades: 9,
      professor: 'Dr. João Lima',
      status: 'regular'
    }
  ];

  const proximasAulas = [
    { 
      disciplina: 'Algoritmos Avançados', 
      horario: '08:00', 
      sala: 'Lab 1',
      professor: 'Dr. Carlos Silva',
      tipo: 'Prática',
      tema: 'Algoritmos de Grafos'
    },
    { 
      disciplina: 'Engenharia de Software', 
      horario: '10:00', 
      sala: 'Sala 15',
      professor: 'Dra. Ana Santos',
      tipo: 'Teórica',
      tema: 'Métodos Ágeis'
    },
    { 
      disciplina: 'Banco de Dados II', 
      horario: '14:00', 
      sala: 'Lab 2',
      professor: 'Dr. Pedro Costa',
      tipo: 'Prática',
      tema: 'Otimização de Consultas'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>SIGA-UnDF</h1>
        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Dashboard do Aluno</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={`hover:shadow-lg transition-shadow ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Progresso do Curso</CardTitle>
            <GraduationCap className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-2">
              <div className="text-5xl font-bold text-blue-400">{metricas.progressoCurso}%</div>
            </div>
            <Progress 
              value={metricas.progressoCurso} 
              className="mt-2"
            />
            <p className={`text-xs mt-2 text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {metricas.creditosConcluidos} de {metricas.creditosTotais} créditos
            </p>
          </CardContent>
        </Card>

        <Card className={`hover:shadow-lg transition-shadow ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Coeficiente de Rendimento</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className={`text-5xl font-bold ${metricas.mediaGeral >= 7 ? 'text-green-400' : 'text-yellow-400'}`}>
                {metricas.mediaGeral.toFixed(1)}
              </div>
            </div>
            <p className={`text-xs mt-2 text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Média Geral
            </p>
          </CardContent>
        </Card>

        <Card className={`hover:shadow-lg transition-shadow ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Presença Global</CardTitle>
            <AlertTriangle className={`h-4 w-4 ${metricas.situacaoFaltas === 'regular' ? 'text-green-500' : 'text-red-500'}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-2">
              <div className={`text-5xl font-bold ${metricas.situacaoFaltas === 'regular' ? 'text-green-400' : 'text-red-400'}`}>
                {metricas.presencaGlobal}%
              </div>
            </div>
            <Progress 
              value={metricas.presencaGlobal} 
              className="mt-2"
              color={metricas.situacaoFaltas === 'regular' ? 'green' : 'red'}
            />
            <p className={`text-xs mt-2 text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Frequência Total
            </p>
          </CardContent>
        </Card>

        <Card className={`hover:shadow-lg transition-shadow ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Status de Solicitações</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Pendentes</span>
              <Badge variant="outline" className="border-yellow-600 text-yellow-400">
                {statusSolicitacoes.pendentes}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Aprovadas</span>
              <Badge variant="outline" className="border-green-600 text-green-400">
                {statusSolicitacoes.aprovadas}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Rejeitadas</span>
              <Badge variant="outline" className="border-red-600 text-red-400">
                {statusSolicitacoes.rejeitadas}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {metricas.situacaoFaltas !== 'regular' && (
        <Card className={isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}>
          <CardHeader>
            <CardTitle className={`flex items-center ${isDark ? 'text-red-400' : 'text-red-700'}`}>
              <AlertTriangle className="h-5 w-5 mr-2" />
              Atenção: Situação de Frequência
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={isDark ? 'text-red-300' : 'text-red-600'}>
              Sua frequência está abaixo do esperado. Procure manter presença regular nas aulas para evitar reprovação por faltas.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Disciplinas em Andamento</CardTitle>
            <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Acompanhe seu progresso e frequência
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {disciplinasAndamento.map((disciplina, index) => {
              const percentualFaltas = (disciplina.faltas / disciplina.totalAulas) * 100;
              const percentualAtividades = (disciplina.atividadesEntregues / disciplina.totalAtividades) * 100;
              const statusColor = disciplina.status === 'regular' ? 'text-green-400' : 
                                disciplina.status === 'atencao' ? 'text-yellow-400' : 'text-red-400';
              
              return (
                <div key={index} className={`p-4 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-slate-50'} hover:shadow-md transition-shadow`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{disciplina.nome}</h4>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Prof. {disciplina.professor}</p>
                    </div>
                    <Badge className={`${statusColor} bg-opacity-10`}>
                      Nota: {disciplina.nota}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Frequência</span>
                        <span className={percentualFaltas > 20 ? 'text-red-400' : 'text-green-400'}>
                          {(100 - percentualFaltas).toFixed(1)}%
                        </span>
                      </div>
                      <Progress 
                        value={100 - percentualFaltas} 
                        className="h-2"
                        color={percentualFaltas > 20 ? 'red' : 'green'}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Atividades</span>
                        <span className={`${percentualAtividades >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
                          {disciplina.atividadesEntregues}/{disciplina.totalAtividades}
                        </span>
                      </div>
                      <Progress 
                        value={percentualAtividades} 
                        className="h-2"
                        color={percentualAtividades >= 80 ? 'green' : 'yellow'}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Próximas Aulas - Hoje</CardTitle>
            <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Sua agenda do dia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {proximasAulas.map((aula, index) => (
              <div key={index} className={`p-4 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-slate-50'} hover:shadow-md transition-shadow`}>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{aula.disciplina}</h4>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{aula.professor}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={isDark ? 'border-slate-600 text-slate-300' : 'border-slate-300 text-slate-700'}>
                        {aula.sala}
                      </Badge>
                      <Badge variant="outline" className={isDark ? 'border-slate-600 text-slate-300' : 'border-slate-300 text-slate-700'}>
                        {aula.tipo}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{aula.horario}</div>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{aula.tema}</p>
                  </div>
                </div>
              </div>
            ))}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-16 bg-blue-600 hover:bg-blue-700 transition-colors"
              onClick={() => onPageChange('solicitar-recuperacao')}
            >
              <div className="flex flex-col items-center">
                <FileText className="h-5 w-5 mb-1" />
                <span className="text-sm">Solicitar Recuperação</span>
              </div>
            </Button>
            
            <Button 
              variant="outline"
              className={`h-16 transition-colors ${isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}
              onClick={() => onPageChange('grafo-historico')}
            >
              <div className="flex flex-col items-center">
                <TrendingUp className="h-5 w-5 mb-1" />
                <span className="text-sm">Ver Grafo Acadêmico</span>
              </div>
            </Button>
            
            <Button 
              variant="outline"
              className={`h-16 transition-colors ${isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}
              onClick={() => onPageChange('minhas-solicitacoes')}
            >
              <div className="flex flex-col items-center">
                <CheckCircle className="h-5 w-5 mb-1" />
                <span className="text-sm">Minhas Solicitações</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}