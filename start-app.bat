@echo off
echo ========================================
echo    Digital Toolbox - Starting Up
echo ========================================
echo.

REM Set Node.js path
set PATH=%PATH%;"C:\Program Files\nodejs"

REM Check if Node.js is available
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not available
    pause
    exit /b 1
)

echo Starting Backend Server...
start "Backend Server" cmd /k "cd /d %~dp0 && set PATH=%PATH%;\"C:\Program Files\nodejs\" && node server/index.js"

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d %~dp0\client && set PATH=%PATH%;\"C:\Program Files\nodejs\" && npm run dev"

echo.
echo ========================================
echo    Applications Starting...
echo ========================================
echo Backend:  http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Press any key to open the application...
pause >nul

start http://localhost:3000

echo.
echo Applications are running in separate windows.
echo Close those windows to stop the servers.
echo.
pause
