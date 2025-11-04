import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useTheme } from '../contexts/ThemeContext';
import { enhancedNodes, enhancedEdges, getNodePosition, EnhancedGraphNode, EnhancedGraphEdge } from '../data/enhancedGraphData';
import { 
  Network, 
  User, 
  GraduationCap, 
  BookOpen,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  Award,
  TrendingDown
} from 'lucide-react';

interface InteractiveGraphVisualizationProps {
  onBack: () => void;
}

export function InteractiveGraphVisualization({ onBack }: InteractiveGraphVisualizationProps) {
  const { isDark } = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<EnhancedGraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'disciplinas' | 'alunos' | 'professores'>('all');
  const [zoom, setZoom] = useState(1);

  const filteredNodes = enhancedNodes.filter(node => {
    if (filter === 'all') return true;
    if (filter === 'disciplinas') return node.tipo === 'disciplina';
    if (filter === 'alunos') return node.tipo === 'aluno';
    if (filter === 'professores') return node.tipo === 'professor';
    return true;
  });

  const getNodeColor = (node: EnhancedGraphNode) => {
    if (node.tipo === 'disciplina') {
      switch (node.categoria) {
        case 'critica': return '#ef4444';
        case 'dificil': return '#f97316';
        case 'moderada': return '#eab308';
        case 'facil': return '#22c55e';
        default: return '#6b7280';
      }
    }
    if (node.tipo === 'aluno') {
      if (node.dados?.status === 'risco_critico') return '#dc2626';
      if (node.dados?.cr >= 8) return '#16a34a';
      if (node.dados?.cr >= 6) return '#ca8a04';
      return '#ea580c';
    }
    if (node.tipo === 'professor') {
      return '#8b5cf6';
    }
    return '#6b7280';
  };

  const getNodeRadius = (node: EnhancedGraphNode) => {
    if (selectedNode?.id === node.id) return 35;
    if (hoveredNode === node.id) return 30;
    if (node.tipo === 'disciplina') return 25;
    if (node.tipo === 'aluno') return 20;
    if (node.tipo === 'professor') return 22;
    return 20;
  };

  const getEdgeColor = (edge: EnhancedGraphEdge) => {
    switch (edge.tipo) {
      case 'prerequisito': return '#ef4444';
      case 'leciona': return '#8b5cf6';
      case 'cursou': return '#22c55e';
      case 'reprovou': return '#dc2626';
      case 'matriculado': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getRelatedNodes = (nodeId: string) => {
    const related = new Set<string>();
    enhancedEdges.forEach(edge => {
      if (edge.source === nodeId) related.add(edge.target);
      if (edge.target === nodeId) related.add(edge.source);
    });
    return related;
  };

  const handleNodeClick = (node: EnhancedGraphNode) => {
    setSelectedNode(node);
  };

  const renderNodeDetails = () => {
    if (!selectedNode) return null;

    const relatedEdges = enhancedEdges.filter(edge => 
      edge.source === selectedNode.id || edge.target === selectedNode.id
    );

    if (selectedNode.tipo === 'disciplina') {
      const estudantes = relatedEdges.filter(e => e.tipo === 'cursou' || e.tipo === 'reprovou' || e.tipo === 'matriculado');
      const professor = relatedEdges.find(e => e.tipo === 'leciona');
      const prerequisitos = relatedEdges.filter(e => e.tipo === 'prerequisito' && e.target === selectedNode.id);
      
      return (
        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={`flex items-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <BookOpen className="h-5 w-5 mr-2" />
              {selectedNode.label}
            </CardTitle>
            <CardDescription>{selectedNode.dados?.codigo}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Semestre:</p>
                <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados?.semestre}º</p>
              </div>
              <div>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Créditos:</p>
                <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados?.creditos}</p>
              </div>
              <div>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Taxa Reprovação:</p>
                <p className={`font-medium ${
                  selectedNode.dados?.taxa_reprovacao > 40 ? 'text-red-400' :
                  selectedNode.dados?.taxa_reprovacao > 25 ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {selectedNode.dados?.taxa_reprovacao?.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Total Cursaram:</p>
                <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados?.total_cursaram}</p>
              </div>
            </div>

            {professor && (
              <div>
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Professor:</h4>
                <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                  {enhancedNodes.find(n => n.id === professor.source)?.label}
                </p>
              </div>
            )}

            {prerequisitos.length > 0 && (
              <div>
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Pré-requisitos:</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {prerequisitos.map(edge => {
                    const prereq = enhancedNodes.find(n => n.id === edge.source);
                    return (
                      <Badge key={edge.id} variant="outline" className="text-xs">
                        {prereq?.dados?.codigo}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Estudantes ({estudantes.length}):</h4>
              <div className="space-y-1 mt-2 max-h-32 overflow-y-auto">
                {estudantes.map(edge => {
                  const estudante = enhancedNodes.find(n => n.id === edge.source);
                  return (
                    <div key={edge.id} className="flex justify-between items-center text-xs">
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                        {estudante?.label}
                      </span>
                      <Badge variant={
                        edge.tipo === 'cursou' ? 'default' :
                        edge.tipo === 'reprovou' ? 'destructive' : 'secondary'
                      } className="text-xs">
                        {edge.tipo === 'cursou' ? `${edge.dados?.nota}` :
                         edge.tipo === 'reprovou' ? `Rep. ${edge.dados?.tentativas}x` :
                         'Cursando'}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (selectedNode.tipo === 'aluno') {
      const disciplinas = relatedEdges.filter(e => e.tipo === 'cursou' || e.tipo === 'reprovou' || e.tipo === 'matriculado');
      
      return (
        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={`flex items-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <User className="h-5 w-5 mr-2" />
              {selectedNode.label}
            </CardTitle>
            <CardDescription>{selectedNode.dados?.matricula}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Curso:</p>
                <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados?.curso}</p>
              </div>
              <div>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>CR:</p>
                <p className={`font-medium ${
                  selectedNode.dados?.cr >= 8 ? 'text-green-400' :
                  selectedNode.dados?.cr >= 6 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {selectedNode.dados?.cr?.toFixed(1)}
                </p>
              </div>
              <div>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Semestre Atual:</p>
                <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados?.semestre_atual}º</p>
              </div>
              <div>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Reprovações:</p>
                <p className={`font-medium ${
                  selectedNode.dados?.reprovacoes >= 4 ? 'text-red-400' :
                  selectedNode.dados?.reprovacoes >= 2 ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {selectedNode.dados?.reprovacoes}
                </p>
              </div>
            </div>

            {selectedNode.dados?.status === 'risco_critico' && (
              <div className={`p-3 rounded-lg ${isDark ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
                <div className={`flex items-center ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span className="font-medium">Aluno em Risco Crítico</span>
                </div>
              </div>
            )}

            <div>
              <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Histórico Acadêmico:</h4>
              <div className="space-y-2 mt-2 max-h-40 overflow-y-auto">
                {disciplinas.map(edge => {
                  const disciplina = enhancedNodes.find(n => n.id === edge.target);
                  return (
                    <div key={edge.id} className="flex justify-between items-center text-xs">
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                        {disciplina?.dados?.codigo} - {disciplina?.label}
                      </span>
                      <div className="flex items-center gap-2">
                        {edge.tipo === 'cursou' && (
                          <>
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            <span className="text-green-400">{edge.dados?.nota}</span>
                          </>
                        )}
                        {edge.tipo === 'reprovou' && (
                          <>
                            <XCircle className="h-3 w-3 text-red-500" />
                            <span className="text-red-400">{edge.dados?.nota} ({edge.dados?.tentativas}x)</span>
                          </>
                        )}
                        {edge.tipo === 'matriculado' && (
                          <Badge variant="secondary" className="text-xs">Cursando</Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (selectedNode.tipo === 'professor') {
      const disciplinas = relatedEdges.filter(e => e.tipo === 'leciona');
      
      return (
        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={`flex items-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <GraduationCap className="h-5 w-5 mr-2" />
              {selectedNode.label}
            </CardTitle>
            <CardDescription>SIAPE: {selectedNode.dados?.siape}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Titulação:</p>
                <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados?.titulacao}</p>
              </div>
              <div>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Área de Especialização:</p>
                <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados?.area}</p>
              </div>
              <div>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Avaliação Média:</p>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1,2,3,4,5].map(star => (
                      <Award key={star} className={`h-4 w-4 ${
                        star <= selectedNode.dados?.avaliacao_media ? 'text-yellow-400' : 'text-gray-300'
                      }`} />
                    ))}
                  </div>
                  <span className={isDark ? 'text-white' : 'text-slate-900'}>
                    {selectedNode.dados?.avaliacao_media}/5
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Disciplinas Ministradas:</h4>
              <div className="space-y-1 mt-2">
                {disciplinas.map(edge => {
                  const disciplina = enhancedNodes.find(n => n.id === edge.target);
                  return (
                    <div key={edge.id} className="flex justify-between items-center text-xs">
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                        {disciplina?.dados?.codigo} - {disciplina?.label}
                      </span>
                      <Badge variant="outline" className={`text-xs ${
                        disciplina?.categoria === 'critica' ? 'border-red-600 text-red-400' :
                        disciplina?.categoria === 'dificil' ? 'border-orange-600 text-orange-400' :
                        'border-green-600 text-green-400'
                      }`}>
                        {disciplina?.dados?.taxa_reprovacao?.toFixed(1)}% reprov.
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Grafo Acadêmico Interativo
          </h1>
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
            Visualização completa de relacionamentos acadêmicos
          </p>
        </div>
        <Button onClick={onBack} variant="outline">Voltar</Button>
      </div>

      <div className="flex gap-2 mb-4">
        <Button 
          size="sm" 
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          Todos
        </Button>
        <Button 
          size="sm" 
          variant={filter === 'disciplinas' ? 'default' : 'outline'}
          onClick={() => setFilter('disciplinas')}
        >
          Disciplinas
        </Button>
        <Button 
          size="sm" 
          variant={filter === 'alunos' ? 'default' : 'outline'}
          onClick={() => setFilter('alunos')}
        >
          Alunos
        </Button>
        <Button 
          size="sm" 
          variant={filter === 'professores' ? 'default' : 'outline'}
          onClick={() => setFilter('professores')}
        >
          Professores
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>
                Grafo de Relacionamentos
              </CardTitle>
              <CardDescription>Clique nos nós para ver detalhes</CardDescription>
            </CardHeader>
            <CardContent>
              <svg
                ref={svgRef}
                width="100%"
                height="600"
                viewBox="0 0 800 600"
                className={`border rounded-lg ${isDark ? 'border-slate-600 bg-slate-900' : 'border-slate-300 bg-slate-50'}`}
              >
                {/* Render edges */}
                {enhancedEdges.map(edge => {
                  const sourceNode = filteredNodes.find(n => n.id === edge.source);
                  const targetNode = filteredNodes.find(n => n.id === edge.target);
                  
                  if (!sourceNode || !targetNode) return null;
                  
                  const sourcePos = getNodePosition(sourceNode, enhancedNodes);
                  const targetPos = getNodePosition(targetNode, enhancedNodes);
                  
                  const isHighlighted = selectedNode && 
                    (edge.source === selectedNode.id || edge.target === selectedNode.id);
                  
                  return (
                    <line
                      key={edge.id}
                      x1={sourcePos.x}
                      y1={sourcePos.y}
                      x2={targetPos.x}
                      y2={targetPos.y}
                      stroke={getEdgeColor(edge)}
                      strokeWidth={isHighlighted ? 3 : edge.peso}
                      opacity={isHighlighted ? 1 : 0.6}
                      strokeDasharray={edge.tipo === 'prerequisito' ? '5,5' : 'none'}
                    />
                  );
                })}

                {/* Render nodes */}
                {filteredNodes.map(node => {
                  const position = getNodePosition(node, enhancedNodes);
                  const radius = getNodeRadius(node);
                  const isSelected = selectedNode?.id === node.id;
                  const relatedNodes = selectedNode ? getRelatedNodes(selectedNode.id) : new Set();
                  const isRelated = relatedNodes.has(node.id);
                  
                  return (
                    <g key={node.id}>
                      <circle
                        cx={position.x}
                        cy={position.y}
                        r={radius}
                        fill={getNodeColor(node)}
                        stroke={isSelected ? '#ffffff' : isRelated ? '#fbbf24' : '#374151'}
                        strokeWidth={isSelected ? 4 : isRelated ? 3 : 2}
                        opacity={selectedNode && !isSelected && !isRelated ? 0.3 : 1}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => handleNodeClick(node)}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                      />
                      
                      {/* Node icon */}
                      <text
                        x={position.x}
                        y={position.y + 5}
                        textAnchor="middle"
                        fill="white"
                        fontSize="12"
                        fontWeight="bold"
                        className="pointer-events-none"
                      >
                        {node.tipo === 'disciplina' ? '📚' :
                         node.tipo === 'aluno' ? '👤' : '👨‍🏫'}
                      </text>
                      
                      {/* Node label */}
                      <text
                        x={position.x}
                        y={position.y + radius + 15}
                        textAnchor="middle"
                        fill={isDark ? '#e2e8f0' : '#475569'}
                        fontSize="10"
                        className="pointer-events-none"
                      >
                        {node.tipo === 'disciplina' ? node.dados?.codigo : 
                         node.label.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {/* Legend */}
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Legenda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h5 className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Tipos:</h5>
                <div className="space-y-1 mt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-xs">📚</div>
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Disciplinas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-xs">👤</div>
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Alunos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center text-xs">👨‍🏫</div>
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Professores</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Relacionamentos:</h5>
                <div className="space-y-1 mt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-red-500"></div>
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Pré-requisito</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-green-500"></div>
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Aprovado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-red-600"></div>
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Reprovado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-purple-500"></div>
                    <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Leciona</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Node details */}
          {selectedNode ? renderNodeDetails() : (
            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardContent className="p-6 text-center">
                <Network className={`h-12 w-12 mx-auto mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Clique em um nó para ver informações detalhadas
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}