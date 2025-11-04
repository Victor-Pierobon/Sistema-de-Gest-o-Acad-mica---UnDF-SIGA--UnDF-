// SIGA-UnDF Neo4j Migration
// Script para migrar dados do PostgreSQL para Neo4j para análise avançada de grafos

// =============================================
// LIMPEZA INICIAL
// =============================================

// Remove todos os nós e relacionamentos existentes
MATCH (n) DETACH DELETE n;

// =============================================
// CRIAÇÃO DE CONSTRAINTS E ÍNDICES
// =============================================

// Constraints para garantir unicidade
CREATE CONSTRAINT disciplina_id IF NOT EXISTS FOR (d:Disciplina) REQUIRE d.id IS UNIQUE;
CREATE CONSTRAINT aluno_id IF NOT EXISTS FOR (a:Aluno) REQUIRE a.id IS UNIQUE;
CREATE CONSTRAINT curso_id IF NOT EXISTS FOR (c:Curso) REQUIRE c.id IS UNIQUE;
CREATE CONSTRAINT professor_id IF NOT EXISTS FOR (p:Professor) REQUIRE p.id IS UNIQUE;

// Índices para performance
CREATE INDEX disciplina_codigo IF NOT EXISTS FOR (d:Disciplina) ON (d.codigo);
CREATE INDEX aluno_matricula IF NOT EXISTS FOR (a:Aluno) ON (a.matricula);
CREATE INDEX disciplina_semestre IF NOT EXISTS FOR (d:Disciplina) ON (d.semestre_recomendado);

// =============================================
// CRIAÇÃO DE NÓS
// =============================================

// Cursos
CREATE (c1:Curso {
    id: '550e8400-e29b-41d4-a716-446655440001',
    nome: 'Engenharia de Software',
    codigo: 'ES',
    duracao_semestres: 8,
    carga_horaria_total: 3200
});

CREATE (c2:Curso {
    id: '550e8400-e29b-41d4-a716-446655440002',
    nome: 'Ciência da Computação',
    codigo: 'CC',
    duracao_semestres: 8,
    carga_horaria_total: 3000
});

// Disciplinas
CREATE (d1:Disciplina {
    id: '650e8400-e29b-41d4-a716-446655440001',
    nome: 'Banco de Dados I',
    codigo: 'BDI301',
    carga_horaria: 80,
    creditos: 4,
    semestre_recomendado: 3,
    taxa_reprovacao: 42.5,
    criticidade: 'ALTA'
});

CREATE (d2:Disciplina {
    id: '650e8400-e29b-41d4-a716-446655440002',
    nome: 'Banco de Dados II',
    codigo: 'BDII401',
    carga_horaria: 80,
    creditos: 4,
    semestre_recomendado: 4,
    taxa_reprovacao: 48.3,
    criticidade: 'CRÍTICA'
});

CREATE (d3:Disciplina {
    id: '650e8400-e29b-41d4-a716-446655440015',
    nome: 'Algoritmos',
    codigo: 'ALG101',
    carga_horaria: 80,
    creditos: 4,
    semestre_recomendado: 1,
    taxa_reprovacao: 25.0,
    criticidade: 'MÉDIA'
});

CREATE (d4:Disciplina {
    id: '650e8400-e29b-41d4-a716-446655440014',
    nome: 'Estruturas de Dados',
    codigo: 'ED201',
    carga_horaria: 80,
    creditos: 4,
    semestre_recomendado: 2,
    taxa_reprovacao: 30.0,
    criticidade: 'MÉDIA'
});

CREATE (d5:Disciplina {
    id: '650e8400-e29b-41d4-a716-446655440016',
    nome: 'Programação Orientada a Objetos',
    codigo: 'POO301',
    carga_horaria: 80,
    creditos: 4,
    semestre_recomendado: 3,
    taxa_reprovacao: 35.0,
    criticidade: 'ALTA'
});

// Alunos
CREATE (a1:Aluno {
    id: '850e8400-e29b-41d4-a716-446655440001',
    nome: 'João Silva',
    matricula: '2021001234',
    coeficiente_rendimento: 7.5,
    semestre_ingresso: '2021.1',
    status: 'ativo',
    risco: 'BAIXO'
});

CREATE (a2:Aluno {
    id: '850e8400-e29b-41d4-a716-446655440002',
    nome: 'Maria Santos',
    matricula: '2021001235',
    coeficiente_rendimento: 6.8,
    semestre_ingresso: '2021.1',
    status: 'ativo',
    risco: 'MÉDIO'
});

CREATE (a3:Aluno {
    id: '850e8400-e29b-41d4-a716-446655440003',
    nome: 'Pedro Oliveira',
    matricula: '2022001236',
    coeficiente_rendimento: 8.2,
    semestre_ingresso: '2022.1',
    status: 'ativo',
    risco: 'BAIXO'
});

