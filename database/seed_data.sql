-- SIGA-UnDF Seed Data
-- Dados iniciais para popular o banco de dados

-- =============================================
-- INSERÇÃO DE DADOS BÁSICOS
-- =============================================

-- Cursos
INSERT INTO cursos (id, nome, codigo, descricao, duracao_semestres, carga_horaria_total) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Engenharia de Software', 'ES', 'Curso de Engenharia de Software', 8, 3200),
('550e8400-e29b-41d4-a716-446655440002', 'Ciência da Computação', 'CC', 'Curso de Ciência da Computação', 8, 3000),
('550e8400-e29b-41d4-a716-446655440003', 'Sistemas de Informação', 'SI', 'Curso de Sistemas de Informação', 8, 2800),
('550e8400-e29b-41d4-a716-446655440004', 'Gestão da Tecnologia da Informação', 'GTI', 'Curso de GTI', 6, 2400),
('550e8400-e29b-41d4-a716-446655440005', 'Matemática', 'MAT', 'Curso de Matemática', 8, 2600);

-- Disciplinas
INSERT INTO disciplinas (id, nome, codigo, carga_horaria, creditos, semestre_recomendado) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'Banco de Dados I', 'BDI301', 80, 4, 3),
('650e8400-e29b-41d4-a716-446655440002', 'Banco de Dados II', 'BDII401', 80, 4, 4),
('650e8400-e29b-41d4-a716-446655440003', 'PI I', 'PI101', 80, 4, 1),
('650e8400-e29b-41d4-a716-446655440004', 'PI II', 'PI201', 80, 4, 2),
('650e8400-e29b-41d4-a716-446655440005', 'PI III', 'PI301', 80, 4, 3),
('650e8400-e29b-41d4-a716-446655440006', 'PI IV', 'PI401', 80, 4, 4),
('650e8400-e29b-41d4-a716-446655440007', 'PI V', 'PI501', 80, 4, 5),
('650e8400-e29b-41d4-a716-446655440008', 'APE I', 'APE101', 60, 3, 1),
('650e8400-e29b-41d4-a716-446655440009', 'APE II', 'APE201', 60, 3, 2),
('650e8400-e29b-41d4-a716-446655440010', 'APE III', 'APE301', 60, 3, 3),
('650e8400-e29b-41d4-a716-446655440011', 'APE IV', 'APE401', 60, 3, 4),
('650e8400-e29b-41d4-a716-446655440012', 'Engenharia de Usabilidade', 'EU401', 60, 3, 4),
('650e8400-e29b-41d4-a716-446655440013', 'Segurança e Auditoria de Sistemas', 'SAS501', 60, 3, 5),
('650e8400-e29b-41d4-a716-446655440014', 'Estruturas de Dados', 'ED201', 80, 4, 2),
('650e8400-e29b-41d4-a716-446655440015', 'Algoritmos', 'ALG101', 80, 4, 1),
('650e8400-e29b-41d4-a716-446655440016', 'Programação Orientada a Objetos', 'POO301', 80, 4, 3),
('650e8400-e29b-41d4-a716-446655440017', 'Redes de Computadores', 'RC401', 80, 4, 4),
('650e8400-e29b-41d4-a716-446655440018', 'Sistemas Operacionais', 'SO301', 80, 4, 3),
('650e8400-e29b-41d4-a716-446655440019', 'Engenharia de Requisitos', 'ER301', 60, 3, 3),
('650e8400-e29b-41d4-a716-446655440020', 'Teste de Software', 'TS401', 60, 3, 4);

-- Relacionamento curso-disciplina (Engenharia de Software)
INSERT INTO curso_disciplinas (curso_id, disciplina_id, semestre_recomendado, obrigatoria) VALUES
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440015', 1, true), -- Algoritmos
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440003', 1, true), -- PI I
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440008', 1, true), -- APE I
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440014', 2, true), -- Estruturas de Dados
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440004', 2, true), -- PI II
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440009', 2, true), -- APE II
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 3, true), -- BD I
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440005', 3, true), -- PI III
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440010', 3, true), -- APE III
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440016', 3, true), -- POO
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440018', 3, true), -- SO
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440019', 3, true), -- ER
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440002', 4, true), -- BD II
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440006', 4, true), -- PI IV
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440011', 4, true), -- APE IV
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440012', 4, true), -- EU
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440017', 4, true), -- RC
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440020', 4, true), -- TS
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440007', 5, true), -- PI V
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440013', 5, true); -- SAS

