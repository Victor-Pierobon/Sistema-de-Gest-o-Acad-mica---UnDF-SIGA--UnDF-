-- SIGA-UnDF Graph Analysis Queries
-- Consultas para análise de grafos no sistema acadêmico

-- =============================================
-- CONSULTAS PARA ANÁLISE DE GRAFOS
-- =============================================

-- 1. Análise de Pré-requisitos (Grafo de Dependências)
-- Encontra todas as disciplinas e seus pré-requisitos
WITH RECURSIVE prerequisitos_recursivos AS (
    -- Caso base: disciplinas sem pré-requisitos
    SELECT 
        d.id,
        d.nome,
        d.codigo,
        d.semestre_recomendado,
        0 as nivel,
        ARRAY[d.id] as caminho
    FROM disciplinas d
    WHERE NOT EXISTS (
        SELECT 1 FROM prerequisitos p WHERE p.disciplina_id = d.id
    )
    
    UNION ALL
    
    -- Caso recursivo: disciplinas com pré-requisitos
    SELECT 
        d.id,
        d.nome,
        d.codigo,
        d.semestre_recomendado,
        pr.nivel + 1,
        pr.caminho || d.id
    FROM disciplinas d
    JOIN prerequisitos p ON d.id = p.disciplina_id
    JOIN prerequisitos_recursivos pr ON p.prerequisito_id = pr.id
    WHERE NOT (d.id = ANY(pr.caminho)) -- Evita ciclos
)
SELECT * FROM prerequisitos_recursivos
ORDER BY nivel, semestre_recomendado;

-- 2. Análise de Reprovações por Disciplina
-- Identifica disciplinas com maior taxa de reprovação
SELECT 
    d.nome as disciplina,
    d.codigo,
    d.semestre_recomendado,
    COUNT(ha.id) as total_cursaram,
    COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) as reprovacoes,
    ROUND(
        (COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
        NULLIF(COUNT(ha.id), 0), 2
    ) as taxa_reprovacao
FROM disciplinas d
LEFT JOIN historico_academico ha ON d.id = ha.disciplina_id
GROUP BY d.id, d.nome, d.codigo, d.semestre_recomendado
HAVING COUNT(ha.id) > 0
ORDER BY taxa_reprovacao DESC;

-- 3. Análise de Trajetória dos Alunos
-- Mapeia o caminho acadêmico dos alunos
SELECT 
    a.matricula,
    u.nome as aluno,
    c.nome as curso,
    d.nome as disciplina,
    d.semestre_recomendado,
    ha.periodo_cursado,
    ha.nota_final,
    ha.situacao,
    CASE 
        WHEN ha.situacao = 'aprovado' THEN 'success'
        WHEN ha.situacao LIKE 'reprovado%' THEN 'failure'
        ELSE 'neutral'
    END as resultado
FROM alunos a
JOIN usuarios u ON a.usuario_id = u.id
JOIN cursos c ON a.curso_id = c.id
JOIN historico_academico ha ON a.id = ha.aluno_id
JOIN disciplinas d ON ha.disciplina_id = d.id
ORDER BY a.matricula, ha.periodo_cursado, d.semestre_recomendado;

-- 4. Análise de Conectividade entre Disciplinas
-- Calcula métricas de centralidade das disciplinas
WITH disciplina_connections AS (
    SELECT 
        d.id,
        d.nome,
        d.codigo,
        -- Grau de entrada (quantas disciplinas dependem desta)
        (SELECT COUNT(*) FROM prerequisitos p WHERE p.prerequisito_id = d.id) as grau_entrada,
        -- Grau de saída (quantos pré-requisitos esta disciplina tem)
        (SELECT COUNT(*) FROM prerequisitos p WHERE p.disciplina_id = d.id) as grau_saida
    FROM disciplinas d
)
SELECT 
    *,
    (grau_entrada + grau_saida) as grau_total,
    CASE 
        WHEN grau_entrada > 3 THEN 'fundamental'
        WHEN grau_saida > 2 THEN 'avancada'
        ELSE 'intermediaria'
    END as classificacao
FROM disciplina_connections
ORDER BY grau_total DESC;

-- 5. Análise de Risco de Alunos
-- Identifica alunos em risco baseado em reprovações
WITH aluno_performance AS (
    SELECT 
        a.id,
        a.matricula,
        u.nome,
        c.nome as curso,
        COUNT(ha.id) as total_disciplinas,
        COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) as reprovacoes,
        AVG(CASE WHEN ha.nota_final IS NOT NULL THEN ha.nota_final END) as media_notas,
        ROUND(
            (COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
            NULLIF(COUNT(ha.id), 0), 2
        ) as taxa_reprovacao
    FROM alunos a
    JOIN usuarios u ON a.usuario_id = u.id
    JOIN cursos c ON a.curso_id = c.id
    LEFT JOIN historico_academico ha ON a.id = ha.aluno_id
    GROUP BY a.id, a.matricula, u.nome, c.nome
)
SELECT 
    *,
    CASE 
        WHEN taxa_reprovacao > 30 OR media_notas < 5.0 THEN 'alto_risco'
        WHEN taxa_reprovacao > 15 OR media_notas < 6.0 THEN 'medio_risco'
        ELSE 'baixo_risco'
    END as nivel_risco
FROM aluno_performance
WHERE total_disciplinas > 0
ORDER BY taxa_reprovacao DESC;

-- 6. Análise de Fluxo Curricular
-- Identifica gargalos no fluxo curricular
WITH fluxo_semestre AS (
    SELECT 
        d.semestre_recomendado,
        COUNT(DISTINCT ha.aluno_id) as alunos_cursaram,
        COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) as reprovacoes_semestre,
        AVG(ha.nota_final) as media_notas_semestre
    FROM disciplinas d
    JOIN historico_academico ha ON d.id = ha.disciplina_id
    GROUP BY d.semestre_recomendado
)
SELECT 
    semestre_recomendado,
    alunos_cursaram,
    reprovacoes_semestre,
    ROUND(media_notas_semestre, 2) as media_notas,
    ROUND(
        (reprovacoes_semestre * 100.0) / NULLIF(alunos_cursaram, 0), 2
    ) as taxa_reprovacao_semestre
