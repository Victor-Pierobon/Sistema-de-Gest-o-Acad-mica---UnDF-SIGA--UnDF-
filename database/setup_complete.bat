@echo off
echo ========================================
echo SIGA-UnDF - Setup Completo do Banco
echo ========================================
echo.

echo 1. Parando containers existentes...
docker-compose down -v --remove-orphans

echo.
echo 2. Iniciando containers Docker...
docker-compose up -d

echo.
echo 3. Aguardando PostgreSQL inicializar...
timeout /t 15

echo.
echo 4. Criando schema completo...
psql -h localhost -U siga_user -d siga_undf -f complete_schema.sql

echo.
echo 5. Populando com dados completos...
psql -h localhost -U siga_user -d siga_undf -f complete_data.sql

echo.
echo 6. Verificando dados inseridos...
psql -h localhost -U siga_user -d siga_undf -c "SELECT 'Usuarios:' as tabela, count(*) as total FROM usuarios UNION ALL SELECT 'Alunos:', count(*) FROM alunos UNION ALL SELECT 'Disciplinas:', count(*) FROM disciplinas UNION ALL SELECT 'Historico:', count(*) FROM historico_academico UNION ALL SELECT 'Solicitacoes:', count(*) FROM solicitacoes_recuperacao;"

echo.
echo ========================================
echo Setup completo finalizado!
echo ========================================
echo.
echo Servicos disponiveis:
echo - PostgreSQL: localhost:5432
echo - PgAdmin: http://localhost:8080
echo - Neo4j: http://localhost:7474
echo.
echo Proximos passos:
echo 1. cd ../backend && node server.js
echo 2. cd .. && npm run dev
echo.
pause