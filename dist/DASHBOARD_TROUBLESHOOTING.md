# 🔧 Dashboard Troubleshooting Guide

## 🚨 Issue: Team Overview and Individual Dashboards Not Showing

### Quick Fix Steps

1. **Start the Server**
   ```bash
   # Option 1: Use the startup script
   ./start-dashboards.bat
   
   # Option 2: Manual start
   npm run dev
   
   # Option 3: Direct start
   node web-server.js web
   ```

2. **Check Server Status**
   - Look for: `🌐 Dashboard available at: http://localhost:3000`
   - If not running, check terminal for errors

3. **Test Server Connection**
   - Visit: `http://localhost:3000/test-server`
   - This will test all API endpoints and show what's working

### 📊 Available Dashboard URLs

| Dashboard | URL | Purpose |
|-----------|-----|---------|
| **Team Overview** | `http://localhost:3000/` | **Main dashboard with all users** |
| Individual | `http://localhost:3000/individual` | Single user tracking |
| Status Page | `http://localhost:3000/status` | System status overview |
| Test Server | `http://localhost:3000/test-server` | **Troubleshooting page** |
| Mobile | `http://localhost:3000/mobile` | Mobile-optimized view |

### 🔍 Common Issues & Solutions

#### Issue 1: "Cannot connect to server"
**Symptoms:**
- Browser shows "This site can't be reached"
- Connection refused error

**Solutions:**
1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Check if port 3000 is in use:**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   
   # Kill process if needed
   taskkill /PID <process_id> /F
   ```

3. **Try different port:**
   ```bash
   node web-server.js web 3001
   ```

#### Issue 2: "Dashboard loads but shows no data"
**Symptoms:**
- Dashboard loads but shows empty charts
- "Loading..." message never disappears

**Solutions:**
1. **Check browser console (F12):**
   - Look for JavaScript errors
   - Check Network tab for failed API calls

2. **Test API endpoints:**
   - Visit: `http://localhost:3000/test-server`
   - Click "Test All APIs" button

3. **Check if tracking is running:**
   ```bash
   # Check if multi-user tracking is active
   npm run multi-status
   
   # Start tracking if needed
   npm run multi-start
   ```

#### Issue 3: "API endpoints returning errors"
**Symptoms:**
- 404 errors for API calls
- 500 server errors

**Solutions:**
1. **Check API endpoints manually:**
   ```
   http://localhost:3000/api/status
   http://localhost:3000/api/users
   http://localhost:3000/api/data
   ```

2. **Verify server routes:**
   - Check `web-server.js` for route definitions
   - Ensure all API handlers are properly defined

3. **Check environment variables:**
   - Verify `.env` file exists and has correct values
   - Check Slack API token is valid

#### Issue 4: "Charts not displaying"
**Symptoms:**
- Charts show as empty containers
- Chart.js errors in console

**Solutions:**
1. **Check Chart.js loading:**
   - Verify internet connection (Chart.js loads from CDN)
   - Check browser console for Chart.js errors

2. **Check data format:**
   - Verify API returns correct JSON format
   - Check if data arrays are empty

3. **Force refresh:**
   - Press Ctrl+F5 to clear cache
   - Try incognito/private browsing mode

### 🛠️ Advanced Troubleshooting

#### Check Server Logs
```bash
# Start server with verbose logging
DEBUG=* node web-server.js web

# Or check for specific errors
node web-server.js web 2>&1 | grep -i error
```

#### Test Individual Components
1. **Test API endpoints:**
   ```bash
   curl http://localhost:3000/api/status
   curl http://localhost:3000/api/users
   curl http://localhost:3000/api/data
   ```

2. **Test HTML files directly:**
   - Open `all-users-dashboard.html` in browser
   - Check for JavaScript errors

3. **Test with sample data:**
   - Check if `time_logs_*.json` files exist
   - Verify they contain valid JSON data

#### Browser-Specific Issues
1. **Chrome/Edge:**
   - Press F12 → Console tab
   - Look for red error messages
   - Check Network tab for failed requests

2. **Firefox:**
   - Press F12 → Console tab
   - Check Network tab for failed requests

3. **Safari:**
   - Enable Developer menu in Preferences
   - Press Cmd+Option+I for developer tools

### 📋 Diagnostic Checklist

- [ ] Server is running (`npm run dev`)
- [ ] Port 3000 is accessible
- [ ] API endpoints respond (`/api/status`, `/api/users`)
- [ ] No JavaScript errors in browser console
- [ ] Chart.js library loads successfully
- [ ] User data files exist (`time_logs_*.json`)
- [ ] Multi-user tracking is active
- [ ] Environment variables are set correctly

### 🚀 Quick Recovery Steps

1. **Restart everything:**
   ```bash
   # Stop server (Ctrl+C)
   # Clear terminal
   cls
   
   # Restart
   npm run dev
   ```

2. **Clear browser cache:**
   - Press Ctrl+Shift+Delete
   - Clear all data
   - Restart browser

3. **Use test server:**
   - Visit: `http://localhost:3000/test-server`
   - Follow diagnostic steps

4. **Check alternative dashboards:**
   - Try: `http://localhost:3000/status`
   - Try: `http://localhost:3000/mobile`

### 📞 Getting Help

If issues persist:

1. **Collect diagnostic information:**
   - Server logs (terminal output)
   - Browser console errors
   - API endpoint responses
   - Test server results

2. **Check file structure:**
   - Verify all HTML files exist
   - Check `web-server.js` is up to date
   - Ensure `config.js` has correct user data

3. **Common solutions:**
   - Restart server and browser
   - Clear browser cache
   - Check internet connection (for CDN resources)
   - Verify Slack API token is valid

---

**🎯 Most Common Solution:** Start the server with `npm run dev` and visit `http://localhost:3000/test-server` to diagnose issues.
