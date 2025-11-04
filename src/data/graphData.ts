// Mock graph data for SIGA-UnDF
// This provides robust graph data when backend is not available

export interface GraphNode {
  id: string;
  label: string;
  tipo: 'disciplina' | 'aluno' | 'curso';
  categoria?: 'facil' | 'moderada' | 'dificil' | 'critica';
  status?: 'cursada' | 'em_andamento' | 'perdida' | 'disponivel';
  dados?: {
    codigo?: string;
    semestre?: number;
    taxa_reprovacao?: number;
    total_cursaram?: number;
    aprovados?: number;
    creditos?: number;
  };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  tipo: 'prerequisito' | 'cursou' | 'matriculado' | 'reprovou';
  peso: number;
}

export const mockGraphNodes: GraphNode[] = [
  // 1º Semestre
  {
    id: 'alg101',
    label: 'Algoritmos',
    tipo: 'disciplina',
    categoria: 'dificil',
    status: 'cursada',
    dados: {
      codigo: 'ALG101',
      semestre: 1,
      taxa_reprovacao: 35.2,
      total_cursaram: 125,
      aprovados: 81,
      creditos: 4
    }
  },
  {
    id: 'pi101',
    label: 'Projeto Integrador I',
    tipo: 'disciplina',
    categoria: 'moderada',
    status: 'cursada',
    dados: {
      codigo: 'PI101',
      semestre: 1,
      taxa_reprovacao: 18.5,
      total_cursaram: 120,
      aprovados: 98,
      creditos: 4
    }
  },
  {
    id: 'ape101',
    label: 'APE I',
    tipo: 'disciplina',
    categoria: 'facil',
    status: 'cursada',
    dados: {
      codigo: 'APE101',
      semestre: 1,
      taxa_reprovacao: 12.3,
      total_cursaram: 118,
      aprovados: 103,
      creditos: 3
    }
  },

  // 2º Semestre
  {
    id: 'ed201',
    label: 'Estruturas de Dados',
    tipo: 'disciplina',
    categoria: 'dificil',
    status: 'cursada',
    dados: {
      codigo: 'ED201',
      semestre: 2,
      taxa_reprovacao: 28.7,
      total_cursaram: 98,
      aprovados: 70,
      creditos: 4
    }
  },
  {
    id: 'pi201',
    label: 'Projeto Integrador II',
    tipo: 'disciplina',
    categoria: 'moderada',
    status: 'cursada',
    dados: {
      codigo: 'PI201',
      semestre: 2,
      taxa_reprovacao: 22.1,
      total_cursaram: 95,
      aprovados: 74,
      creditos: 4
    }
  },
  {
    id: 'ape201',
    label: 'APE II',
    tipo: 'disciplina',
    categoria: 'facil',
    status: 'cursada',
    dados: {
      codigo: 'APE201',
      semestre: 2,
      taxa_reprovacao: 15.8,
      total_cursaram: 92,
      aprovados: 77,
      creditos: 3
    }
  },

  // 3º Semestre
  {
    id: 'bd301',
    label: 'Banco de Dados I',
    tipo: 'disciplina',
    categoria: 'moderada',
    status: 'em_andamento',
    dados: {
      codigo: 'BD301',
      semestre: 3,
      taxa_reprovacao: 25.4,
      total_cursaram: 78,
      aprovados: 58,
      creditos: 4
    }
  },
  {
    id: 'poo301',
    label: 'Programação Orientada a Objetos',
    tipo: 'disciplina',
    categoria: 'dificil',
    status: 'em_andamento',
    dados: {
      codigo: 'POO301',
      semestre: 3,
      taxa_reprovacao: 32.1,
      total_cursaram: 75,
      aprovados: 51,
      creditos: 4
    }
  },
  {
    id: 'so301',
    label: 'Sistemas Operacionais',
    tipo: 'disciplina',
    categoria: 'dificil',
    status: 'perdida',
    dados: {
      codigo: 'SO301',
      semestre: 3,
      taxa_reprovacao: 38.9,
      total_cursaram: 72,
      aprovados: 44,
      creditos: 4
    }
  },
  {
    id: 'er301',
    label: 'Engenharia de Requisitos',
    tipo: 'disciplina',
    categoria: 'moderada',
    status: 'em_andamento',
    dados: {
      codigo: 'ER301',
      semestre: 3,
      taxa_reprovacao: 19.7,
      total_cursaram: 71,
      aprovados: 57,
      creditos: 3
    }
  },

  // 4º Semestre
  {
    id: 'bd401',
    label: 'Banco de Dados II',
    tipo: 'disciplina',
    categoria: 'critica',
    status: 'disponivel',
    dados: {
      codigo: 'BD401',
      semestre: 4,
      taxa_reprovacao: 52.8,
      total_cursaram: 53,
      aprovados: 25,
      creditos: 4
    }
  },
  {
    id: 'rc401',
    label: 'Redes de Computadores',
    tipo: 'disciplina',
    categoria: 'dificil',
    status: 'disponivel',
    dados: {
      codigo: 'RC401',
      semestre: 4,
      taxa_reprovacao: 31.5,
      total_cursaram: 54,
      aprovados: 37,
      creditos: 4
    }
  },
  {
    id: 'eu401',
    label: 'Engenharia de Usabilidade',
    tipo: 'disciplina',
    categoria: 'facil',
    status: 'disponivel',
    dados: {
      codigo: 'EU401',
      semestre: 4,
      taxa_reprovacao: 14.2,
      total_cursaram: 49,
      aprovados: 42,
      creditos: 3
    }
  },
  {
    id: 'ts401',
    label: 'Teste de Software',
    tipo: 'disciplina',
    categoria: 'moderada',
    status: 'disponivel',
    dados: {
      codigo: 'TS401',
      semestre: 4,
      taxa_reprovacao: 23.6,
      total_cursaram: 51,
      aprovados: 39,
      creditos: 3
    }
  },

  // 5º Semestre
  {
    id: 'sas501',
    label: 'Segurança e Auditoria',
    tipo: 'disciplina',
    categoria: 'dificil',
    status: 'disponivel',
    dados: {
      codigo: 'SAS501',
      semestre: 5,
      taxa_reprovacao: 29.8,
      total_cursaram: 43,
      aprovados: 30,
      creditos: 3
    }
  }
];

