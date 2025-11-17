import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { AlunoDashboard } from './components/dashboards/AlunoDashboard';
import { ProfessorDashboard } from './components/dashboards/ProfessorDashboard';
import { AdminSecretariaDashboard } from './components/dashboards/AdminSecretariaDashboard';
import { StudentAnalysis } from './components/dashboards/StudentAnalysis';
import { SubjectAnalysis } from './components/dashboards/SubjectAnalysis';
import { OfferPlanning } from './components/dashboards/OfferPlanning';
import { GrafoVisualizacao } from './components/GrafoVisualizacao';
import { GraphAnalysis } from './components/dashboards/GraphAnalysis';
import { AdvancedGraphVisualization } from './components/AdvancedGraphVisualization';
import { Relatorios } from './components/dashboards/Relatorios';
import { SolicitacaoRecuperacao } from './components/forms/SolicitacaoRecuperacao';
import { GestaoSolicitacoes } from './components/dashboards/GestaoSolicitacoes';
import { MetricasConsolidadas } from './components/dashboards/MetricasConsolidadas';

import { RegistroPresencas } from './components/dashboards/RegistroPresencas';
import { GerenciarTurmas } from './components/dashboards/GerenciarTurmas';
import { AvaliarSolicitacoes } from './components/dashboards/AvaliarSolicitacoes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Toaster } from './components/ui/sonner';
import { SkipLink } from './components/ui/skip-link';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { GrafoNode, GrafoEdge } from './types';

const mockNodes: GrafoNode[] = [
  { id: '1', label: 'Programação I', tipo: 'disciplina', categoria: 'moderada', status: 'cursada', dados: { semestre: 1 } },
  { id: '2', label: 'Algoritmos', tipo: 'disciplina', categoria: 'dificil', status: 'cursada', dados: { semestre: 1 } },
  { id: '3', label: 'Estruturas de Dados', tipo: 'disciplina', categoria: 'dificil', status: 'em_andamento', dados: { semestre: 2 } },
  { id: '4', label: 'Banco de Dados', tipo: 'disciplina', categoria: 'critica', status: 'perdida', dados: { semestre: 3 } },
  { id: '5', label: 'Engenharia de Software', tipo: 'disciplina', categoria: 'moderada', status: 'disponivel', dados: { semestre: 4 } },
  { id: '6', label: 'Redes', tipo: 'disciplina', categoria: 'dificil', status: 'disponivel', dados: { semestre: 4 } }
];

const mockEdges: GrafoEdge[] = [
  { id: 'e1', source: '1', target: '2', tipo: 'prerequisito' },
  { id: 'e2', source: '2', target: '3', tipo: 'prerequisito' },
  { id: 'e3', source: '3', target: '4', tipo: 'prerequisito' },
  { id: 'e4', source: '2', target: '5', tipo: 'prerequisito' }
];

function AppContent() {
  const { isAuthenticated, user, loading } = useAuth();
  const { isDark } = useTheme();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className={isDark ? 'text-white' : 'text-slate-900'}>Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <AccessibilityPanel />
        <Login />
      </>
    );
  }

  const renderDashboard = () => {
    switch (user?.perfil) {
      case 'aluno':
        return <AlunoDashboard onPageChange={setCurrentPage} />;
      case 'professor':
        return <ProfessorDashboard onPageChange={setCurrentPage} />;
      case 'administrador':
        return <AdminSecretariaDashboard onPageChange={setCurrentPage} />;
      default:
        return <AdminSecretariaDashboard onPageChange={setCurrentPage} />;
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return renderDashboard();
      
      case 'solicitar-recuperacao':
        return <SolicitacaoRecuperacao />;
      
      case 'gestao-solicitacoes':
        return <GestaoSolicitacoes onBack={() => setCurrentPage('dashboard')} />;
      
      case 'metricas':
        return <MetricasConsolidadas onBack={() => setCurrentPage('dashboard')} />;
      
      case 'analise-alunos':
        return <StudentAnalysis />;
      
      case 'analise-disciplinas':
        return <SubjectAnalysis />;
      
      case 'planejamento-oferta':
        return <OfferPlanning />;
      
      case 'analises-grafo':
        return <AdvancedGraphVisualization onBack={() => setCurrentPage('dashboard')} />;
      
      case 'graph-analysis':
        return <AdvancedGraphVisualization onBack={() => setCurrentPage('dashboard')} />;
      
      case 'relatorios':
        return <Relatorios onBack={() => setCurrentPage('dashboard')} />;
      
      case 'grafo-historico':
        return (
          <GrafoVisualizacao
            nodes={mockNodes}
            edges={mockEdges}
            title="Histórico Acadêmico"
            description="Visualização interativa do seu progresso acadêmico"
            filtros={['cursada', 'em_andamento', 'perdida', 'disponivel']}
            onNodeClick={(node) => console.log('Nó clicado:', node)}
          />
        );
      
      case 'turmas':
        return <GerenciarTurmas onBack={() => setCurrentPage('dashboard')} />;
      
      case 'avaliar-solicitacoes':
        return <AvaliarSolicitacoes onBack={() => setCurrentPage('dashboard')} />;
      
      case 'minhas-solicitacoes':
        return (
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Minhas Solicitações</CardTitle>
              <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                Acompanhe o status das suas solicitações de recuperação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                Lista de solicitações em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        );
      
      case 'presencas':
        return <RegistroPresencas onBack={() => setCurrentPage('dashboard')} />;
      
      default:
        return (
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Página em Desenvolvimento</CardTitle>
              <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                Esta funcionalidade está sendo implementada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                A página "{currentPage}" estará disponível em breve.
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <>
      <SkipLink />
      <AccessibilityPanel />
      <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
        <div id="main-content">
          {renderPage()}
        </div>
      </Layout>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
        <Toaster 
          position="top-right"
        />
      </AuthProvider>
    </ThemeProvider>
  );
}