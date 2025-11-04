import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { GraduationCap, Mail, Lock, AlertCircle } from 'lucide-react';

export function Login() {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError('E-mail ou senha inválidos.');
    }
  };

  const demoCredentials = [
    { role: 'Aluno', email: 'aluno' },
    { role: 'Professor', email: 'professor' },
    { role: 'Administrador', email: 'admin' }
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDark ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100'}`}>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className={`text-3xl ${isDark ? 'text-white' : 'text-slate-900'}`}>SIGA-UnDF</h1>
          <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Sistema Integrado de Gestão Acadêmica</p>
        </div>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={isDark ? 'text-white' : 'text-slate-900'}>Entrar</CardTitle>
            <CardDescription className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Use suas credenciais institucionais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className={isDark ? 'text-slate-300' : 'text-slate-700'}>Usuário</Label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                  <Input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin"
                    className={`pl-10 ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder:text-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-500'}`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className={isDark ? 'text-slate-300' : 'text-slate-700'}>Senha</Label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`pl-10 ${isDark ? 'bg-slate-700 border-slate-600 text-white placeholder:text-slate-400' : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-500'}`}
                  />
                </div>
              </div>

              {error && (
                <Alert className={isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'}>
                  <AlertCircle className={`h-4 w-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                  <AlertDescription className={isDark ? 'text-red-400' : 'text-red-600'}>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className={isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}>
          <CardHeader>
            <CardTitle className={`text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Credenciais para Demonstração</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className={`text-xs mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Senha para todos: 123456</p>
            {demoCredentials.map((cred, index) => (
              <div key={index} className="flex justify-between items-center text-xs">
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{cred.role}:</span>
                <button
                  type="button"
                  onClick={() => setEmail(cred.email)}
                  className={`underline ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                >
                  {cred.email}
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center text-xs">
              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Administrador (antigo):</span>
              <button
                type="button"
                onClick={() => setEmail('secretaria')}
                className={`underline ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
              >
                secretaria
              </button>
            </div>
            <p className={`text-xs mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              ℹ️ Os perfis de Secretaria e Administrador foram unificados
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}