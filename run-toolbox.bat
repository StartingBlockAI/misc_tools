@echo off
title Digital Toolbox
echo ========================================
echo    Digital Toolbox
echo ========================================

REM Set Node.js path
set PATH=%PATH%;"C:\Program Files\nodejs"

REM Check if already running
echo Checking if services are already running...
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Frontend already running at http://localhost:3000
    goto :open
)

curl -s http://localhost:3001/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Backend already running at http://localhost:3001
    goto :open
)

REM Start services
echo Starting services...
start "Backend" cmd /k "cd /d %~dp0 && node server/index.js"
start "Frontend" cmd /k "cd /d %~dp0\client && npm run dev"

echo.
echo ✓ Services starting...
echo ✓ Backend: http://localhost:3001
echo ✓ Frontend: http://localhost:3000
echo.
echo Opening browser in 5 seconds...

:open
timeout /t 5 /nobreak >nul
start http://localhost:3000
echo.
echo Press any key to close this window...
pause >nul
