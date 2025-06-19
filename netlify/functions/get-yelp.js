const yelp = require('yelp-fusion');

exports.handler = async (event, context) => {
  // Set CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get API key from environment variables
    const apiKey = process.env.YELP_API_KEY;
    
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'YELP_API_KEY environment variable not configured' })
      };
    }

    // Create Yelp API client
    const client = yelp.client(apiKey);

    // Extract query parameters
    const { queryStringParameters } = event;
    
    if (!queryStringParameters) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing query parameters' })
      };
    }

    const {
      term = 'healthy food',
      latitude,
      longitude
    } = queryStringParameters;

    // Validate required parameters
    if (!latitude || !longitude) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required parameters: latitude and longitude are required' 
        })
      };
    }

    // Validate latitude and longitude are valid numbers
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid latitude or longitude: must be valid numbers' 
        })
      };
    }

    // Validate latitude and longitude ranges
    if (lat < -90 || lat > 90) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid latitude: must be between -90 and 90' 
        })
      };
    }

    if (lng < -180 || lng > 180) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid longitude: must be between -180 and 180' 
        })
      };
    }

    // Call Yelp API
    const searchRequest = {
      term: term.trim(),
      latitude: lat,
      longitude: lng,
      limit: 10
    };

    console.log('Searching Yelp with parameters:', searchRequest);

    const response = await client.search(searchRequest);

    // Return the businesses array
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.jsonBody.businesses)
    };

  } catch (error) {
    console.error('Yelp API Error:', error);

    // Handle specific Yelp API errors
    if (error.statusCode) {
      return {
        statusCode: error.statusCode,
        headers,
        body: JSON.stringify({ 
          error: `Yelp API Error: ${error.message}`,
          details: error.response?.body || 'No additional details available'
        })
      };
    }

    // Handle general errors
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