FROM fluxo_semestre
ORDER BY semestre_recomendado;

-- 7. Consulta para Visualização de Grafo
-- Retorna dados formatados para visualização
SELECT 
    'disciplina' as node_type,
    d.id as node_id,
    d.nome as label,
    json_build_object(
        'codigo', d.codigo,
        'creditos', d.creditos,
        'semestre', d.semestre_recomendado,
        'carga_horaria', d.carga_horaria
    ) as properties
FROM disciplinas d
WHERE d.ativa = true

UNION ALL

SELECT 
    'aluno' as node_type,
    a.id as node_id,
    u.nome as label,
    json_build_object(
        'matricula', a.matricula,
        'curso', c.nome,
        'cr', a.coeficiente_rendimento,
        'status', a.status
    ) as properties
FROM alunos a
JOIN usuarios u ON a.usuario_id = u.id
JOIN cursos c ON a.curso_id = c.id
WHERE a.status = 'ativo';

-- 8. Arestas para Visualização de Grafo
SELECT 
    'prerequisito' as edge_type,
    p.prerequisito_id as source_id,
    p.disciplina_id as target_id,
    1.0 as weight,
    json_build_object('tipo', p.tipo) as properties
FROM prerequisitos p

UNION ALL

SELECT 
    CASE 
        WHEN ha.situacao = 'aprovado' THEN 'cursou'
        WHEN ha.situacao LIKE 'reprovado%' THEN 'reprovou'
        ELSE 'cursando'
    END as edge_type,
    ha.aluno_id as source_id,
    ha.disciplina_id as target_id,
    COALESCE(ha.nota_final, 0) as weight,
    json_build_object(
        'periodo', ha.periodo_cursado,
        'nota', ha.nota_final,
        'situacao', ha.situacao
    ) as properties
FROM historico_academico ha;

-- 9. Análise de Comunidades (Disciplinas Relacionadas)
-- Identifica grupos de disciplinas fortemente conectadas
WITH disciplina_similarity AS (
    SELECT 
        d1.id as disciplina1_id,
        d1.nome as disciplina1,
        d2.id as disciplina2_id,
        d2.nome as disciplina2,
        COUNT(DISTINCT ha1.aluno_id) as alunos_comum
    FROM disciplinas d1
    JOIN historico_academico ha1 ON d1.id = ha1.disciplina_id
    JOIN historico_academico ha2 ON ha1.aluno_id = ha2.aluno_id
    JOIN disciplinas d2 ON ha2.disciplina_id = d2.id
    WHERE d1.id < d2.id -- Evita duplicatas
    GROUP BY d1.id, d1.nome, d2.id, d2.nome
    HAVING COUNT(DISTINCT ha1.aluno_id) >= 3
)
SELECT 
    disciplina1,
    disciplina2,
    alunos_comum,
    CASE 
        WHEN alunos_comum >= 10 THEN 'forte'
        WHEN alunos_comum >= 5 THEN 'media'
        ELSE 'fraca'
    END as intensidade_conexao
FROM disciplina_similarity
ORDER BY alunos_comum DESC;

-- 10. Métricas de Performance do Sistema
-- Dashboard de métricas gerais
SELECT 
    'total_alunos' as metrica,
    COUNT(*) as valor
FROM alunos WHERE status = 'ativo'

UNION ALL

SELECT 
    'total_disciplinas' as metrica,
    COUNT(*) as valor
FROM disciplinas WHERE ativa = true

UNION ALL

SELECT 
    'taxa_reprovacao_geral' as metrica,
    ROUND(
        (COUNT(CASE WHEN situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
        NULLIF(COUNT(*), 0), 2
    ) as valor
FROM historico_academico

UNION ALL

SELECT 
    'media_geral' as metrica,
    ROUND(AVG(nota_final), 2) as valor
FROM historico_academico
WHERE nota_final IS NOT NULL;