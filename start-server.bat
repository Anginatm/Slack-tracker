@echo off
echo 🚀 Starting Slack Time Tracker Server...
echo.

echo 📋 Checking Node.js...
node --version
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found
echo.

echo 📦 Installing dependencies if needed...
npm install

echo.
echo 🌐 Starting web server on port 3000...
echo.
echo 📊 Available URLs:
echo   • Team Dashboard: http://localhost:3000
echo   • Individual Dashboard: http://localhost:3000/individual
echo   • Test Server: http://localhost:3000/test-server
echo   • Status Page: http://localhost:3000/status
echo.
echo 🔧 If you see errors, check:
echo   • .env file exists with Slack token
echo   • Port 3000 is not in use
echo   • Internet connection (for dependencies)
echo.

node web-server.js web 3000
