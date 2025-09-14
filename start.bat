@echo off
set PATH=%PATH%;"C:\Program Files\nodejs"
start /B "" node server/index.js
timeout /t 2 /nobreak >nul
start /B "" cmd /c "cd client && npm run dev"
timeout /t 3 /nobreak >nul
start http://localhost:3000
echo Digital Toolbox started! Frontend: http://localhost:3000
