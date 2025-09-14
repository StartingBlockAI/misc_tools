@echo off
echo ========================================
echo    Digital Toolbox - Status Check
echo ========================================
echo.

echo Checking Backend (http://localhost:3001)...
curl -s http://localhost:3001/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Backend is running
    curl -s http://localhost:3001/api/health
) else (
    echo ✗ Backend is not running
)

echo.
echo Checking Frontend (http://localhost:3000)...
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Frontend is running
) else (
    echo ✗ Frontend is not running
)

echo.
echo Checking Python/Streamlit (http://localhost:8501)...
curl -s http://localhost:8501 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Streamlit app is running
) else (
    echo ✗ Streamlit app is not running
)

echo.
pause
