import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter
} from './ui/sidebar';
import { 
  GraduationCap, 
  Home, 
  FileText, 
  Users, 
  Settings, 
  LogOut,
  BookOpen,
  Calendar,
  BarChart3,
  UserCheck,
  ClipboardList,
  Network,
  UserCog
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home }
    ];

    switch (user?.perfil) {
      case 'aluno':
        return [
          ...baseItems,
          { id: 'historico', label: 'Histórico Acadêmico', icon: BookOpen },
          { id: 'grafo-historico', label: 'Grafo do Histórico', icon: Network },
          { id: 'solicitar-recuperacao', label: 'Solicitar Recuperação', icon: FileText },
          { id: 'minhas-solicitacoes', label: 'Minhas Solicitações', icon: ClipboardList }
        ];
      
      case 'professor':
        return [
          ...baseItems,
          { id: 'turmas', label: 'Minhas Turmas', icon: Users },
          { id: 'presencas', label: 'Registro de Presenças', icon: UserCheck },
          { id: 'avaliar-solicitacoes', label: 'Avaliar Solicitações', icon: ClipboardList },
          { id: 'grafo-turmas', label: 'Análise de Turmas', icon: Network }
        ];
      
      case 'secretaria':
        return [
          ...baseItems,
          { id: 'gestao-solicitacoes', label: 'Gestão de Solicitações', icon: ClipboardList },
          { id: 'relatorios', label: 'Relatórios', icon: BarChart3 },
          { id: 'analises-grafo', label: 'Análises em Grafo', icon: Network },
          { id: 'metricas', label: 'Métricas Consolidadas', icon: BarChart3 }
        ];
      
      case 'administrador':
        return [
          ...baseItems,
          { id: 'gestao-usuarios', label: 'Gestão de Usuários', icon: UserCog },
          { id: 'configuracoes', label: 'Configurações', icon: Settings },
          { id: 'logs-auditoria', label: 'Logs de Auditoria', icon: FileText },
          { id: 'analises-completas', label: 'Análises Completas', icon: Network }
        ];
      
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-900">
        <Sidebar className="bg-slate-800 border-slate-700">
          <SidebarHeader className="border-b border-slate-700 p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-medium">Sistema Acadêmico</h2>
                <p className="text-slate-400 text-xs">Gestão de Matérias</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="py-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onPageChange(item.id)}
                    isActive={currentPage === item.id}
                    className="text-slate-300 hover:text-white hover:bg-slate-700 data-[active=true]:bg-blue-600 data-[active=true]:text-white"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-700 p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-600 text-white text-xs">
                  {user?.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">{user?.nome}</p>
                <p className="text-slate-400 text-xs capitalize">{user?.perfil}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-slate-800 border-b border-slate-700 p-4">
            <div className="flex items-center">
              <SidebarTrigger className="text-slate-300 hover:text-white" />
              <div className="ml-4">
                <h1 className="text-white text-xl">
                  {menuItems.find(item => item.id === currentPage)?.label || 'Dashboard'}
                </h1>
              </div>
            </div>
          </header>

          <div className="flex-1 p-6 bg-slate-900">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
