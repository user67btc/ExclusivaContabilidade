@echo off
echo ========================================
echo  INICIANDO SERVIDOR DE DESENVOLVIMENTO
echo ========================================
echo.
echo Diretorio: %CD%
echo Hora: %DATE% %TIME%
echo.

cd /d "C:\Users\erick\CascadeProjects\ExclusivaNextjs"

echo Verificando Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERRO: Node.js nao encontrado!
    pause
    exit /b 1
)

echo.
echo Verificando NPM...
npm --version
if %errorlevel% neq 0 (
    echo ERRO: NPM nao encontrado!
    pause
    exit /b 1
)

echo.
echo Limpando cache do Next.js...
if exist ".next" rmdir /s /q ".next"

echo.
echo Instalando dependencias...
npm install

echo.
echo ========================================
echo  INICIANDO NEXT.JS DEV SERVER
echo ========================================
echo.
echo Acesse: http://localhost:3000
echo Para parar: Ctrl+C
echo.

npm run dev

pause
