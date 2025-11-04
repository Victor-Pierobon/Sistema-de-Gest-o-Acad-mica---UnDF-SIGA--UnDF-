-- SIGA-UnDF Database Schema
-- Sistema Integrado de Gestão Acadêmica - Universidade de Brasília

-- =============================================
-- TABELAS PRINCIPAIS
-- =============================================

-- Usuários do sistema
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    data_nascimento DATE,
    telefone VARCHAR(20),
    endereco TEXT,
    perfil VARCHAR(20) NOT NULL CHECK (perfil IN ('aluno', 'professor', 'secretaria', 'administrador')),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cursos oferecidos
CREATE TABLE cursos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    descricao TEXT,
    duracao_semestres INTEGER NOT NULL,
    carga_horaria_total INTEGER NOT NULL,
    modalidade VARCHAR(20) DEFAULT 'presencial' CHECK (modalidade IN ('presencial', 'ead', 'hibrido')),
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Disciplinas
CREATE TABLE disciplinas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    descricao TEXT,
    carga_horaria INTEGER NOT NULL,
    creditos INTEGER NOT NULL,
    semestre_recomendado INTEGER,
    obrigatoria BOOLEAN DEFAULT true,
    ativa BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Relacionamento curso-disciplina
CREATE TABLE curso_disciplinas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    curso_id UUID REFERENCES cursos(id) ON DELETE CASCADE,
    disciplina_id UUID REFERENCES disciplinas(id) ON DELETE CASCADE,
    semestre_recomendado INTEGER,
    obrigatoria BOOLEAN DEFAULT true,
    UNIQUE(curso_id, disciplina_id)
);

-- Pré-requisitos entre disciplinas
CREATE TABLE prerequisitos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    disciplina_id UUID REFERENCES disciplinas(id) ON DELETE CASCADE,
    prerequisito_id UUID REFERENCES disciplinas(id) ON DELETE CASCADE,
    tipo VARCHAR(20) DEFAULT 'obrigatorio' CHECK (tipo IN ('obrigatorio', 'recomendado')),
    UNIQUE(disciplina_id, prerequisito_id)
);

-- Alunos
CREATE TABLE alunos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    curso_id UUID REFERENCES cursos(id),
    semestre_ingresso VARCHAR(10) NOT NULL,
    ano_ingresso INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'ativo' CHECK (status IN ('ativo', 'trancado', 'formado', 'desligado')),
    coeficiente_rendimento DECIMAL(4,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Professores
CREATE TABLE professores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    siape VARCHAR(20) UNIQUE NOT NULL,
    titulacao VARCHAR(50),
    area_especializacao TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Períodos letivos
CREATE TABLE periodos_letivos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ano INTEGER NOT NULL,
    semestre INTEGER NOT NULL CHECK (semestre IN (1, 2)),
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    data_inicio_matriculas DATE,
    data_fim_matriculas DATE,
    ativo BOOLEAN DEFAULT false,
    UNIQUE(ano, semestre)
);

-- Turmas
CREATE TABLE turmas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    disciplina_id UUID REFERENCES disciplinas(id),
    professor_id UUID REFERENCES professores(id),
    periodo_letivo_id UUID REFERENCES periodos_letivos(id),
    codigo VARCHAR(20) NOT NULL,
    vagas INTEGER NOT NULL,
    vagas_ocupadas INTEGER DEFAULT 0,
    horario JSONB, -- {dia_semana: int, hora_inicio: time, hora_fim: time, sala: string}
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABELAS DE RELACIONAMENTO ACADÊMICO
-- =============================================

-- Matrículas dos alunos em turmas
CREATE TABLE matriculas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aluno_id UUID REFERENCES alunos(id) ON DELETE CASCADE,
    turma_id UUID REFERENCES turmas(id) ON DELETE CASCADE,
    data_matricula TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'matriculado' CHECK (status IN ('matriculado', 'trancado', 'cancelado')),
    UNIQUE(aluno_id, turma_id)
);

-- Notas e frequência
CREATE TABLE avaliacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    matricula_id UUID REFERENCES matriculas(id) ON DELETE CASCADE,
    nota_1 DECIMAL(4,2),
    nota_2 DECIMAL(4,2),
    nota_3 DECIMAL(4,2),
    nota_final DECIMAL(4,2),
    frequencia INTEGER DEFAULT 0, -- percentual de presença
    situacao VARCHAR(20) DEFAULT 'cursando' CHECK (situacao IN ('cursando', 'aprovado', 'reprovado_nota', 'reprovado_frequencia', 'trancado')),
    data_lancamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Controle de presença detalhado