// Professores
CREATE (p1:Professor {
    id: '950e8400-e29b-41d4-a716-446655440001',
    nome: 'Ana Costa',
    siape: '1234567',
    titulacao: 'Doutora',
    area_especializacao: 'Banco de Dados'
});

CREATE (p2:Professor {
    id: '950e8400-e29b-41d4-a716-446655440002',
    nome: 'Carlos Pereira',
    siape: '1234568',
    titulacao: 'Doutor',
    area_especializacao: 'Engenharia de Software'
});

// =============================================
// CRIAÇÃO DE RELACIONAMENTOS
// =============================================

// Pré-requisitos entre disciplinas
MATCH (d_origem:Disciplina {codigo: 'ALG101'}), (d_destino:Disciplina {codigo: 'ED201'})
CREATE (d_origem)-[:PREREQUISITO_DE {tipo: 'obrigatorio', peso: 1.0}]->(d_destino);

MATCH (d_origem:Disciplina {codigo: 'ED201'}), (d_destino:Disciplina {codigo: 'POO301'})
CREATE (d_origem)-[:PREREQUISITO_DE {tipo: 'obrigatorio', peso: 1.0}]->(d_destino);

MATCH (d_origem:Disciplina {codigo: 'BDI301'}), (d_destino:Disciplina {codigo: 'BDII401'})
CREATE (d_origem)-[:PREREQUISITO_DE {tipo: 'obrigatorio', peso: 1.0}]->(d_destino);

// Alunos cursaram disciplinas
MATCH (a:Aluno {matricula: '2021001234'}), (d:Disciplina {codigo: 'ALG101'})
CREATE (a)-[:CURSOU {nota: 8.0, situacao: 'aprovado', periodo: '2021.1', peso: 8.0}]->(d);

MATCH (a:Aluno {matricula: '2021001234'}), (d:Disciplina {codigo: 'ED201'})
CREATE (a)-[:CURSOU {nota: 6.5, situacao: 'aprovado', periodo: '2021.2', peso: 6.5}]->(d);

MATCH (a:Aluno {matricula: '2021001235'}), (d:Disciplina {codigo: 'ALG101'})
CREATE (a)-[:REPROVOU {nota: 4.0, situacao: 'reprovado_nota', periodo: '2021.1', peso: 4.0}]->(d);

MATCH (a:Aluno {matricula: '2021001235'}), (d:Disciplina {codigo: 'ALG101'})
CREATE (a)-[:CURSOU {nota: 7.0, situacao: 'aprovado', periodo: '2021.2', peso: 7.0}]->(d);

// Alunos matriculados em cursos
MATCH (a:Aluno {matricula: '2021001234'}), (c:Curso {codigo: 'ES'})
CREATE (a)-[:MATRICULADO_EM {data_ingresso: '2021.1'}]->(c);

MATCH (a:Aluno {matricula: '2021001235'}), (c:Curso {codigo: 'ES'})
CREATE (a)-[:MATRICULADO_EM {data_ingresso: '2021.1'}]->(c);

MATCH (a:Aluno {matricula: '2022001236'}), (c:Curso {codigo: 'CC'})
CREATE (a)-[:MATRICULADO_EM {data_ingresso: '2022.1'}]->(c);

// Professores lecionam disciplinas
MATCH (p:Professor {siape: '1234567'}), (d:Disciplina {codigo: 'BDI301'})
CREATE (p)-[:LECIONA {periodo: '2024.2'}]->(d);

MATCH (p:Professor {siape: '1234567'}), (d:Disciplina {codigo: 'BDII401'})
CREATE (p)-[:LECIONA {periodo: '2024.2'}]->(d);

MATCH (p:Professor {siape: '1234568'}), (d:Disciplina {codigo: 'POO301'})
CREATE (p)-[:LECIONA {periodo: '2024.2'}]->(d);

// Disciplinas pertencem a cursos
MATCH (d:Disciplina {codigo: 'ALG101'}), (c:Curso {codigo: 'ES'})
CREATE (d)-[:PERTENCE_A {obrigatoria: true, semestre_recomendado: 1}]->(c);

MATCH (d:Disciplina {codigo: 'ED201'}), (c:Curso {codigo: 'ES'})
CREATE (d)-[:PERTENCE_A {obrigatoria: true, semestre_recomendado: 2}]->(c);

MATCH (d:Disciplina {codigo: 'BDI301'}), (c:Curso {codigo: 'ES'})
CREATE (d)-[:PERTENCE_A {obrigatoria: true, semestre_recomendado: 3}]->(c);

