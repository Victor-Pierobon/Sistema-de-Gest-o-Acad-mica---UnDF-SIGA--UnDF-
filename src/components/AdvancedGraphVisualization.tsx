import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { useTheme } from '../contexts/ThemeContext';
import { comprehensiveNodes, comprehensiveEdges, getAdvancedNodePosition, ComprehensiveNode, ComprehensiveEdge } from '../data/comprehensiveGraphData';
import { 
  Network, User, GraduationCap, BookOpen, Building, Users, Search, Filter, 
  ZoomIn, ZoomOut, RotateCcw, Play, Pause, Settings, Eye, EyeOff,
  AlertTriangle, CheckCircle, XCircle, Award, Clock, MapPin, Phone, Mail
} from 'lucide-react';

interface AdvancedGraphVisualizationProps {
  onBack: () => void;
}

export function AdvancedGraphVisualization({ onBack }: AdvancedGraphVisualizationProps) {
  const { isDark } = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);
  const animationRef = useRef<number>();
  
  const [selectedNode, setSelectedNode] = useState<ComprehensiveNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    disciplinas: true,
    alunos: true,
    professores: true,
    turmas: true,
    cursos: true,
    departamentos: true
  });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [showEdgeLabels, setShowEdgeLabels] = useState(false);
  const [highlightMode, setHighlightMode] = useState<'none' | 'related' | 'path'>('related');
  const [animationTime, setAnimationTime] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const filteredNodes = comprehensiveNodes.filter(node => {
    const typeFilter = filters[node.tipo as keyof typeof filters];
    const searchFilter = searchTerm === '' || 
      node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.dados?.codigo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.dados?.matricula?.toLowerCase().includes(searchTerm.toLowerCase());
    return typeFilter && searchFilter;
  });

  const getNodeColor = (node: ComprehensiveNode) => {
    switch (node.tipo) {
      case 'disciplina':
        switch (node.categoria) {
          case 'critica': return '#dc2626';
          case 'dificil': return '#ea580c';
          case 'moderada': return '#ca8a04';
          case 'facil': return '#16a34a';
          default: return '#6b7280';
        }
      case 'aluno':
        if (node.dados?.status === 'risco_critico') return '#dc2626';
        if (node.dados?.cr >= 8) return '#16a34a';
        if (node.dados?.cr >= 6) return '#ca8a04';
        return '#ea580c';
      case 'professor': return '#7c3aed';
      case 'turma': return '#0891b2';
      case 'curso': return '#059669';
      case 'departamento': return '#1f2937';
      default: return '#6b7280';
    }
  };

  const getNodeRadius = (node: ComprehensiveNode) => {
    let baseRadius = 20;
    if (node.tipo === 'departamento') baseRadius = 35;
    else if (node.tipo === 'curso') baseRadius = 30;
    else if (node.tipo === 'disciplina') baseRadius = 25;
    else if (node.tipo === 'professor') baseRadius = 22;
    else if (node.tipo === 'turma') baseRadius = 18;
    
    if (selectedNode?.id === node.id) return baseRadius + 10;
    if (hoveredNode === node.id) return baseRadius + 5;
    return baseRadius;
  };

  const getEdgeColor = (edge: ComprehensiveEdge) => {
    const colors = {
      prerequisito: '#dc2626',
      leciona: '#7c3aed',
      cursou: '#16a34a',
      reprovou: '#dc2626',
      matriculado_curso: '#059669',
      matriculado_turma: '#0891b2',
      orienta: '#f59e0b',
      monitora: '#8b5cf6',
      administra: '#1f2937',
      pertence: '#6b7280',
      instancia: '#0891b2',
      ministra: '#7c3aed'
    };
    return colors[edge.tipo as keyof typeof colors] || '#6b7280';
  };

  const getRelatedNodes = useCallback((nodeId: string, depth: number = 1): Set<string> => {
    const related = new Set<string>();
    const queue = [{ id: nodeId, currentDepth: 0 }];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const { id, currentDepth } = queue.shift()!;
      if (visited.has(id) || currentDepth > depth) continue;
      visited.add(id);
      
      if (currentDepth > 0) related.add(id);

      comprehensiveEdges.forEach(edge => {
        if (edge.source === id && !visited.has(edge.target)) {
          queue.push({ id: edge.target, currentDepth: currentDepth + 1 });
        }
        if (edge.target === id && !visited.has(edge.source)) {
          queue.push({ id: edge.source, currentDepth: currentDepth + 1 });
        }
      });
    }
    
    return related;
  }, []);

  const startAnimation = () => {
    setIsAnimating(true);
    const animate = () => {
      setAnimationTime(prev => prev + animationSpeed);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
  };

  const stopAnimation = () => {
    setIsAnimating(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleNodeClick = (node: ComprehensiveNode) => {
    setSelectedNode(node);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.3));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedNode(null);
  };

  const renderDetailedNodeInfo = () => {
    if (!selectedNode) return null;

    const relatedEdges = comprehensiveEdges.filter(edge => 
      edge.source === selectedNode.id || edge.target === selectedNode.id
    );

    return (
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={`flex items-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {selectedNode.tipo === 'disciplina' && <BookOpen className="h-5 w-5 mr-2" />}
              {selectedNode.tipo === 'aluno' && <User className="h-5 w-5 mr-2" />}
              {selectedNode.tipo === 'professor' && <GraduationCap className="h-5 w-5 mr-2" />}
              {selectedNode.tipo === 'curso' && <Building className="h-5 w-5 mr-2" />}
              {selectedNode.tipo === 'turma' && <Users className="h-5 w-5 mr-2" />}
              {selectedNode.label}
            </CardTitle>
            <CardDescription>
              {selectedNode.dados?.codigo || selectedNode.dados?.matricula || selectedNode.tipo}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedNode.tipo === 'disciplina' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Semestre:</p>
                    <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados.semestre}º</p>
                  </div>
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Créditos:</p>
                    <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados.creditos}</p>
                  </div>
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Carga Horária:</p>
                    <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados.carga_horaria}h</p>
                  </div>
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Taxa Reprovação:</p>
                    <p className={`font-medium ${
                      selectedNode.dados.taxa_reprovacao > 40 ? 'text-red-400' :
                      selectedNode.dados.taxa_reprovacao > 25 ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {selectedNode.dados.taxa_reprovacao?.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Média de Notas:</p>
                    <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados.media_notas?.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Total Cursaram:</p>
                    <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados.total_cursaram}</p>
                  </div>
                </div>
                
                {selectedNode.dados.horarios && (
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Horários:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedNode.dados.horarios.map((horario: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {horario}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedNode.tipo === 'aluno' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Curso:</p>
                    <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados.curso}</p>
                  </div>
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>CR:</p>
                    <p className={`font-medium ${
                      selectedNode.dados.cr >= 8 ? 'text-green-400' :
                      selectedNode.dados.cr >= 6 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {selectedNode.dados.cr?.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Semestre Atual:</p>
                    <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados.semestre_atual}º</p>
                  </div>
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Reprovações:</p>
                    <p className={`font-medium ${
                      selectedNode.dados.reprovacoes >= 4 ? 'text-red-400' :
                      selectedNode.dados.reprovacoes >= 2 ? 'text-yellow-400' : 'text-green-400'
                    }`}>
                      {selectedNode.dados.reprovacoes}
                    </p>
                  </div>
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Progresso:</p>
                    <p className={isDark ? 'text-white' : 'text-slate-900'}>
                      {selectedNode.dados.percentual_conclusao?.toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Previsão Formatura:</p>
                    <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados.previsao_formatura}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{selectedNode.dados.telefone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{selectedNode.dados.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{selectedNode.dados.cidade}</span>
                </div>

                {selectedNode.dados.bolsista && (
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
                    <div className={`flex items-center ${isDark ? 'text-green-400' : 'text-green-700'}`}>
                      <Award className="h-4 w-4 mr-2" />
                      <span className="font-medium">Bolsista: {selectedNode.dados.tipo_bolsa}</span>
                    </div>
                  </div>
                )}

                {selectedNode.dados.status === 'risco_critico' && (
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
                    <div className={`flex items-center ${isDark ? 'text-red-400' : 'text-red-700'}`}>
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <span className="font-medium">Aluno em Risco Crítico</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedNode.tipo === 'professor' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>SIAPE:</p>
                    <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados.siape}</p>
                  </div>
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Titulação:</p>
                    <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados.titulacao}</p>
                  </div>
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Experiência:</p>
                    <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados.anos_experiencia} anos</p>
                  </div>
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Publicações:</p>
                    <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados.publicacoes}</p>
                  </div>
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Orientações:</p>
                    <p className={isDark ? 'text-white' : 'text-slate-900'}>{selectedNode.dados.orientacoes_ativas}</p>
                  </div>
                  <div>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Avaliação:</p>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(star => (
                        <Award key={star} className={`h-3 w-3 ${
                          star <= selectedNode.dados.avaliacao_media ? 'text-yellow-400' : 'text-gray-300'
                        }`} />
                      ))}
                      <span className={`ml-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {selectedNode.dados.avaliacao_media}/5
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>Área de Especialização:</p>
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{selectedNode.dados.area}</p>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{selectedNode.dados.email}</span>
                </div>
              </div>
            )}

            <div className="mt-4">
              <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Relacionamentos ({relatedEdges.length}):
              </h4>
              <div className="space-y-1 mt-2 max-h-32 overflow-y-auto">
                {relatedEdges.slice(0, 10).map(edge => {
                  const otherNode = comprehensiveNodes.find(n => 
                    n.id === (edge.source === selectedNode.id ? edge.target : edge.source)
                  );
                  return (
                    <div key={edge.id} className="flex justify-between items-center text-xs">
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                        {otherNode?.label}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {edge.tipo}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Grafo Acadêmico Avançado
          </h1>
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
            Visualização interativa completa do ecossistema acadêmico
          </p>
        </div>
        <Button onClick={onBack} variant="outline">Voltar</Button>
      </div>

      <Tabs defaultValue="visualization" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="visualization">Visualização</TabsTrigger>
          <TabsTrigger value="controls">Controles</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
        </TabsList>

        <TabsContent value="visualization" className="space-y-4">
          <div className="flex gap-4 items-center flex-wrap">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <Input
                placeholder="Buscar nós..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48"
              />
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant={isAnimating ? "default" : "outline"}
                onClick={isAnimating ? stopAnimation : startAnimation}
              >
                {isAnimating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant={showLabels ? "default" : "outline"}
                onClick={() => setShowLabels(!showLabels)}
              >
                {showLabels ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
                <CardContent className="p-0">
                  <svg
                    ref={svgRef}
                    width="100%"
                    height="700"
                    viewBox={`${-pan.x} ${-pan.y} ${1000 / zoom} ${700 / zoom}`}
                    className={`border rounded-lg ${isDark ? 'border-slate-600 bg-slate-900' : 'border-slate-300 bg-slate-50'}`}
                  >
                    {/* Render edges */}
                    {comprehensiveEdges.map(edge => {
                      const sourceNode = filteredNodes.find(n => n.id === edge.source);
                      const targetNode = filteredNodes.find(n => n.id === edge.target);
                      
                      if (!sourceNode || !targetNode) return null;
                      
                      const sourcePos = getAdvancedNodePosition(sourceNode, comprehensiveNodes);
                      const targetPos = getAdvancedNodePosition(targetNode, comprehensiveNodes);
                      
                      const isHighlighted = selectedNode && 
                        (edge.source === selectedNode.id || edge.target === selectedNode.id);
                      
                      const strokeDasharray = edge.animated ? 
                        `${5 + Math.sin(animationTime * 0.01) * 2} ${3 + Math.cos(animationTime * 0.01) * 1}` : 
                        edge.tipo === 'prerequisito' ? '5,5' : 'none';
                      
                      return (
                        <g key={edge.id}>
                          <line
                            x1={sourcePos.x}
                            y1={sourcePos.y}
                            x2={targetPos.x}
                            y2={targetPos.y}
                            stroke={getEdgeColor(edge)}
                            strokeWidth={isHighlighted ? 4 : edge.peso}
                            opacity={isHighlighted ? 1 : 0.6}
                            strokeDasharray={strokeDasharray}
                          />
                          
                          {/* Arrow marker */}
                          <polygon
                            points={`${targetPos.x - 8},${targetPos.y - 4} ${targetPos.x},${targetPos.y} ${targetPos.x - 8},${targetPos.y + 4}`}
                            fill={getEdgeColor(edge)}
                            opacity={isHighlighted ? 1 : 0.6}
                          />
                          
                          {showEdgeLabels && (
                            <text
                              x={(sourcePos.x + targetPos.x) / 2}
                              y={(sourcePos.y + targetPos.y) / 2}
                              textAnchor="middle"
                              fill={isDark ? '#e2e8f0' : '#475569'}
                              fontSize="8"
                              className="pointer-events-none"
                            >
                              {edge.tipo}
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {/* Render nodes */}
                    {filteredNodes.map(node => {
                      const position = getAdvancedNodePosition(node, comprehensiveNodes);
                      const radius = getNodeRadius(node);
                      const isSelected = selectedNode?.id === node.id;
                      const relatedNodes = selectedNode ? getRelatedNodes(selectedNode.id, 2) : new Set();
                      const isRelated = relatedNodes.has(node.id);
                      
                      const pulseRadius = radius + Math.sin(animationTime * 0.02) * 3;
                      
                      return (
                        <g key={node.id}>
                          {/* Pulse effect for selected node */}
                          {isSelected && (
                            <circle
                              cx={position.x}
                              cy={position.y}
                              r={pulseRadius}
                              fill="none"
                              stroke={getNodeColor(node)}
                              strokeWidth="2"
                              opacity="0.3"
                            />
                          )}
                          
                          {/* Main node */}
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
                             node.tipo === 'aluno' ? '👤' :
                             node.tipo === 'professor' ? '👨🏫' :
                             node.tipo === 'turma' ? '🏫' :
                             node.tipo === 'curso' ? '🎓' : '🏢'}
                          </text>
                          
                          {/* Node label */}
                          {showLabels && (
                            <text
                              x={position.x}
                              y={position.y + radius + 15}
                              textAnchor="middle"
                              fill={isDark ? '#e2e8f0' : '#475569'}
                              fontSize="10"
                              className="pointer-events-none"
                            >
                              {node.tipo === 'disciplina' ? node.dados?.codigo : 
                               node.tipo === 'aluno' ? node.dados?.matricula :
                               node.label.split(' ')[0]}
                            </text>
                          )}
                          
                          {/* Status indicators */}
                          {node.dados?.status === 'risco_critico' && (
                            <circle
                              cx={position.x + radius - 5}
                              cy={position.y - radius + 5}
                              r="4"
                              fill="#dc2626"
                              stroke="white"
                              strokeWidth="1"
                            />
                          )}
                          
                          {node.dados?.bolsista && (
                            <circle
                              cx={position.x - radius + 5}
                              cy={position.y - radius + 5}
                              r="4"
                              fill="#f59e0b"
                              stroke="white"
                              strokeWidth="1"
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {selectedNode ? renderDetailedNodeInfo() : (
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
        </TabsContent>

        <TabsContent value="controls" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader>
                <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Filtros de Entidades</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(filters).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className={`capitalize ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {key}
                    </span>
                    <Button
                      size="sm"
                      variant={value ? "default" : "outline"}
                      onClick={() => setFilters(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                    >
                      {value ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader>
                <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Configurações de Visualização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Velocidade da Animação: {animationSpeed}x
                  </label>
                  <Slider
                    value={[animationSpeed]}
                    onValueChange={(value) => setAnimationSpeed(value[0])}
                    max={5}
                    min={0.1}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Mostrar Rótulos</span>
                  <Button
                    size="sm"
                    variant={showLabels ? "default" : "outline"}
                    onClick={() => setShowLabels(!showLabels)}
                  >
                    {showLabels ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Rótulos das Arestas</span>
                  <Button
                    size="sm"
                    variant={showEdgeLabels ? "default" : "outline"}
                    onClick={() => setShowEdgeLabels(!showEdgeLabels)}
                  >
                    {showEdgeLabels ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader>
                <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Estatísticas Gerais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Total de Nós:</span>
                    <span className={isDark ? 'text-white' : 'text-slate-900'}>{comprehensiveNodes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Total de Arestas:</span>
                    <span className={isDark ? 'text-white' : 'text-slate-900'}>{comprehensiveEdges.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Disciplinas:</span>
                    <span className={isDark ? 'text-white' : 'text-slate-900'}>
                      {comprehensiveNodes.filter(n => n.tipo === 'disciplina').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Alunos:</span>
                    <span className={isDark ? 'text-white' : 'text-slate-900'}>
                      {comprehensiveNodes.filter(n => n.tipo === 'aluno').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Professores:</span>
                    <span className={isDark ? 'text-white' : 'text-slate-900'}>
                      {comprehensiveNodes.filter(n => n.tipo === 'professor').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader>
                <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Alunos em Risco</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {comprehensiveNodes
                    .filter(n => n.tipo === 'aluno' && n.dados?.status === 'risco_critico')
                    .map(aluno => (
                      <div key={aluno.id} className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          {aluno.label}
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader>
                <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Disciplinas Críticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {comprehensiveNodes
                    .filter(n => n.tipo === 'disciplina' && n.categoria === 'critica')
                    .map(disciplina => (
                      <div key={disciplina.id} className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                          {disciplina.dados?.codigo}
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}