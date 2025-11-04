import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { AlunoDashboard } from './components/dashboards/AlunoDashboard';
import { ProfessorDashboard } from './components/dashboards/ProfessorDashboard';
import { SecretariaDashboard } from './components/dashboards/SecretariaDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { StudentAnalysis } from './components/dashboards/StudentAnalysis';
import { SubjectAnalysis } from './components/dashboards/SubjectAnalysis';
import { OfferPlanning } from './components/dashboards/OfferPlanning';
import { GrafoVisualizacao } from './components/GrafoVisualizacao';
import { GraphAnalysis } from './components/dashboards/GraphAnalysis';
import { Relatorios } from './components/dashboards/Relatorios';
import { SolicitacaoRecuperacao } from './components/forms/SolicitacaoRecuperacao';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Toaster } from './components/ui/sonner';
import { GrafoNode, GrafoEdge } from './types';

const mockNodes: GrafoNode[] = [
  { id: '1', label: 'Programação I', tipo: 'disciplina', status: 'cursada' },
  { id: '2', label: 'Algoritmos', tipo: 'disciplina', status: 'cursada' },
  { id: '3', label: 'Estruturas de Dados', tipo: 'disciplina', status: 'em_andamento' },
  { id: '4', label: 'Banco de Dados', tipo: 'disciplina', status: 'perdida' },
  { id: '5', label: 'Engenharia de Software', tipo: 'disciplina', status: 'disponivel' },
  { id: '6', label: 'Redes', tipo: 'disciplina', status: 'disponivel' }
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
    return <Login />;
  }

  const renderDashboard = () => {
    switch (user?.perfil) {
      case 'aluno':
        return <AlunoDashboard onPageChange={setCurrentPage} />;
      case 'professor':
        return <ProfessorDashboard onPageChange={setCurrentPage} />;
      case 'secretaria':
        return <SecretariaDashboard onPageChange={setCurrentPage} />;
      case 'administrador':
        return <AdminDashboard />;
      default:
        return <div className={isDark ? 'text-white' : 'text-slate-900'}>Perfil não reconhecido</div>;
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return renderDashboard();
      
      case 'solicitar-recuperacao':
        return <SolicitacaoRecuperacao />;
      
      case 'analise-alunos':
        return <StudentAnalysis />;
      
      case 'analise-disciplinas':
        return <SubjectAnalysis />;
      
      case 'planejamento-oferta':
        return <OfferPlanning />;
      
      case 'analises-grafo':
        return <GraphAnalysis onBack={() => setCurrentPage('dashboard')} />;
      
      case 'relatorios':
        return <Relatorios onBack={() => setCurrentPage('dashboard')} />;
      
      case 'grafo-historico':
      case 'grafo-turmas':
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
        return (
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Registro de Presenças</CardTitle>
              <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                Registre a presença dos alunos nas suas turmas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                Sistema de registro de presenças em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        );
      
      case 'relatorios':
        return (
          <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
            <CardHeader>
              <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Relatórios</CardTitle>
              <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                Gere relatórios acadêmicos em PDF
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                Sistema de relatórios em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        );
      
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
    <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </Layout>
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