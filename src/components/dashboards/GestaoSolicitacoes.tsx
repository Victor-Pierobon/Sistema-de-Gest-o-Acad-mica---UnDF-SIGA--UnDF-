import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText,
  User,
  Calendar,
  BookOpen
} from 'lucide-react';

interface GestaoSolicitacoesProps {
  onBack: () => void;
}

export function GestaoSolicitacoes({ onBack }: GestaoSolicitacoesProps) {
  const { isDark } = useTheme();
  const [filtroStatus, setFiltroStatus] = useState('todas');
  const [busca, setBusca] = useState('');
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null);
  const [parecer, setParecer] = useState('');

  const solicitacoes = [
    {
      id: '1',
      aluno: 'Maria Silva Santos',
      matricula: '202110001',
      disciplina: 'Cálculo I',
      professor: 'Dr. João Oliveira',
      motivo: 'Problemas de saúde durante o semestre',
      status: 'pendente',
      dataSubmissao: '15/12/2024',
      parecerProfessor: 'Aluna demonstrou comprometimento. Recomendo deferimento.',
      documentos: ['atestado_medico.pdf', 'declaracao_hospital.pdf']
    },
    {
      id: '2',
      aluno: 'João Pedro Costa',
      matricula: '202110002',
      disciplina: 'Física I',
      professor: 'Dra. Ana Ferreira',
      motivo: 'Trabalho em período integral',
      status: 'aprovada_professor',
      dataSubmissao: '14/12/2024',
      parecerProfessor: 'Situação justificada. Aluno tem bom desempenho.',
      documentos: ['declaracao_trabalho.pdf']
    },
    {
      id: '3',
      aluno: 'Ana Carolina Lima',
      matricula: '202110003',
      disciplina: 'Algoritmos',
      professor: 'Dr. Carlos Santos',
      motivo: 'Dificuldades financeiras',
      status: 'deferida',
      dataSubmissao: '13/12/2024',
      parecerProfessor: 'Aluna esforçada. Merece nova oportunidade.',
      parecerAdministrativo: 'Deferido conforme parecer do professor.',
      documentos: ['comprovante_renda.pdf']
    },
    {
      id: '4',
      aluno: 'Carlos Eduardo Silva',
      matricula: '202110004',
      disciplina: 'Banco de Dados II',
      professor: 'Dr. Roberto Lima',
      motivo: 'Falta de base em disciplinas anteriores',
      status: 'indeferida',
      dataSubmissao: '12/12/2024',
      parecerProfessor: 'Aluno não demonstrou esforço suficiente.',
      parecerAdministrativo: 'Indeferido. Aluno deve cursar disciplinas de base.',
      documentos: []
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Pendente</Badge>;
      case 'aprovada_professor':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Aprovada pelo Professor</Badge>;
      case 'deferida':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Deferida</Badge>;
      case 'indeferida':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Indeferida</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'aprovada_professor':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'deferida':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'indeferida':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const solicitacoesFiltradas = solicitacoes.filter(sol => {
    const matchStatus = filtroStatus === 'todas' || sol.status === filtroStatus;
    const matchBusca = sol.aluno.toLowerCase().includes(busca.toLowerCase()) ||
                      sol.disciplina.toLowerCase().includes(busca.toLowerCase()) ||
                      sol.matricula.includes(busca);
    return matchStatus && matchBusca;
  });

  const handleAprovar = (id: string) => {
    console.log('Aprovando solicitação:', id, 'Parecer:', parecer);
    setSolicitacaoSelecionada(null);
    setParecer('');
  };

  const handleRejeitar = (id: string) => {
    console.log('Rejeitando solicitação:', id, 'Parecer:', parecer);
    setSolicitacaoSelecionada(null);
    setParecer('');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Gestão de Solicitações
              </h1>
              <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                Gerencie solicitações de recuperação de disciplinas
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                {solicitacoes.filter(s => s.status === 'pendente').length}
              </div>
              <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Pendentes</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {solicitacoes.filter(s => s.status === 'aprovada_professor').length}
              </div>
              <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Aguardando</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                {solicitacoes.filter(s => s.status === 'deferida').length}
              </div>
              <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Deferidas</div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Buscar por aluno, disciplina ou matrícula..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-10"
                    aria-label="Campo de busca por aluno, disciplina ou matrícula"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filtroStatus === 'todas' ? 'default' : 'outline'}
                  onClick={() => setFiltroStatus('todas')}
                  size="sm"
                  aria-pressed={filtroStatus === 'todas'}
                  aria-label="Filtrar todas as solicitações"
                >
                  Todas
                </Button>
                <Button
                  variant={filtroStatus === 'pendente' ? 'default' : 'outline'}
                  onClick={() => setFiltroStatus('pendente')}
                  size="sm"
                >
                  Pendentes
                </Button>
                <Button
                  variant={filtroStatus === 'aprovada_professor' ? 'default' : 'outline'}
                  onClick={() => setFiltroStatus('aprovada_professor')}
                  size="sm"
                >
                  Aguardando
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Solicitações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Solicitações ({solicitacoesFiltradas.length})
            </h2>
            {solicitacoesFiltradas.map((solicitacao) => (
              <Card 
                key={solicitacao.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' : 'bg-white border-slate-200 hover:bg-slate-50'
                } ${solicitacaoSelecionada?.id === solicitacao.id ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSolicitacaoSelecionada(solicitacao)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(solicitacao.status)}
                      <div>
                        <h3 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {solicitacao.aluno}
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {solicitacao.matricula}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(solicitacao.status)}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <BookOpen className="h-4 w-4 text-slate-400" />
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                        {solicitacao.disciplina}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="h-4 w-4 text-slate-400" />
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                        {solicitacao.professor}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                        {solicitacao.dataSubmissao}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detalhes da Solicitação */}
          <div className="space-y-4">
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Detalhes da Solicitação
            </h2>
            {solicitacaoSelecionada ? (
              <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>
                      {solicitacaoSelecionada.aluno}
                    </CardTitle>
                    {getStatusBadge(solicitacaoSelecionada.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Informações Básicas
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Matrícula:</span>
                        <p className={isDark ? 'text-white' : 'text-slate-900'}>{solicitacaoSelecionada.matricula}</p>
                      </div>
                      <div>
                        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Disciplina:</span>
                        <p className={isDark ? 'text-white' : 'text-slate-900'}>{solicitacaoSelecionada.disciplina}</p>
                      </div>
                      <div>
                        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Professor:</span>
                        <p className={isDark ? 'text-white' : 'text-slate-900'}>{solicitacaoSelecionada.professor}</p>
                      </div>
                      <div>
                        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Data:</span>
                        <p className={isDark ? 'text-white' : 'text-slate-900'}>{solicitacaoSelecionada.dataSubmissao}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Motivo da Solicitação
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {solicitacaoSelecionada.motivo}
                    </p>
                  </div>

                  <div>
                    <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Parecer do Professor
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {solicitacaoSelecionada.parecerProfessor}
                    </p>
                  </div>

                  {solicitacaoSelecionada.parecerAdministrativo && (
                    <div>
                      <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Parecer Administrativo
                      </h4>
                      <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {solicitacaoSelecionada.parecerAdministrativo}
                      </p>
                    </div>
                  )}

                  {solicitacaoSelecionada.documentos.length > 0 && (
                    <div>
                      <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Documentos Anexados
                      </h4>
                      <div className="space-y-1">
                        {solicitacaoSelecionada.documentos.map((doc, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <FileText className="h-4 w-4 text-blue-500" />
                            <span className={isDark ? 'text-blue-400' : 'text-blue-600'}>{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(solicitacaoSelecionada.status === 'pendente' || solicitacaoSelecionada.status === 'aprovada_professor') && (
                    <div className="border-t pt-4">
                      <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Parecer Administrativo
                      </h4>
                      <Textarea
                        placeholder="Digite seu parecer sobre a solicitação..."
                        value={parecer}
                        onChange={(e) => setParecer(e.target.value)}
                        className="mb-4"
                      />
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handleAprovar(solicitacaoSelecionada.id)}
                          className="bg-green-600 hover:bg-green-700"
                          disabled={!parecer.trim()}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Deferir
                        </Button>
                        <Button 
                          onClick={() => handleRejeitar(solicitacaoSelecionada.id)}
                          variant="destructive"
                          disabled={!parecer.trim()}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Indeferir
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                <CardContent className="p-8 text-center">
                  <FileText className={`h-12 w-12 mx-auto mb-4 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
                  <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    Selecione uma solicitação para ver os detalhes
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}