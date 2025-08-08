// Netlify function for API endpoints
const MultiUserSlackTimeTracker = require('../../multi-user-tracker');
const config = require('../../config');

// Initialize tracker
let tracker = null;

async function initializeTracker() {
  if (!tracker) {
    tracker = new MultiUserSlackTimeTracker(config);
    await tracker.initialize();
  }
  return tracker;
}

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };

  try {
    const path = event.path.replace('/.netlify/functions/api', '');
    
    if (path === '/status') {
      const tracker = await initializeTracker();
      const status = await tracker.getCurrentStatus();
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(status)
      };
    } else if (path.startsWith('/user/')) {
      const userId = path.split('/')[2];
      const tracker = await initializeTracker();
      const userData = await tracker.getUserData(userId);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(userData)
      };
    } else {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Endpoint not found' })
      };
    }
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      })
    };
  }
};
