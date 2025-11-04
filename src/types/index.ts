export type UserRole = 'aluno' | 'professor' | 'administrador';

export interface User {
  id: string;
  nome: string;
  email: string;
  perfil: UserRole;
  curso?: string;
  matricula?: string;
  avatar?: string;
}

export interface SolicitacaoRecuperacao {
  id: string;
  alunoId: string;
  nomeAluno: string;
  disciplina: string;
  periodo: string;
  cargaHoraria: number;
  motivo: string;
  documentos: string[];
  status: 'pendente' | 'aprovada_professor' | 'rejeitada_professor' | 'deferida' | 'indeferida';
  parecerProfessor?: string;
  parecerSecretaria?: string;
  professorId?: string;
  dataSubmissao: string;
  dataAvaliacao?: string;
}

export interface Disciplina {
  id: string;
  nome: string;
  codigo: string;
  periodo: number;
  cargaHoraria: number;
  prerequisitos: string[];
  status: 'cursada' | 'em_andamento' | 'perdida' | 'disponivel';
  nota?: number;
  faltas?: number;
}

export interface Presenca {
  id: string;
  alunoId: string;
  disciplinaId: string;
  data: string;
  presente: boolean;
}

export interface GrafoNode {
  id: string;
  label: string;
  tipo: 'disciplina' | 'aluno' | 'curso';
  status?: string;
  dados?: any;
}

export interface GrafoEdge {
  id: string;
  source: string;
  target: string;
  tipo: 'prerequisito' | 'cursou' | 'matriculado';
  peso?: number;
}
