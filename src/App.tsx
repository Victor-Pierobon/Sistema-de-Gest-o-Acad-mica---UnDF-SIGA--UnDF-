import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Layout } from './components/Layout';
import { AlunoDashboard } from './components/dashboards/AlunoDashboard';
import { ProfessorDashboard } from './components/dashboards/ProfessorDashboard';
import { SecretariaDashboard } from './components/dashboards/SecretariaDashboard';
import { GrafoVisualizacao } from './components/GrafoVisualizacao';
import { SolicitacaoRecuperacao } from './components/forms/SolicitacaoRecuperacao';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Toaster } from './components/ui/sonner';
import { GrafoNode, GrafoEdge } from './types';

// Dados mockados para demonstração dos grafos
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
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Carregando...</div>
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
        return (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Dashboard do Administrador</CardTitle>
              <CardDescription className="text-slate-400">
                Painel de controle administrativo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Funcionalidades administrativas em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        );
      default:
        return <div className="text-white">Perfil não reconhecido</div>;
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return renderDashboard();
      
      case 'solicitar-recuperacao':
        return <SolicitacaoRecuperacao />;
      
      case 'grafo-historico':
      case 'grafo-turmas':
      case 'analises-grafo':
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
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Minhas Solicitações</CardTitle>
              <CardDescription className="text-slate-400">
                Acompanhe o status das suas solicitações de recuperação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Lista de solicitações em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        );
      
      case 'presencas':
        return (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Registro de Presenças</CardTitle>
              <CardDescription className="text-slate-400">
                Registre a presença dos alunos nas suas turmas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Sistema de registro de presenças em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        );
      
      case 'relatorios':
        return (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Relatórios</CardTitle>
              <CardDescription className="text-slate-400">
                Gere relatórios acadêmicos em PDF
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
                Sistema de relatórios em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        );
      
      default:
        return (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Página em Desenvolvimento</CardTitle>
              <CardDescription className="text-slate-400">
                Esta funcionalidade está sendo implementada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300">
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
    <AuthProvider>
      <div className="dark">
        <AppContent />
        <Toaster 
          position="top-right" 
          theme="dark"
          className="dark"
        />
      </div>
    </AuthProvider>
  );
}
