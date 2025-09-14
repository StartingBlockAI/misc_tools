@echo off
echo ========================================
echo    Digital Toolbox - Starting Silently
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

echo Starting Backend Server (silent)...
start /B "" node server/index.js > backend.log 2>&1

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting Frontend Server (silent)...
start /B "" cmd /c "cd client && npm run dev" > frontend.log 2>&1

echo Waiting for frontend to start...
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo    Applications Started Successfully!
echo ========================================
echo Backend:  http://localhost:3001
echo Frontend: http://localhost:3000
echo.
echo Opening application in your browser...
start http://localhost:3000

echo.
echo Applications are running in the background.
echo Check backend.log and frontend.log for any errors.
echo.
echo Press any key to exit this window (apps will keep running)...
pause >nul
