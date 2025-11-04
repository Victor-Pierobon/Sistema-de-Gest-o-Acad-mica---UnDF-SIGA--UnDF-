# 🎯 PROMPT FINAL PARA GEMINI - SIGA-UnDF

## 📋 MISSÃO
Gere dados simulados realistas para o Sistema Integrado de Gestão Acadêmica da UnDF (SIGA-UnDF) que demonstrem claramente os benefícios da análise por grafos na gestão universitária.

## 🏗️ ESTRUTURA DO BANCO
Baseado no schema PostgreSQL já criado com tabelas: usuarios, cursos, disciplinas, alunos, professores, historico_academico, prerequisitos, solicitacoes_recuperacao, etc.

## 📊 DADOS A GERAR

### 1. USUÁRIOS (500 registros)
```sql
-- Distribuição:
-- 400 alunos (nomes brasileiros realistas)
-- 80 professores (com especialização)
-- 15 secretaria
-- 5 administradores

INSERT INTO usuarios (id, nome, email, senha_hash, cpf, perfil) VALUES
('uuid1', 'João Silva Santos', 'joao.silva@unb.br', '$2b$10$hash', '12345678901', 'aluno'),
-- Continue com padrão brasileiro realista...
```

### 2. DISCIPLINAS CRÍTICAS (foque nestas)
```sql
-- DISCIPLINAS GARGALO (alta reprovação + muitos dependentes):
('uuid_bd2', 'Banco de Dados II', 'BDII401', 80, 4, 4), -- 48% reprovação
('uuid_alg', 'Algoritmos', 'ALG101', 80, 4, 1),        -- 45% reprovação  
('uuid_pi5', 'Projeto Integrador V', 'PI501', 80, 4, 5), -- 42% reprovação
('uuid_ia', 'Inteligência Artificial', 'IA501', 60, 3, 5), -- 40% reprovação

-- DISCIPLINAS BÁSICAS (fundação):
('uuid_prog1', 'Programação I', 'PROG101', 80, 4, 1),
('uuid_calc1', 'Cálculo I', 'CALC101', 80, 4, 1),
('uuid_ed', 'Estruturas de Dados', 'ED201', 80, 4, 2),
```

### 3. PRÉ-REQUISITOS (crie dependências críticas)
```sql
-- Cadeia crítica que gera gargalos:
('uuid_alg', 'uuid_ed'),      -- Algoritmos → Estruturas
('uuid_ed', 'uuid_poo'),      -- Estruturas → POO  
('uuid_bd1', 'uuid_bd2'),     -- BD I → BD II (GARGALO!)
('uuid_bd2', 'uuid_pi4'),     -- BD II → PI IV
('uuid_bd2', 'uuid_ia'),      -- BD II → IA
('uuid_bd2', 'uuid_seg'),     -- BD II → Segurança
```

### 4. HISTÓRICO ACADÊMICO (2000+ registros)
**PADRÕES ESPECÍFICOS A SIMULAR:**

#### Aluno Tipo A - "João Trabalhador" (Alto Risco)
```sql
-- Reprovou BD II 3 vezes, atrasando formatura
('uuid_joao', 'uuid_bd2', '2022.1', 3.5, 85, 'reprovado_nota'),
('uuid_joao', 'uuid_bd2', '2022.2', 4.2, 90, 'reprovado_nota'), 
('uuid_joao', 'uuid_bd2', '2023.1', 5.8, 95, 'reprovado_nota'),
('uuid_joao', 'uuid_bd2', '2023.2', 7.5, 98, 'aprovado'), -- Finalmente passou
```

#### Aluno Tipo B - "Maria Excelente" (Baixo Risco)
```sql
-- Trajetória perfeita, CR alto
('uuid_maria', 'uuid_alg', '2021.1', 9.2, 100, 'aprovado'),
('uuid_maria', 'uuid_ed', '2021.2', 8.8, 98, 'aprovado'),
('uuid_maria', 'uuid_bd1', '2022.1', 9.5, 100, 'aprovado'),
```

