-- SIGA-UnDF Graph Functions
-- Funções especializadas para análise de grafos

-- =============================================
-- FUNÇÕES PARA ANÁLISE DE GRAFOS
-- =============================================

-- 1. Função para calcular centralidade de intermediação (betweenness centrality)
CREATE OR REPLACE FUNCTION calculate_betweenness_centrality()
RETURNS TABLE(
    disciplina_id UUID,
    disciplina_nome VARCHAR,
    betweenness_score DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    WITH RECURSIVE paths AS (
        -- Caminhos diretos (pré-requisitos)
        SELECT 
            p.prerequisito_id as source_id,
            p.disciplina_id as target_id,
            1 as path_length,
            ARRAY[p.prerequisito_id, p.disciplina_id] as path_nodes
        FROM prerequisitos p
        
        UNION ALL
        
        -- Caminhos indiretos
        SELECT 
            paths.source_id,
            p.disciplina_id as target_id,
            paths.path_length + 1,
            paths.path_nodes || p.disciplina_id
        FROM paths
        JOIN prerequisitos p ON paths.target_id = p.prerequisito_id
        WHERE paths.path_length < 10 -- Limita profundidade
          AND NOT (p.disciplina_id = ANY(paths.path_nodes)) -- Evita ciclos
    ),
    betweenness_calc AS (
        SELECT 
            unnest(path_nodes[2:array_length(path_nodes,1)-1]) as intermediate_node,
            COUNT(*) as paths_through_node
        FROM paths
        WHERE array_length(path_nodes, 1) > 2
        GROUP BY unnest(path_nodes[2:array_length(path_nodes,1)-1])
    )
    SELECT 
        d.id,
        d.nome,
        COALESCE(bc.paths_through_node, 0)::DECIMAL as betweenness_score
    FROM disciplinas d
    LEFT JOIN betweenness_calc bc ON d.id = bc.intermediate_node
    ORDER BY betweenness_score DESC;
END;
$$ LANGUAGE plpgsql;

-- 2. Função para detectar componentes fortemente conectados
CREATE OR REPLACE FUNCTION find_strongly_connected_components()
RETURNS TABLE(
    component_id INTEGER,
    disciplina_id UUID,
    disciplina_nome VARCHAR
) AS $$
DECLARE
    component_counter INTEGER := 1;
BEGIN
    -- Cria tabela temporária para componentes
    CREATE TEMP TABLE IF NOT EXISTS temp_components (
        component_id INTEGER,
        disciplina_id UUID
    );
    
    -- Algoritmo simplificado para encontrar componentes
    WITH RECURSIVE component_search AS (
        SELECT 
            d.id as disciplina_id,
            ROW_NUMBER() OVER () as component_id
        FROM disciplinas d
        WHERE NOT EXISTS (
            SELECT 1 FROM prerequisitos p WHERE p.disciplina_id = d.id
        )
        
        UNION ALL
        
        SELECT 
            p.disciplina_id,
            cs.component_id
        FROM component_search cs
        JOIN prerequisitos p ON cs.disciplina_id = p.prerequisito_id
    )
    INSERT INTO temp_components
    SELECT DISTINCT component_id, disciplina_id FROM component_search;
    
    RETURN QUERY
    SELECT 
        tc.component_id,
        tc.disciplina_id,
        d.nome
    FROM temp_components tc
    JOIN disciplinas d ON tc.disciplina_id = d.id
    ORDER BY tc.component_id, d.nome;
    
    DROP TABLE temp_components;
END;
$$ LANGUAGE plpgsql;

-- 3. Função para calcular distância mínima entre disciplinas
CREATE OR REPLACE FUNCTION shortest_path_between_disciplines(
    source_discipline_id UUID,
    target_discipline_id UUID
)
RETURNS TABLE(
    path_length INTEGER,
    path_nodes UUID[],
    path_names TEXT[]
) AS $$
BEGIN
    RETURN QUERY
    WITH RECURSIVE shortest_path AS (
        -- Caso base: disciplina de origem
        SELECT 
            source_discipline_id as current_node,
            0 as distance,
            ARRAY[source_discipline_id] as path_nodes,
            ARRAY[(SELECT nome FROM disciplinas WHERE id = source_discipline_id)] as path_names
        
        UNION ALL
        
        -- Expansão do caminho
        SELECT 
            p.disciplina_id as current_node,
            sp.distance + 1,
            sp.path_nodes || p.disciplina_id,
            sp.path_names || (SELECT nome FROM disciplinas WHERE id = p.disciplina_id)
        FROM shortest_path sp
        JOIN prerequisitos p ON sp.current_node = p.prerequisito_id
        WHERE sp.distance < 10 -- Limita profundidade
          AND NOT (p.disciplina_id = ANY(sp.path_nodes)) -- Evita ciclos
          AND p.disciplina_id != target_discipline_id OR sp.distance = 0
    )
    SELECT 
        sp.distance,
        sp.path_nodes,
        sp.path_names
    FROM shortest_path sp
    WHERE sp.current_node = target_discipline_id
    ORDER BY sp.distance
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- 4. Função para identificar disciplinas críticas
CREATE OR REPLACE FUNCTION identify_critical_disciplines()
RETURNS TABLE(
    disciplina_id UUID,
    disciplina_nome VARCHAR,
    codigo VARCHAR,
    taxa_reprovacao DECIMAL,
    impacto_score DECIMAL,
    criticidade VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    WITH disciplina_stats AS (
        SELECT 
            d.id,
            d.nome,
            d.codigo,
            COUNT(ha.id) as total_cursaram,
            COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) as reprovacoes,
            ROUND(
                (COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
                NULLIF(COUNT(ha.id), 0), 2
            ) as taxa_reprovacao,
            -- Calcula impacto baseado em quantas disciplinas dependem desta
            (SELECT COUNT(*) FROM prerequisitos p WHERE p.prerequisito_id = d.id) as dependentes
        FROM disciplinas d
        LEFT JOIN historico_academico ha ON d.id = ha.disciplina_id
        GROUP BY d.id, d.nome, d.codigo
    )
    SELECT 
        ds.id,
        ds.nome,
        ds.codigo,
        COALESCE(ds.taxa_reprovacao, 0),
        -- Score de impacto: combina taxa de reprovação com número de dependentes
        ROUND((COALESCE(ds.taxa_reprovacao, 0) * 0.7) + (ds.dependentes * 10 * 0.3), 2) as impacto_score,
        CASE 
            WHEN COALESCE(ds.taxa_reprovacao, 0) > 40 AND ds.dependentes > 2 THEN 'CRÍTICA'
            WHEN COALESCE(ds.taxa_reprovacao, 0) > 30 OR ds.dependentes > 3 THEN 'ALTA'
            WHEN COALESCE(ds.taxa_reprovacao, 0) > 20 OR ds.dependentes > 1 THEN 'MÉDIA'
            ELSE 'BAIXA'
        END as criticidade
    FROM disciplina_stats ds
    WHERE ds.total_cursaram > 0
    ORDER BY impacto_score DESC;
END;
$$ LANGUAGE plpgsql;

-- 5. Função para análise de trajetória de aluno
CREATE OR REPLACE FUNCTION analyze_student_trajectory(student_id UUID)
RETURNS TABLE(
    semestre INTEGER,
    disciplinas_cursadas INTEGER,
    disciplinas_aprovadas INTEGER,
    disciplinas_reprovadas INTEGER,
    media_semestre DECIMAL,
    status_progressao VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    WITH student_progress AS (
        SELECT 
            d.semestre_recomendado,
            COUNT(*) as disciplinas_cursadas,
            COUNT(CASE WHEN ha.situacao = 'aprovado' THEN 1 END) as disciplinas_aprovadas,
            COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) as disciplinas_reprovadas,
            AVG(ha.nota_final) as media_semestre
        FROM historico_academico ha
        JOIN disciplinas d ON ha.disciplina_id = d.id
        WHERE ha.aluno_id = student_id
        GROUP BY d.semestre_recomendado
    )
    SELECT 
        sp.semestre_recomendado,
        sp.disciplinas_cursadas,
        sp.disciplinas_aprovadas,
        sp.disciplinas_reprovadas,
        ROUND(sp.media_semestre, 2),
        CASE 
            WHEN sp.disciplinas_reprovadas > sp.disciplinas_aprovadas THEN 'EM_RISCO'
            WHEN sp.media_semestre < 5.0 THEN 'BAIXO_RENDIMENTO'
            WHEN sp.media_semestre >= 8.0 THEN 'EXCELENTE'
            WHEN sp.media_semestre >= 7.0 THEN 'BOM'
            ELSE 'REGULAR'
        END as status_progressao
    FROM student_progress sp
    ORDER BY sp.semestre_recomendado;
END;
$$ LANGUAGE plpgsql;

-- 6. Função para recomendação de disciplinas
CREATE OR REPLACE FUNCTION recommend_disciplines_for_student(student_id UUID)
RETURNS TABLE(
    disciplina_id UUID,
    disciplina_nome VARCHAR,
    codigo VARCHAR,
    semestre_recomendado INTEGER,
    prioridade INTEGER,
    motivo VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    WITH student_completed AS (
        SELECT ha.disciplina_id
        FROM historico_academico ha
        WHERE ha.aluno_id = student_id 
          AND ha.situacao = 'aprovado'
    ),
    available_disciplines AS (
        SELECT 
            d.id,
            d.nome,
            d.codigo,
            d.semestre_recomendado,
            -- Verifica se todos os pré-requisitos foram cumpridos
            CASE 
                WHEN NOT EXISTS (
                    SELECT 1 FROM prerequisitos p 
                    WHERE p.disciplina_id = d.id 
                      AND p.prerequisito_id NOT IN (SELECT disciplina_id FROM student_completed)
                ) THEN true
                ELSE false
            END as prerequisites_met
        FROM disciplinas d
        JOIN curso_disciplinas cd ON d.id = cd.disciplina_id
        JOIN alunos a ON cd.curso_id = a.curso_id
        WHERE a.id = student_id
          AND d.id NOT IN (SELECT disciplina_id FROM student_completed)
          AND d.ativa = true
    )
    SELECT 
        ad.id,
        ad.nome,
        ad.codigo,
        ad.semestre_recomendado,
        CASE 
            WHEN ad.prerequisites_met AND ad.semestre_recomendado <= 3 THEN 1
            WHEN ad.prerequisites_met THEN 2
            WHEN NOT ad.prerequisites_met THEN 3
            ELSE 4
        END as prioridade,
        CASE 
            WHEN ad.prerequisites_met AND ad.semestre_recomendado <= 3 THEN 'Disciplina básica disponível'
            WHEN ad.prerequisites_met THEN 'Pré-requisitos cumpridos'
            WHEN NOT ad.prerequisites_met THEN 'Aguardando pré-requisitos'
            ELSE 'Verificar disponibilidade'
        END as motivo
    FROM available_disciplines ad
    ORDER BY prioridade, ad.semestre_recomendado;
END;
$$ LANGUAGE plpgsql;

-- 7. Função para detectar anomalias no fluxo curricular
CREATE OR REPLACE FUNCTION detect_curriculum_anomalies()
RETURNS TABLE(
    anomaly_type VARCHAR,
    entity_id UUID,
    entity_name VARCHAR,
    description TEXT,
    severity VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    -- Disciplinas com alta taxa de reprovação
    SELECT 
        'HIGH_FAILURE_RATE' as anomaly_type,
        d.id as entity_id,
        d.nome as entity_name,
        'Taxa de reprovação: ' || ROUND(
            (COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
            NULLIF(COUNT(ha.id), 0), 2
        ) || '%' as description,
        CASE 
            WHEN (COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
                 NULLIF(COUNT(ha.id), 0) > 50 THEN 'CRÍTICA'
            WHEN (COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
                 NULLIF(COUNT(ha.id), 0) > 30 THEN 'ALTA'
            ELSE 'MÉDIA'
        END as severity
    FROM disciplinas d
    JOIN historico_academico ha ON d.id = ha.disciplina_id
    GROUP BY d.id, d.nome
    HAVING COUNT(ha.id) >= 10 
       AND (COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
           NULLIF(COUNT(ha.id), 0) > 25
    
    UNION ALL
    
    -- Alunos com muitas reprovações
    SELECT 
        'STUDENT_AT_RISK' as anomaly_type,
        a.id as entity_id,
        u.nome as entity_name,
        'Reprovações: ' || COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) ||
        ' de ' || COUNT(ha.id) || ' disciplinas' as description,
        CASE 
            WHEN (COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
                 NULLIF(COUNT(ha.id), 0) > 40 THEN 'CRÍTICA'
            WHEN (COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
                 NULLIF(COUNT(ha.id), 0) > 25 THEN 'ALTA'
            ELSE 'MÉDIA'
        END as severity
    FROM alunos a
    JOIN usuarios u ON a.usuario_id = u.id
    JOIN historico_academico ha ON a.id = ha.aluno_id
    GROUP BY a.id, u.nome
    HAVING COUNT(ha.id) >= 5 
       AND (COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
           NULLIF(COUNT(ha.id), 0) > 20
    
    ORDER BY severity DESC, anomaly_type;
END;
$$ LANGUAGE plpgsql;

-- 8. Função para gerar relatório de performance por curso
CREATE OR REPLACE FUNCTION course_performance_report(course_id UUID)
RETURNS TABLE(
    metrica VARCHAR,
    valor DECIMAL,
    benchmark DECIMAL,
    status VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    WITH course_stats AS (
        SELECT 
            COUNT(DISTINCT a.id) as total_alunos,
            COUNT(DISTINCT ha.disciplina_id) as disciplinas_oferecidas,
            COUNT(ha.id) as total_matriculas,
            COUNT(CASE WHEN ha.situacao = 'aprovado' THEN 1 END) as aprovacoes,
            COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) as reprovacoes,
            AVG(ha.nota_final) as media_geral,
            AVG(a.coeficiente_rendimento) as cr_medio
        FROM cursos c
        JOIN alunos a ON c.id = a.curso_id
        LEFT JOIN historico_academico ha ON a.id = ha.aluno_id
        WHERE c.id = course_id
    ),
    benchmarks AS (
        SELECT 
            85.0 as taxa_aprovacao_benchmark,
            7.0 as media_notas_benchmark,
            7.5 as cr_benchmark
    )
    SELECT 
        'Taxa de Aprovação (%)' as metrica,
        ROUND((cs.aprovacoes * 100.0) / NULLIF(cs.total_matriculas, 0), 2) as valor,
        b.taxa_aprovacao_benchmark as benchmark,
        CASE 
            WHEN (cs.aprovacoes * 100.0) / NULLIF(cs.total_matriculas, 0) >= b.taxa_aprovacao_benchmark THEN 'BOM'
            WHEN (cs.aprovacoes * 100.0) / NULLIF(cs.total_matriculas, 0) >= b.taxa_aprovacao_benchmark - 10 THEN 'REGULAR'
            ELSE 'RUIM'
        END as status
    FROM course_stats cs, benchmarks b
    
    UNION ALL
    
    SELECT 
        'Média Geral de Notas' as metrica,
        ROUND(cs.media_geral, 2) as valor,
        b.media_notas_benchmark as benchmark,
        CASE 
            WHEN cs.media_geral >= b.media_notas_benchmark THEN 'BOM'
            WHEN cs.media_geral >= b.media_notas_benchmark - 1 THEN 'REGULAR'
            ELSE 'RUIM'
        END as status
    FROM course_stats cs, benchmarks b
    WHERE cs.media_geral IS NOT NULL
    
    UNION ALL
    
    SELECT 
        'CR Médio dos Alunos' as metrica,
        ROUND(cs.cr_medio, 2) as valor,
        b.cr_benchmark as benchmark,
        CASE 
            WHEN cs.cr_medio >= b.cr_benchmark THEN 'BOM'
            WHEN cs.cr_medio >= b.cr_benchmark - 1 THEN 'REGULAR'
            ELSE 'RUIM'
        END as status
    FROM course_stats cs, benchmarks b
    WHERE cs.cr_medio IS NOT NULL;
END;
$$ LANGUAGE plpgsql;