import React, { useState, useEffect, useRef } from 'react';
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
  Filter,
  Zap,
  Target,
  TrendingUp,
  BookOpen,
  CheckCircle
} from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  tipo: string;
  categoria?: string;
  status?: string;
  dados?: any;
}

interface GraphEdge {
  id: string;
  source: string;
  target: string;
  tipo: string;
  peso: number;
}

interface GraphVisualizationProps {
  onBack: () => void;
}

function RecommendationsTab({ isDark }: { isDark: boolean }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const data = await apiService.getStudentRecommendations('current-student');
        setRecommendations(data);
      } catch (error) {
        console.error('Erro ao carregar recomendações:', error);
      } finally {
        setLoading(false);
      }
    };
    loadRecommendations();
  }, []);

  const getPriorityBadge = (prioridade: number) => {
    if (prioridade === 1) return <Badge className="bg-green-600">Alta Prioridade</Badge>;
    if (prioridade === 2) return <Badge variant="secondary">Média Prioridade</Badge>;
    return <Badge variant="outline">Baixa Prioridade</Badge>;
  };

  const getDifficultyBadge = (dificuldade: string) => {
    if (dificuldade === 'recomendada') return <Badge className="bg-green-600">Recomendada</Badge>;
    if (dificuldade === 'moderada') return <Badge className="bg-yellow-600">Moderada</Badge>;
    return <Badge className="bg-red-600">Difícil</Badge>;
  };

  if (loading) {
    return (
      <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Carregando recomendações...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
        <CardHeader>
          <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Recomendações Personalizadas</CardTitle>
          <CardDescription>Disciplinas sugeridas baseadas no seu progresso acadêmico</CardDescription>
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
                    {getPriorityBadge(rec.prioridade)}
                    {getDifficultyBadge(rec.dificuldade)}
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

      <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
        <CardHeader>
          <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Dicas para Sucesso Acadêmico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h5 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Planeje sua carga horária</h5>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Evite sobrecarregar-se com muitas disciplinas difíceis no mesmo semestre.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <BookOpen className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h5 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Respeite os pré-requisitos</h5>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Disciplinas com pré-requisitos têm conteúdo sequencial importante.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <h5 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Foque nas disciplinas críticas</h5>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Disciplinas com alta taxa de reprovação requerem atenção especial.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function GraphVisualization({ onBack }: GraphVisualizationProps) {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [centralityData, setCentralityData] = useState([]);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [filter, setFilter] = useState('all');
  const [simulation, setSimulation] = useState<any>(null);

  useEffect(() => {
    loadGraphData();
    loadCentralityData();
  }, []);

  useEffect(() => {
    if (nodes.length > 0 && canvasRef.current) {
      initializeVisualization();
    }
  }, [nodes, filter]);

  const loadGraphData = async () => {
    try {
      const data = await apiService.getGrafoData('prerequisitos');
      console.log('Dados do grafo:', data);
      setNodes(data.nodes || []);
      setEdges(data.edges || []);
    } catch (error) {
      console.error('Erro ao carregar dados do grafo:', error);
    }
  };

  const loadCentralityData = async () => {
    try {
      const data = await apiService.getCentralityData();
      setCentralityData(data);
    } catch (error) {
      console.error('Erro ao carregar análise de centralidade:', error);
    }
  };

  const initializeVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Filtrar nós baseado no filtro selecionado
    const filteredNodes = filter === 'all' ? nodes : nodes.filter(node => {
      if (filter === 'criticas') return node.categoria === 'critica';
      if (filter === 'dificeis') return node.categoria === 'dificil' || node.categoria === 'critica';
      if (filter === 'faceis') return node.categoria === 'facil';
      return true;
    });

    // Simular posições dos nós (em uma implementação real, usaria D3.js ou similar)
    const positions = new Map();
    filteredNodes.forEach((node, index) => {
      const angle = (index / filteredNodes.length) * 2 * Math.PI;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;
      const x = canvas.width / 2 + Math.cos(angle) * radius;
      const y = canvas.height / 2 + Math.sin(angle) * radius;
      positions.set(node.id, { x, y });
    });

    // Desenhar
    drawGraph(ctx, filteredNodes, edges, positions);

    // Adicionar interatividade
    canvas.onclick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Encontrar nó clicado
      for (const node of filteredNodes) {
        const pos = positions.get(node.id);
        if (pos && Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2) < 30) {
          setSelectedNode(node);
          break;
        }
      }
    };
  };

  const drawGraph = (ctx: CanvasRenderingContext2D, nodes: GraphNode[], edges: GraphEdge[], positions: Map<string, {x: number, y: number}>) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Desenhar arestas
    edges.forEach(edge => {
      const sourcePos = positions.get(edge.source);
      const targetPos = positions.get(edge.target);
      
      if (sourcePos && targetPos) {
        ctx.beginPath();
        ctx.moveTo(sourcePos.x, sourcePos.y);
        ctx.lineTo(targetPos.x, targetPos.y);
        ctx.strokeStyle = edge.tipo === 'obrigatorio' ? '#ef4444' : '#94a3b8';
        ctx.lineWidth = edge.peso;
        ctx.stroke();

        // Desenhar seta
        const angle = Math.atan2(targetPos.y - sourcePos.y, targetPos.x - sourcePos.x);
        const arrowLength = 10;
        ctx.beginPath();
        ctx.moveTo(targetPos.x, targetPos.y);
        ctx.lineTo(
          targetPos.x - arrowLength * Math.cos(angle - Math.PI / 6),
          targetPos.y - arrowLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(targetPos.x, targetPos.y);
        ctx.lineTo(
          targetPos.x - arrowLength * Math.cos(angle + Math.PI / 6),
          targetPos.y - arrowLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.stroke();
      }
    });

    // Desenhar nós
    nodes.forEach(node => {
      const pos = positions.get(node.id);
      if (!pos) return;

      // Cor baseada na categoria
      let color = '#3b82f6'; // azul padrão
      if (node.categoria === 'critica') color = '#ef4444'; // vermelho
      else if (node.categoria === 'dificil') color = '#f97316'; // laranja
      else if (node.categoria === 'moderada') color = '#eab308'; // amarelo
      else if (node.categoria === 'facil') color = '#22c55e'; // verde

      // Desenhar círculo
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 25, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = selectedNode?.id === node.id ? '#ffffff' : '#1f2937';
      ctx.lineWidth = selectedNode?.id === node.id ? 3 : 1;
      ctx.stroke();

      // Desenhar texto
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(node.dados?.codigo || node.label.substring(0, 6), pos.x, pos.y + 4);
    });
  };

  const getCategoryBadge = (categoria: string) => {
    const variants = {
      'critica': { variant: 'destructive' as const, label: 'Crítica' },
      'dificil': { variant: 'secondary' as const, label: 'Difícil' },
      'moderada': { variant: 'outline' as const, label: 'Moderada' },
      'facil': { variant: 'default' as const, label: 'Fácil' }
    };
    
    const config = variants[categoria as keyof typeof variants] || variants.facil;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Análise de Grafos</h1>
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Visualização interativa do fluxo curricular</p>
        </div>
        <Button onClick={onBack} variant="outline">Voltar</Button>
      </div>

      <Tabs defaultValue="visualizacao" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visualizacao">Visualização</TabsTrigger>
          <TabsTrigger value="centralidade">Centralidade</TabsTrigger>
          <TabsTrigger value="recomendacoes">Recomendações</TabsTrigger>
        </TabsList>

        <TabsContent value="visualizacao" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                <CardHeader>
                  <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Grafo de Pré-requisitos</CardTitle>
                  <CardDescription>Clique nos nós para ver detalhes</CardDescription>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant={filter === 'all' ? 'default' : 'outline'}
                      onClick={() => setFilter('all')}
                    >
                      Todas
                    </Button>
                    <Button 
                      size="sm" 
                      variant={filter === 'criticas' ? 'destructive' : 'outline'}
                      onClick={() => setFilter('criticas')}
                    >
                      Críticas
                    </Button>
                    <Button 
                      size="sm" 
                      variant={filter === 'dificeis' ? 'secondary' : 'outline'}
                      onClick={() => setFilter('dificeis')}
                    >
                      Difíceis
                    </Button>
                    <Button 
                      size="sm" 
                      variant={filter === 'faceis' ? 'default' : 'outline'}
                      onClick={() => setFilter('faceis')}
                    >
                      Fáceis
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <canvas 
                    ref={canvasRef} 
                    className="w-full h-96 border rounded-lg cursor-pointer"
                    style={{ backgroundColor: isDark ? '#1e293b' : '#f8fafc' }}
                  />
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                <CardHeader>
                  <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Detalhes</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedNode ? (
                    <div className="space-y-3">
                      <div>
                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {selectedNode.label}
                        </h3>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {selectedNode.dados?.codigo}
                        </p>
                      </div>
                      
                      {selectedNode.categoria && (
                        <div>
                          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Dificuldade:</p>
                          {getCategoryBadge(selectedNode.categoria)}
                        </div>
                      )}
                      
                      {selectedNode.dados?.taxa_reprovacao !== undefined && (
                        <div>
                          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Taxa de Reprovação:</p>
                          <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {selectedNode.dados.taxa_reprovacao}%
                          </p>
                        </div>
                      )}
                      
                      {selectedNode.dados?.total_cursaram && (
                        <div>
                          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Total que Cursaram:</p>
                          <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {selectedNode.dados.total_cursaram} alunos
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Clique em um nó para ver os detalhes
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className={`mt-4 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <CardHeader>
                  <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Legenda</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Fácil (&lt;20%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Moderada (20-30%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Difícil (30-50%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Crítica (&gt;50%)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="centralidade" className="space-y-6">
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Análise de Centralidade</CardTitle>
              <CardDescription>Disciplinas mais importantes no fluxo curricular</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {centralityData.slice(0, 10).map((item: any, index) => (
                  <div key={index} className={`p-4 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <div className="flex justify-between items-start">
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
                        {item.classificacao}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-2 text-sm">
                      <div>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Dependentes:</p>
                        <p className={isDark ? 'text-white' : 'text-slate-900'}>{item.dependentes}</p>
                      </div>
                      <div>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Pré-requisitos:</p>
                        <p className={isDark ? 'text-white' : 'text-slate-900'}>{item.prerequisitos}</p>
                      </div>
                      <div>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Taxa Reprovação:</p>
                        <p className={`${item.taxa_reprovacao > 40 ? 'text-red-400' : 'text-green-400'}`}>
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
          <RecommendationsTab isDark={isDark} />
        </TabsContent>
      </Tabs>
    </div>
  );
}