-- Pré-requisitos
INSERT INTO prerequisitos (disciplina_id, prerequisito_id, tipo) VALUES
('650e8400-e29b-41d4-a716-446655440014', '650e8400-e29b-41d4-a716-446655440015', 'obrigatorio'), -- ED -> Algoritmos
('650e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440003', 'obrigatorio'), -- PI II -> PI I
('650e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440004', 'obrigatorio'), -- PI III -> PI II
('650e8400-e29b-41d4-a716-446655440006', '650e8400-e29b-41d4-a716-446655440005', 'obrigatorio'), -- PI IV -> PI III
('650e8400-e29b-41d4-a716-446655440007', '650e8400-e29b-41d4-a716-446655440006', 'obrigatorio'), -- PI V -> PI IV
('650e8400-e29b-41d4-a716-446655440009', '650e8400-e29b-41d4-a716-446655440008', 'obrigatorio'), -- APE II -> APE I
('650e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440009', 'obrigatorio'), -- APE III -> APE II
('650e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440010', 'obrigatorio'), -- APE IV -> APE III
('650e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', 'obrigatorio'), -- BD II -> BD I
('650e8400-e29b-41d4-a716-446655440016', '650e8400-e29b-41d4-a716-446655440014', 'obrigatorio'), -- POO -> ED
('650e8400-e29b-41d4-a716-446655440013', '650e8400-e29b-41d4-a716-446655440001', 'obrigatorio'), -- SAS -> BD I
('650e8400-e29b-41d4-a716-446655440020', '650e8400-e29b-41d4-a716-446655440019', 'obrigatorio'); -- TS -> ER

-- Usuários
INSERT INTO usuarios (id, nome, email, senha_hash, cpf, perfil) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'João Silva', 'joao.silva@unb.br', '$2b$10$hash1', '12345678901', 'aluno'),
('750e8400-e29b-41d4-a716-446655440002', 'Maria Santos', 'maria.santos@unb.br', '$2b$10$hash2', '12345678902', 'aluno'),
('750e8400-e29b-41d4-a716-446655440003', 'Pedro Oliveira', 'pedro.oliveira@unb.br', '$2b$10$hash3', '12345678903', 'aluno'),
('750e8400-e29b-41d4-a716-446655440004', 'Ana Costa', 'ana.costa@unb.br', '$2b$10$hash4', '12345678904', 'professor'),
('750e8400-e29b-41d4-a716-446655440005', 'Carlos Pereira', 'carlos.pereira@unb.br', '$2b$10$hash5', '12345678905', 'professor'),
('750e8400-e29b-41d4-a716-446655440006', 'Lucia Ferreira', 'lucia.ferreira@unb.br', '$2b$10$hash6', '12345678906', 'secretaria'),
('750e8400-e29b-41d4-a716-446655440007', 'Roberto Admin', 'admin@unb.br', '$2b$10$hash7', '12345678907', 'administrador');

-- Alunos
INSERT INTO alunos (id, usuario_id, matricula, curso_id, semestre_ingresso, ano_ingresso, coeficiente_rendimento) VALUES
('850e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', '2021001234', '550e8400-e29b-41d4-a716-446655440001', '2021.1', 2021, 7.5),
('850e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440002', '2021001235', '550e8400-e29b-41d4-a716-446655440001', '2021.1', 2021, 6.8),
('850e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440003', '2022001236', '550e8400-e29b-41d4-a716-446655440002', '2022.1', 2022, 8.2);

-- Professores
INSERT INTO professores (id, usuario_id, siape, titulacao, area_especializacao) VALUES
('950e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440004', '1234567', 'Doutora', 'Banco de Dados'),
('950e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440005', '1234568', 'Doutor', 'Engenharia de Software');

-- Período letivo atual
INSERT INTO periodos_letivos (id, ano, semestre, data_inicio, data_fim, data_inicio_matriculas, data_fim_matriculas, ativo) VALUES
('a50e8400-e29b-41d4-a716-446655440001', 2024, 2, '2024-08-01', '2024-12-15', '2024-07-15', '2024-07-30', true);

-- Turmas
INSERT INTO turmas (id, disciplina_id, professor_id, periodo_letivo_id, codigo, vagas, horario) VALUES
('b50e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', '950e8400-e29b-41d4-a716-446655440001', 'a50e8400-e29b-41d4-a716-446655440001', 'BDI301-T01', 40, '{"dia_semana": 2, "hora_inicio": "14:00", "hora_fim": "16:00", "sala": "AT-340"}'),
('b50e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440002', '950e8400-e29b-41d4-a716-446655440001', 'a50e8400-e29b-41d4-a716-446655440001', 'BDII401-T01', 35, '{"dia_semana": 4, "hora_inicio": "16:00", "hora_fim": "18:00", "sala": "AT-341"}'),
('b50e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440005', '950e8400-e29b-41d4-a716-446655440002', 'a50e8400-e29b-41d4-a716-446655440001', 'PI301-T01', 30, '{"dia_semana": 3, "hora_inicio": "08:00", "hora_fim": "10:00", "sala": "AT-342"}');

-- Matrículas
INSERT INTO matriculas (id, aluno_id, turma_id, status) VALUES
('c50e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001', 'b50e8400-e29b-41d4-a716-446655440001', 'matriculado'),
('c50e8400-e29b-41d4-a716-446655440002', '850e8400-e29b-41d4-a716-446655440002', 'b50e8400-e29b-41d4-a716-446655440001', 'matriculado'),
('c50e8400-e29b-41d4-a716-446655440003', '850e8400-e29b-41d4-a716-446655440001', 'b50e8400-e29b-41d4-a716-446655440003', 'matriculado');

