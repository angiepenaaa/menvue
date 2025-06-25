const yelp = require('yelp-fusion');

exports.handler = async (event, context) => {
  console.log('🚀 Yelp function called with method:', event.httpMethod);
  console.log('🚀 Query parameters:', event.queryStringParameters);
  console.log('🚀 Environment check - YELP_API_KEY exists:', !!process.env.YELP_API_KEY);
  
  // Set CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    console.log('✅ Handling OPTIONS request');
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    console.log('❌ Method not allowed:', event.httpMethod);
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
      console.error('❌ YELP_API_KEY not found in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'YELP_API_KEY environment variable not configured' })
      };
    }

    console.log('✅ YELP_API_KEY found, creating client...');
    // Create Yelp API client
    const client = yelp.client(apiKey);

    // Extract query parameters
    const { queryStringParameters } = event;
    
    if (!queryStringParameters) {
      console.log('❌ Missing query parameters');
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

    console.log('🔍 Search parameters:', { term, latitude, longitude });
    // Validate required parameters
    if (!latitude || !longitude) {
      console.log('❌ Missing latitude or longitude');
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
      console.log('❌ Invalid lat/lng values:', { lat, lng });
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
      console.log('❌ Latitude out of range:', lat);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid latitude: must be between -90 and 90' 
        })
      };
    }

    if (lng < -180 || lng > 180) {
      console.log('❌ Longitude out of range:', lng);
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

    console.log('🔍 Searching Yelp with parameters:', searchRequest);

    try {
      const response = await client.search(searchRequest);
      console.log('✅ Yelp API response received, businesses count:', response.jsonBody.businesses?.length || 0);
      
      // Return the businesses array
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(response.jsonBody.businesses || [])
      };
    } catch (yelpError) {
      console.error('❌ Yelp API Error:', yelpError);
      
      // Handle specific Yelp API errors
      if (yelpError.statusCode) {
        return {
          statusCode: yelpError.statusCode,
          headers,
          body: JSON.stringify({ 
            error: `Yelp API Error: ${yelpError.message}`,
            details: yelpError.response?.body || 'No additional details available'
          })
        };
      }
      
      throw yelpError;
    }


  } catch (error) {
    console.error('❌ General Error:', error);

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