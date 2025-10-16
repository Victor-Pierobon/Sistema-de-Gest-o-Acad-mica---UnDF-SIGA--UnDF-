import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  BookOpen, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  FileText,
  TrendingUp,
  Calendar
} from 'lucide-react';

interface AlunoDashboardProps {
  onPageChange: (page: string) => void;
}

export function AlunoDashboard({ onPageChange }: AlunoDashboardProps) {
  // Dados mockados para demonstração
  const statusSolicitacoes = {
    pendentes: 2,
    aprovadas: 1,
    rejeitadas: 0
  };

  const presencas = {
    total: 120,
    presentes: 95,
    faltas: 25,
    percentualFaltas: 20.8
  };

  const disciplinasAndamento = [
    { nome: 'Algoritmos Avançados', faltas: 2, totalAulas: 40, nota: 8.5 },
    { nome: 'Engenharia de Software', faltas: 1, totalAulas: 36, nota: 9.0 },
    { nome: 'Banco de Dados II', faltas: 5, totalAulas: 32, nota: 7.8 },
    { nome: 'Redes de Computadores', faltas: 3, totalAulas: 38, nota: 8.2 }
  ];

  const proximasAulas = [
    { disciplina: 'Algoritmos Avançados', horario: '08:00', sala: 'Lab 1' },
    { disciplina: 'Engenharia de Software', horario: '10:00', sala: 'Sala 15' },
    { disciplina: 'Banco de Dados II', horario: '14:00', sala: 'Lab 2' }
  ];

  return (
    <div className="space-y-6">
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-slate-300">Solicitações Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">{statusSolicitacoes.pendentes}</div>
            <p className="text-xs text-slate-400">
              {statusSolicitacoes.aprovadas} aprovadas, {statusSolicitacoes.rejeitadas} rejeitadas
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-slate-300">Percentual de Faltas</CardTitle>
            <AlertTriangle className={`h-4 w-4 ${presencas.percentualFaltas > 20 ? 'text-red-500' : 'text-green-500'}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">{presencas.percentualFaltas}%</div>
            <Progress 
              value={presencas.percentualFaltas} 
              className="mt-2"
              color={presencas.percentualFaltas > 20 ? 'red' : 'green'}
            />
            <p className="text-xs text-slate-400 mt-1">
              {presencas.faltas} faltas em {presencas.total} aulas
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-slate-300">Disciplinas Cursando</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">{disciplinasAndamento.length}</div>
            <p className="text-xs text-slate-400">
              Média geral: {(disciplinasAndamento.reduce((acc, d) => acc + d.nota, 0) / disciplinasAndamento.length).toFixed(1)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-slate-300">Próximas Aulas</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">{proximasAulas.length}</div>
            <p className="text-xs text-slate-400">Hoje</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerta de faltas */}
      {presencas.percentualFaltas > 20 && (
        <Card className="bg-red-900/20 border-red-800">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Atenção: Limite de Faltas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-300">
              Você está próximo do limite de 25% de faltas. Mantenha-se atento à frequência nas aulas.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Disciplinas em andamento */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Disciplinas em Andamento</CardTitle>
            <CardDescription className="text-slate-400">
              Acompanhe seu progresso e frequência
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {disciplinasAndamento.map((disciplina, index) => {
              const percentualFaltas = (disciplina.faltas / disciplina.totalAulas) * 100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-white text-sm">{disciplina.nome}</h4>
                    <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                      Nota: {disciplina.nota}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Faltas: {disciplina.faltas}/{disciplina.totalAulas}</span>
                    <span className={percentualFaltas > 20 ? 'text-red-400' : 'text-green-400'}>
                      {percentualFaltas.toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={percentualFaltas} 
                    className="h-2"
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Próximas aulas */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Próximas Aulas - Hoje</CardTitle>
            <CardDescription className="text-slate-400">
              Sua agenda do dia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {proximasAulas.map((aula, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div>
                  <h4 className="text-white text-sm">{aula.disciplina}</h4>
                  <p className="text-slate-400 text-xs">{aula.sala}</p>
                </div>
                <Badge variant="outline" className="border-slate-600 text-slate-300">
                  {aula.horario}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Ações rápidas */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Ações Rápidas</CardTitle>
          <CardDescription className="text-slate-400">
            Acesso rápido às principais funcionalidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-16 bg-blue-600 hover:bg-blue-700"
              onClick={() => onPageChange('solicitar-recuperacao')}
            >
              <div className="flex flex-col items-center">
                <FileText className="h-5 w-5 mb-1" />
                <span className="text-sm">Solicitar Recuperação</span>
              </div>
            </Button>
            
            <Button 
              variant="outline"
              className="h-16 border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={() => onPageChange('grafo-historico')}
            >
              <div className="flex flex-col items-center">
                <TrendingUp className="h-5 w-5 mb-1" />
                <span className="text-sm">Ver Grafo Acadêmico</span>
              </div>
            </Button>
            
            <Button 
              variant="outline"
              className="h-16 border-slate-600 text-slate-300 hover:bg-slate-700"
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
