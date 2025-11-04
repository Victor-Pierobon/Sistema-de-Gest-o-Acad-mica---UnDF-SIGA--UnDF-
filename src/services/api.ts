// Serviço para conectar com os dados reais do banco PostgreSQL
export const mockDatabaseData = {
  usuarios: [
    // Usuários com emails simples para login fácil
    { id: '1', nome: 'João Silva Santos', email: 'aluno', perfil: 'aluno', matricula: '202110001' },
    { id: '2', nome: 'Ana Costa', email: 'professor', perfil: 'professor' },
    { id: '3', nome: 'Secretaria Acadêmica', email: 'secretaria', perfil: 'secretaria' },
    { id: '4', nome: 'Admin Geral', email: 'admin', perfil: 'administrador' },
    // Usuários do banco de dados
    { id: '750e8400-e29b-41d4-a716-446655440010', nome: 'João Silva Santos', email: 'joao.santos@unb.br', perfil: 'aluno', matricula: '202110001' },
    { id: '750e8400-e29b-41d4-a716-446655440011', nome: 'Maria Oliveira Pereira', email: 'maria.pereira@unb.br', perfil: 'aluno', matricula: '202110002' },
    { id: '750e8400-e29b-41d4-a716-446655440012', nome: 'Carlos Souza Lima', email: 'carlos.lima@unb.br', perfil: 'aluno', matricula: '202110003' },
    { id: '750e8400-e29b-41d4-a716-446655440004', nome: 'Ana Costa', email: 'ana.costa@unb.br', perfil: 'professor' },
    { id: '750e8400-e29b-41d4-a716-446655440002', nome: 'Secretaria Acadêmica', email: 'secretaria@unb.br', perfil: 'secretaria' },
    { id: '750e8400-e29b-41d4-a716-446655440001', nome: 'Admin Geral', email: 'admin@unb.br', perfil: 'administrador' }
  ],

  disciplinasCriticas: [
    { nome: 'Banco de Dados II', codigo: 'BDII401', taxa: 63.64, impacto: 'CRÍTICO' },
    { nome: 'Algoritmos', codigo: 'ALG101', taxa: 54.55, impacto: 'ALTO' },
    { nome: 'Cálculo I', codigo: 'CALC101', taxa: 50.00, impacto: 'MÉDIO' },
    { nome: 'Banco de Dados I', codigo: 'BD201', taxa: 33.33, impacto: 'MÉDIO' }
  ],

  alunosRisco: [
    { nome: 'Carlos Souza Lima', matricula: '202110003', reprovacoes: 5, cr: 4.1, risco: 'CRÍTICO' },
    { nome: 'João Silva Santos', matricula: '202110001', reprovacoes: 4, cr: 6.2, risco: 'ALTO' },
    { nome: 'Lucas Gabriel Ferreira', matricula: '202110005', reprovacoes: 2, cr: 6.8, risco: 'MÉDIO' }
  ],

  metricas: {
    disciplinasCriticas: 4,
    alunosRisco: 40,
    taxaReprovacaoMedia: 42.3,
    disciplinasGargalo: 2
  }
};

const API_BASE_URL = 'http://localhost:3002/api';

export const apiService = {
  async login(email: string, senha: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });
      
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Erro no login:', error);
      // Fallback para dados mock se API não estiver disponível
      const user = mockDatabaseData.usuarios.find(u => u.email === email);
      if (user && senha === '123456') return user;
      return null;
    }
  },

  async getDisciplinasCriticas() {
    try {
      const response = await fetch(`${API_BASE_URL}/disciplinas-criticas`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Erro ao buscar disciplinas críticas:', error);
    }
    return mockDatabaseData.disciplinasCriticas;
  },

  async getAlunosRisco() {
    try {
      const response = await fetch(`${API_BASE_URL}/alunos-risco`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Erro ao buscar alunos em risco:', error);
    }
    return mockDatabaseData.alunosRisco;
  },

  async getMetricas() {
    try {
      console.log('Buscando métricas em:', `${API_BASE_URL}/metricas`);
      const response = await fetch(`${API_BASE_URL}/metricas`);
      if (response.ok) {
        const data = await response.json();
        console.log('Métricas do backend:', data);
        return data;
      }
      console.error('Resposta não OK:', response.status);
    } catch (error) {
      console.error('Erro ao buscar métricas:', error);
    }
    console.log('Usando dados mock para métricas');
    return mockDatabaseData.metricas;
  },

  async getSolicitacoes() {
    try {
      console.log('Buscando solicitações em:', `${API_BASE_URL}/solicitacoes`);
      const response = await fetch(`${API_BASE_URL}/solicitacoes`);
      if (response.ok) {
        const data = await response.json();
        console.log('Solicitações do backend:', data);
        return data;
      }
      console.error('Resposta não OK:', response.status);
    } catch (error) {
      console.error('Erro ao buscar solicitações:', error);
    }
    console.log('Usando dados mock para solicitações');
    return [];
  },

  async getGrafoData(tipo: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/grafo/${tipo}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Erro ao buscar dados do grafo:', error);
    }
    return { nodes: [], edges: [] };
  },

  async getCursosStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/cursos-stats`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas dos cursos:', error);
    }
    return [];
  },

  async getSolicitacoesCount() {
    try {
      const response = await fetch(`${API_BASE_URL}/solicitacoes-count`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Erro ao buscar contadores de solicitações:', error);
    }
    return { pendentes: 0, aprovadas_professor: 0, deferidas: 0, indeferidas: 0 };
  },

  async getAlertas() {
    try {
      const response = await fetch(`${API_BASE_URL}/alertas`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Erro ao buscar alertas:', error);
    }
    return [];
  },

  async getAdminStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin-stats`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas administrativas:', error);
    }
    return null;
  }
};