-- Additional data for comprehensive dashboard testing
-- This script adds more students, historical data, and failure records

-- Add more students
INSERT INTO usuarios (id, nome, email, senha_hash, cpf, perfil) VALUES
('750e8400-e29b-41d4-a716-446655440010', 'João Silva Santos', 'joao.santos@unb.br', '$2b$10$hash10', '12345678910', 'aluno'),
('750e8400-e29b-41d4-a716-446655440011', 'Maria Oliveira Pereira', 'maria.pereira@unb.br', '$2b$10$hash11', '12345678911', 'aluno'),
('750e8400-e29b-41d4-a716-446655440012', 'Carlos Souza Lima', 'carlos.lima@unb.br', '$2b$10$hash12', '12345678912', 'aluno'),
('750e8400-e29b-41d4-a716-446655440013', 'Lucas Gabriel Ferreira', 'lucas.ferreira@unb.br', '$2b$10$hash13', '12345678913', 'aluno'),
('750e8400-e29b-41d4-a716-446655440014', 'Ana Paula Silva', 'ana.silva@unb.br', '$2b$10$hash14', '12345678914', 'aluno'),
('750e8400-e29b-41d4-a716-446655440015', 'Rafael Costa Santos', 'rafael.santos@unb.br', '$2b$10$hash15', '12345678915', 'aluno'),
('750e8400-e29b-41d4-a716-446655440016', 'Juliana Alves', 'juliana.alves@unb.br', '$2b$10$hash16', '12345678916', 'aluno'),
('750e8400-e29b-41d4-a716-446655440017', 'Marcos Pereira', 'marcos.pereira@unb.br', '$2b$10$hash17', '12345678917', 'aluno'),
('750e8400-e29b-41d4-a716-446655440018', 'Fernanda Lima', 'fernanda.lima@unb.br', '$2b$10$hash18', '12345678918', 'aluno'),
('750e8400-e29b-41d4-a716-446655440019', 'Gabriel Oliveira', 'gabriel.oliveira@unb.br', '$2b$10$hash19', '12345678919', 'aluno');

-- Add corresponding student records
INSERT INTO alunos (id, usuario_id, matricula, curso_id, semestre_ingresso, ano_ingresso, coeficiente_rendimento, status) VALUES
('850e8400-e29b-41d4-a716-446655440010', '750e8400-e29b-41d4-a716-446655440010', '202110001', '550e8400-e29b-41d4-a716-446655440001', '2021.1', 2021, 6.2, 'ativo'),
('850e8400-e29b-41d4-a716-446655440011', '750e8400-e29b-41d4-a716-446655440011', '202110002', '550e8400-e29b-41d4-a716-446655440001', '2021.1', 2021, 7.8, 'ativo'),
('850e8400-e29b-41d4-a716-446655440012', '750e8400-e29b-41d4-a716-446655440012', '202110003', '550e8400-e29b-41d4-a716-446655440002', '2021.1', 2021, 4.1, 'ativo'),
('850e8400-e29b-41d4-a716-446655440013', '750e8400-e29b-41d4-a716-446655440013', '202110005', '550e8400-e29b-41d4-a716-446655440001', '2021.1', 2021, 6.8, 'ativo'),
('850e8400-e29b-41d4-a716-446655440014', '750e8400-e29b-41d4-a716-446655440014', '202210001', '550e8400-e29b-41d4-a716-446655440003', '2022.1', 2022, 8.1, 'ativo'),
('850e8400-e29b-41d4-a716-446655440015', '750e8400-e29b-41d4-a716-446655440015', '202210002', '550e8400-e29b-41d4-a716-446655440002', '2022.1', 2022, 7.3, 'ativo'),
('850e8400-e29b-41d4-a716-446655440016', '750e8400-e29b-41d4-a716-446655440016', '202210003', '550e8400-e29b-41d4-a716-446655440004', '2022.1', 2022, 6.9, 'ativo'),
('850e8400-e29b-41d4-a716-446655440017', '750e8400-e29b-41d4-a716-446655440017', '202310001', '550e8400-e29b-41d4-a716-446655440001', '2023.1', 2023, 7.5, 'ativo'),
('850e8400-e29b-41d4-a716-446655440018', '750e8400-e29b-41d4-a716-446655440018', '202310002', '550e8400-e29b-41d4-a716-446655440003', '2023.1', 2023, 8.4, 'ativo'),
('850e8400-e29b-41d4-a716-446655440019', '750e8400-e29b-41d4-a716-446655440019', '202310003', '550e8400-e29b-41d4-a716-446655440005', '2023.1', 2023, 7.1, 'ativo');

