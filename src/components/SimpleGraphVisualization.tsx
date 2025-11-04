import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useTheme } from '../contexts/ThemeContext';
import { apiService } from '../services/api';
import { 
  Network, 
  BarChart3, 
  Users, 
  AlertTriangle,
  BookOpen,
  CheckCircle,
  Target,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

interface SimpleGraphVisualizationProps {
  onBack: () => void;
}

export function SimpleGraphVisualization({ onBack }: SimpleGraphVisualizationProps) {
  const { isDark } = useTheme();
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [centralityData, setCentralityData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [graph, centrality, recs] = await Promise.all([
        apiService.getGrafoData('prerequisitos'),
        apiService.getCentralityData(),
        apiService.getStudentRecommendations('current-student')
      ]);
      
      setGraphData(graph);
      setCentralityData(centrality);
      setRecommendations(recs);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const getNodesByCategory = (categoria: string) => {
    return graphData.nodes.filter((node: any) => node.categoria === categoria);
  };

  const getCategoryColor = (categoria: string) => {
    switch (categoria) {
      case 'critica': return 'bg-red-500';
      case 'dificil': return 'bg-orange-500';
      case 'moderada': return 'bg-yellow-500';
      case 'facil': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'cursada': return 'border-green-500 bg-green-50';
      case 'em_andamento': return 'border-blue-500 bg-blue-50';
      case 'perdida': return 'border-red-500 bg-red-50';
      case 'disponivel': return 'border-gray-500 bg-gray-50';
      default: return 'border-gray-300 bg-white';
    }
  };

  const renderFluxoCurricular = () => {
    const semestres = [1, 2, 3, 4, 5];
    
    return (
      <div className="space-y-6">
        {semestres.map(semestre => {
          const disciplinasSemestre = graphData.nodes.filter((node: any) => 
            node.dados?.semestre === semestre
          );
          
          if (disciplinasSemestre.length === 0) return null;
          
          return (
            <Card key={semestre} className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader>
                <CardTitle className={`text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {semestre}º Semestre
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {disciplinasSemestre.map((node: any) => (
                    <div
                      key={node.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                        isDark ? getStatusColor(node.status).replace('bg-', 'bg-slate-700 border-') : getStatusColor(node.status)
                      }`}
                      onClick={() => setSelectedNode(node)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {node.label}
                          </h4>
                          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {node.dados?.codigo}
                          </p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(node.categoria)}`}></div>
                      </div>
                      
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Taxa Reprov.:</span>
                          <span className={`font-medium ${
                            node.dados?.taxa_reprovacao > 40 ? 'text-red-500' :
                            node.dados?.taxa_reprovacao > 25 ? 'text-yellow-500' : 'text-green-500'
                          }`}>
                            {node.dados?.taxa_reprovacao?.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Cursaram:</span>
                          <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                            {node.dados?.total_cursaram}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className={`mt-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Carregando dados do grafo...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Análise de Grafos Acadêmicos
          </h1>
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
            Visualização interativa do fluxo curricular e análises preditivas
          </p>
        </div>
        <Button onClick={onBack} variant="outline">Voltar</Button>
      </div>

      <Tabs defaultValue="fluxo" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fluxo">Fluxo Curricular</TabsTrigger>
          <TabsTrigger value="centralidade">Análise de Centralidade</TabsTrigger>
          <TabsTrigger value="recomendacoes">Recomendações</TabsTrigger>
        </TabsList>

        <TabsContent value="fluxo" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              {renderFluxoCurricular()}
            </div>
            
            <div className="space-y-4">
              <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                <CardHeader>
                  <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Legenda</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h5 className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Dificuldade:
                    </h5>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Fácil (&lt;20%)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Moderada (20-30%)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Difícil (30-50%)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Crítica (&gt;50%)
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Status:
                    </h5>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded border border-green-500"></div>
                        <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Cursada</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded border border-blue-500"></div>
                        <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Em Andamento</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded border border-red-500"></div>
                        <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Perdida</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-500 rounded border border-gray-500"></div>
                        <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Disponível</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedNode && (
                <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                  <CardHeader>
                    <CardTitle className={`text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Detalhes da Disciplina
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {selectedNode.label}
                      </h4>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {selectedNode.dados?.codigo} - {selectedNode.dados?.creditos} créditos
                      </p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Taxa de Reprovação:</span>
                        <span className={`font-medium ${
                          selectedNode.dados?.taxa_reprovacao > 40 ? 'text-red-400' :
                          selectedNode.dados?.taxa_reprovacao > 25 ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {selectedNode.dados?.taxa_reprovacao?.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Total que Cursaram:</span>
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                          {selectedNode.dados?.total_cursaram}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Aprovados:</span>
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                          {selectedNode.dados?.aprovados}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="centralidade" className="space-y-6">
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>
                Análise de Centralidade das Disciplinas
              </CardTitle>
              <CardDescription>
                Disciplinas mais importantes no fluxo curricular baseadas em conectividade e impacto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {centralityData.map((item: any, index) => (
                  <div key={index} className={`p-4 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {item.nome}
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {item.codigo}
                        </p>
                      </div>
                      <Badge variant={
                        item.classificacao === 'gargalo_critico' ? 'destructive' :
                        item.classificacao === 'gargalo_alto' ? 'secondary' :
                        item.classificacao === 'importante' ? 'outline' : 'default'
                      }>
                        {item.classificacao?.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Dependentes:</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {item.dependentes}
                        </p>
                      </div>
                      <div>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Pré-requisitos:</p>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {item.prerequisitos}
                        </p>
                      </div>
                      <div>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Taxa Reprovação:</p>
                        <p className={`font-medium ${
                          item.taxa_reprovacao > 40 ? 'text-red-400' :
                          item.taxa_reprovacao > 25 ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {item.taxa_reprovacao}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recomendacoes" className="space-y-6">
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>
                Recomendações Personalizadas
              </CardTitle>
              <CardDescription>
                Disciplinas sugeridas baseadas no seu progresso acadêmico
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec: any, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {rec.disciplina_nome}
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {rec.codigo} - {rec.semestre_recomendado}º Semestre
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={
                          rec.prioridade === 1 ? 'bg-green-600' :
                          rec.prioridade === 2 ? 'bg-yellow-600' : 'bg-gray-600'
                        }>
                          Prioridade {rec.prioridade}
                        </Badge>
                        <Badge variant="outline" className={
                          rec.dificuldade === 'recomendada' ? 'border-green-600 text-green-400' :
                          rec.dificuldade === 'moderada' ? 'border-yellow-600 text-yellow-400' :
                          'border-red-600 text-red-400'
                        }>
                          {rec.dificuldade}
                        </Badge>
                      </div>
                    </div>
                    <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <strong>Motivo:</strong> {rec.motivo}
                    </p>
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