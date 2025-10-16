import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dados mockados para demonstração
const mockUsers: User[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao.silva@faculdade.edu.br',
    perfil: 'aluno',
    curso: 'Ciência da Computação',
    matricula: '2021001'
  },
  {
    id: '2',
    nome: 'Prof. Maria Santos',
    email: 'maria.santos@faculdade.edu.br',
    perfil: 'professor'
  },
  {
    id: '3',
    nome: 'Ana Coordenadora',
    email: 'ana.coord@faculdade.edu.br',
    perfil: 'secretaria'
  },
  {
    id: '4',
    nome: 'Admin Sistema',
    email: 'admin@faculdade.edu.br',
    perfil: 'administrador'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulação de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === '123456') {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
