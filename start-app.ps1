# Digital Toolbox - PowerShell Startup Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Digital Toolbox - Starting Up" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Add Node.js to PATH
$env:PATH += ";C:\Program Files\nodejs"

# Check if Node.js is available
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: Node.js is not available" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Start-Process -FilePath "node" -ArgumentList "server/index.js" -WindowStyle Hidden -RedirectStandardOutput "backend.log" -RedirectStandardError "backend-error.log"

Write-Host "Waiting for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
$frontendProcess = Start-Process -FilePath "cmd" -ArgumentList "/c", "cd client && npm run dev" -WindowStyle Hidden -RedirectStandardOutput "frontend.log" -RedirectStandardError "frontend-error.log" -PassThru

Write-Host "Waiting for frontend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   Applications Started Successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Backend:  http://localhost:3001" -ForegroundColor White
Write-Host "Frontend: http://localhost:3000" -ForegroundColor White
Write-Host ""

# Test if services are running
try {
    $backendTest = Invoke-WebRequest -Uri "http://localhost:3001/api/health" -TimeoutSec 5 -UseBasicParsing
    Write-Host "✓ Backend is running" -ForegroundColor Green
} catch {
    Write-Host "⚠ Backend may not be ready yet" -ForegroundColor Yellow
}

try {
    $frontendTest = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5 -UseBasicParsing
    Write-Host "✓ Frontend is running" -ForegroundColor Green
} catch {
    Write-Host "⚠ Frontend may not be ready yet" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Opening application in your browser..." -ForegroundColor Cyan
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "Applications are running in the background." -ForegroundColor White
Write-Host "Check backend.log and frontend.log for any errors." -ForegroundColor Gray
Write-Host ""
Write-Host "Press any key to exit this window (apps will keep running)..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
