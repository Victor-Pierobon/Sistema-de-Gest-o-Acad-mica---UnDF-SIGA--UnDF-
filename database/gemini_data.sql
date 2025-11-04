-- =============================================
-- SIGA-UnDF - Dados Simulados para Análise de Grafos
-- Gerado para demonstrar benefícios da análise acadêmica
-- =============================================

-- CASOS DE USO IMPLEMENTADOS:
-- 1. João Trabalhador - Aluno em risco por BD II
-- 2. Maria Excelente - Trajetória ideal  
-- 3. Carlos Desistente - Candidato à evasão
-- 4. BD II como disciplina gargalo crítica
-- =============================================

BEGIN;

-- Limpar dados existentes (se houver)
TRUNCATE TABLE historico_academico, avaliacoes, matriculas, turmas, 
               solicitacoes_recuperacao, alunos, professores, 
               prerequisitos, curso_disciplinas, disciplinas, 
               cursos, usuarios CASCADE;

-- ---------------------------------------------
-- CURSOS
-- ---------------------------------------------
INSERT INTO cursos (id, nome, codigo, descricao, duracao_semestres, carga_horaria_total) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Engenharia de Software', 'ES', 'Curso de Engenharia de Software', 8, 3200),
('550e8400-e29b-41d4-a716-446655440002', 'Ciência da Computação', 'CC', 'Curso de Ciência da Computação', 8, 3000),
('550e8400-e29b-41d4-a716-446655440003', 'Sistemas de Informação', 'SI', 'Curso de Sistemas de Informação', 8, 2800);

-- ---------------------------------------------
-- USUÁRIOS
-- ---------------------------------------------

-- Administradores
INSERT INTO usuarios (id, nome, email, senha_hash, cpf, perfil) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'Admin Geral', 'admin@unb.br', '$2b$10$hash', '00000000000', 'administrador');

-- Secretaria
INSERT INTO usuarios (id, nome, email, senha_hash, cpf, perfil) VALUES
('750e8400-e29b-41d4-a716-446655440002', 'Secretaria Acadêmica', 'secretaria@unb.br', '$2b$10$hash', '11100011100', 'secretaria'),
('750e8400-e29b-41d4-a716-446655440003', 'Lucia Ferreira', 'lucia.ferreira@unb.br', '$2b$10$hash', '11100011101', 'secretaria');

-- Professores
INSERT INTO usuarios (id, nome, email, senha_hash, cpf, perfil) VALUES
('750e8400-e29b-41d4-a716-446655440004', 'Ana Costa', 'ana.costa@unb.br', '$2b$10$hash', '11111111111', 'professor'),
('750e8400-e29b-41d4-a716-446655440005', 'Carlos Pereira', 'carlos.pereira@unb.br', '$2b$10$hash', '22222222222', 'professor'),
('750e8400-e29b-41d4-a716-446655440006', 'Ricardo Alves', 'ricardo.alves@unb.br', '$2b$10$hash', '33333333333', 'professor'),
('750e8400-e29b-41d4-a716-446655440007', 'Beatriz Lima', 'beatriz.lima@unb.br', '$2b$10$hash', '44444444444', 'professor');

-- Alunos (casos de uso principais)
INSERT INTO usuarios (id, nome, email, senha_hash, cpf, perfil) VALUES
('750e8400-e29b-41d4-a716-446655440010', 'João Silva Santos', 'joao.santos@unb.br', '$2b$10$hash', '12345678901', 'aluno'),
('750e8400-e29b-41d4-a716-446655440011', 'Maria Oliveira Pereira', 'maria.pereira@unb.br', '$2b$10$hash', '98765432109', 'aluno'),
('750e8400-e29b-41d4-a716-446655440012', 'Carlos Souza Lima', 'carlos.lima@unb.br', '$2b$10$hash', '11122233344', 'aluno');

-- Alunos adicionais
INSERT INTO usuarios (id, nome, email, senha_hash, cpf, perfil) VALUES
('750e8400-e29b-41d4-a716-446655440013', 'Ana Beatriz Costa', 'ana.costa2@unb.br', '$2b$10$hash', '22233344455', 'aluno'),
('750e8400-e29b-41d4-a716-446655440014', 'Lucas Gabriel Ferreira', 'lucas.ferreira@unb.br', '$2b$10$hash', '33344455566', 'aluno'),
('750e8400-e29b-41d4-a716-446655440015', 'Juliana Almeida Rocha', 'juliana.rocha@unb.br', '$2b$10$hash', '44455566677', 'aluno'),
('750e8400-e29b-41d4-a716-446655440016', 'Matheus Azevedo', 'matheus.azevedo@unb.br', '$2b$10$hash', '55566677788', 'aluno'),
('750e8400-e29b-41d4-a716-446655440017', 'Larissa Barbosa', 'larissa.barbosa@unb.br', '$2b$10$hash', '66677788899', 'aluno'),
('750e8400-e29b-41d4-a716-446655440018', 'Rafael Cardoso', 'rafael.cardoso@unb.br', '$2b$10$hash', '77788899900', 'aluno'),
('750e8400-e29b-41d4-a716-446655440019', 'Camila Dias', 'camila.dias@unb.br', '$2b$10$hash', '88899900011', 'aluno'),
('750e8400-e29b-41d4-a716-446655440020', 'Fernando Esteves', 'fernando.esteves@unb.br', '$2b$10$hash', '99900011122', 'aluno');

