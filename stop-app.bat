@echo off
echo ========================================
echo    Digital Toolbox - Stopping Apps
echo ========================================
echo.

echo Stopping all Node.js processes...
taskkill /f /im node.exe >nul 2>&1

echo Stopping any remaining processes...
taskkill /f /im cmd.exe /fi "WINDOWTITLE eq Backend Server*" >nul 2>&1
taskkill /f /im cmd.exe /fi "WINDOWTITLE eq Frontend Server*" >nul 2>&1

echo.
echo All applications stopped.
echo.
pause
