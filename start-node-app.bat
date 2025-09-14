@echo off
echo ========================================
echo    Digital Toolbox - Node.js Version
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is available
npm --version >nul 2>&1
if errorlevel 1 (
    echo Error: npm is not available
    pause
    exit /b 1
)

echo Installing dependencies...
call npm run install-all
if errorlevel 1 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Starting Digital Toolbox...
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:3001
echo.
echo Press Ctrl+C to stop the application
echo.

call npm run dev

pause