-- ---------------------------------------------
-- ALUNOS
-- ---------------------------------------------
INSERT INTO alunos (id, usuario_id, matricula, curso_id, semestre_ingresso, ano_ingresso, status, coeficiente_rendimento) VALUES
('850e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440010', '202110001', '550e8400-e29b-41d4-a716-446655440001', '2021.1', 2021, 'ativo', 6.2),
('850e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440011', '202110002', '550e8400-e29b-41d4-a716-446655440001', '2021.1', 2021, 'ativo', 9.1),
('850e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440012', '202110003', '550e8400-e29b-41d4-a716-446655440001', '2021.1', 2021, 'trancado', 4.1),
('850e8400-e29b-41d4-a716-446655440004', '750e8400-e29b-41d4-a716-446655440013', '202110004', '550e8400-e29b-41d4-a716-446655440001', '2021.1', 2021, 'ativo', 7.5),
('850e8400-e29b-41d4-a716-446655440005', '750e8400-e29b-41d4-a716-446655440014', '202110005', '550e8400-e29b-41d4-a716-446655440001', '2021.1', 2021, 'ativo', 6.8),
('850e8400-e29b-41d4-a716-446655440006', '750e8400-e29b-41d4-a716-446655440015', '202120006', '550e8400-e29b-41d4-a716-446655440001', '2021.2', 2021, 'ativo', 8.0),
('850e8400-e29b-41d4-a716-446655440007', '750e8400-e29b-41d4-a716-446655440016', '202120007', '550e8400-e29b-41d4-a716-446655440001', '2021.2', 2021, 'ativo', 7.2),
('850e8400-e29b-41d4-a716-446655440008', '750e8400-e29b-41d4-a716-446655440017', '202210008', '550e8400-e29b-41d4-a716-446655440002', '2022.1', 2022, 'ativo', 5.9),
('850e8400-e29b-41d4-a716-446655440009', '750e8400-e29b-41d4-a716-446655440018', '202210009', '550e8400-e29b-41d4-a716-446655440002', '2022.1', 2022, 'ativo', 8.3),
('850e8400-e29b-41d4-a716-446655440010', '750e8400-e29b-41d4-a716-446655440019', '202210010', '550e8400-e29b-41d4-a716-446655440002', '2022.1', 2022, 'ativo', 7.8);

-- ---------------------------------------------
-- PROFESSORES
-- ---------------------------------------------
INSERT INTO professores (id, usuario_id, siape, titulacao, area_especializacao) VALUES
('950e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440004', '1234567', 'Doutora', 'Banco de Dados'),
('950e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440005', '1234568', 'Doutor', 'Engenharia de Software'),
('950e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440006', '1234569', 'Doutor', 'Algoritmos'),
('950e8400-e29b-41d4-a716-446655440004', '750e8400-e29b-41d4-a716-446655440007', '1234570', 'Doutora', 'Matemática');

-- ---------------------------------------------
-- DISCIPLINAS (Foco nas críticas)
-- ---------------------------------------------
INSERT INTO disciplinas (id, nome, codigo, carga_horaria, creditos, semestre_recomendado) VALUES
-- Básicas (1º Sem)
('650e8400-e29b-41d4-a716-446655440001', 'Programação I', 'PROG101', 80, 4, 1),
('650e8400-e29b-41d4-a716-446655440002', 'Cálculo I', 'CALC101', 80, 4, 1),
('650e8400-e29b-41d4-a716-446655440003', 'Algoritmos', 'ALG101', 80, 4, 1),

-- 2º Sem
('650e8400-e29b-41d4-a716-446655440004', 'Estruturas de Dados', 'ED201', 80, 4, 2),
('650e8400-e29b-41d4-a716-446655440005', 'Programação Orientada a Objetos', 'POO202', 80, 4, 2),
('650e8400-e29b-41d4-a716-446655440006', 'Banco de Dados I', 'BD201', 80, 4, 2),

-- 3º Sem
('650e8400-e29b-41d4-a716-446655440007', 'Projeto Integrador III', 'PI301', 80, 4, 3),

