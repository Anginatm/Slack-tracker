// test-server.js - Simple test server for dashboard testing
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

class TestServer {
  constructor(port = 3000) {
    this.port = port;
  }

  async start() {
    const server = http.createServer(async (req, res) => {
      await this.handleRequest(req, res);
    });

    server.listen(this.port, () => {
      console.log(`🌐 Test Server running at: http://localhost:${this.port}`);
      console.log(`📊 Available dashboards:`);
      console.log(`   • Team Overview: http://localhost:${this.port}/`);
      console.log(`   • Individual: http://localhost:${this.port}/individual`);
      console.log(`   • Test Page: http://localhost:${this.port}/test-server`);
      console.log(`   • Status: http://localhost:${this.port}/status`);
    });
  }

  async handleRequest(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const url = new URL(req.url, `http://localhost:${this.port}`);
    const pathname = url.pathname;

    try {
      if (pathname === '/') {
        await this.serveAllUsersDashboard(res);
      } else if (pathname === '/individual') {
        await this.serveDashboard(res);
      } else if (pathname === '/test-server') {
        await this.serveTestServer(res);
      } else if (pathname === '/status') {
        await this.serveStatusPage(res);
      } else if (pathname === '/api/status') {
        await this.serveStatusAPI(res);
      } else if (pathname === '/api/users') {
        await this.serveUsersAPI(res);
      } else if (pathname === '/api/data') {
        await this.serveDataAPI(res);
      } else if (pathname.startsWith('/api/user/')) {
        await this.serveUserDataAPI(res, pathname);
      } else {
        this.serve404(res);
      }
    } catch (error) {
      console.error('Server error:', error);
      this.serveError(res, error);
    }
  }

  async serveAllUsersDashboard(res) {
    try {
      const htmlPath = path.join(__dirname, 'all-users-dashboard.html');
      const html = await fs.readFile(htmlPath, 'utf8');
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } catch (error) {
      this.serveError(res, error);
    }
  }

  async serveDashboard(res) {
    try {
      const htmlPath = path.join(__dirname, 'tracker.html');
      const html = await fs.readFile(htmlPath, 'utf8');
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } catch (error) {
      this.serveError(res, error);
    }
  }

  async serveTestServer(res) {
    try {
      const htmlPath = path.join(__dirname, 'test-server.html');
      const html = await fs.readFile(htmlPath, 'utf8');
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } catch (error) {
      this.serveError(res, error);
    }
  }

  async serveStatusPage(res) {
    try {
      const htmlPath = path.join(__dirname, 'status.html');
      const html = await fs.readFile(htmlPath, 'utf8');
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(html);
    } catch (error) {
      this.serveError(res, error);
    }
  }

  async serveStatusAPI(res) {
    const status = {
      status: 'running',
      timestamp: new Date().toISOString(),
      message: 'Test server is running successfully',
      version: '1.0.0'
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(status, null, 2));
  }

  async serveUsersAPI(res) {
    const users = [
      {
        id: 'U06CQAKLWG4',
        name: 'Satyam Vatsa',
        dataFile: 'time_logs_satyam.json'
      },
      {
        id: 'U093DD1BKAB',
        name: 'Himani',
        dataFile: 'time_logs_himani.json'
      },
      {
        id: 'U083UEN46P8',
        name: 'Taran',
        dataFile: 'time_logs_taran.json'
      },
      {
        id: 'U071V3GDRQ9',
        name: 'Ravneet Singh',
        dataFile: 'time_logs_ravneet.json'
      },
      {
        id: 'U0927DWEX1Q',
        name: 'Manish Kumar Shah',
        dataFile: 'time_logs_manish.json'
      }
    ];
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users, null, 2));
  }

  async serveDataAPI(res) {
    try {
      // Try to load existing time logs or return empty data
      const dataFiles = [
        'time_logs_satyam.json',
        'time_logs_himani.json',
        'time_logs_taran.json',
        'time_logs_ravneet.json',
        'time_logs_manish.json'
      ];

      const allData = {};
      
      for (const file of dataFiles) {
        try {
          const filePath = path.join(__dirname, file);
          const data = await fs.readFile(filePath, 'utf8');
          const userId = file.replace('time_logs_', '').replace('.json', '');
          allData[userId] = JSON.parse(data);
        } catch (error) {
          // If file doesn't exist, create sample data
          const userId = file.replace('time_logs_', '').replace('.json', '');
          allData[userId] = this.generateSampleData();
        }
      }
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(allData, null, 2));
    } catch (error) {
      this.serveError(res, error);
    }
  }

  async serveUserDataAPI(res, pathname) {
    try {
      const userId = pathname.split('/')[3]; // /api/user/{userId}/data
      const dataFile = `time_logs_${userId}.json`;
      
      try {
        const filePath = path.join(__dirname, dataFile);
        const data = await fs.readFile(filePath, 'utf8');
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      } catch (error) {
        // If file doesn't exist, return sample data
        const sampleData = this.generateSampleData();
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(sampleData, null, 2));
      }
    } catch (error) {
      this.serveError(res, error);
    }
  }

  generateSampleData() {
    const today = new Date().toISOString().split('T')[0];
    return [
      {
        timestamp: `${today}T09:00:00.000Z`,
        presence: 'active',
        status: 'Working on project',
        duration_from_last: 30,
        project: 'Development'
      },
      {
        timestamp: `${today}T09:30:00.000Z`,
        presence: 'active',
        status: 'In meeting',
        duration_from_last: 60,
        project: 'Meetings'
      },
      {
        timestamp: `${today}T10:30:00.000Z`,
        presence: 'away',
        status: 'Break',
        duration_from_last: 15,
        project: 'Break'
      }
    ];
  }

  serve404(res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`
      <h1>404 - Not Found</h1>
      <p>Available endpoints:</p>
      <ul>
        <li><a href="/">Team Dashboard</a></li>
        <li><a href="/individual">Individual Dashboard</a></li>
        <li><a href="/test-server">Test Server</a></li>
        <li><a href="/status">Status Page</a></li>
        <li><a href="/api/status">Status API</a></li>
        <li><a href="/api/users">Users API</a></li>
        <li><a href="/api/data">Data API</a></li>
      </ul>
    `);
  }

  serveError(res, error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      error: 'Internal server error',
      message: error.message 
    }));
  }
}

// Start the server
const server = new TestServer(3000);
server.start().catch(console.error);
