import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useTheme } from '../../contexts/ThemeContext';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { 
  ArrowLeft, 
  Users, 
  GraduationCap, 
  AlertTriangle, 
  TrendingUp,
  BookOpen,
  Calendar,
  Award,
  Target
} from 'lucide-react';

interface MetricasConsolidadasProps {
  onBack: () => void;
}

const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];

export function MetricasConsolidadas({ onBack }: MetricasConsolidadasProps) {
  const { isDark } = useTheme();
  const [periodoSelecionado, setPeriodoSelecionado] = useState('2024.2');

  const metricas = {
    gerais: {
      totalAlunos: 1247,
      alunosAtivos: 1089,
      alunosFormados: 158,
      taxaEvasao: 12.7,
      mediaGeral: 7.2,
      disciplinasOfertadas: 45
    },
    desempenho: {
      aprovacoes: 68.3,
      reprovacoes: 23.1,
      trancamentos: 8.6,
      crMedio: 6.8
    },
    evolucaoSemestral: [
      { semestre: '2022.1', aprovacoes: 65.2, reprovacoes: 26.8, trancamentos: 8.0 },
      { semestre: '2022.2', aprovacoes: 67.1, reprovacoes: 24.5, trancamentos: 8.4 },
      { semestre: '2023.1', aprovacoes: 66.8, reprovacoes: 25.2, trancamentos: 8.0 },
      { semestre: '2023.2', aprovacoes: 69.2, reprovacoes: 22.8, trancamentos: 8.0 },
      { semestre: '2024.1', aprovacoes: 70.1, reprovacoes: 21.3, trancamentos: 8.6 },
      { semestre: '2024.2', aprovacoes: 68.3, reprovacoes: 23.1, trancamentos: 8.6 }
    ],
    distribuicaoCursos: [
      { curso: 'Eng. Software', alunos: 456, formados: 89, taxa: 19.5 },
      { curso: 'Ciência Comp.', alunos: 412, formados: 76, taxa: 18.4 },
      { curso: 'Sist. Informação', alunos: 379, formados: 68, taxa: 17.9 }
    ],
    disciplinasCriticas: [
      { nome: 'Cálculo I', taxa: 68.5, matriculados: 234 },
      { nome: 'Física I', taxa: 62.3, matriculados: 198 },
      { nome: 'Algoritmos', taxa: 58.7, matriculados: 267 },
      { nome: 'Banco de Dados II', taxa: 55.2, matriculados: 156 },
      { nome: 'Estruturas de Dados', taxa: 52.8, matriculados: 189 }
    ]
  };

  return (
    <div className="space-y-6" role="main" aria-label="Métricas Consolidadas do Sistema">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="p-2"
            aria-label="Voltar para o dashboard principal"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Métricas Consolidadas
            </h1>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Visão completa do desempenho acadêmico institucional
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {['2024.2', '2024.1', '2023.2'].map(periodo => (
            <Button
              key={periodo}
              variant={periodoSelecionado === periodo ? 'default' : 'outline'}
              onClick={() => setPeriodoSelecionado(periodo)}
              size="sm"
              aria-pressed={periodoSelecionado === periodo}
              aria-label={`Selecionar período ${periodo}`}
            >
              {periodo}
            </Button>
          ))}
        </div>
      </div>

      {/* KPIs Principais */}
      <section aria-labelledby="kpis-principais">
        <h2 id="kpis-principais" className="sr-only">Indicadores Principais de Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Total de Alunos
              </CardTitle>
              <Users className="h-4 w-4 text-blue-500" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {metricas.gerais.totalAlunos.toLocaleString()}
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {metricas.gerais.alunosAtivos} ativos
              </p>
            </CardContent>
          </Card>

          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Taxa de Aprovação
              </CardTitle>
              <Award className="h-4 w-4 text-green-500" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold text-green-500`}>
                {metricas.desempenho.aprovacoes}%
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Período {periodoSelecionado}
              </p>
            </CardContent>
          </Card>

          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Taxa de Evasão
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold text-red-500`}>
                {metricas.gerais.taxaEvasao}%
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Últimos 12 meses
              </p>
            </CardContent>
          </Card>

          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                CR Médio Geral
              </CardTitle>
              <Target className="h-4 w-4 text-purple-500" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold text-purple-500`}>
                {metricas.desempenho.crMedio}
              </div>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Coeficiente de rendimento
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Gráficos de Evolução */}
      <section aria-labelledby="evolucao-temporal">
        <h2 id="evolucao-temporal" className="sr-only">Evolução Temporal dos Indicadores</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>
                Evolução do Desempenho
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={metricas.evolucaoSemestral}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#475569" : "#e2e8f0"} />
                  <XAxis 
                    dataKey="semestre" 
                    stroke={isDark ? "#94a3b8" : "#64748b"}
                    aria-label="Semestre"
                  />
                  <YAxis 
                    stroke={isDark ? "#94a3b8" : "#64748b"}
                    aria-label="Percentual"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      border: `1px solid ${isDark ? '#475569' : '#e2e8f0'}`,
                      borderRadius: '6px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="aprovacoes" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Aprovações (%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="reprovacoes" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Reprovações (%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="trancamentos" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Trancamentos (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>
                Distribuição por Curso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metricas.distribuicaoCursos}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#475569" : "#e2e8f0"} />
                  <XAxis 
                    dataKey="curso" 
                    stroke={isDark ? "#94a3b8" : "#64748b"}
                    aria-label="Curso"
                  />
                  <YAxis 
                    stroke={isDark ? "#94a3b8" : "#64748b"}
                    aria-label="Número de alunos"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: isDark ? '#1e293b' : '#ffffff',
                      border: `1px solid ${isDark ? '#475569' : '#e2e8f0'}`,
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="alunos" fill="#3b82f6" name="Total de Alunos" />
                  <Bar dataKey="formados" fill="#10b981" name="Formados" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Disciplinas Críticas */}
      <section aria-labelledby="disciplinas-criticas">
        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle id="disciplinas-criticas" className={isDark ? 'text-white' : 'text-slate-900'}>
              Disciplinas com Maior Taxa de Reprovação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metricas.disciplinasCriticas.map((disciplina, index) => {
                const maxValue = metricas.disciplinasCriticas[0]?.taxa || 1;
                const percentage = (disciplina.taxa / maxValue) * 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {disciplina.nome}
                      </span>
                      <div className="text-right">
                        <span className={`font-bold text-red-500`}>
                          {disciplina.taxa}%
                        </span>
                        <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {disciplina.matriculados} matriculados
                        </div>
                      </div>
                    </div>
                    <div 
                      className={`w-full rounded-full h-2 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}
                      role="progressbar"
                      aria-valuenow={disciplina.taxa}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`Taxa de reprovação em ${disciplina.nome}: ${disciplina.taxa}%`}
                    >
                      <div 
                        className="h-2 rounded-full bg-red-500 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Resumo Executivo */}
      <section aria-labelledby="resumo-executivo">
        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle id="resumo-executivo" className={isDark ? 'text-white' : 'text-slate-900'}>
              Resumo Executivo - {periodoSelecionado}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className={`font-semibold mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  Pontos Positivos
                </h4>
                <ul className={`text-sm space-y-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li>• Taxa de aprovação acima de 68%</li>
                  <li>• CR médio mantido em 6.8</li>
                  <li>• 158 alunos formados no período</li>
                  <li>• Redução na evasão comparado a 2023</li>
                </ul>
              </div>
              <div>
                <h4 className={`font-semibold mb-2 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  Pontos de Atenção
                </h4>
                <ul className={`text-sm space-y-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li>• Cálculo I com 68.5% de reprovação</li>
                  <li>• Física I necessita intervenção</li>
                  <li>• Taxa de trancamento em 8.6%</li>
                  <li>• Disciplinas de base críticas</li>
                </ul>
              </div>
              <div>
                <h4 className={`font-semibold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  Recomendações
                </h4>
                <ul className={`text-sm space-y-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li>• Reforço em disciplinas básicas</li>
                  <li>• Programa de monitoria ampliado</li>
                  <li>• Acompanhamento de alunos em risco</li>
                  <li>• Revisão metodológica em Cálculo I</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}