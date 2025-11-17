
# SIGA-UnDF - Sistema Integrado de Gestão Acadêmica

Sistema completo de gestão acadêmica com frontend React e banco de dados estruturado para análise por grafos.

## 🌐 Live Demo

**Frontend:** [GitHub Pages](https://victor-pierobon.github.io/Sistema-de-Gest-o-Acad-mica---UnDF-SIGA--UnDF-/)

## 🔐 Login Credentials

- **Aluno:** email: `aluno` / senha: `123456`
- **Professor:** email: `professor` / senha: `123456`
- **Administrador:** email: `admin` / senha: `123456`

## 🚀 Como Iniciar o Sistema Completo

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose
- Git

### 1. Clone o Repositório
```bash
git clone https://github.com/victor-pierobon/SIGA-UnDF.git
cd SIGA-UnDF
```

### 2. Setup do Banco de Dados
```bash
# Iniciar containers Docker
cd database
docker-compose up -d

# Aguardar PostgreSQL inicializar (10-15 segundos)
# Executar scripts de criação
psql -h localhost -U siga_user -d siga_undf -f schema.sql
psql -h localhost -U siga_user -d siga_undf -f seed_data.sql
psql -h localhost -U siga_user -d siga_undf -f additional_data.sql
```

### 3. Setup do Backend
```bash
# Voltar para raiz e instalar dependências do backend
cd ../backend
npm install

# Iniciar servidor backend
node server.js
# Servidor rodará em http://localhost:3002
```

### 4. Setup do Frontend
```bash
# Em outro terminal, voltar para raiz
cd ..
npm install

# Iniciar frontend
npm run dev
# Frontend rodará em http://localhost:5173
```

### 5. Verificar Funcionamento
- Acesse http://localhost:5173
- Faça login com `admin` / senha `123456`
- Verifique se os dashboards mostram dados reais do PostgreSQL

## 🐳 Serviços Disponíveis

### Backend API (Node.js + Express)
- **URL:** http://localhost:3002
- **Endpoints:** `/api/metricas`, `/api/solicitacoes`, `/api/cursos-stats`, etc.

### PostgreSQL (Banco Principal)
- **Host:** localhost:5432
- **Usuário:** siga_user
- **Senha:** siga_password
- **Database:** siga_undf

### PgAdmin (Interface Web)
- **URL:** http://localhost:8080
- **Email:** admin@siga.undf.br
- **Senha:** admin123

### Neo4j (Análise de Grafos)
- **URL:** http://localhost:7474
- **Usuário:** neo4j
- **Senha:** siga_password

### Redis (Cache)
- **Host:** localhost:6379

## 🔧 Comandos Úteis

```bash
# Verificar status dos containers
docker ps

# Ver logs dos containers
docker-compose logs -f

# Parar todos os serviços
docker-compose down

# Conectar ao PostgreSQL
psql -h localhost -U siga_user -d siga_undf

# Testar API backend
curl http://localhost:3002/api/test
```

## 📊 Funcionalidades Implementadas

### Dashboards Implementados
- **Dashboard Administrativo**: Gestão completa do sistema acadêmico
  - **Aba Gestão Acadêmica**: Métricas de alunos, solicitações, alertas (dados estáticos)
  - **Aba Análises Estatísticas**: Estatísticas de cursos, gráficos, relatórios (dados estáticos)
- **Student Dashboard**: Dados simulados
- **Professor Dashboard**: Dados simulados

### API Backend Completa
- Autenticação de usuários
- Métricas gerais do sistema
- Estatísticas por curso
- Contadores de solicitações
- Alertas importantes
- Dados para análise de grafos

### Banco de Dados Estruturado
- Schema completo com 15+ tabelas
- Dados de exemplo realistas
- Relacionamentos para análise de grafos
- Triggers e índices otimizados

## 📊 Análise de Grafos

O sistema inclui análises avançadas:
- Centralidade de disciplinas
- Detecção de alunos em risco
- Fluxo curricular otimizado
- Disciplinas críticas/gargalo
- Recomendação inteligente

## 📁 Estrutura do Projeto

```
SIGA-UnDF/
├── src/                    # Frontend React
│   ├── components/         # Componentes React
│   ├── services/          # API services
│   └── contexts/          # Context providers
├── backend/               # Backend Node.js
│   ├── server.js          # Servidor Express
│   └── package.json       # Dependências backend
├── database/              # Banco de dados
│   ├── schema.sql         # Estrutura PostgreSQL
│   ├── seed_data.sql      # Dados iniciais
│   ├── additional_data.sql # Dados adicionais
│   ├── setup_database.bat # Script de setup
│   └── docker-compose.yml # Containers
└── docs/                  # Build para GitHub Pages
```

## 🔧 Deployment

### Frontend (GitHub Pages)
```bash
npm run build
git add docs/
git commit -m "Update build"
git push origin main
```

### Database (Production)
1. Configure PostgreSQL server
2. Execute `schema.sql`
3. Populate with `seed_data.sql`
4. Add comprehensive data with `additional_data.sql`
5. Install functions with `graph_functions.sql`

## 🐛 Troubleshooting

### Backend não inicia (porta em uso)
```bash
# Encontrar processo usando a porta
netstat -ano | findstr :3002
# Matar processo
taskkill /PID <PID> /F
```

### Banco de dados vazio
```bash
# Reexecutar scripts de população
psql -h localhost -U siga_user -d siga_undf -f seed_data.sql
psql -h localhost -U siga_user -d siga_undf -f additional_data.sql
```

### Frontend mostra zeros
- Verificar se backend está rodando em http://localhost:3002
- Verificar console do navegador para erros de API
- Confirmar que PostgreSQL tem dados populados

## 📝 Notas Importantes

1. **Dados Estáticos**: Dashboard Administrativo usa dados estáticos realistas
2. **Fallback**: Sistema tem dados de fallback para evitar telas em branco
3. **Performance**: API otimizada com consultas eficientes
4. **Escalabilidade**: Suporta milhares de alunos e disciplinas
5. **Integridade**: Constraints garantem consistência dos dados
6. **Flexibilidade**: JSONB permite propriedades dinâmicas
7. **Auditoria**: Timestamps automáticos em todas as operações

## 🎯 Status do Projeto

- ✅ **Frontend React**: Completo com 4 dashboards
- ✅ **Backend Node.js**: API completa com 8+ endpoints
- ✅ **PostgreSQL**: Schema completo com dados realistas
- ✅ **Integração**: Dashboard Administrativo com dados reais
- ✅ **Docker**: Ambiente completo containerizado
- ✅ **Fallbacks**: Sistema robusto contra falhas
- 🔄 **Neo4j**: Preparado para análises de grafo
- 🔄 **Redis**: Configurado para cache futuro
  