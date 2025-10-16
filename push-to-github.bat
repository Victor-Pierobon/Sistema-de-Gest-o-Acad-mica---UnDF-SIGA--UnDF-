@echo off
echo Digite a URL do seu repositorio GitHub:
set /p REPO_URL="URL: "
git remote add origin %REPO_URL%
git push -u origin main
echo.
echo Repositorio enviado com sucesso!
echo Agora va em Settings > Pages no GitHub para ativar o GitHub Pages
pause