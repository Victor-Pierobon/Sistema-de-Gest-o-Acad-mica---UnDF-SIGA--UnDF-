import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useTheme } from '../../contexts/ThemeContext';
import { GrafoVisualizacao } from '../GrafoVisualizacao';
import { 
  Network, 
  TrendingDown, 
  AlertTriangle, 
  Users, 
  BookOpen,
  ArrowLeft,
  Download,
  Filter
} from 'lucide-react';
import { GrafoNode, GrafoEdge } from '../../types';
import { apiService } from '../../services/api';

interface GraphAnalysisProps {
  onBack: () => void;
}

export function GraphAnalysis({ onBack }: GraphAnalysisProps) {
  const { isDark } = useTheme();
  const [selectedAnalysis, setSelectedAnalysis] = useState('prerequisitos');

  // Dados simulados para análise de grafos
  const disciplinasNodes: GrafoNode[] = [
    { id: '1', label: 'Algoritmos', tipo: 'disciplina', status: 'disponivel', dados: { codigo: 'ALG101', creditos: 4, taxa_reprovacao: 25 } },
    { id: '2', label: 'Estruturas de Dados', tipo: 'disciplina', status: 'disponivel', dados: { codigo: 'ED201', creditos: 4, taxa_reprovacao: 30 } },
    { id: '3', label: 'Banco de Dados I', tipo: 'disciplina', status: 'disponivel', dados: { codigo: 'BDI301', creditos: 4, taxa_reprovacao: 42 } },
    { id: '4', label: 'Banco de Dados II', tipo: 'disciplina', status: 'disponivel', dados: { codigo: 'BDII401', creditos: 4, taxa_reprovacao: 48 } },
    { id: '5', label: 'POO', tipo: 'disciplina', status: 'disponivel', dados: { codigo: 'POO301', creditos: 4, taxa_reprovacao: 35 } },
    { id: '6', label: 'Redes', tipo: 'disciplina', status: 'disponivel', dados: { codigo: 'RC401', creditos: 4, taxa_reprovacao: 28 } },
  ];

  const prerequisitosEdges: GrafoEdge[] = [
    { id: 'e1', source: '1', target: '2', tipo: 'prerequisito', peso: 1 },
    { id: 'e2', source: '2', target: '5', tipo: 'prerequisito', peso: 1 },
    { id: 'e3', source: '3', target: '4', tipo: 'prerequisito', peso: 1 },
    { id: 'e4', source: '2', target: '3', tipo: 'prerequisito', peso: 0.5 },
  ];

  const alunosNodes: GrafoNode[] = [
    { id: 'a1', label: 'João Silva', tipo: 'aluno', status: 'ativo', dados: { matricula: '2021001234', cr: 7.5, risco: 'baixo' } },
    { id: 'a2', label: 'Maria Santos', tipo: 'aluno', status: 'ativo', dados: { matricula: '2021001235', cr: 5.2, risco: 'alto' } },
    { id: 'a3', label: 'Pedro Costa', tipo: 'aluno', status: 'ativo', dados: { matricula: '2022001236', cr: 8.1, risco: 'baixo' } },
  ];

  const performanceEdges: GrafoEdge[] = [
    { id: 'p1', source: 'a1', target: '1', tipo: 'cursou', peso: 8.0 },
    { id: 'p2', source: 'a1', target: '2', tipo: 'cursou', peso: 7.5 },
    { id: 'p3', source: 'a2', target: '1', tipo: 'reprovou', peso: 3.5 },
    { id: 'p4', source: 'a2', target: '2', tipo: 'cursou', peso: 6.0 },
    { id: 'p5', source: 'a3', target: '1', tipo: 'cursou', peso: 9.0 },
    { id: 'p6', source: 'a3', target: '2', tipo: 'cursou', peso: 8.5 },
  ];

  const [metricas, setMetricas] = useState({
    disciplinasCriticas: 0,
    alunosRisco: 0,
    taxaReprovacaoMedia: 0,
    disciplinasGargalo: 0
  });

  React.useEffect(() => {
    apiService.getMetricas().then(data => {
      setMetricas({
        disciplinasCriticas: data.disciplinasCriticas,
        alunosRisco: data.alunosRisco,
        taxaReprovacaoMedia: data.taxaReprovacaoMedia,
        disciplinasGargalo: data.disciplinasCriticas
      });
    });
  }, []);

  const [disciplinasCriticas, setDisciplinasCriticas] = useState([]);
  const [alunosRisco, setAlunosRisco] = useState([]);
  const [grafoData, setGrafoData] = useState({ nodes: [], edges: [] });

  React.useEffect(() => {
    // Carregar dados reais do banco
    apiService.getDisciplinasCriticas().then(setDisciplinasCriticas);
    apiService.getAlunosRisco().then(setAlunosRisco);
    apiService.getGrafoData(selectedAnalysis).then(setGrafoData);
  }, [selectedAnalysis]);

  const getImpactoBadge = (impacto: string) => {
    switch (impacto) {
      case 'CRÍTICO':
        return <Badge className="bg-red-600 text-white">Crítico</Badge>;
      case 'ALTO':
        return <Badge className="bg-orange-600 text-white">Alto</Badge>;
      case 'MÉDIO':
        return <Badge className="bg-yellow-600 text-white">Médio</Badge>;
      default:
        return <Badge variant="secondary">Baixo</Badge>;
    }
  };

  const getRiscoBadge = (risco: string) => {
    switch (risco) {
      case 'CRÍTICO':
        return <Badge className="bg-red-600 text-white">Crítico</Badge>;
      case 'ALTO':
        return <Badge className="bg-orange-600 text-white">Alto</Badge>;
      case 'MÉDIO':
        return <Badge className="bg-yellow-600 text-white">Médio</Badge>;
      default:
        return <Badge variant="secondary">Baixo</Badge>;
    }
  };

  const getCurrentNodes = () => {
    return grafoData.nodes || [];
  };

  const getCurrentEdges = () => {
    return grafoData.edges || [];
  };

  const getAnalysisTitle = () => {
    switch (selectedAnalysis) {
      case 'prerequisitos':
        return 'Análise de Pré-requisitos';
      case 'performance':
        return 'Performance dos Alunos';
      case 'fluxo':
        return 'Fluxo Curricular';
      default:
        return 'Análise de Grafos';
    }
  };

  const getAnalysisDescription = () => {
    switch (selectedAnalysis) {
      case 'prerequisitos':
        return 'Visualização das dependências entre disciplinas e identificação de gargalos';
      case 'performance':
        return 'Análise do desempenho dos alunos e identificação de padrões de reprovação';
      case 'fluxo':
        return 'Mapeamento do fluxo curricular e sequenciamento otimizado';
      default:
        return 'Análise visual dos dados acadêmicos';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            className={isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Análise de Grafos</h1>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Visualização e análise de dados acadêmicos</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedAnalysis} onValueChange={setSelectedAnalysis}>
            <SelectTrigger className={`w-48 ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-300'}`}>
              <SelectValue placeholder="Tipo de análise" />
            </SelectTrigger>
            <SelectContent className={isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'}>
              <SelectItem value="prerequisitos">Pré-requisitos</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="fluxo">Fluxo Curricular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Métricas Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Disciplinas Críticas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{metricas.disciplinasCriticas}</div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Taxa reprovação &gt; 40%</p>
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Alunos em Risco</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{metricas.alunosRisco}%</div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Risco de evasão</p>
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Taxa Reprovação</CardTitle>
            <TrendingDown className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{metricas.taxaReprovacaoMedia}%</div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Média geral</p>
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Disciplinas Gargalo</CardTitle>
            <BookOpen className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{metricas.disciplinasGargalo}</div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Bloqueiam progressão</p>
          </CardContent>
        </Card>
      </div>

      {/* Visualização do Grafo */}
      <GrafoVisualizacao
        nodes={getCurrentNodes()}
        edges={getCurrentEdges()}
        title={getAnalysisTitle()}
        description={getAnalysisDescription()}
        filtros={['todos', 'criticas', 'normais']}
        height={500}
      />

      {/* Análises Detalhadas */}
      <Tabs defaultValue="disciplinas" className="space-y-4">
        <TabsList className={`grid w-full grid-cols-2 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
          <TabsTrigger value="disciplinas" className={isDark ? 'data-[state=active]:bg-slate-700' : 'data-[state=active]:bg-white'}>
            Disciplinas Críticas
          </TabsTrigger>
          <TabsTrigger value="alunos" className={isDark ? 'data-[state=active]:bg-slate-700' : 'data-[state=active]:bg-white'}>
            Alunos em Risco
          </TabsTrigger>
        </TabsList>

        <TabsContent value="disciplinas" className="space-y-4">
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Top 5 Disciplinas Críticas</CardTitle>
              <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                Disciplinas com maior taxa de reprovação e impacto no fluxo curricular
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disciplinasCriticas.map((disciplina, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-red-600 text-white' :
                        index === 1 ? 'bg-orange-600 text-white' :
                        index === 2 ? 'bg-yellow-600 text-white' :
                        'bg-slate-600 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{disciplina.nome}</h4>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{disciplina.codigo}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{disciplina.taxa}%</p>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Taxa reprovação</p>
                      </div>
                      {getImpactoBadge(disciplina.impacto)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alunos" className="space-y-4">
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Alunos em Situação de Risco</CardTitle>
              <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                Estudantes com alto risco de evasão baseado em reprovações e CR
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alunosRisco.map((aluno, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        aluno.risco === 'CRÍTICO' ? 'bg-red-600 text-white' :
                        aluno.risco === 'ALTO' ? 'bg-orange-600 text-white' :
                        'bg-yellow-600 text-white'
                      }`}>
                        {aluno.nome.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{aluno.nome}</h4>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{aluno.matricula}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{aluno.reprovacoes}</p>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Reprovações</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{aluno.cr}</p>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>CR</p>
                      </div>
                      {getRiscoBadge(aluno.risco)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}