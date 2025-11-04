const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

// Configuração do PostgreSQL
const pool = new Pool({
  user: 'siga_user',
  host: 'localhost',
  database: 'siga_undf',
  password: 'siga_password',
  port: 5432,
});

// Middleware
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/api/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Conexão com banco OK', timestamp: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;
  
  try {
    const result = await pool.query(`
      SELECT u.id, u.nome, u.email, u.perfil, a.matricula
      FROM usuarios u
      LEFT JOIN alunos a ON u.id = a.usuario_id
      WHERE u.email = $1 OR u.email = $2
    `, [email, `${email}@unb.br`]);
    
    if (result.rows.length > 0 && senha === '123456') {
      const user = result.rows[0];
      res.json({
        id: user.id,
        nome: user.nome,
        email: user.email,
        perfil: user.perfil,
        matricula: user.matricula
      });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Disciplinas críticas
app.get('/api/disciplinas-criticas', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        d.nome,
        d.codigo,
        COUNT(ha.id) as total_cursaram,
        COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) as reprovacoes,
        ROUND(
          (COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
          NULLIF(COUNT(ha.id), 0), 2
        ) as taxa_reprovacao,
        COUNT(p.disciplina_id) as dependentes
      FROM disciplinas d
      LEFT JOIN historico_academico ha ON d.id = ha.disciplina_id
      LEFT JOIN prerequisitos p ON d.id = p.prerequisito_id
      GROUP BY d.id, d.nome, d.codigo
      HAVING COUNT(ha.id) > 0
      ORDER BY taxa_reprovacao DESC
      LIMIT 10
    `);
    
    const disciplinas = result.rows.map(row => ({
      nome: row.nome,
      codigo: row.codigo,
      taxa: parseFloat(row.taxa_reprovacao),
      total_cursaram: parseInt(row.total_cursaram),
      reprovacoes: parseInt(row.reprovacoes),
      dependentes: parseInt(row.dependentes),
      impacto: row.taxa_reprovacao > 50 ? 'CRÍTICO' : 
               row.taxa_reprovacao > 30 ? 'ALTO' : 'MÉDIO'
    }));
    
    res.json(disciplinas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Alunos em risco
app.get('/api/alunos-risco', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        u.nome,
        a.matricula,
        a.coeficiente_rendimento as cr,
        a.status,
        COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) as reprovacoes
      FROM alunos a
      JOIN usuarios u ON a.usuario_id = u.id
      LEFT JOIN historico_academico ha ON a.id = ha.aluno_id
      GROUP BY a.id, u.nome, a.matricula, a.coeficiente_rendimento, a.status
      HAVING COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) > 0
      ORDER BY reprovacoes DESC, cr ASC
    `);
    
    const alunos = result.rows.map(row => ({
      nome: row.nome,
      matricula: row.matricula,
      reprovacoes: parseInt(row.reprovacoes),
      cr: parseFloat(row.cr),
      status: row.status,
      risco: row.reprovacoes >= 4 ? 'CRÍTICO' : 
             row.reprovacoes >= 2 ? 'ALTO' : 'MÉDIO'
    }));
    
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Métricas gerais
app.get('/api/metricas', async (req, res) => {
  try {
    const queries = await Promise.all([
      pool.query('SELECT COUNT(*) as total FROM alunos WHERE status = $1', ['ativo']),
      pool.query(`
        SELECT COUNT(DISTINCT a.id) as alunos_risco 
        FROM alunos a 
        JOIN historico_academico ha ON a.id = ha.aluno_id 
        WHERE ha.situacao LIKE 'reprovado%'
      `),
      pool.query(`
        SELECT COUNT(*) as disciplinas_criticas
        FROM (
          SELECT d.id
          FROM disciplinas d
          LEFT JOIN historico_academico ha ON d.id = ha.disciplina_id
          GROUP BY d.id
          HAVING COUNT(ha.id) > 0 AND 
                 (COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
                 NULLIF(COUNT(ha.id), 0) > 40
        ) as criticas
      `),
      pool.query(`
        SELECT ROUND(AVG(
          CASE WHEN total > 0 THEN (reprovacoes * 100.0) / total ELSE 0 END
        ), 2) as taxa_media
        FROM (
          SELECT 
            COUNT(ha.id) as total,
            COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) as reprovacoes
          FROM disciplinas d
          LEFT JOIN historico_academico ha ON d.id = ha.disciplina_id
          GROUP BY d.id
          HAVING COUNT(ha.id) > 0
        ) as stats
      `)
    ]);
    
    res.json({
      totalAlunos: parseInt(queries[0].rows[0].total),
      alunosRisco: parseInt(queries[1].rows[0].alunos_risco),
      disciplinasCriticas: parseInt(queries[2].rows[0].disciplinas_criticas),
      taxaReprovacaoMedia: parseFloat(queries[3].rows[0].taxa_media) || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Solicitações de recuperação
app.get('/api/solicitacoes', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        u.nome as aluno,
        d.nome as disciplina,
        sr.periodo_solicitado,
        sr.status,
        sr.data_submissao::date as data
      FROM solicitacoes_recuperacao sr
      JOIN alunos a ON sr.aluno_id = a.id
      JOIN usuarios u ON a.usuario_id = u.id
      JOIN disciplinas d ON sr.disciplina_id = d.id
      ORDER BY sr.data_submissao DESC
      LIMIT 10
    `);
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Estatísticas por curso
app.get('/api/cursos-stats', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.nome,
        COUNT(DISTINCT a.id) as alunos,
        COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) as materias_perdidas,
        ROUND(
          (COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
          NULLIF(COUNT(ha.id), 0), 2
        ) as abandono
      FROM cursos c
      LEFT JOIN alunos a ON c.id = a.curso_id AND a.status = 'ativo'
      LEFT JOIN historico_academico ha ON a.id = ha.aluno_id
      GROUP BY c.id, c.nome
      ORDER BY alunos DESC
    `);
    
    res.json(result.rows.map(row => ({
      nome: row.nome,
      alunos: parseInt(row.alunos) || 0,
      materiasPerdidas: parseInt(row.materias_perdidas) || 0,
      abandono: parseFloat(row.abandono) || 0
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Contadores de solicitações
app.get('/api/solicitacoes-count', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        status,
        COUNT(*) as count
      FROM solicitacoes_recuperacao
      GROUP BY status
    `);
    
    const counts = {
      pendentes: 0,
      aprovadas_professor: 0,
      deferidas: 0,
      indeferidas: 0
    };
    
    result.rows.forEach(row => {
      if (row.status === 'pendente') counts.pendentes = parseInt(row.count);
      if (row.status === 'aprovada_professor') counts.aprovadas_professor = parseInt(row.count);
      if (row.status === 'deferida') counts.deferidas = parseInt(row.count);
      if (row.status === 'indeferida') counts.indeferidas = parseInt(row.count);
    });
    
    res.json(counts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Alertas importantes
app.get('/api/alertas', async (req, res) => {
  try {
    const [alunosRisco, disciplinasCriticas] = await Promise.all([
      pool.query(`
        SELECT 
          u.nome,
          a.matricula,
          COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) as reprovacoes,
          a.coeficiente_rendimento as cr
        FROM alunos a
        JOIN usuarios u ON a.usuario_id = u.id
        LEFT JOIN historico_academico ha ON a.id = ha.aluno_id
        WHERE a.status = 'ativo'
        GROUP BY a.id, u.nome, a.matricula, a.coeficiente_rendimento
        HAVING COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) >= 4
        ORDER BY reprovacoes DESC
        LIMIT 5
      `),
      pool.query(`
        SELECT 
          d.nome,
          ROUND(
            (COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
            NULLIF(COUNT(ha.id), 0), 2
          ) as taxa_reprovacao
        FROM disciplinas d
        LEFT JOIN historico_academico ha ON d.id = ha.disciplina_id
        GROUP BY d.id, d.nome
        HAVING COUNT(ha.id) > 0 AND 
               (COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
               NULLIF(COUNT(ha.id), 0) > 50
        ORDER BY taxa_reprovacao DESC
        LIMIT 3
      `)
    ]);
    
    const alertas = [];
    
    alunosRisco.rows.forEach(aluno => {
      alertas.push({
        tipo: aluno.reprovacoes >= 5 ? 'critico' : 'alto',
        titulo: aluno.nome,
        descricao: `${aluno.reprovacoes} reprovações - ${aluno.reprovacoes >= 5 ? 'Risco crítico de evasão' : 'Precisa de apoio'}`,
        acao: aluno.reprovacoes >= 5 ? 'Contatar urgente' : 'Oferecer monitoria'
      });
    });
    
    disciplinasCriticas.rows.forEach(disciplina => {
      alertas.push({
        tipo: 'alto',
        titulo: disciplina.nome,
        descricao: `${disciplina.taxa_reprovacao}% de reprovação - Disciplina gargalo`,
        acao: 'Revisar metodologia'
      });
    });
    
    res.json(alertas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dados para dashboard administrativo
app.get('/api/admin-stats', async (req, res) => {
  try {
    const [kpis, topSubjects, topCourses, semesterDist, evolution] = await Promise.all([
      // KPIs principais
      pool.query(`
        SELECT 
          COUNT(DISTINCT a.id) as total_students_with_failures,
          ROUND(AVG(
            CASE WHEN total > 0 THEN (reprovacoes * 100.0) / total ELSE 0 END
          ), 1) as students_at_risk
        FROM (
          SELECT 
            a.id,
            COUNT(ha.id) as total,
            COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) as reprovacoes
          FROM alunos a
          LEFT JOIN historico_academico ha ON a.id = ha.aluno_id
          GROUP BY a.id
          HAVING COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) > 0
        ) as stats
      `),
      // Top disciplinas por número de reprovações
      pool.query(`
        SELECT 
          d.nome,
          d.codigo,
          COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) as failed_students,
          ROUND(
            (COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
            NULLIF(COUNT(ha.id), 0), 1
          ) as failure_rate
        FROM disciplinas d
        LEFT JOIN historico_academico ha ON d.id = ha.disciplina_id
        GROUP BY d.id, d.nome, d.codigo
        HAVING COUNT(ha.id) > 0
        ORDER BY failed_students DESC
        LIMIT 10
      `),
      // Top cursos por taxa de reprovação
      pool.query(`
        SELECT 
          c.nome,
          COUNT(DISTINCT a.id) as total_students,
          COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) as students_with_failures,
          ROUND(
            (COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
            NULLIF(COUNT(DISTINCT a.id), 0), 1
          ) as failure_percentage
        FROM cursos c
        LEFT JOIN alunos a ON c.id = a.curso_id
        LEFT JOIN historico_academico ha ON a.id = ha.aluno_id
        GROUP BY c.id, c.nome
        HAVING COUNT(DISTINCT a.id) > 0
        ORDER BY failure_percentage DESC
        LIMIT 5
      `),
      // Distribuição por semestre (simulada baseada nos dados)
      pool.query(`
        SELECT 
          CASE 
            WHEN cd.semestre_recomendado = 1 THEN '1º'
            WHEN cd.semestre_recomendado = 2 THEN '2º'
            WHEN cd.semestre_recomendado = 3 THEN '3º'
            WHEN cd.semestre_recomendado = 4 THEN '4º'
            WHEN cd.semestre_recomendado = 5 THEN '5º'
            WHEN cd.semestre_recomendado = 6 THEN '6º'
            ELSE 'Outros'
          END as semester,
          COUNT(CASE WHEN ha.situacao LIKE 'reprovado%' THEN 1 END) as failures
        FROM curso_disciplinas cd
        LEFT JOIN historico_academico ha ON cd.disciplina_id = ha.disciplina_id
        WHERE cd.semestre_recomendado BETWEEN 1 AND 6
        GROUP BY cd.semestre_recomendado
        ORDER BY cd.semestre_recomendado
      `),
      // Evolução temporal (simulada)
      pool.query(`
        SELECT 
          '2023.1' as semester, 28.5 as rate
        UNION ALL SELECT '2023.2', 31.2
        UNION ALL SELECT '2024.1', 29.8
        UNION ALL SELECT '2024.2', 26.4
        UNION ALL SELECT '2025.1', 24.8
      `)
    ]);
    
    const totalFailures = semesterDist.rows.reduce((sum, row) => sum + parseInt(row.failures), 0);
    
    res.json({
      kpis: {
        totalStudentsWithFailures: parseInt(kpis.rows[0]?.total_students_with_failures) || 0,
        studentsAtRisk: parseFloat(kpis.rows[0]?.students_at_risk) || 0,
        criticalSubjects: topSubjects.rows.filter(s => s.failure_rate > 40).length
      },
      topSubjects: topSubjects.rows.map(row => ({
        id: row.codigo,
        name: row.nome,
        code: row.codigo,
        failedStudents: parseInt(row.failed_students),
        failureRate: parseFloat(row.failure_rate)
      })),
      topCourses: topCourses.rows.map(row => ({
        name: row.nome,
        totalStudents: parseInt(row.total_students),
        studentsWithFailures: parseInt(row.students_with_failures),
        failurePercentage: parseFloat(row.failure_percentage)
      })),
      semesterDistribution: semesterDist.rows.map(row => ({
        semester: row.semester,
        failures: parseInt(row.failures),
        percentage: totalFailures > 0 ? ((parseInt(row.failures) / totalFailures) * 100).toFixed(1) : 0
      })),
      failureEvolution: evolution.rows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dados para grafo
app.get('/api/grafo/:tipo', async (req, res) => {
  const { tipo } = req.params;
  
  try {
    if (tipo === 'prerequisitos') {
      const [disciplinas, prerequisitos] = await Promise.all([
        pool.query(`
          SELECT d.id, d.nome, d.codigo, 
                 COALESCE(stats.taxa_reprovacao, 0) as taxa_reprovacao
          FROM disciplinas d
          LEFT JOIN (
            SELECT 
              disciplina_id,
              ROUND((COUNT(CASE WHEN situacao LIKE 'reprovado%' THEN 1 END) * 100.0) / 
                    NULLIF(COUNT(*), 0), 2) as taxa_reprovacao
            FROM historico_academico 
            GROUP BY disciplina_id
          ) stats ON d.id = stats.disciplina_id
          WHERE d.ativa = true
        `),
        pool.query(`
          SELECT p.disciplina_id as target, p.prerequisito_id as source
          FROM prerequisitos p
        `)
      ]);
      
      const nodes = disciplinas.rows.map(d => ({
        id: d.id,
        label: d.nome,
        tipo: 'disciplina',
        status: 'disponivel',
        dados: {
          codigo: d.codigo,
          taxa_reprovacao: parseFloat(d.taxa_reprovacao)
        }
      }));
      
      const edges = prerequisitos.rows.map((p, index) => ({
        id: `e${index}`,
        source: p.source,
        target: p.target,
        tipo: 'prerequisito',
        peso: 1
      }));
      
      res.json({ nodes, edges });
    } else {
      res.json({ nodes: [], edges: [] });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Teste: http://localhost:${PORT}/api/test`);
});