// Comprehensive academic graph data with extensive relationships and interactions

export interface ComprehensiveNode {
  id: string;
  label: string;
  tipo: 'disciplina' | 'aluno' | 'professor' | 'turma' | 'curso' | 'departamento';
  categoria?: string;
  status?: string;
  position?: { x: number; y: number };
  dados: any;
}

export interface ComprehensiveEdge {
  id: string;
  source: string;
  target: string;
  tipo: string;
  peso: number;
  dados?: any;
  animated?: boolean;
}

// Cursos
export const cursos: ComprehensiveNode[] = [
  {
    id: 'eng_software',
    label: 'Engenharia de Software',
    tipo: 'curso',
    dados: {
      codigo: 'ES',
      duracao: 8,
      total_alunos: 245,
      taxa_evasao: 18.5,
      cr_medio: 6.8,
      coordenador: 'prof_lucia_silva'
    }
  },
  {
    id: 'ciencia_comp',
    label: 'Ciência da Computação',
    tipo: 'curso',
    dados: {
      codigo: 'CC',
      duracao: 8,
      total_alunos: 189,
      taxa_evasao: 22.1,
      cr_medio: 6.5,
      coordenador: 'prof_carlos_pereira'
    }
  }
];

// Departamentos
export const departamentos: ComprehensiveNode[] = [
  {
    id: 'dept_computacao',
    label: 'Depto. Computação',
    tipo: 'departamento',
    dados: {
      codigo: 'CIC',
      total_professores: 45,
      total_disciplinas: 78,
      chefe: 'prof_ana_costa'
    }
  }
];

// Disciplinas expandidas
export const disciplinas: ComprehensiveNode[] = [
  {
    id: 'calc1',
    label: 'Cálculo I',
    tipo: 'disciplina',
    categoria: 'critica',
    dados: {
      codigo: 'MAT101',
      semestre: 1,
      creditos: 6,
      carga_horaria: 90,
      taxa_reprovacao: 58.3,
      total_cursaram: 342,
      aprovados: 143,
      media_notas: 4.2,
      prerequisitos: [],
      dependentes: ['calc2', 'fisica1'],
      horarios: ['SEG 08:00-10:00', 'QUA 08:00-10:00', 'SEX 08:00-10:00']
    }
  },
  {
    id: 'alg101',
    label: 'Algoritmos',
    tipo: 'disciplina',
    categoria: 'dificil',
    dados: {
      codigo: 'ALG101',
      semestre: 1,
      creditos: 4,
      carga_horaria: 80,
      taxa_reprovacao: 35.2,
      total_cursaram: 298,
      aprovados: 193,
      media_notas: 6.1,
      prerequisitos: [],
      dependentes: ['ed201', 'poo301'],
      horarios: ['TER 14:00-16:00', 'QUI 14:00-16:00']
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
      creditos: 4,
      carga_horaria: 80,
      taxa_reprovacao: 28.7,
      total_cursaram: 234,
      aprovados: 167,
      media_notas: 6.8,
      prerequisitos: ['alg101'],
      dependentes: ['bd301', 'poo301', 'ia401'],
      horarios: ['SEG 14:00-16:00', 'QUA 14:00-16:00']
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
      creditos: 4,
      carga_horaria: 80,
      taxa_reprovacao: 25.4,
      total_cursaram: 187,
      aprovados: 139,
      media_notas: 7.1,
      prerequisitos: ['ed201'],
      dependentes: ['bd401', 'sas501'],
      horarios: ['TER 08:00-10:00', 'QUI 08:00-10:00']
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
      creditos: 4,
      carga_horaria: 80,
      taxa_reprovacao: 52.8,
      total_cursaram: 143,
      aprovados: 67,
      media_notas: 5.2,
      prerequisitos: ['bd301'],
      dependentes: ['sas501'],
      horarios: ['SEG 16:00-18:00', 'QUA 16:00-18:00']
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
      creditos: 4,
      carga_horaria: 80,
      taxa_reprovacao: 32.1,
      total_cursaram: 176,
      aprovados: 119,
      media_notas: 6.5,
      prerequisitos: ['ed201'],
      dependentes: ['es401', 'ts401'],
      horarios: ['TER 16:00-18:00', 'QUI 16:00-18:00']
    }
  },
  {
    id: 'es401',
    label: 'Engenharia de Software',
    tipo: 'disciplina',
    categoria: 'moderada',
    dados: {
      codigo: 'ES401',
      semestre: 4,
      creditos: 4,
      carga_horaria: 80,
      taxa_reprovacao: 19.8,
      total_cursaram: 134,
      aprovados: 107,
      media_notas: 7.4,
      prerequisitos: ['poo301'],
      dependentes: ['pi501'],
      horarios: ['SEG 10:00-12:00', 'QUA 10:00-12:00']
    }
  }
];

