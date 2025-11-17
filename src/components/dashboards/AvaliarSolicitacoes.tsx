import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle, 
  XCircle, 
  FileText,
  Calendar,
  User,
  AlertCircle
} from 'lucide-react';

interface AvaliarSolicitacoesProps {
  onBack: () => void;
}

export function AvaliarSolicitacoes({ onBack }: AvaliarSolicitacoesProps) {
  const { isDark } = useTheme();
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState<any>(null);
  const [parecer, setParecer] = useState('');

  const solicitacoesPendentes = [
    {
      id: '1',
      aluno: 'João Silva Santos',
      matricula: '2021001001',
      disciplina: 'Algoritmos Avançados',
      tipo: 'Recuperação de Nota',
      dataSubmissao: '2024-01-15',
      prazoLimite: '2024-01-25',
      justificativa: 'Tive problemas de saúde durante o período da prova P2, conforme atestado médico em anexo. Solicito uma nova oportunidade de avaliação.',
      anexos: ['atestado_medico.pdf'],
      situacaoAcademica: {
        nota: 4.5,
        frequencia: 85,
        faltas: 6
      }
    },
    {
      id: '2',
      aluno: 'Maria Santos Costa',
      matricula: '2021001002',
      disciplina: 'Estruturas de Dados',
      tipo: 'Abono de Faltas',
      dataSubmissao: '2024-01-14',
      prazoLimite: '2024-01-24',
      justificativa: 'Estive internada no hospital durante duas semanas devido a complicações de saúde. Solicito o abono das faltas do período.',
      anexos: ['atestado_internacao.pdf', 'relatorio_medico.pdf'],
      situacaoAcademica: {
        nota: 7.2,
        frequencia: 68,
        faltas: 12
      }
    },
    {
      id: '3',
      aluno: 'Pedro Costa Lima',
      matricula: '2021001003',
      disciplina: 'Programação III',
      tipo: 'Revisão de Prova',
      dataSubmissao: '2024-01-13',
      prazoLimite: '2024-01-23',
      justificativa: 'Acredito que houve erro na correção da questão 3 da prova P1. Solicito revisão da correção.',
      anexos: ['prova_digitalizada.pdf'],
      situacaoAcademica: {
        nota: 5.8,
        frequencia: 92,
        faltas: 3
      }
    }
  ];

  const solicitacoesAvaliadas = [
    {
      id: '4',
      aluno: 'Ana Carolina Silva',
      matricula: '2021001004',
      disciplina: 'Algoritmos Avançados',
      tipo: 'Recuperação de Nota',
      dataSubmissao: '2024-01-10',
      dataAvaliacao: '2024-01-12',
      status: 'Aprovada',
      parecer: 'Solicitação aprovada. Atestado médico válido. Nova avaliação agendada para 20/01/2024.'
    },
    {
      id: '5',
      aluno: 'Bruno Santos',
      matricula: '2021001005',
      disciplina: 'Estruturas de Dados',
      tipo: 'Abono de Faltas',
      dataSubmissao: '2024-01-08',
      dataAvaliacao: '2024-01-10',
      status: 'Rejeitada',
      parecer: 'Documentação insuficiente. Atestado não especifica o período de afastamento necessário.'
    }
  ];

  const handleAprovar = () => {
    alert('Solicitação aprovada com sucesso!');
    setSolicitacaoSelecionada(null);
    setParecer('');
  };

  const handleRejeitar = () => {
    alert('Solicitação rejeitada.');
    setSolicitacaoSelecionada(null);
    setParecer('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovada':
        return 'bg-green-600 hover:bg-green-700';
      case 'Rejeitada':
        return 'bg-red-600 hover:bg-red-700';
      default:
        return 'bg-yellow-600 hover:bg-yellow-700';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'Recuperação de Nota':
        return <FileText className="h-4 w-4" />;
      case 'Abono de Faltas':
        return <Calendar className="h-4 w-4" />;
      case 'Revisão de Prova':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className={isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Avaliar Solicitações
          </h1>
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
            Avalie as solicitações dos alunos
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Pendentes
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {solicitacoesPendentes.length}
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Aguardando avaliação
            </p>
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Aprovadas
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {solicitacoesAvaliadas.filter(s => s.status === 'Aprovada').length}
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Este mês
            </p>
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Rejeitadas
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {solicitacoesAvaliadas.filter(s => s.status === 'Rejeitada').length}
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Este mês
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pendentes" className="w-full">
        <TabsList className={`grid w-full grid-cols-2 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
          <TabsTrigger value="pendentes">Solicitações Pendentes</TabsTrigger>
          <TabsTrigger value="avaliadas">Já Avaliadas</TabsTrigger>
        </TabsList>

        <TabsContent value="pendentes" className="space-y-4">
          {solicitacoesPendentes.map((solicitacao) => (
            <Card key={solicitacao.id} className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className={`flex items-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <User className="h-5 w-5 mr-2" />
                      {solicitacao.aluno}
                    </CardTitle>
                    <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                      {solicitacao.matricula} - {solicitacao.disciplina}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge className={`${getStatusColor('Pendente')} mb-2`}>
                      {getTipoIcon(solicitacao.tipo)}
                      <span className="ml-1">{solicitacao.tipo}</span>
                    </Badge>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Prazo: {new Date(solicitacao.prazoLimite).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-2`}>
                      Justificativa:
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {solicitacao.justificativa}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                      <h5 className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-1`}>
                        Nota Atual
                      </h5>
                      <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {solicitacao.situacaoAcademica.nota}
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                      <h5 className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-1`}>
                        Frequência
                      </h5>
                      <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {solicitacao.situacaoAcademica.frequencia}%
                      </div>
                    </div>

                    <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                      <h5 className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-1`}>
                        Total de Faltas
                      </h5>
                      <div className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {solicitacao.situacaoAcademica.faltas}
                      </div>
                    </div>
                  </div>

                  {solicitacao.anexos.length > 0 && (
                    <div>
                      <h4 className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-2`}>
                        Anexos:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {solicitacao.anexos.map((anexo, index) => (
                          <Badge key={index} variant="outline" className={isDark ? 'border-slate-600 text-slate-300' : 'border-slate-300 text-slate-700'}>
                            <FileText className="h-3 w-3 mr-1" />
                            {anexo}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline"
                          onClick={() => setSolicitacaoSelecionada(solicitacao)}
                          className={isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}
                        >
                          Avaliar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                        <DialogHeader>
                          <DialogTitle className={isDark ? 'text-white' : 'text-slate-900'}>
                            Avaliar Solicitação
                          </DialogTitle>
                          <DialogDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                            {solicitacao.aluno} - {solicitacao.tipo}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                              Parecer:
                            </label>
                            <Textarea
                              value={parecer}
                              onChange={(e) => setParecer(e.target.value)}
                              placeholder="Digite seu parecer sobre a solicitação..."
                              className={`mt-1 ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-300'}`}
                              rows={4}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="destructive"
                              onClick={handleRejeitar}
                              disabled={!parecer.trim()}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Rejeitar
                            </Button>
                            <Button
                              onClick={handleAprovar}
                              disabled={!parecer.trim()}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Aprovar
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="avaliadas" className="space-y-4">
          {solicitacoesAvaliadas.map((solicitacao) => (
            <Card key={solicitacao.id} className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className={`flex items-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <User className="h-5 w-5 mr-2" />
                      {solicitacao.aluno}
                    </CardTitle>
                    <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                      {solicitacao.matricula} - {solicitacao.disciplina}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(solicitacao.status)}>
                      {solicitacao.status === 'Aprovada' ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                      {solicitacao.status}
                    </Badge>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Avaliada em: {new Date(solicitacao.dataAvaliacao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <h4 className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'} mb-2`}>
                    Parecer:
                  </h4>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {solicitacao.parecer}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}