export const mockGraphEdges: GraphEdge[] = [
  // Pré-requisitos básicos
  { id: 'e1', source: 'alg101', target: 'ed201', tipo: 'prerequisito', peso: 2 },
  { id: 'e2', source: 'pi101', target: 'pi201', tipo: 'prerequisito', peso: 2 },
  { id: 'e3', source: 'ape101', target: 'ape201', tipo: 'prerequisito', peso: 1 },
  
  // Pré-requisitos avançados
  { id: 'e4', source: 'ed201', target: 'poo301', tipo: 'prerequisito', peso: 2 },
  { id: 'e5', source: 'ed201', target: 'bd301', tipo: 'prerequisito', peso: 1 },
  { id: 'e6', source: 'bd301', target: 'bd401', tipo: 'prerequisito', peso: 2 },
  { id: 'e7', source: 'poo301', target: 'ts401', tipo: 'prerequisito', peso: 1 },
  { id: 'e8', source: 'er301', target: 'ts401', tipo: 'prerequisito', peso: 1 },
  { id: 'e9', source: 'bd301', target: 'sas501', tipo: 'prerequisito', peso: 1 },
  { id: 'e10', source: 'so301', target: 'rc401', tipo: 'prerequisito', peso: 1 },
];

export const mockCentralityData = [
  {
    id: 'ed201',
    nome: 'Estruturas de Dados',
    codigo: 'ED201',
    dependentes: 3,
    prerequisitos: 1,
    taxa_reprovacao: 28.7,
    centralidade_total: 4,
    classificacao: 'importante'
  },
  {
    id: 'bd301',
    nome: 'Banco de Dados I',
    codigo: 'BD301',
    dependentes: 2,
    prerequisitos: 1,
    taxa_reprovacao: 25.4,
    centralidade_total: 3,
    classificacao: 'importante'
  },
  {
    id: 'bd401',
    nome: 'Banco de Dados II',
    codigo: 'BD401',
    dependentes: 0,
    prerequisitos: 1,
    taxa_reprovacao: 52.8,
    centralidade_total: 1,
    classificacao: 'gargalo_critico'
  },
  {
    id: 'alg101',
    nome: 'Algoritmos',
    codigo: 'ALG101',
    dependentes: 1,
    prerequisitos: 0,
    taxa_reprovacao: 35.2,
    centralidade_total: 1,
    classificacao: 'gargalo_alto'
  },
  {
    id: 'poo301',
    nome: 'Programação Orientada a Objetos',
    codigo: 'POO301',
    dependentes: 1,
    prerequisitos: 1,
    taxa_reprovacao: 32.1,
    centralidade_total: 2,
    classificacao: 'importante'
  }
];

export const mockStudentRecommendations = [
  {
    disciplina_id: 'bd401',
    disciplina_nome: 'Banco de Dados II',
    codigo: 'BD401',
    semestre_recomendado: 4,
    prioridade: 2,
    motivo: 'Pré-requisitos cumpridos',
    dificuldade: 'dificil'
  },
  {
    disciplina_id: 'rc401',
    disciplina_nome: 'Redes de Computadores',
    codigo: 'RC401',
    semestre_recomendado: 4,
    prioridade: 3,
    motivo: 'Aguardando pré-requisitos',
    dificuldade: 'moderada'
  },
  {
    disciplina_id: 'eu401',
    disciplina_nome: 'Engenharia de Usabilidade',
    codigo: 'EU401',
    semestre_recomendado: 4,
    prioridade: 1,
    motivo: 'Disciplina básica disponível',
    dificuldade: 'recomendada'
  }
];