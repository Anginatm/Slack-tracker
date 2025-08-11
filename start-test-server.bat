@echo off
echo 🚀 Starting Test Server for Dashboard Testing...
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

echo 🌐 Starting test server on port 3000...
echo.
echo 📊 Available URLs:
echo   • Team Dashboard: http://localhost:3000
echo   • Individual Dashboard: http://localhost:3000/individual
echo   • Test Server: http://localhost:3000/test-server
echo   • Status Page: http://localhost:3000/status
echo.
echo 🔧 This test server:
echo   • Doesn't require Slack API
echo   • Uses sample data for testing
echo   • Tests all dashboard functionality
echo.

node test-server.js