-- Avaliações
INSERT INTO avaliacoes (id, matricula_id, nota_1, nota_2, nota_3, nota_final, frequencia, situacao) VALUES
('d50e8400-e29b-41d4-a716-446655440001', 'c50e8400-e29b-41d4-a716-446655440001', 8.5, 7.0, 8.0, 7.8, 95, 'aprovado'),
('d50e8400-e29b-41d4-a716-446655440002', 'c50e8400-e29b-41d4-a716-446655440002', 4.0, 3.5, 5.0, 4.2, 70, 'reprovado_nota'),
('d50e8400-e29b-41d4-a716-446655440003', 'c50e8400-e29b-41d4-a716-446655440003', 9.0, 8.5, 9.5, 9.0, 100, 'aprovado');

-- Histórico acadêmico
INSERT INTO historico_academico (aluno_id, disciplina_id, periodo_cursado, nota_final, frequencia, situacao, creditos_obtidos) VALUES
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440015', '2021.1', 8.0, 90, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440003', '2021.1', 7.5, 95, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440014', '2021.2', 6.5, 85, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440015', '2021.1', 4.0, 60, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440003', '2021.1', 7.0, 80, 'aprovado', 4);

-- Solicitações de recuperação
INSERT INTO solicitacoes_recuperacao (aluno_id, disciplina_id, periodo_solicitado, motivo, status) VALUES
('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440015', '2025.1', 'Problemas de saúde durante o período', 'pendente');

-- =============================================
-- DADOS PARA ANÁLISE DE GRAFOS
-- =============================================

-- Nós do grafo
INSERT INTO grafo_nodes (entity_type, entity_id, label, properties) VALUES
-- Cursos
('curso', '550e8400-e29b-41d4-a716-446655440001', 'Engenharia de Software', '{"codigo": "ES", "duracao": 8}'),
('curso', '550e8400-e29b-41d4-a716-446655440002', 'Ciência da Computação', '{"codigo": "CC", "duracao": 8}'),
-- Disciplinas
('disciplina', '650e8400-e29b-41d4-a716-446655440001', 'Banco de Dados I', '{"codigo": "BDI301", "creditos": 4, "semestre": 3}'),
('disciplina', '650e8400-e29b-41d4-a716-446655440002', 'Banco de Dados II', '{"codigo": "BDII401", "creditos": 4, "semestre": 4}'),
('disciplina', '650e8400-e29b-41d4-a716-446655440015', 'Algoritmos', '{"codigo": "ALG101", "creditos": 4, "semestre": 1}'),
('disciplina', '650e8400-e29b-41d4-a716-446655440014', 'Estruturas de Dados', '{"codigo": "ED201", "creditos": 4, "semestre": 2}'),
-- Alunos
('aluno', '850e8400-e29b-41d4-a716-446655440001', 'João Silva', '{"matricula": "2021001234", "cr": 7.5}'),
('aluno', '850e8400-e29b-41d4-a716-446655440002', 'Maria Santos', '{"matricula": "2021001235", "cr": 6.8}'),
-- Professores
('professor', '950e8400-e29b-41d4-a716-446655440001', 'Ana Costa', '{"siape": "1234567", "area": "Banco de Dados"}');

-- Arestas do grafo
INSERT INTO grafo_edges (source_node_id, target_node_id, relationship_type, weight, properties) 
SELECT 
    sn.id as source_node_id,
    tn.id as target_node_id,
    'prerequisito' as relationship_type,
    1.0 as weight,
    '{"tipo": "obrigatorio"}' as properties
FROM grafo_nodes sn, grafo_nodes tn
WHERE sn.entity_id = '650e8400-e29b-41d4-a716-446655440002' -- BD II
  AND tn.entity_id = '650e8400-e29b-41d4-a716-446655440001' -- BD I
  AND sn.entity_type = 'disciplina' 
  AND tn.entity_type = 'disciplina';

INSERT INTO grafo_edges (source_node_id, target_node_id, relationship_type, weight, properties) 
SELECT 
    sn.id as source_node_id,
    tn.id as target_node_id,
    'cursou' as relationship_type,
    7.5 as weight,
    '{"nota": 7.5, "situacao": "aprovado"}' as properties
FROM grafo_nodes sn, grafo_nodes tn
WHERE sn.entity_id = '850e8400-e29b-41d4-a716-446655440001' -- João
  AND tn.entity_id = '650e8400-e29b-41d4-a716-446655440015' -- Algoritmos
  AND sn.entity_type = 'aluno' 
  AND tn.entity_type = 'disciplina';

INSERT INTO grafo_edges (source_node_id, target_node_id, relationship_type, weight, properties) 
SELECT 
    sn.id as source_node_id,
    tn.id as target_node_id,
    'reprovou' as relationship_type,
    4.0 as weight,
    '{"nota": 4.0, "situacao": "reprovado_nota"}' as properties
FROM grafo_nodes sn, grafo_nodes tn
WHERE sn.entity_id = '850e8400-e29b-41d4-a716-446655440002' -- Maria
  AND tn.entity_id = '650e8400-e29b-41d4-a716-446655440015' -- Algoritmos
  AND sn.entity_type = 'aluno' 
  AND tn.entity_type = 'disciplina';