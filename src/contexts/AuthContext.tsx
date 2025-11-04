import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
    console.log('AuthContext - Iniciando login:', email);
    setLoading(true);
    
    try {
      const foundUser = await apiService.login(email, password);
      console.log('AuthContext - Resposta do apiService:', foundUser);
      
      if (foundUser) {
        const user: User = {
          id: foundUser.id,
          nome: foundUser.nome,
          email: foundUser.email,
          perfil: foundUser.perfil as UserRole,
          matricula: foundUser.matricula
        };
        
        console.log('AuthContext - Usuário criado:', user);
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        setLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Erro no login:', error);
    }
    
    console.log('AuthContext - Login falhou');
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