MATCH (d:Disciplina {codigo: 'POO301'}), (c:Curso {codigo: 'ES'})
CREATE (d)-[:PERTENCE_A {obrigatoria: true, semestre_recomendado: 3}]->(c);

MATCH (d:Disciplina {codigo: 'BDII401'}), (c:Curso {codigo: 'ES'})
CREATE (d)-[:PERTENCE_A {obrigatoria: true, semestre_recomendado: 4}]->(c);

// =============================================
// CONSULTAS DE ANÁLISE DE GRAFOS
// =============================================

// 1. Encontrar disciplinas mais centrais (maior número de conexões)
MATCH (d:Disciplina)
OPTIONAL MATCH (d)-[r1:PREREQUISITO_DE]-()
OPTIONAL MATCH ()-[r2:PREREQUISITO_DE]->(d)
WITH d, count(r1) + count(r2) as centralidade
RETURN d.nome, d.codigo, centralidade
ORDER BY centralidade DESC;

// 2. Caminho mais curto entre duas disciplinas
MATCH path = shortestPath((d1:Disciplina {codigo: 'ALG101'})-[:PREREQUISITO_DE*]-(d2:Disciplina {codigo: 'BDII401'}))
RETURN [node in nodes(path) | node.nome] as caminho_disciplinas;

// 3. Alunos em risco (com reprovações)
MATCH (a:Aluno)-[r:REPROVOU]->(d:Disciplina)
WITH a, count(r) as reprovacoes
WHERE reprovacoes > 0
RETURN a.nome, a.matricula, reprovacoes, a.coeficiente_rendimento
ORDER BY reprovacoes DESC;

// 4. Disciplinas com maior taxa de reprovação
MATCH (d:Disciplina)
OPTIONAL MATCH (a:Aluno)-[r:REPROVOU]->(d)
WITH d, count(r) as reprovacoes
WHERE reprovacoes > 0
RETURN d.nome, d.codigo, d.taxa_reprovacao, reprovacoes
ORDER BY d.taxa_reprovacao DESC;

// 5. Análise de comunidades - disciplinas frequentemente cursadas juntas
MATCH (a:Aluno)-[:CURSOU]->(d1:Disciplina), (a)-[:CURSOU]->(d2:Disciplina)
WHERE d1 <> d2
WITH d1, d2, count(a) as alunos_comum
WHERE alunos_comum >= 2
RETURN d1.nome, d2.nome, alunos_comum
ORDER BY alunos_comum DESC;

// 6. Professores e suas áreas de influência
MATCH (p:Professor)-[:LECIONA]->(d:Disciplina)<-[:CURSOU|REPROVOU]-(a:Aluno)
WITH p, d, count(a) as total_alunos
RETURN p.nome, p.area_especializacao, collect({disciplina: d.nome, alunos: total_alunos}) as disciplinas_lecionadas;

// 7. Fluxo curricular - sequência de disciplinas por semestre
MATCH (d:Disciplina)-[:PERTENCE_A]->(c:Curso {codigo: 'ES'})
WITH d ORDER BY d.semestre_recomendado
RETURN d.semestre_recomendado as semestre, collect(d.nome) as disciplinas;

// 8. Análise de PageRank para identificar disciplinas mais importantes
CALL gds.pageRank.stream({
  nodeQuery: 'MATCH (d:Disciplina) RETURN id(d) as id',
  relationshipQuery: 'MATCH (d1:Disciplina)-[:PREREQUISITO_DE]->(d2:Disciplina) RETURN id(d1) as source, id(d2) as target'
})
YIELD nodeId, score
MATCH (d:Disciplina) WHERE id(d) = nodeId
RETURN d.nome, d.codigo, score
ORDER BY score DESC;

// 9. Detecção de componentes fortemente conectados
CALL gds.wcc.stream({
  nodeQuery: 'MATCH (d:Disciplina) RETURN id(d) as id',
  relationshipQuery: 'MATCH (d1:Disciplina)-[:PREREQUISITO_DE]-(d2:Disciplina) RETURN id(d1) as source, id(d2) as target'
})
YIELD nodeId, componentId
MATCH (d:Disciplina) WHERE id(d) = nodeId
RETURN componentId, collect(d.nome) as disciplinas_conectadas
ORDER BY componentId;

// 10. Análise de centralidade de intermediação
CALL gds.betweenness.stream({
  nodeQuery: 'MATCH (d:Disciplina) RETURN id(d) as id',
  relationshipQuery: 'MATCH (d1:Disciplina)-[:PREREQUISITO_DE]->(d2:Disciplina) RETURN id(d1) as source, id(d2) as target'
})
YIELD nodeId, score
MATCH (d:Disciplina) WHERE id(d) = nodeId
RETURN d.nome, d.codigo, score as betweenness_centrality
ORDER BY score DESC;