CREATE TABLE presencas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    matricula_id UUID REFERENCES matriculas(id) ON DELETE CASCADE,
    data_aula DATE NOT NULL,
    presente BOOLEAN NOT NULL,
    justificativa TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABELAS DE SOLICITAÇÕES E PROCESSOS
-- =============================================

-- Solicitações de recuperação
CREATE TABLE solicitacoes_recuperacao (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aluno_id UUID REFERENCES alunos(id) ON DELETE CASCADE,
    disciplina_id UUID REFERENCES disciplinas(id),
    periodo_solicitado VARCHAR(10) NOT NULL,
    motivo TEXT NOT NULL,
    documentos JSONB, -- array de URLs/paths dos documentos
    status VARCHAR(30) DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovada_professor', 'rejeitada_professor', 'deferida', 'indeferida')),
    parecer_professor TEXT,
    parecer_secretaria TEXT,
    professor_avaliador_id UUID REFERENCES professores(id),
    data_submissao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_avaliacao_professor TIMESTAMP,
    data_avaliacao_secretaria TIMESTAMP
);

-- Histórico acadêmico consolidado
CREATE TABLE historico_academico (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aluno_id UUID REFERENCES alunos(id) ON DELETE CASCADE,
    disciplina_id UUID REFERENCES disciplinas(id),
    periodo_cursado VARCHAR(10) NOT NULL,
    nota_final DECIMAL(4,2),
    frequencia INTEGER,
    situacao VARCHAR(20) NOT NULL,
    creditos_obtidos INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABELAS PARA ANÁLISE DE GRAFOS
-- =============================================

-- Nós do grafo (entidades principais)
CREATE TABLE grafo_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(20) NOT NULL CHECK (entity_type IN ('aluno', 'disciplina', 'curso', 'professor', 'turma')),
    entity_id UUID NOT NULL,
    label VARCHAR(255) NOT NULL,
    properties JSONB, -- propriedades específicas do nó
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Arestas do grafo (relacionamentos)
CREATE TABLE grafo_edges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_node_id UUID REFERENCES grafo_nodes(id) ON DELETE CASCADE,
    target_node_id UUID REFERENCES grafo_nodes(id) ON DELETE CASCADE,
    relationship_type VARCHAR(30) NOT NULL CHECK (relationship_type IN ('prerequisito', 'cursou', 'matriculado', 'reprovou', 'leciona', 'pertence')),
    weight DECIMAL(5,2) DEFAULT 1.0,
    properties JSONB, -- propriedades específicas da aresta
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- ÍNDICES PARA PERFORMANCE
-- =============================================

-- Índices para consultas frequentes
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_cpf ON usuarios(cpf);
CREATE INDEX idx_alunos_matricula ON alunos(matricula);
CREATE INDEX idx_alunos_curso ON alunos(curso_id);
CREATE INDEX idx_professores_siape ON professores(siape);
CREATE INDEX idx_disciplinas_codigo ON disciplinas(codigo);
CREATE INDEX idx_matriculas_aluno ON matriculas(aluno_id);
CREATE INDEX idx_matriculas_turma ON matriculas(turma_id);
CREATE INDEX idx_avaliacoes_matricula ON avaliacoes(matricula_id);
CREATE INDEX idx_historico_aluno ON historico_academico(aluno_id);
CREATE INDEX idx_prerequisitos_disciplina ON prerequisitos(disciplina_id);
CREATE INDEX idx_grafo_nodes_entity ON grafo_nodes(entity_type, entity_id);
CREATE INDEX idx_grafo_edges_source ON grafo_edges(source_node_id);
CREATE INDEX idx_grafo_edges_target ON grafo_edges(target_node_id);
CREATE INDEX idx_grafo_edges_type ON grafo_edges(relationship_type);

-- =============================================
-- TRIGGERS PARA MANUTENÇÃO AUTOMÁTICA
-- =============================================

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger para atualizar vagas ocupadas
CREATE OR REPLACE FUNCTION update_vagas_ocupadas()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE turmas SET vagas_ocupadas = vagas_ocupadas + 1 WHERE id = NEW.turma_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE turmas SET vagas_ocupadas = vagas_ocupadas - 1 WHERE id = OLD.turma_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_update_vagas_ocupadas
    AFTER INSERT OR DELETE ON matriculas
    FOR EACH ROW EXECUTE FUNCTION update_vagas_ocupadas();