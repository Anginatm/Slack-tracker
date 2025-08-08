// Vercel serverless function for Slack Time Tracker
const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const MultiUserSlackTimeTracker = require('../multi-user-tracker');
const config = require('../config');

// Initialize tracker
let tracker = null;

async function initializeTracker() {
  if (!tracker) {
    tracker = new MultiUserSlackTimeTracker(config);
    await tracker.initialize();
  }
  return tracker;
}

// Handle different routes
async function handleRequest(req, res) {
  const url = new URL(req.url, `https://${req.headers.host}`);
  const pathname = url.pathname;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    if (pathname === '/') {
      await serveAllUsersDashboard(res);
    } else if (pathname === '/individual') {
      await serveIndividualDashboard(res);
    } else if (pathname === '/api/status') {
      await serveCurrentStatus(res);
    } else if (pathname.startsWith('/api/user/')) {
      await serveUserData(res, pathname);
    } else {
      serve404(res);
    }
  } catch (error) {
    console.error('Server error:', error);
    serveError(res, error);
  }
}

async function serveAllUsersDashboard(res) {
  try {
    const htmlPath = path.join(process.cwd(), 'all-users-dashboard.html');
    const html = await fs.readFile(htmlPath, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } catch (error) {
    serveError(res, error);
  }
}

async function serveIndividualDashboard(res) {
  try {
    const htmlPath = path.join(process.cwd(), 'tracker.html');
    const html = await fs.readFile(htmlPath, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  } catch (error) {
    serveError(res, error);
  }
}

async function serveCurrentStatus(res) {
  try {
    const tracker = await initializeTracker();
    const status = await tracker.getCurrentStatus();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(status));
  } catch (error) {
    serveError(res, error);
  }
}

async function serveUserData(res, pathname) {
  try {
    const userId = pathname.split('/')[3]; // /api/user/{userId}/data
    const tracker = await initializeTracker();
    const userData = await tracker.getUserData(userId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(userData));
  } catch (error) {
    serveError(res, error);
  }
}

function serve404(res) {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end(`
    <h1>404 - Not Found</h1>
    <p>Available endpoints:</p>
    <ul>
      <li><a href="/">Team Dashboard</a></li>
      <li><a href="/individual">Individual Dashboard</a></li>
      <li><a href="/api/status">Current status</a></li>
    </ul>
  `);
}

function serveError(res, error) {
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ 
    error: 'Internal server error',
    message: error.message 
  }));
}

// Vercel serverless function export
module.exports = async (req, res) => {
  await handleRequest(req, res);
};