// Professores expandidos
export const professores: ComprehensiveNode[] = [
  {
    id: 'prof_ana_costa',
    label: 'Dra. Ana Costa',
    tipo: 'professor',
    dados: {
      siape: '1234567',
      titulacao: 'Doutora',
      area: 'Banco de Dados e Sistemas Distribuídos',
      departamento: 'dept_computacao',
      disciplinas_ministradas: ['bd301', 'bd401'],
      avaliacao_media: 4.2,
      anos_experiencia: 15,
      publicacoes: 47,
      orientacoes_ativas: 8,
      carga_horaria: 20,
      salario_faixa: 'Adjunto IV',
      email: 'ana.costa@unb.br',
      lattes: 'http://lattes.cnpq.br/1234567890'
    }
  },
  {
    id: 'prof_carlos_pereira',
    label: 'Dr. Carlos Pereira',
    tipo: 'professor',
    dados: {
      siape: '1234568',
      titulacao: 'Doutor',
      area: 'Algoritmos e Complexidade Computacional',
      departamento: 'dept_computacao',
      disciplinas_ministradas: ['alg101', 'ed201', 'calc1'],
      avaliacao_media: 3.8,
      anos_experiencia: 12,
      publicacoes: 32,
      orientacoes_ativas: 5,
      carga_horaria: 20,
      salario_faixa: 'Adjunto III',
      email: 'carlos.pereira@unb.br',
      lattes: 'http://lattes.cnpq.br/1234567891'
    }
  },
  {
    id: 'prof_lucia_silva',
    label: 'Dra. Lucia Silva',
    tipo: 'professor',
    dados: {
      siape: '1234569',
      titulacao: 'Doutora',
      area: 'Engenharia de Software e Métodos Formais',
      departamento: 'dept_computacao',
      disciplinas_ministradas: ['poo301', 'es401'],
      avaliacao_media: 4.5,
      anos_experiencia: 18,
      publicacoes: 63,
      orientacoes_ativas: 12,
      carga_horaria: 20,
      salario_faixa: 'Associado I',
      email: 'lucia.silva@unb.br',
      lattes: 'http://lattes.cnpq.br/1234567892'
    }
  }
];

