// Enhanced graph data with students, professors, and detailed relationships

export interface EnhancedGraphNode {
  id: string;
  label: string;
  tipo: 'disciplina' | 'aluno' | 'professor';
  categoria?: 'facil' | 'moderada' | 'dificil' | 'critica';
  status?: 'cursada' | 'em_andamento' | 'perdida' | 'disponivel' | 'aprovado' | 'reprovado';
  dados?: any;
}

export interface EnhancedGraphEdge {
  id: string;
  source: string;
  target: string;
  tipo: 'prerequisito' | 'cursou' | 'reprovou' | 'leciona' | 'matriculado';
  peso: number;
  dados?: any;
}

// Disciplinas
export const disciplinas: EnhancedGraphNode[] = [
  {
    id: 'alg101',
    label: 'Algoritmos',
    tipo: 'disciplina',
    categoria: 'dificil',
    dados: {
      codigo: 'ALG101',
      semestre: 1,
      taxa_reprovacao: 35.2,
      total_cursaram: 125,
      aprovados: 81,
      creditos: 4,
      carga_horaria: 80
    }
  },
  {
    id: 'ed201',
    label: 'Estruturas de Dados',
    tipo: 'disciplina',
    categoria: 'dificil',
    dados: {
      codigo: 'ED201',
      semestre: 2,
      taxa_reprovacao: 28.7,
      total_cursaram: 98,
      aprovados: 70,
      creditos: 4,
      carga_horaria: 80
    }
  },
  {
    id: 'bd301',
    label: 'Banco de Dados I',
    tipo: 'disciplina',
    categoria: 'moderada',
    dados: {
      codigo: 'BD301',
      semestre: 3,
      taxa_reprovacao: 25.4,
      total_cursaram: 78,
      aprovados: 58,
      creditos: 4,
      carga_horaria: 80
    }
  },
  {
    id: 'bd401',
    label: 'Banco de Dados II',
    tipo: 'disciplina',
    categoria: 'critica',
    dados: {
      codigo: 'BD401',
      semestre: 4,
      taxa_reprovacao: 52.8,
      total_cursaram: 53,
      aprovados: 25,
      creditos: 4,
      carga_horaria: 80
    }
  },
  {
    id: 'poo301',
    label: 'Programação OO',
    tipo: 'disciplina',
    categoria: 'dificil',
    dados: {
      codigo: 'POO301',
      semestre: 3,
      taxa_reprovacao: 32.1,
      total_cursaram: 75,
      aprovados: 51,
      creditos: 4,
      carga_horaria: 80
    }
  }
];

// Alunos
export const alunos: EnhancedGraphNode[] = [
  {
    id: 'joao_silva',
    label: 'João Silva',
    tipo: 'aluno',
    dados: {
      matricula: '202110001',
      curso: 'Engenharia de Software',
      cr: 6.2,
      semestre_atual: 4,
      reprovacoes: 4,
      status: 'ativo'
    }
  },
  {
    id: 'maria_oliveira',
    label: 'Maria Oliveira',
    tipo: 'aluno',
    dados: {
      matricula: '202110002',
      curso: 'Engenharia de Software',
      cr: 7.8,
      semestre_atual: 4,
      reprovacoes: 1,
      status: 'ativo'
    }
  },
  {
    id: 'carlos_lima',
    label: 'Carlos Lima',
    tipo: 'aluno',
    dados: {
      matricula: '202110003',
      curso: 'Ciência da Computação',
      cr: 4.1,
      semestre_atual: 3,
      reprovacoes: 5,
      status: 'risco_critico'
    }
  },
  {
    id: 'ana_santos',
    label: 'Ana Santos',
    tipo: 'aluno',
    dados: {
      matricula: '202210001',
      curso: 'Sistemas de Informação',
      cr: 8.1,
      semestre_atual: 2,
      reprovacoes: 0,
      status: 'ativo'
    }
  }
];

// Professores
export const professores: EnhancedGraphNode[] = [
  {
    id: 'prof_ana_costa',
    label: 'Dra. Ana Costa',
    tipo: 'professor',
    dados: {
      siape: '1234567',
      titulacao: 'Doutora',
      area: 'Banco de Dados',
      disciplinas_ministradas: ['bd301', 'bd401'],
      avaliacao_media: 4.2
    }
  },
  {
    id: 'prof_carlos_pereira',
    label: 'Dr. Carlos Pereira',
    tipo: 'professor',
    dados: {
      siape: '1234568',
      titulacao: 'Doutor',
      area: 'Algoritmos e Estruturas de Dados',
      disciplinas_ministradas: ['alg101', 'ed201'],
      avaliacao_media: 3.8
    }
  },
  {
    id: 'prof_lucia_silva',
    label: 'Dra. Lucia Silva',
    tipo: 'professor',
    dados: {
      siape: '1234569',
      titulacao: 'Doutora',
      area: 'Engenharia de Software',
      disciplinas_ministradas: ['poo301'],
      avaliacao_media: 4.5
    }
  }
];

