@echo off
echo Setting up SIGA-UnDF Database with comprehensive data...
echo.

echo Starting Docker containers...
docker-compose up -d

echo Waiting for PostgreSQL to be ready...
timeout /t 10

echo Creating database schema...
psql -h localhost -U siga_user -d siga_undf -f schema.sql

echo Inserting seed data...
psql -h localhost -U siga_user -d siga_undf -f seed_data.sql

echo Adding additional comprehensive data...
psql -h localhost -U siga_user -d siga_undf -f additional_data.sql

echo.
echo Database setup complete!
echo.
echo You can now:
echo - Access PgAdmin at http://localhost:8080 (admin@siga.undf.br / admin123)
echo - Access Neo4j at http://localhost:7474 (neo4j / siga_password)
echo - Start the backend server: cd ../backend && node server.js
echo - Start the frontend: cd .. && npm run dev
echo.
pause