// Alunos expandidos com histórico completo
export const alunos: ComprehensiveNode[] = [
  {
    id: 'joao_silva',
    label: 'João Silva Santos',
    tipo: 'aluno',
    dados: {
      matricula: '202110001',
      curso: 'eng_software',
      cr: 6.2,
      semestre_atual: 6,
      semestre_ingresso: '2021.1',
      reprovacoes: 4,
      status: 'ativo',
      idade: 22,
      cidade: 'Brasília-DF',
      telefone: '(61) 99999-0001',
      email: 'joao.silva@aluno.unb.br',
      creditos_concluidos: 128,
      creditos_totais: 240,
      percentual_conclusao: 53.3,
      previsao_formatura: '2025.2',
      bolsista: true,
      tipo_bolsa: 'PIBIC',
      orientador: 'prof_lucia_silva',
      trabalho_final: 'Sistema de Recomendação Acadêmica'
    }
  },
  {
    id: 'maria_oliveira',
    label: 'Maria Oliveira Pereira',
    tipo: 'aluno',
    dados: {
      matricula: '202110002',
      curso: 'eng_software',
      cr: 7.8,
      semestre_atual: 6,
      semestre_ingresso: '2021.1',
      reprovacoes: 1,
      status: 'ativo',
      idade: 21,
      cidade: 'Goiânia-GO',
      telefone: '(62) 99999-0002',
      email: 'maria.oliveira@aluno.unb.br',
      creditos_concluidos: 156,
      creditos_totais: 240,
      percentual_conclusao: 65.0,
      previsao_formatura: '2025.1',
      bolsista: true,
      tipo_bolsa: 'Monitoria',
      disciplina_monitoria: 'alg101'
    }
  },
  {
    id: 'carlos_lima',
    label: 'Carlos Souza Lima',
    tipo: 'aluno',
    dados: {
      matricula: '202110003',
      curso: 'ciencia_comp',
      cr: 4.1,
      semestre_atual: 5,
      semestre_ingresso: '2021.1',
      reprovacoes: 5,
      status: 'risco_critico',
      idade: 23,
      cidade: 'Brasília-DF',
      telefone: '(61) 99999-0003',
      email: 'carlos.lima@aluno.unb.br',
      creditos_concluidos: 89,
      creditos_totais: 240,
      percentual_conclusao: 37.1,
      previsao_formatura: '2027.1',
      bolsista: false,
      acompanhamento_psicopedagogico: true,
      plano_recuperacao: true
    }
  }
];

// Turmas com detalhes
export const turmas: ComprehensiveNode[] = [
  {
    id: 'bd301_t01_2024_2',
    label: 'BD I - T01',
    tipo: 'turma',
    dados: {
      disciplina: 'bd301',
      professor: 'prof_ana_costa',
      periodo: '2024.2',
      codigo_turma: 'T01',
      vagas: 40,
      matriculados: 38,
      horario: 'TER/QUI 08:00-10:00',
      sala: 'AT-340',
      modalidade: 'presencial',
      avaliacoes: [
        { tipo: 'Prova 1', data: '2024-09-15', peso: 30 },
        { tipo: 'Prova 2', data: '2024-10-20', peso: 30 },
        { tipo: 'Projeto', data: '2024-11-25', peso: 40 }
      ]
    }
  },
  {
    id: 'alg101_t01_2024_2',
    label: 'ALG - T01',
    tipo: 'turma',
    dados: {
      disciplina: 'alg101',
      professor: 'prof_carlos_pereira',
      periodo: '2024.2',
      codigo_turma: 'T01',
      vagas: 45,
      matriculados: 43,
      horario: 'TER/QUI 14:00-16:00',
      sala: 'AT-341',
      modalidade: 'presencial'
    }
  }
];

// Todos os nós
export const comprehensiveNodes: ComprehensiveNode[] = [
  ...cursos,
  ...departamentos,
  ...disciplinas,
  ...professores,
  ...alunos,
  ...turmas
];