#### Aluno Tipo C - "Carlos Desistente" (Crítico)
```sql
-- Múltiplas reprovações, candidato à evasão
('uuid_carlos', 'uuid_alg', '2021.1', 2.1, 45, 'reprovado_frequencia'),
('uuid_carlos', 'uuid_calc1', '2021.1', 3.2, 60, 'reprovado_nota'),
('uuid_carlos', 'uuid_alg', '2021.2', 4.8, 70, 'reprovado_nota'),
-- Parou de se matricular em 2024...
```

### 5. DISTRIBUIÇÃO DE NOTAS (siga este padrão)
- **Disciplinas Básicas (ALG, PROG1):** 25% reprovação
- **Disciplinas Críticas (BD II, IA):** 45-48% reprovação  
- **Disciplinas Normais:** 15-20% reprovação
- **Projetos (PI III, IV, V):** 35-40% reprovação

### 6. SOLICITAÇÕES DE RECUPERAÇÃO (50 registros)
```sql
-- Concentre nas disciplinas críticas:
('uuid_sol1', 'uuid_joao', 'uuid_bd2', '2023.2', 'Dificuldades com conceitos avançados de normalização', 'deferida'),
('uuid_sol2', 'uuid_ana', 'uuid_alg', '2024.1', 'Primeira experiência com programação', 'pendente'),
```

## 🎯 CENÁRIOS PARA DEMONSTRAÇÃO

### Cenário 1: Efeito Dominó
Mostre como reprovar BD II atrasa 5+ disciplinas:
```
BD II (reprovação) → PI IV (não pode cursar) → PI V (atraso) → TCC (atraso) → Formatura (+2 semestres)
```

### Cenário 2: Aluno em Risco
João tem 4 reprovações, CR 5.2, não se matricula há 1 semestre → RISCO CRÍTICO

### Cenário 3: Disciplina Gargalo  
BD II: 48% reprovação + pré-requisito de 6 disciplinas = GARGALO CRÍTICO

## 📈 MÉTRICAS ESPERADAS

Após inserir os dados, estas consultas devem retornar resultados interessantes:

```sql
-- Top 5 disciplinas críticas
SELECT nome, taxa_reprovacao, disciplinas_dependentes 
FROM identify_critical_disciplines() 
LIMIT 5;

-- Alunos em risco crítico  
SELECT nome, reprovacoes, cr, nivel_risco
FROM analyze_student_risk()
WHERE nivel_risco = 'CRÍTICO';

-- Impacto de BD II no fluxo
SELECT COUNT(*) as alunos_atrasados
FROM alunos a
JOIN historico_academico ha ON a.id = ha.aluno_id  
WHERE ha.disciplina_id = 'uuid_bd2' 
AND ha.situacao LIKE 'reprovado%';
```

## 🚀 FORMATO DE ENTREGA

Gere um arquivo SQL com:

1. **Cabeçalho explicativo**
2. **INSERTs organizados por tabela**
3. **Comentários explicando padrões**
4. **Casos de uso destacados**

```sql
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

-- USUÁRIOS (500 registros)
INSERT INTO usuarios (id, nome, email, senha_hash, cpf, perfil) VALUES
-- ... dados aqui

-- DISCIPLINAS (60 registros com foco nas críticas)  
INSERT INTO disciplinas (id, nome, codigo, carga_horaria, creditos, semestre_recomendado) VALUES
-- ... dados aqui

-- Continue para todas as tabelas...

COMMIT;
```

## ✅ CHECKLIST FINAL

- [ ] 500 usuários com nomes brasileiros
- [ ] 60+ disciplinas com códigos realistas  
- [ ] Pré-requisitos que criem gargalos
- [ ] 2000+ históricos com padrões claros
- [ ] 3 perfis de aluno distintos
- [ ] BD II como disciplina crítica principal
- [ ] 50+ solicitações de recuperação
- [ ] Dados de 2021-2024
- [ ] Comentários explicativos
- [ ] Casos de uso documentados

**META FINAL:** Criar um dataset que faça administradores universitários pensarem: "Nossa, precisamos urgentemente de análise por grafos para entender esses padrões!"