-- Expansão de dados para análise de grafos mais robusta
-- Adicionar mais disciplinas e relacionamentos

-- Mais disciplinas
INSERT INTO disciplinas (id, nome, codigo, carga_horaria, creditos, semestre_recomendado) VALUES
('650e8400-e29b-41d4-a716-446655440021', 'Cálculo I', 'CALC101', 80, 4, 1),
('650e8400-e29b-41d4-a716-446655440022', 'Cálculo II', 'CALC201', 80, 4, 2),
('650e8400-e29b-41d4-a716-446655440023', 'Álgebra Linear', 'AL201', 60, 3, 2),
('650e8400-e29b-41d4-a716-446655440024', 'Física I', 'FIS101', 80, 4, 1),
('650e8400-e29b-41d4-a716-446655440025', 'Física II', 'FIS201', 80, 4, 2),
('650e8400-e29b-41d4-a716-446655440026', 'Estatística', 'EST301', 60, 3, 3),
('650e8400-e29b-41d4-a716-446655440027', 'Inteligência Artificial', 'IA501', 80, 4, 5),
('650e8400-e29b-41d4-a716-446655440028', 'Machine Learning', 'ML601', 60, 3, 6),
('650e8400-e29b-41d4-a716-446655440029', 'Compiladores', 'COMP501', 80, 4, 5),
('650e8400-e29b-41d4-a716-446655440030', 'Arquitetura de Computadores', 'ARQ301', 80, 4, 3),
('650e8400-e29b-41d4-a716-446655440031', 'Teoria da Computação', 'TC401', 60, 3, 4),
('650e8400-e29b-41d4-a716-446655440032', 'Computação Gráfica', 'CG501', 60, 3, 5),
('650e8400-e29b-41d4-a716-446655440033', 'Desenvolvimento Web', 'WEB401', 80, 4, 4),
('650e8400-e29b-41d4-a716-446655440034', 'Mobile Development', 'MOB501', 60, 3, 5),
('650e8400-e29b-41d4-a716-446655440035', 'DevOps', 'DEVOPS601', 60, 3, 6);

-- Mais pré-requisitos para criar uma rede mais complexa
INSERT INTO prerequisitos (disciplina_id, prerequisito_id, tipo) VALUES
-- Cálculo
('650e8400-e29b-41d4-a716-446655440022', '650e8400-e29b-41d4-a716-446655440021', 'obrigatorio'), -- Calc II -> Calc I
('650e8400-e29b-41d4-a716-446655440023', '650e8400-e29b-41d4-a716-446655440021', 'obrigatorio'), -- AL -> Calc I
('650e8400-e29b-41d4-a716-446655440026', '650e8400-e29b-41d4-a716-446655440022', 'obrigatorio'), -- EST -> Calc II

-- Física
('650e8400-e29b-41d4-a716-446655440025', '650e8400-e29b-41d4-a716-446655440024', 'obrigatorio'), -- Fis II -> Fis I
('650e8400-e29b-41d4-a716-446655440024', '650e8400-e29b-41d4-a716-446655440021', 'obrigatorio'), -- Fis I -> Calc I

-- Arquitetura e Sistemas
('650e8400-e29b-41d4-a716-446655440030', '650e8400-e29b-41d4-a716-446655440016', 'obrigatorio'), -- ARQ -> POO
('650e8400-e29b-41d4-a716-446655440018', '650e8400-e29b-41d4-a716-446655440030', 'recomendado'), -- SO -> ARQ

-- Teoria e Compiladores
('650e8400-e29b-41d4-a716-446655440031', '650e8400-e29b-41d4-a716-446655440014', 'obrigatorio'), -- TC -> ED
('650e8400-e29b-41d4-a716-446655440029', '650e8400-e29b-41d4-a716-446655440031', 'obrigatorio'), -- COMP -> TC

-- IA e ML
('650e8400-e29b-41d4-a716-446655440027', '650e8400-e29b-41d4-a716-446655440026', 'obrigatorio'), -- IA -> EST
('650e8400-e29b-41d4-a716-446655440027', '650e8400-e29b-41d4-a716-446655440016', 'obrigatorio'), -- IA -> POO
('650e8400-e29b-41d4-a716-446655440028', '650e8400-e29b-41d4-a716-446655440027', 'obrigatorio'), -- ML -> IA