// Relacionamentos expandidos
export const comprehensiveEdges: ComprehensiveEdge[] = [
  // Hierarquia institucional
  { id: 'e1', source: 'dept_computacao', target: 'eng_software', tipo: 'administra', peso: 1 },
  { id: 'e2', source: 'dept_computacao', target: 'ciencia_comp', tipo: 'administra', peso: 1 },
  
  // Professores e departamento
  { id: 'e3', source: 'prof_ana_costa', target: 'dept_computacao', tipo: 'pertence', peso: 1 },
  { id: 'e4', source: 'prof_carlos_pereira', target: 'dept_computacao', tipo: 'pertence', peso: 1 },
  { id: 'e5', source: 'prof_lucia_silva', target: 'dept_computacao', tipo: 'pertence', peso: 1 },
  
  // Alunos e cursos
  { id: 'e6', source: 'joao_silva', target: 'eng_software', tipo: 'matriculado_curso', peso: 1 },
  { id: 'e7', source: 'maria_oliveira', target: 'eng_software', tipo: 'matriculado_curso', peso: 1 },
  { id: 'e8', source: 'carlos_lima', target: 'ciencia_comp', tipo: 'matriculado_curso', peso: 1 },
  
  // Pré-requisitos
  { id: 'e9', source: 'alg101', target: 'ed201', tipo: 'prerequisito', peso: 2, animated: true },
  { id: 'e10', source: 'ed201', target: 'bd301', tipo: 'prerequisito', peso: 2, animated: true },
  { id: 'e11', source: 'ed201', target: 'poo301', tipo: 'prerequisito', peso: 2, animated: true },
  { id: 'e12', source: 'bd301', target: 'bd401', tipo: 'prerequisito', peso: 2, animated: true },
  { id: 'e13', source: 'poo301', target: 'es401', tipo: 'prerequisito', peso: 2, animated: true },
  
  // Professores lecionam disciplinas
  { id: 'e14', source: 'prof_ana_costa', target: 'bd301', tipo: 'leciona', peso: 1 },
  { id: 'e15', source: 'prof_ana_costa', target: 'bd401', tipo: 'leciona', peso: 1 },
  { id: 'e16', source: 'prof_carlos_pereira', target: 'alg101', tipo: 'leciona', peso: 1 },
  { id: 'e17', source: 'prof_carlos_pereira', target: 'ed201', tipo: 'leciona', peso: 1 },
  { id: 'e18', source: 'prof_carlos_pereira', target: 'calc1', tipo: 'leciona', peso: 1 },
  { id: 'e19', source: 'prof_lucia_silva', target: 'poo301', tipo: 'leciona', peso: 1 },
  { id: 'e20', source: 'prof_lucia_silva', target: 'es401', tipo: 'leciona', peso: 1 },
  
  // Turmas
  { id: 'e21', source: 'bd301_t01_2024_2', target: 'bd301', tipo: 'instancia', peso: 1 },
  { id: 'e22', source: 'alg101_t01_2024_2', target: 'alg101', tipo: 'instancia', peso: 1 },
  { id: 'e23', source: 'prof_ana_costa', target: 'bd301_t01_2024_2', tipo: 'ministra', peso: 1 },
  { id: 'e24', source: 'prof_carlos_pereira', target: 'alg101_t01_2024_2', tipo: 'ministra', peso: 1 },
  
  // Histórico acadêmico detalhado - João Silva
  { id: 'e25', source: 'joao_silva', target: 'calc1', tipo: 'reprovou', peso: 3, dados: { nota: 2.8, tentativas: 3, semestre: '2021.1' } },
  { id: 'e26', source: 'joao_silva', target: 'alg101', tipo: 'cursou', peso: 1, dados: { nota: 7.0, semestre: '2021.2' } },
  { id: 'e27', source: 'joao_silva', target: 'ed201', tipo: 'cursou', peso: 1, dados: { nota: 6.5, semestre: '2022.1' } },
  { id: 'e28', source: 'joao_silva', target: 'bd301', tipo: 'cursou', peso: 1, dados: { nota: 6.0, semestre: '2022.2' } },
  { id: 'e29', source: 'joao_silva', target: 'bd401', tipo: 'reprovou', peso: 3, dados: { nota: 3.5, tentativas: 4, semestre: '2023.1' } },
  { id: 'e30', source: 'joao_silva', target: 'poo301', tipo: 'cursou', peso: 1, dados: { nota: 7.2, semestre: '2023.1' } },
  
  // Histórico acadêmico - Maria Oliveira
  { id: 'e31', source: 'maria_oliveira', target: 'calc1', tipo: 'cursou', peso: 1, dados: { nota: 8.1, semestre: '2021.1' } },
  { id: 'e32', source: 'maria_oliveira', target: 'alg101', tipo: 'cursou', peso: 1, dados: { nota: 8.5, semestre: '2021.1' } },
  { id: 'e33', source: 'maria_oliveira', target: 'ed201', tipo: 'cursou', peso: 1, dados: { nota: 7.8, semestre: '2021.2' } },
  { id: 'e34', source: 'maria_oliveira', target: 'bd301', tipo: 'cursou', peso: 1, dados: { nota: 8.2, semestre: '2022.1' } },
  { id: 'e35', source: 'maria_oliveira', target: 'poo301', tipo: 'cursou', peso: 1, dados: { nota: 7.5, semestre: '2022.1' } },
  { id: 'e36', source: 'maria_oliveira', target: 'bd401', tipo: 'cursou', peso: 1, dados: { nota: 7.9, semestre: '2022.2' } },
  { id: 'e37', source: 'maria_oliveira', target: 'es401', tipo: 'cursou', peso: 1, dados: { nota: 8.3, semestre: '2023.1' } },
  
  // Histórico acadêmico - Carlos Lima (muitas reprovações)
  { id: 'e38', source: 'carlos_lima', target: 'calc1', tipo: 'reprovou', peso: 3, dados: { nota: 1.5, tentativas: 3, semestre: '2021.1' } },
  { id: 'e39', source: 'carlos_lima', target: 'alg101', tipo: 'reprovou', peso: 3, dados: { nota: 3.0, tentativas: 2, semestre: '2021.1' } },
  { id: 'e40', source: 'carlos_lima', target: 'ed201', tipo: 'reprovou', peso: 3, dados: { nota: 3.2, tentativas: 1, semestre: '2022.2' } },
  
  // Orientações e bolsas
  { id: 'e41', source: 'prof_lucia_silva', target: 'joao_silva', tipo: 'orienta', peso: 1, dados: { tipo: 'PIBIC', inicio: '2023.1' } },
  { id: 'e42', source: 'maria_oliveira', target: 'alg101', tipo: 'monitora', peso: 1, dados: { periodo: '2024.2' } },
  
  // Matrículas atuais
  { id: 'e43', source: 'joao_silva', target: 'bd301_t01_2024_2', tipo: 'matriculado_turma', peso: 1 },
  { id: 'e44', source: 'maria_oliveira', target: 'bd301_t01_2024_2', tipo: 'matriculado_turma', peso: 1 }
];