-- Add comprehensive historical academic data with failures
INSERT INTO historico_academico (aluno_id, disciplina_id, periodo_cursado, nota_final, frequencia, situacao, creditos_obtidos) VALUES
-- João Silva Santos (4 reprovações em BD II)
('850e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440002', '2022.1', 3.5, 70, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440002', '2022.2', 4.2, 65, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440002', '2023.1', 3.8, 60, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440002', '2023.2', 4.5, 75, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440015', '2021.1', 7.0, 85, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440001', '2022.1', 6.5, 80, 'aprovado', 4),

-- Carlos Souza Lima (5 reprovações - risco crítico)
('850e8400-e29b-41d4-a716-446655440012', '650e8400-e29b-41d4-a716-446655440015', '2021.1', 3.0, 50, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440012', '650e8400-e29b-41d4-a716-446655440015', '2021.2', 2.8, 45, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440012', '650e8400-e29b-41d4-a716-446655440014', '2022.1', 3.2, 55, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440012', '650e8400-e29b-41d4-a716-446655440001', '2022.2', 4.0, 60, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440012', '650e8400-e29b-41d4-a716-446655440002', '2023.1', 3.5, 50, 'reprovado_nota', 0),

-- Lucas Gabriel Ferreira (2 reprovações)
('850e8400-e29b-41d4-a716-446655440013', '650e8400-e29b-41d4-a716-446655440002', '2023.1', 4.2, 70, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440013', '650e8400-e29b-41d4-a716-446655440013', '2023.2', 3.8, 65, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440013', '650e8400-e29b-41d4-a716-446655440015', '2021.1', 8.0, 90, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440013', '650e8400-e29b-41d4-a716-446655440001', '2022.1', 7.5, 85, 'aprovado', 4),

-- Add more failure data for different subjects
('850e8400-e29b-41d4-a716-446655440014', '650e8400-e29b-41d4-a716-446655440015', '2022.1', 3.5, 60, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440015', '650e8400-e29b-41d4-a716-446655440015', '2022.1', 4.0, 65, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440016', '650e8400-e29b-41d4-a716-446655440001', '2022.2', 3.8, 70, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440017', '650e8400-e29b-41d4-a716-446655440002', '2023.2', 4.2, 75, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440018', '650e8400-e29b-41d4-a716-446655440014', '2023.1', 3.9, 68, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440019', '650e8400-e29b-41d4-a716-446655440015', '2023.1', 4.1, 72, 'reprovado_nota', 0),

-- Add successful completions to balance data
('850e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440015', '2021.1', 8.5, 95, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440014', '2021.2', 7.8, 90, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440001', '2022.1', 8.2, 92, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440002', '2022.2', 7.5, 88, 'aprovado', 4),

('850e8400-e29b-41d4-a716-446655440014', '650e8400-e29b-41d4-a716-446655440014', '2022.2', 8.0, 85, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440014', '650e8400-e29b-41d4-a716-446655440001', '2023.1', 7.9, 90, 'aprovado', 4),

('850e8400-e29b-41d4-a716-446655440015', '650e8400-e29b-41d4-a716-446655440014', '2022.2', 7.2, 82, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440015', '650e8400-e29b-41d4-a716-446655440001', '2023.1', 6.8, 78, 'aprovado', 4),

('850e8400-e29b-41d4-a716-446655440016', '650e8400-e29b-41d4-a716-446655440015', '2022.1', 7.5, 88, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440016', '650e8400-e29b-41d4-a716-446655440014', '2022.2', 6.9, 80, 'aprovado', 4),

('850e8400-e29b-41d4-a716-446655440017', '650e8400-e29b-41d4-a716-446655440015', '2023.1', 8.1, 92, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440017', '650e8400-e29b-41d4-a716-446655440014', '2023.2', 7.6, 87, 'aprovado', 4),

('850e8400-e29b-41d4-a716-446655440018', '650e8400-e29b-41d4-a716-446655440015', '2023.1', 8.8, 95, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440018', '650e8400-e29b-41d4-a716-446655440001', '2023.2', 8.3, 90, 'aprovado', 4),

('850e8400-e29b-41d4-a716-446655440019', '650e8400-e29b-41d4-a716-446655440014', '2023.2', 7.4, 85, 'aprovado', 4);

-- Add more recovery requests
INSERT INTO solicitacoes_recuperacao (aluno_id, disciplina_id, periodo_solicitado, motivo, status, data_submissao) VALUES
('850e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440002', '2024.1', 'Múltiplas reprovações em Banco de Dados II', 'deferida', '2023-12-10'),
('850e8400-e29b-41d4-a716-446655440012', '650e8400-e29b-41d4-a716-446655440015', '2024.1', 'Dificuldades em Cálculo I', 'indeferida', '2021-06-20'),
('850e8400-e29b-41d4-a716-446655440013', '650e8400-e29b-41d4-a716-446655440002', '2024.1', 'Problemas familiares durante o semestre', 'pendente', '2024-01-12'),
('850e8400-e29b-41d4-a716-446655440014', '650e8400-e29b-41d4-a716-446655440015', '2024.1', 'Problemas de saúde', 'aprovada_professor', '2024-01-15'),
('850e8400-e29b-41d4-a716-446655440015', '650e8400-e29b-41d4-a716-446655440001', '2024.1', 'Conflito de horários com trabalho', 'deferida', '2023-11-20'),
('850e8400-e29b-41d4-a716-446655440016', '650e8400-e29b-41d4-a716-446655440014', '2024.1', 'Dificuldades com a metodologia', 'indeferida', '2023-12-05'),
('850e8400-e29b-41d4-a716-446655440017', '650e8400-e29b-41d4-a716-446655440002', '2024.1', 'Problemas técnicos durante provas online', 'pendente', '2024-01-08'),
('850e8400-e29b-41d4-a716-446655440018', '650e8400-e29b-41d4-a716-446655440013', '2024.1', 'Mudança de cidade durante o semestre', 'aprovada_professor', '2024-01-10');

-- Update user credentials for easy login
UPDATE usuarios SET email = 'aluno' WHERE nome = 'João Silva Santos';
UPDATE usuarios SET email = 'professor' WHERE nome = 'Ana Costa';
UPDATE usuarios SET email = 'secretaria' WHERE nome = 'Lucia Ferreira';
-- Note: The 'secretaria' email now maps to 'administrador' profile in the application
UPDATE usuarios SET email = 'admin' WHERE nome = 'Roberto Admin';