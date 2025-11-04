# SIGA-UnDF Database

Sistema de banco de dados completo para o Sistema Integrado de Gestão Acadêmica da UnDF, estruturado para análise por grafos.

## 📋 Estrutura do Banco

### Tabelas Principais

#### Entidades Base
- **usuarios**: Dados básicos de todos os usuários do sistema
- **cursos**: Cursos oferecidos pela instituição
- **disciplinas**: Disciplinas disponíveis
- **alunos**: Informações específicas dos estudantes
- **professores**: Dados dos docentes
- **periodos_letivos**: Períodos acadêmicos

#### Relacionamentos Acadêmicos
- **curso_disciplinas**: Matriz curricular dos cursos
- **prerequisitos**: Dependências entre disciplinas
- **turmas**: Ofertas de disciplinas por período
- **matriculas**: Inscrições dos alunos em turmas
- **avaliacoes**: Notas e frequência
- **presencas**: Controle detalhado de presença
- **historico_academico**: Histórico consolidado

#### Processos Administrativos
- **solicitacoes_recuperacao**: Pedidos de recuperação de disciplinas

#### Análise de Grafos
- **grafo_nodes**: Nós do grafo (entidades)
- **grafo_edges**: Arestas do grafo (relacionamentos)

## 🔗 Relacionamentos para Análise de Grafos

### Tipos de Nós
- **aluno**: Estudantes do sistema
- **disciplina**: Matérias oferecidas
- **curso**: Cursos disponíveis
- **professor**: Docentes
- **turma**: Ofertas específicas

### Tipos de Arestas
- **prerequisito**: Dependência entre disciplinas
- **cursou**: Aluno completou disciplina (aprovado)
- **reprovou**: Aluno não completou disciplina
- **matriculado**: Aluno inscrito em disciplina atual
- **leciona**: Professor ministra disciplina
- **pertence**: Aluno pertence a curso

## 📊 Consultas de Análise

### 1. Análise de Pré-requisitos
```sql
-- Encontra cadeias de pré-requisitos
SELECT * FROM calculate_betweenness_centrality();
```

### 2. Identificação de Disciplinas Críticas
```sql
-- Disciplinas com alta taxa de reprovação e impacto
SELECT * FROM identify_critical_disciplines();
```

### 3. Análise de Trajetória de Alunos
```sql
-- Progresso acadêmico de um aluno específico
SELECT * FROM analyze_student_trajectory('aluno_id');
```

### 4. Detecção de Anomalias
```sql
-- Identifica problemas no fluxo curricular
SELECT * FROM detect_curriculum_anomalies();
```

## 🚀 Como Usar

### 1. Criação do Banco
```bash
# PostgreSQL
psql -U postgres -d siga_undf -f schema.sql
```

### 2. População com Dados Iniciais
```bash
psql -U postgres -d siga_undf -f seed_data.sql
```

### 3. Instalação das Funções
```bash
psql -U postgres -d siga_undf -f graph_functions.sql
```

### 4. Execução de Consultas
```bash
psql -U postgres -d siga_undf -f graph_queries.sql
```

## 📈 Métricas Disponíveis

### Métricas de Disciplinas
- Taxa de reprovação
- Centralidade de intermediação
- Número de dependentes
- Score de criticidade

### Métricas de Alunos
- Coeficiente de rendimento
- Taxa de aprovação
- Disciplinas em atraso
- Risco de evasão

### Métricas de Cursos
- Performance geral
- Disciplinas gargalo
- Fluxo curricular
- Tempo médio de formação

## 🔍 Análises Avançadas

### Centralidade de Intermediação
Identifica disciplinas que são "pontes" importantes no fluxo curricular:
```sql
SELECT * FROM calculate_betweenness_centrality() LIMIT 10;
```

### Componentes Conectados
Agrupa disciplinas relacionadas:
```sql
SELECT * FROM find_strongly_connected_components();
```

### Caminho Mais Curto
Encontra a sequência mínima entre disciplinas:
```sql
SELECT * FROM shortest_path_between_disciplines(
    'disciplina_origem_id', 
    'disciplina_destino_id'
);
```

### Recomendação de Disciplinas
Sugere próximas disciplinas para um aluno:
```sql
SELECT * FROM recommend_disciplines_for_student('aluno_id');
```

## 📊 Visualização de Grafos

### Dados para Visualização
```sql
-- Nós do grafo
SELECT node_type, node_id, label, properties 
FROM (
    SELECT 'disciplina' as node_type, id as node_id, nome as label, 
           json_build_object('codigo', codigo, 'creditos', creditos) as properties
    FROM disciplinas
    UNION ALL
    SELECT 'aluno' as node_type, a.id, u.nome, 
           json_build_object('matricula', a.matricula, 'cr', a.coeficiente_rendimento)
    FROM alunos a JOIN usuarios u ON a.usuario_id = u.id
) nodes;

-- Arestas do grafo
SELECT edge_type, source_id, target_id, weight, properties
FROM (
    SELECT 'prerequisito' as edge_type, prerequisito_id as source_id, 
           disciplina_id as target_id, 1.0 as weight, 
           json_build_object('tipo', tipo) as properties
    FROM prerequisitos
    UNION ALL
    SELECT CASE WHEN situacao = 'aprovado' THEN 'cursou' ELSE 'reprovou' END,
           aluno_id, disciplina_id, COALESCE(nota_final, 0),
           json_build_object('nota', nota_final, 'periodo', periodo_cursado)
    FROM historico_academico
) edges;
```

## 🛠️ Manutenção

### Triggers Automáticos
- Atualização de `updated_at`
- Controle de vagas em turmas
- Cálculo automático de CR

### Índices de Performance
- Consultas por email/CPF
- Buscas por matrícula
- Análises de histórico
- Operações de grafo

## 📋 Requisitos

- PostgreSQL 12+
- Extensão UUID (gen_random_uuid)
- Suporte a JSONB
- Funções recursivas (CTE)

## 🔧 Configuração Recomendada

```sql
-- Configurações de performance para análise de grafos
SET work_mem = '256MB';
SET shared_buffers = '1GB';
SET effective_cache_size = '4GB';
SET random_page_cost = 1.1;
```

## 📝 Notas Importantes

1. **Escalabilidade**: O banco suporta milhares de alunos e disciplinas
2. **Performance**: Índices otimizados para consultas de grafo
3. **Integridade**: Constraints garantem consistência dos dados
4. **Flexibilidade**: JSONB permite propriedades dinâmicas
5. **Auditoria**: Timestamps automáticos em todas as operações