-- 4º Sem (GARGALO)
('650e8400-e29b-41d4-a716-446655440008', 'Banco de Dados II', 'BDII401', 80, 4, 4),
('650e8400-e29b-41d4-a716-446655440009', 'Projeto Integrador IV', 'PI401', 80, 4, 4),

-- 5º Sem (Dependentes do Gargalo)
('650e8400-e29b-41d4-a716-446655440010', 'Inteligência Artificial', 'IA501', 60, 3, 5),
('650e8400-e29b-41d4-a716-446655440011', 'Segurança da Informação', 'SEG502', 60, 3, 5),
('650e8400-e29b-41d4-a716-446655440012', 'Projeto Integrador V', 'PI501', 80, 4, 5),

-- Fim de curso
('650e8400-e29b-41d4-a716-446655440013', 'Trabalho de Conclusão de Curso I', 'TCC601', 60, 3, 6);

-- ---------------------------------------------
-- PRÉ-REQUISITOS (Criando o Efeito Dominó)
-- ---------------------------------------------
INSERT INTO prerequisitos (disciplina_id, prerequisito_id, tipo) VALUES
-- Cadeia básica
('650e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440001', 'obrigatorio'), -- Prog I → Algoritmos
('650e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440003', 'obrigatorio'), -- Algoritmos → Estruturas
('650e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440004', 'obrigatorio'), -- Estruturas → POO

-- *** A CADEIA CRÍTICA DO GARGALO ***
('650e8400-e29b-41d4-a716-446655440008', '650e8400-e29b-41d4-a716-446655440006', 'obrigatorio'), -- BD I → BD II (Gargalo!)
('650e8400-e29b-41d4-a716-446655440009', '650e8400-e29b-41d4-a716-446655440008', 'obrigatorio'), -- BD II → PI IV
('650e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440008', 'obrigatorio'), -- BD II → IA
('650e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440008', 'obrigatorio'), -- BD II → Segurança
('650e8400-e29b-41d4-a716-446655440012', '650e8400-e29b-41d4-a716-446655440009', 'obrigatorio'), -- PI IV → PI V
('650e8400-e29b-41d4-a716-446655440013', '650e8400-e29b-41d4-a716-446655440012', 'obrigatorio'); -- PI V → TCC I

-- ---------------------------------------------
-- HISTÓRICO ACADÊMICO (Casos de Uso)
-- ---------------------------------------------

-- Caso 1: Maria Excelente (Baixo Risco)
INSERT INTO historico_academico (aluno_id, disciplina_id, periodo_cursado, nota_final, frequencia, situacao, creditos_obtidos) VALUES
('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', '2021.1', 9.5, 100, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440002', '2021.1', 8.8, 98, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440003', '2021.1', 9.2, 100, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440004', '2021.2', 9.0, 100, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440006', '2021.2', 9.8, 100, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440005', '2022.1', 8.5, 95, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440007', '2022.1', 9.1, 100, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440008', '2022.2', 8.8, 98, 'aprovado', 4), -- Passou no gargalo
('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440009', '2023.1', 9.3, 100, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440010', '2023.1', 9.0, 100, 'aprovado', 3),
('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440011', '2023.1', 8.7, 95, 'aprovado', 3),
('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440012', '2023.2', 9.5, 100, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440013', '2024.1', 10.0, 100, 'aprovado', 3); -- Formando no tempo

-- Caso 2: Carlos Desistente (Risco Crítico)
INSERT INTO historico_academico (aluno_id, disciplina_id, periodo_cursado, nota_final, frequencia, situacao, creditos_obtidos) VALUES
('850e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440001', '2021.1', 5.5, 80, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440002', '2021.1', 3.2, 60, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440003', '2021.1', 2.1, 45, 'reprovado_frequencia', 0),
('850e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440002', '2021.2', 4.0, 70, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440003', '2021.2', 4.8, 76, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440006', '2022.1', 1.5, 30, 'reprovado_frequencia', 0);
-- *** Aluno parou de se matricular em 2022.2 ***

-- Caso 3: João Trabalhador (Alto Risco / Efeito Dominó)
INSERT INTO historico_academico (aluno_id, disciplina_id, periodo_cursado, nota_final, frequencia, situacao, creditos_obtidos) VALUES
-- 1º Semestre
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', '2021.1', 7.0, 90, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440002', '2021.1', 6.5, 85, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440003', '2021.1', 5.8, 80, 'reprovado_nota', 0),
-- 2º Semestre
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440003', '2021.2', 7.2, 90, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440006', '2021.2', 8.0, 95, 'aprovado', 4),
-- 3º Semestre
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440004', '2022.1', 7.5, 90, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440005', '2022.1', 6.8, 85, 'aprovado', 4),

-- *** O GARGALO: BANCO DE DADOS II ***
-- Tentativa 1 (Reprovado)
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440008', '2022.2', 3.5, 85, 'reprovado_nota', 0),
-- Tentativa 2 (Reprovado)
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440008', '2023.1', 4.2, 90, 'reprovado_nota', 0),
-- Tentativa 3 (Reprovado)
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440008', '2023.2', 5.8, 95, 'reprovado_nota', 0),
-- Tentativa 4 (Aprovado!)
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440008', '2024.1', 7.5, 98, 'aprovado', 4),

-- *** FLUXO DESTRAVADO COM ATRASO ***
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440009', '2024.2', 7.8, 90, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440010', '2024.2', 8.1, 95, 'aprovado', 3);

