// Frontend Configuration
// Update this file with your backend EC2 URL after deployment

const config = {
  // Backend API URL - Update this with your EC2 instance URL
  backendUrl: 'http://your-ec2-ip:3000',
  
  // Alternative: Use environment variable if available
  // backendUrl: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000',
  
  // API endpoints
  endpoints: {
    data: '/api/data',
    status: '/api/status',
    report: '/api/report',
    users: '/api/users',
    userData: '/api/user',
    startTracking: '/api/start-tracking',
    stopTracking: '/api/stop-tracking'
  },
  
  // Dashboard settings
  dashboard: {
    refreshInterval: 30000, // 30 seconds
    maxDataPoints: 100,
    dateFormat: 'YYYY-MM-DD'
  },
  
  // UI settings
  ui: {
    theme: 'light', // 'light' or 'dark'
    language: 'en',
    timezone: 'UTC'
  }
};

// Helper function to get full API URL
function getApiUrl(endpoint) {
  return `${config.backendUrl}${endpoint}`;
}

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { config, getApiUrl };
} else {
  // Browser environment
  window.appConfig = config;
  window.getApiUrl = getApiUrl;
}
