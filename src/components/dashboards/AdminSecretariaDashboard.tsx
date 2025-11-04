import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useTheme } from '../../contexts/ThemeContext';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { 
  ClipboardList, 
  BarChart3, 
  Users, 
  AlertTriangle,
  TrendingUp,
  FileText,
  Network,
  Clock,
  CheckCircle,
  XCircle,
  GraduationCap
} from 'lucide-react';

const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];

interface AdminSecretariaDashboardProps {
  onPageChange: (page: string) => void;
}

export function AdminSecretariaDashboard({ onPageChange }: AdminSecretariaDashboardProps) {
  const { isDark } = useTheme();
  
  // Estados para dados da Secretaria
  const [solicitacoes, setSolicitacoes] = useState({
    pendentes: 0,
    aprovadas_professor: 0,
    deferidas: 0,
    indeferidas: 0
  });

  const [metricas, setMetricas] = useState({
    totalAlunos: 0,
    alunosRisco: 0,
    disciplinasProblematicas: 0,
    taxaAbandono: 0
  });

  const [cursosStats, setCursosStats] = useState([]);
  const [solicitacoesRecentes, setSolicitacoesRecentes] = useState([]);
  const [alertasImportantes, setAlertasImportantes] = useState([]);

  // Estados para dados do Administrador
  const [adminData, setAdminData] = useState({
    kpis: {
      totalStudentsWithFailures: 0,
      studentsAtRisk: 0,
      criticalSubjects: 0
    },
    topSubjects: [],
    topCourses: [],
    semesterDistribution: [],
    failureEvolution: []
  });

  useEffect(() => {
    console.log('AdminSecretariaDashboard - Carregando dados...');
    
    // Carregar dados da Secretaria
    apiService.getMetricas().then(data => {
      console.log('Métricas do banco:', data);
      setMetricas({
        totalAlunos: data.totalAlunos || 0,
        alunosRisco: data.alunosRisco || 0,
        disciplinasProblematicas: data.disciplinasCriticas || 0,
        taxaAbandono: Math.round(data.taxaReprovacaoMedia) || 0
      });
    }).catch(error => {
      console.error('Erro ao carregar métricas:', error);
    });
    
    apiService.getSolicitacoesCount().then(data => {
      console.log('Contadores do banco:', data);
      setSolicitacoes(data);
    }).catch(error => {
      console.error('Erro ao carregar contadores:', error);
    });
    
    apiService.getCursosStats().then(data => {
      console.log('Cursos do banco:', data);
      setCursosStats(data);
    }).catch(error => {
      console.error('Erro ao carregar cursos:', error);
    });
    
    apiService.getSolicitacoes().then(data => {
      console.log('Solicitações do banco:', data);
      setSolicitacoesRecentes(data);
    }).catch(error => {
      console.error('Erro ao carregar solicitações:', error);
    });
    
    apiService.getAlertas().then(data => {
      console.log('Alertas do banco:', data);
      setAlertasImportantes(data);
    }).catch(error => {
      console.error('Erro ao carregar alertas:', error);
    });

    // Carregar dados do Administrador
    apiService.getAdminStats().then(data => {
      console.log('Dados admin do banco:', data);
      if (data) {
        setAdminData(data);
      }
    }).catch(error => {
      console.error('Erro ao carregar dados administrativos:', error);
    });
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Badge variant="outline" className="border-yellow-600 text-yellow-400">Pendente</Badge>;
      case 'aprovada_professor':
        return <Badge variant="outline" className="border-blue-600 text-blue-400">Aprovada pelo Professor</Badge>;
      case 'deferida':
        return <Badge variant="outline" className="border-green-600 text-green-400">Deferida</Badge>;
      case 'indeferida':
        return <Badge variant="outline" className="border-red-600 text-red-400">Indeferida</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Dashboard Administrativo</h1>
        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Visão completa de gestão acadêmica e análises administrativas</p>
        <div className={`mt-2 p-3 rounded-lg ${isDark ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
          <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
            🔄 <strong>Dados do Sistema:</strong> {metricas.totalAlunos} alunos ativos, {metricas.alunosRisco} em risco, {metricas.disciplinasProblematicas} disciplinas críticas, {metricas.taxaAbandono}% taxa reprovação.
          </p>
        </div>
      </div>

      <Tabs defaultValue="secretaria" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="secretaria">Gestão Acadêmica</TabsTrigger>
          <TabsTrigger value="admin">Análises Estatísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="secretaria" className="space-y-6">
          {/* KPIs de Gestão Acadêmica */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Solicitações Pendentes</CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>{solicitacoes.pendentes}</div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {solicitacoes.aprovadas_professor} aguardando deferimento
                </p>
              </CardContent>
            </Card>

            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Total de Alunos</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>{metricas.totalAlunos}</div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{metricas.alunosRisco} em risco</p>
              </CardContent>
            </Card>

            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Taxa de Abandono</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>{metricas.taxaAbandono}%</div>
                <Progress value={metricas.taxaAbandono} className="mt-2" />
              </CardContent>
            </Card>

            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Disciplinas Problemáticas</CardTitle>
                <BarChart3 className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl ${isDark ? 'text-white' : 'text-slate-900'}`}>{metricas.disciplinasProblematicas}</div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Alta taxa de reprovação</p>
              </CardContent>
            </Card>
          </div>

          {/* Seções de Gestão Acadêmica */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader>
                <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Solicitações Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {solicitacoesRecentes.length > 0 ? solicitacoesRecentes.map((solicitacao, index) => (
                    <div key={index} className={`flex justify-between items-center p-3 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{solicitacao.aluno}</p>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{solicitacao.disciplina}</p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(solicitacao.status)}
                        <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{solicitacao.data}</p>
                      </div>
                    </div>
                  )) : (
                    <div className={`p-4 text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Nenhuma solicitação recente
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader>
                <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Alertas Importantes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alertasImportantes.length > 0 ? alertasImportantes.map((alerta, index) => (
                    <div key={index} className={`p-3 rounded-lg border-l-4 ${
                      alerta.tipo === 'critico' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                      alerta.tipo === 'alto' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' :
                      'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{alerta.titulo}</h4>
                          <p className={`text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{alerta.descricao}</p>
                        </div>
                        <Badge variant={alerta.tipo === 'critico' ? 'destructive' : 'secondary'}>
                          {alerta.acao}
                        </Badge>
                      </div>
                    </div>
                  )) : (
                    <div className={`p-4 text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Nenhum alerta no momento
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="admin" className="space-y-6">
          {/* KPIs de Análises Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Alunos com Reprovações</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold text-blue-400`}>{adminData.kpis.totalStudentsWithFailures}</div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Total de estudantes</p>
              </CardContent>
            </Card>

            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Alunos em Risco</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold text-red-400`}>{adminData.kpis.studentsAtRisk}%</div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Risco de atraso na formatura</p>
              </CardContent>
            </Card>

            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Disciplinas Críticas</CardTitle>
                <GraduationCap className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold text-purple-400`}>{adminData.kpis.criticalSubjects}</div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Com alta taxa de reprovação</p>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos e Estatísticas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader>
                <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Distribuição por Semestre</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={adminData.semesterDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ semester, percentage }) => `${semester}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="failures"
                    >
                      {adminData.semesterDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
              <CardHeader>
                <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Evolução das Reprovações</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={adminData.failureEvolution}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#475569" : "#e2e8f0"} />
                    <XAxis dataKey="semester" stroke={isDark ? "#94a3b8" : "#64748b"} />
                    <YAxis stroke={isDark ? "#94a3b8" : "#64748b"} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#1e40af', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Ações Rápidas */}
      <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
        <CardHeader>
          <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <ClipboardList className="h-6 w-6" />
              <span className="text-sm">Solicitações</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span className="text-sm">Relatórios</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Estudantes</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => onPageChange('analises-grafo')}
            >
              <Network className="h-6 w-6" />
              <span className="text-sm">Análise de Grafos</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}