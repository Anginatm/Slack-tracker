@echo off
echo 🚀 Starting Slack Time Tracker Dashboards...
echo.

echo 📋 Checking if Node.js is installed...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found
echo.

echo 📦 Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
) else (
    echo ✅ Dependencies already installed
)

echo.
echo 🌐 Starting web server...
echo.
echo 📊 Available Dashboards:
echo   • Team Overview: http://localhost:3000
echo   • Individual: http://localhost:3000/individual
echo   • Status Page: http://localhost:3000/status
echo   • Test Server: http://localhost:3000/test-server
echo.
echo 🔧 Troubleshooting:
echo   • If dashboards don't load, visit: http://localhost:3000/test-server
echo   • Check browser console (F12) for errors
echo   • Press Ctrl+C to stop the server
echo.

npm run dev
