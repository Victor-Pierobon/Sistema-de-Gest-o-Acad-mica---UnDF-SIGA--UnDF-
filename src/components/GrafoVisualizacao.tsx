import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTheme } from '../contexts/ThemeContext';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Filter, 
  Download,
  Maximize2,
  Info
} from 'lucide-react';
import { GrafoNode, GrafoEdge } from '../types';

interface GrafoVisualizacaoProps {
  nodes: GrafoNode[];
  edges: GrafoEdge[];
  title: string;
  description?: string;
  filtros?: string[];
  onNodeClick?: (node: GrafoNode) => void;
  height?: number;
}

export function GrafoVisualizacao({ 
  nodes, 
  edges, 
  title, 
  description,
  filtros = [],
  onNodeClick,
  height = 600 
}: GrafoVisualizacaoProps) {
  const { isDark } = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<GrafoNode | null>(null);
  const [filtroAtivo, setFiltroAtivo] = useState<string>('todos');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const getNodePosition = (node: GrafoNode, index: number) => {
    const centerX = 400;
    const centerY = 300;
    const radius = 150;
    const angle = (index * 2 * Math.PI) / nodes.length;
    
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    };
  };

  const getNodeColor = (node: GrafoNode) => {
    if (node.tipo === 'disciplina') {
      switch (node.status) {
        case 'cursada': return '#22c55e';
        case 'em_andamento': return '#3b82f6';
        case 'perdida': return '#ef4444';
        case 'disponivel': return '#6b7280';
        default: return '#6b7280';
      }
    }
    return '#8b5cf6';
  };

  const handleNodeClick = (node: GrafoNode) => {
    setSelectedNode(node);
    onNodeClick?.(node);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.3));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const exportSVG = () => {
    if (svgRef.current) {
      const svgData = new XMLSerializer().serializeToString(svgRef.current);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `${title.toLowerCase().replace(/\s+/g, '-')}.svg`;
      downloadLink.click();
    }
  };

  return (
    <div className="space-y-4">
      <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>{title}</CardTitle>
              {description && (
                <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  {description}
                </CardDescription>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {filtros.length > 0 && (
                <Select value={filtroAtivo} onValueChange={setFiltroAtivo}>
                  <SelectTrigger className={`w-40 ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-300'}`}>
                    <SelectValue placeholder="Filtrar por..." />
                  </SelectTrigger>
                  <SelectContent className={isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'}>
                    <SelectItem value="todos">Todos</SelectItem>
                    {filtros.map(filtro => (
                      <SelectItem key={filtro} value={filtro}>{filtro}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleZoomIn}
                  className={isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleZoomOut}
                  className={isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleReset}
                  className={isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Zoom: {(zoom * 100).toFixed(0)}%
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={exportSVG}
                  className={isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Exportar
                </Button>
              </div>
            </div>

            <div className={`flex flex-wrap gap-2 p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Cursada</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Em Andamento</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Perdida</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Disponível</span>
              </div>
            </div>

            <div className={`border rounded-lg overflow-hidden ${isDark ? 'border-slate-600 bg-slate-900' : 'border-slate-300 bg-slate-50'}`}>
              <svg
                ref={svgRef}
                width="100%"
                height={height}
                viewBox={`${-pan.x} ${-pan.y} ${800 / zoom} ${600 / zoom}`}
                className="cursor-move"
              >
                {edges.map((edge, index) => {
                  const sourceNode = nodes.find(n => n.id === edge.source);
                  const targetNode = nodes.find(n => n.id === edge.target);
                  if (!sourceNode || !targetNode) return null;

                  const sourcePos = getNodePosition(sourceNode, nodes.indexOf(sourceNode));
                  const targetPos = getNodePosition(targetNode, nodes.indexOf(targetNode));

                  return (
                    <line
                      key={index}
                      x1={sourcePos.x}
                      y1={sourcePos.y}
                      x2={targetPos.x}
                      y2={targetPos.y}
                      stroke={isDark ? "#475569" : "#94a3b8"}
                      strokeWidth="2"
                      opacity="0.6"
                    />
                  );
                })}

                {nodes.map((node, index) => {
                  const position = getNodePosition(node, index);
                  const color = getNodeColor(node);
                  const isSelected = selectedNode?.id === node.id;

                  return (
                    <g key={node.id}>
                      <circle
                        cx={position.x}
                        cy={position.y}
                        r={isSelected ? 25 : 20}
                        fill={color}
                        stroke={isSelected ? "#ffffff" : color}
                        strokeWidth={isSelected ? 3 : 1}
                        className="cursor-pointer hover:opacity-80 transition-all"
                        onClick={() => handleNodeClick(node)}
                      />
                      <text
                        x={position.x}
                        y={position.y + 35}
                        textAnchor="middle"
                        fill={isDark ? "#e2e8f0" : "#475569"}
                        fontSize="12"
                        className="pointer-events-none"
                      >
                        {node.label.length > 15 ? node.label.substring(0, 15) + '...' : node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {selectedNode && (
              <Card className={isDark ? 'bg-slate-700 border-slate-600' : 'bg-slate-100 border-slate-300'}>
                <CardHeader>
                  <CardTitle className={`text-base flex items-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <Info className="h-4 w-4 mr-2" />
                    {selectedNode.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Tipo:</span>
                      <Badge variant="secondary" className={isDark ? 'bg-slate-600 text-slate-200' : 'bg-slate-200 text-slate-700'}>
                        {selectedNode.tipo}
                      </Badge>
                    </div>
                    {selectedNode.status && (
                      <div className="flex justify-between">
                        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Status:</span>
                        <Badge 
                          variant="outline" 
                          className={`${
                            selectedNode.status === 'cursada' ? 'border-green-600 text-green-400' :
                            selectedNode.status === 'em_andamento' ? 'border-blue-600 text-blue-400' :
                            selectedNode.status === 'perdida' ? 'border-red-600 text-red-400' :
                            'border-gray-600 text-gray-400'
                          }`}
                        >
                          {selectedNode.status}
                        </Badge>
                      </div>
                    )}
                    {selectedNode.dados && (
                      <div className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <pre className={`p-2 rounded text-xs overflow-auto ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                          {JSON.stringify(selectedNode.dados, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}