-- Desenvolvimento
('650e8400-e29b-41d4-a716-446655440033', '650e8400-e29b-41d4-a716-446655440001', 'obrigatorio'), -- WEB -> BD I
('650e8400-e29b-41d4-a716-446655440033', '650e8400-e29b-41d4-a716-446655440016', 'obrigatorio'), -- WEB -> POO
('650e8400-e29b-41d4-a716-446655440034', '650e8400-e29b-41d4-a716-446655440033', 'obrigatorio'), -- MOB -> WEB
('650e8400-e29b-41d4-a716-446655440035', '650e8400-e29b-41d4-a716-446655440034', 'obrigatorio'), -- DEVOPS -> MOB

-- Computação Gráfica
('650e8400-e29b-41d4-a716-446655440032', '650e8400-e29b-41d4-a716-446655440023', 'obrigatorio'), -- CG -> AL
('650e8400-e29b-41d4-a716-446655440032', '650e8400-e29b-41d4-a716-446655440016', 'obrigatorio'); -- CG -> POO

-- Adicionar mais histórico acadêmico para análise
INSERT INTO historico_academico (aluno_id, disciplina_id, periodo_cursado, nota_final, frequencia, situacao, creditos_obtidos) VALUES
-- Mais dados para João Silva Santos
('850e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440021', '2021.1', 7.5, 90, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440024', '2021.1', 6.8, 85, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440022', '2021.2', 8.2, 95, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440023', '2021.2', 7.0, 88, 'aprovado', 3),
('850e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440025', '2022.1', 6.5, 82, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440030', '2022.2', 7.8, 92, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440026', '2023.1', 8.5, 95, 'aprovado', 3),
('850e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440033', '2023.2', 9.0, 98, 'aprovado', 4),

-- Dados para Carlos Souza Lima (aluno em risco)
('850e8400-e29b-41d4-a716-446655440012', '650e8400-e29b-41d4-a716-446655440021', '2021.1', 4.5, 70, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440012', '650e8400-e29b-41d4-a716-446655440021', '2021.2', 5.2, 75, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440012', '650e8400-e29b-41d4-a716-446655440024', '2021.2', 3.8, 65, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440012', '650e8400-e29b-41d4-a716-446655440024', '2022.1', 6.0, 80, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440012', '650e8400-e29b-41d4-a716-446655440022', '2022.2', 4.2, 68, 'reprovado_nota', 0),
('850e8400-e29b-41d4-a716-446655440012', '650e8400-e29b-41d4-a716-446655440023', '2022.2', 3.5, 60, 'reprovado_nota', 0),

-- Dados para Maria Oliveira Pereira (boa aluna)
('850e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440021', '2021.1', 9.2, 98, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440024', '2021.1', 8.8, 95, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440022', '2021.2', 9.5, 100, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440023', '2021.2', 9.0, 98, 'aprovado', 3),
('850e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440025', '2022.1', 8.7, 95, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440030', '2022.2', 9.3, 100, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440026', '2023.1', 9.8, 100, 'aprovado', 3),
('850e8400-e29b-41d4-a716-446655440011', '650e8400-e29b-41d4-a716-446655440027', '2023.2', 9.5, 98, 'aprovado', 4),

-- Dados para Lucas Gabriel Ferreira
('850e8400-e29b-41d4-a716-446655440013', '650e8400-e29b-41d4-a716-446655440021', '2021.1', 7.8, 88, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440013', '650e8400-e29b-41d4-a716-446655440024', '2021.1', 7.2, 85, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440013', '650e8400-e29b-41d4-a716-446655440022', '2021.2', 6.8, 82, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440013', '650e8400-e29b-41d4-a716-446655440030', '2022.2', 8.0, 90, 'aprovado', 4),
('850e8400-e29b-41d4-a716-446655440013', '650e8400-e29b-41d4-a716-446655440033', '2023.1', 8.5, 92, 'aprovado', 4);

-- Atualizar coeficientes de rendimento baseado no histórico
UPDATE alunos SET coeficiente_rendimento = 7.8 WHERE id = '850e8400-e29b-41d4-a716-446655440010';
UPDATE alunos SET coeficiente_rendimento = 4.2 WHERE id = '850e8400-e29b-41d4-a716-446655440012';
UPDATE alunos SET coeficiente_rendimento = 9.1 WHERE id = '850e8400-e29b-41d4-a716-446655440011';
UPDATE alunos SET coeficiente_rendimento = 7.5 WHERE id = '850e8400-e29b-41d4-a716-446655440013';