Write-Host "🚀 Starting Slack Time Tracker Dashboards..." -ForegroundColor Green
Write-Host ""

Write-Host "📋 Checking if Node.js is installed..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "📦 Checking dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "🌐 Starting web server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "📊 Available Dashboards:" -ForegroundColor Cyan
Write-Host "  • Team Overview: http://localhost:3000" -ForegroundColor White
Write-Host "  • Individual: http://localhost:3000/individual" -ForegroundColor White
Write-Host "  • Status Page: http://localhost:3000/status" -ForegroundColor White
Write-Host "  • Test Server: http://localhost:3000/test-server" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Troubleshooting:" -ForegroundColor Yellow
Write-Host "  • If dashboards don't load, visit: http://localhost:3000/test-server" -ForegroundColor White
Write-Host "  • Check browser console (F12) for errors" -ForegroundColor White
Write-Host "  • Press Ctrl+C to stop the server" -ForegroundColor White
Write-Host ""

npm run dev