// Todas as entidades
export const enhancedNodes: EnhancedGraphNode[] = [
  ...disciplinas,
  ...alunos,
  ...professores
];

// Relacionamentos
export const enhancedEdges: EnhancedGraphEdge[] = [
  // Pré-requisitos
  { id: 'e1', source: 'alg101', target: 'ed201', tipo: 'prerequisito', peso: 2 },
  { id: 'e2', source: 'ed201', target: 'poo301', tipo: 'prerequisito', peso: 2 },
  { id: 'e3', source: 'ed201', target: 'bd301', tipo: 'prerequisito', peso: 1 },
  { id: 'e4', source: 'bd301', target: 'bd401', tipo: 'prerequisito', peso: 2 },

  // Professores lecionam disciplinas
  { id: 'e5', source: 'prof_ana_costa', target: 'bd301', tipo: 'leciona', peso: 1 },
  { id: 'e6', source: 'prof_ana_costa', target: 'bd401', tipo: 'leciona', peso: 1 },
  { id: 'e7', source: 'prof_carlos_pereira', target: 'alg101', tipo: 'leciona', peso: 1 },
  { id: 'e8', source: 'prof_carlos_pereira', target: 'ed201', tipo: 'leciona', peso: 1 },
  { id: 'e9', source: 'prof_lucia_silva', target: 'poo301', tipo: 'leciona', peso: 1 },

  // João Silva - histórico acadêmico
  { id: 'e10', source: 'joao_silva', target: 'alg101', tipo: 'cursou', peso: 1, dados: { nota: 7.0, situacao: 'aprovado' } },
  { id: 'e11', source: 'joao_silva', target: 'ed201', tipo: 'cursou', peso: 1, dados: { nota: 6.5, situacao: 'aprovado' } },
  { id: 'e12', source: 'joao_silva', target: 'bd301', tipo: 'cursou', peso: 1, dados: { nota: 6.0, situacao: 'aprovado' } },
  { id: 'e13', source: 'joao_silva', target: 'bd401', tipo: 'reprovou', peso: 2, dados: { nota: 3.5, tentativas: 4 } },

  // Maria Oliveira - histórico acadêmico
  { id: 'e14', source: 'maria_oliveira', target: 'alg101', tipo: 'cursou', peso: 1, dados: { nota: 8.5, situacao: 'aprovado' } },
  { id: 'e15', source: 'maria_oliveira', target: 'ed201', tipo: 'cursou', peso: 1, dados: { nota: 7.8, situacao: 'aprovado' } },
  { id: 'e16', source: 'maria_oliveira', target: 'bd301', tipo: 'cursou', peso: 1, dados: { nota: 8.2, situacao: 'aprovado' } },
  { id: 'e17', source: 'maria_oliveira', target: 'poo301', tipo: 'cursou', peso: 1, dados: { nota: 7.5, situacao: 'aprovado' } },

  // Carlos Lima - histórico com muitas reprovações
  { id: 'e18', source: 'carlos_lima', target: 'alg101', tipo: 'reprovou', peso: 2, dados: { nota: 3.0, tentativas: 2 } },
  { id: 'e19', source: 'carlos_lima', target: 'ed201', tipo: 'reprovou', peso: 2, dados: { nota: 3.2, tentativas: 1 } },
  { id: 'e20', source: 'carlos_lima', target: 'bd301', tipo: 'reprovou', peso: 2, dados: { nota: 4.0, tentativas: 1 } },

  // Ana Santos - aluna exemplar
  { id: 'e21', source: 'ana_santos', target: 'alg101', tipo: 'cursou', peso: 1, dados: { nota: 8.8, situacao: 'aprovado' } },
  { id: 'e22', source: 'ana_santos', target: 'ed201', tipo: 'matriculado', peso: 1, dados: { situacao: 'em_andamento' } }
];

export const getNodePosition = (node: EnhancedGraphNode, allNodes: EnhancedGraphNode[]) => {
  const centerX = 400;
  const centerY = 300;
  
  if (node.tipo === 'disciplina') {
    const semestre = node.dados?.semestre || 1;
    const disciplinasSemestre = allNodes.filter(n => n.tipo === 'disciplina' && n.dados?.semestre === semestre);
    const index = disciplinasSemestre.findIndex(n => n.id === node.id);
    
    return {
      x: 100 + (semestre - 1) * 150,
      y: 100 + index * 100
    };
  }
  
  if (node.tipo === 'aluno') {
    const alunosNodes = allNodes.filter(n => n.tipo === 'aluno');
    const index = alunosNodes.findIndex(n => n.id === node.id);
    
    return {
      x: centerX - 200,
      y: 50 + index * 80
    };
  }
  
  if (node.tipo === 'professor') {
    const professoresNodes = allNodes.filter(n => n.tipo === 'professor');
    const index = professoresNodes.findIndex(n => n.id === node.id);
    
    return {
      x: centerX + 200,
      y: 50 + index * 100
    };
  }
  
  return { x: centerX, y: centerY };
};