-- Dados adicionais para estatísticas
INSERT INTO historico_academico (aluno_id, disciplina_id, periodo_cursado, nota_final, frequencia, situacao, creditos_obtidos) VALUES
-- Algoritmos - turma 2021.2 (45% reprovação)
('850e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440003', '2021.2', 8.0, 90, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440003', '2021.2', 4.1, 85, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440006', '650e8400-e29b-41d4-a716-446655440003', '2021.2', 9.0, 100, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440007', '650e8400-e29b-41d4-a716-446655440003', '2021.2', 3.5, 60, 'reprovado_frequencia', 0),
('850e8400-e29b-41d4-a716-446655440008', '650e8400-e29b-41d4-a716-446655440003', '2021.2', 7.7, 90, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440009', '650e8400-e29b-41d4-a716-446655440003', '2021.2', 2.0, 50, 'reprovado_frequencia', 0),

-- BD II - turma 2023.1 (48% reprovação - GARGALO)
('850e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440008', '2023.1', 7.5, 90, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440008', '2023.1', 4.5, 85, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440006', '650e8400-e29b-41d4-a716-446655440008', '2023.1', 8.0, 100, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440007', '650e8400-e29b-41d4-a716-446655440008', '2023.1', 3.0, 90, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440008', '650e8400-e29b-41d4-a716-446655440008', '2023.1', 2.2, 40, 'reprovado_frequencia', 0),
('850e8400-e29b-41d4-a716-446655440009', '650e8400-e29b-41d4-a716-446655440008', '2023.1', 5.9, 80, 'reprovado_nota', 0);

-- ---------------------------------------------
-- SOLICITAÇÕES DE RECUPERAÇÃO
-- ---------------------------------------------
INSERT INTO solicitacoes_recuperacao (aluno_id, disciplina_id, periodo_solicitado, motivo, status, parecer_professor, parecer_secretaria) VALUES
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440008', '2023.1', 'Dificuldades com conceitos avançados de normalização e performance.', 'indeferida', 'Aluno não demonstrou esforço suficiente', 'Mantido parecer do professor'),
('850e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440008', '2023.2', 'Fiquei com 5.8, preciso de 0.2 para cursar PI IV.', 'indeferida', 'Nota está correta', 'Indeferido'),
('850e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440002', '2021.1', 'Não entendi a matéria, professor muito rápido.', 'indeferida', 'Aluno faltou muito às aulas', 'Indeferido'),
('850e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440008', '2023.1', 'A prova foi muito além do que foi dado em sala.', 'deferida', 'Procedente, erro na elaboração da prova', 'Deferido'),
('850e8400-e29b-41d4-a716-446655440007', '650e8400-e29b-41d4-a716-446655440008', '2023.1', 'Tive problemas de saúde e perdi muitas aulas.', 'deferida', 'Documentação médica apresentada', 'Deferido com documentação');

COMMIT;

-- =============================================
-- CONSULTAS DE VERIFICAÇÃO
-- =============================================

-- Verificar disciplinas críticas
SELECT 
    d.nome,
    d.codigo,
    COUNT(ha.id) as total_cursaram,
    COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) as reprovacoes,
    ROUND(
        (COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
        NULLIF(COUNT(ha.id), 0), 2
    ) as taxa_reprovacao
FROM disciplinas d
LEFT JOIN historico_academico ha ON d.id = ha.disciplina_id
GROUP BY d.id, d.nome, d.codigo
HAVING COUNT(ha.id) > 0
ORDER BY taxa_reprovacao DESC;

-- Verificar alunos em risco
SELECT 
    u.nome,
    a.matricula,
    COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) as reprovacoes,
    a.coeficiente_rendimento as cr,
    a.status
FROM alunos a
JOIN usuarios u ON a.usuario_id = u.id
LEFT JOIN historico_academico ha ON a.id = ha.aluno_id
GROUP BY a.id, u.nome, a.matricula, a.coeficiente_rendimento, a.status
ORDER BY reprovacoes DESC, cr ASC;