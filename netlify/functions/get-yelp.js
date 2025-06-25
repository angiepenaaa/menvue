const yelp = require('yelp-fusion');

exports.handler = async (event, context) => {
  console.log('🚀 Yelp function called with method:', event.httpMethod);
  console.log('🚀 Query parameters:', event.queryStringParameters);
  console.log('🚀 Environment check - YELP_API_KEY exists:', !!process.env.YELP_API_KEY);
  
  // Set comprehensive CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization, X-Requested-With',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    console.log('✅ Handling OPTIONS preflight request');
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
      body: JSON.stringify({ 
        error: 'Method not allowed',
        allowedMethods: ['GET', 'OPTIONS']
      })
    };
  }

  try {
    // Get API key from environment variables
    const apiKey = process.env.YELP_API_KEY;
    
    if (!apiKey) {
      console.error('❌ YELP_API_KEY not found in environment variables');
      console.error('Available env vars:', Object.keys(process.env).filter(key => key.includes('YELP')));
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'YELP_API_KEY environment variable not configured',
          hint: 'Please set YELP_API_KEY in your Netlify environment variables'
        })
      };
    }

    console.log('✅ YELP_API_KEY found, creating client...');
    
    // Create Yelp API client with error handling
    let client;
    try {
      client = yelp.client(apiKey);
    } catch (clientError) {
      console.error('❌ Failed to create Yelp client:', clientError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to initialize Yelp API client',
          details: clientError.message
        })
      };
    }

    // Extract and validate query parameters
    const { queryStringParameters } = event;
    
    if (!queryStringParameters) {
      console.log('❌ Missing query parameters');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing query parameters',
          required: ['latitude', 'longitude'],
          optional: ['term']
        })
      };
    }

    const {
      term = 'healthy food',
      latitude,
      longitude,
      limit = '10'
    } = queryStringParameters;

    console.log('🔍 Search parameters:', { term, latitude, longitude, limit });

    // Validate required parameters
    if (!latitude || !longitude) {
      console.log('❌ Missing latitude or longitude');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required parameters: latitude and longitude are required',
          received: { latitude: !!latitude, longitude: !!longitude }
        })
      };
    }

    // Validate and parse coordinates
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const searchLimit = Math.min(parseInt(limit) || 10, 50); // Cap at 50

    if (isNaN(lat) || isNaN(lng)) {
      console.log('❌ Invalid lat/lng values:', { latitude, longitude, parsed: { lat, lng } });
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid latitude or longitude: must be valid numbers',
          received: { latitude, longitude }
        })
      };
    }

    // Validate coordinate ranges
    if (lat < -90 || lat > 90) {
      console.log('❌ Latitude out of range:', lat);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid latitude: must be between -90 and 90',
          received: lat
        })
      };
    }

    if (lng < -180 || lng > 180) {
      console.log('❌ Longitude out of range:', lng);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid longitude: must be between -180 and 180',
          received: lng
        })
      };
    }

    // Prepare Yelp API search request
    const searchRequest = {
      term: term.trim(),
      latitude: lat,
      longitude: lng,
      limit: searchLimit,
      radius: 8000, // 5 miles in meters
      sort_by: 'best_match'
    };

    console.log('🔍 Searching Yelp with parameters:', searchRequest);

    // Call Yelp API with comprehensive error handling
    try {
      const startTime = Date.now();
      const response = await client.search(searchRequest);
      const endTime = Date.now();
      
      console.log(`✅ Yelp API response received in ${endTime - startTime}ms`);
      console.log('✅ Businesses count:', response.jsonBody.businesses?.length || 0);
      
      // Validate response structure
      if (!response.jsonBody) {
        console.error('❌ Invalid Yelp API response: missing jsonBody');
        return {
          statusCode: 500,
          headers,
          body: JSON.stringify({ 
            error: 'Invalid response from Yelp API',
            details: 'Missing response body'
          })
        };
      }

      const businesses = response.jsonBody.businesses || [];
      
      // Log some basic stats for monitoring
      console.log('📊 Response stats:', {
        businessCount: businesses.length,
        hasCoordinates: businesses.filter(b => b.coordinates).length,
        hasRatings: businesses.filter(b => b.rating).length,
        avgRating: businesses.length > 0 ? 
          (businesses.reduce((sum, b) => sum + (b.rating || 0), 0) / businesses.length).toFixed(1) : 0
      });
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(businesses)
      };
      
    } catch (yelpError) {
      console.error('❌ Yelp API Error:', yelpError);
      
      // Handle specific Yelp API errors with detailed logging
      if (yelpError.statusCode) {
        console.error('❌ Yelp API Status Code:', yelpError.statusCode);
        console.error('❌ Yelp API Response:', yelpError.response?.body);
        
        return {
          statusCode: yelpError.statusCode,
          headers,
          body: JSON.stringify({ 
            error: `Yelp API Error: ${yelpError.message}`,
            statusCode: yelpError.statusCode,
            details: yelpError.response?.body || 'No additional details available'
          })
        };
      }
      
      // Handle network or other errors
      console.error('❌ Yelp API Network/Other Error:', yelpError.message);
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({ 
          error: 'Yelp API service unavailable',
          message: yelpError.message,
          type: 'network_error'
        })
      };
    }

  } catch (error) {
    console.error('❌ General Function Error:', error);
    console.error('❌ Error Stack:', error.stack);

    // Return detailed error for debugging while being safe for production
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        timestamp: new Date().toISOString(),
        // Only include stack trace in development
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
      })
    };
  }
};