export const getAdvancedNodePosition = (node: ComprehensiveNode, allNodes: ComprehensiveNode[]) => {
  const centerX = 500;
  const centerY = 400;
  
  // Posicionamento por tipo
  switch (node.tipo) {
    case 'departamento':
      return { x: centerX, y: 50 };
      
    case 'curso':
      const cursoIndex = allNodes.filter(n => n.tipo === 'curso').findIndex(n => n.id === node.id);
      return { x: centerX - 200 + cursoIndex * 400, y: 150 };
      
    case 'disciplina':
      const semestre = node.dados?.semestre || 1;
      const disciplinasSemestre = allNodes.filter(n => n.tipo === 'disciplina' && n.dados?.semestre === semestre);
      const index = disciplinasSemestre.findIndex(n => n.id === node.id);
      return {
        x: 100 + (semestre - 1) * 140,
        y: 250 + index * 90
      };
      
    case 'professor':
      const profIndex = allNodes.filter(n => n.tipo === 'professor').findIndex(n => n.id === node.id);
      return { x: centerX + 300, y: 200 + profIndex * 120 };
      
    case 'aluno':
      const alunoIndex = allNodes.filter(n => n.tipo === 'aluno').findIndex(n => n.id === node.id);
      return { x: centerX - 400, y: 200 + alunoIndex * 100 };
      
    case 'turma':
      const turmaIndex = allNodes.filter(n => n.tipo === 'turma').findIndex(n => n.id === node.id);
      return { x: centerX + 150, y: 600 + turmaIndex * 80 };
      
    default:
      return { x: centerX, y: centerY };
  }
};