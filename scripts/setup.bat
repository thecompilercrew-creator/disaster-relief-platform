@echo off
echo ======================================
echo 🆘 Disaster Relief Platform – Setup
echo ======================================

:: Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed.
    echo ➡️  Please install Node.js (v18+) first.
    pause
    exit /b
)

echo ✅ Node.js detected
node -v

:: Backend setup
echo.
echo 📦 Setting up backend...
cd backend

if not exist .env (
    if exist .env.example (
        copy .env.example .env
        echo ⚠️  .env created from .env.example
        echo ➡️  Please update environment variables.
    ) else (
        echo ❌ .env.example not found!
    )
)

npm install
echo ✅ Backend dependencies installed.

:: Frontend info
cd ..\frontend
echo.
echo 🎨 Frontend ready (static files).

:: Final message
echo.
echo ======================================
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Edit backend\.env
echo 2. Start backend:
echo    cd backend ^&^& npm start
echo.
echo Frontend:
echo Open frontend\index.html in browser
echo ======================================
pause
