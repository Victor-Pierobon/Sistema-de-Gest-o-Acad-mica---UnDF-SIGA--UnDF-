import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
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
  UserCog,
  Sun,
  Moon
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home }
    ];

    switch (user?.perfil) {
      case 'aluno':
        return [
          ...baseItems,
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
          { id: 'analise-alunos', label: 'Análise de Alunos', icon: UserCog },
          { id: 'analise-disciplinas', label: 'Análise de Disciplinas', icon: Settings },
          { id: 'planejamento-oferta', label: 'Planejamento de Oferta', icon: FileText }
        ];
      
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <SidebarProvider>
      <div className={`flex min-h-screen w-full ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <Sidebar className={isDark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}>
          <SidebarHeader className={`p-4 ${isDark ? 'border-b border-slate-700' : 'border-b border-slate-200'}`}>
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>SIGA-UnDF</h2>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Sistema Integrado de Gestão Acadêmica</p>
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
                    className={isDark ? "text-slate-300 hover:text-white hover:bg-slate-700 data-[active=true]:bg-blue-600 data-[active=true]:text-white" : "text-slate-700 hover:text-slate-900 hover:bg-slate-100 data-[active=true]:bg-blue-600 data-[active=true]:text-white"}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className={`p-4 ${isDark ? 'border-t border-slate-700' : 'border-t border-slate-200'}`}>
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-600 text-white text-xs">
                  {user?.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className={`text-sm truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{user?.nome}</p>
                <p className={`text-xs capitalize ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{user?.perfil}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className={`w-full ${isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}
              >
                {isDark ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                {isDark ? 'Tema Claro' : 'Tema Escuro'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className={`w-full ${isDark ? 'border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className={`p-4 ${isDark ? 'bg-slate-800 border-b border-slate-700' : 'bg-white border-b border-slate-200'}`}>
            <div className="flex items-center">
              <SidebarTrigger className={isDark ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-slate-900"} />
              <div className="ml-4">
                <h1 className={`text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {menuItems.find(item => item.id === currentPage)?.label || 'Dashboard'}
                </h1>
              </div>
            </div>
          </header>

          <div className={`flex-1 p-6 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
