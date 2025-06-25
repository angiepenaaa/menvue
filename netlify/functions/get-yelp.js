const yelp = require('yelp-fusion');

exports.handler = async (event, context) => {
  const startTime = Date.now();
  console.log('🚀 Yelp function invoked:', {
    method: event.httpMethod,
    timestamp: new Date().toISOString(),
    userAgent: event.headers['user-agent']?.substring(0, 50) + '...',
    origin: event.headers.origin
  });
  
  // Set comprehensive CORS headers for all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization, X-Requested-With, Cache-Control',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    console.log('✅ Handling CORS preflight request');
    return {
      statusCode: 204,
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
        allowedMethods: ['GET', 'OPTIONS'],
        received: event.httpMethod
      })
    };
  }

  try {
    // Environment validation with detailed logging
    const apiKey = process.env.YELP_API_KEY;
    const nodeEnv = process.env.NODE_ENV || 'development';
    
    console.log('🔧 Environment check:', {
      hasYelpKey: !!apiKey,
      keyLength: apiKey ? apiKey.length : 0,
      nodeEnv,
      availableEnvVars: Object.keys(process.env).filter(key => 
        key.includes('YELP') || key.includes('NODE')
      )
    });
    
    if (!apiKey) {
      console.error('❌ YELP_API_KEY missing from environment');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'YELP_API_KEY environment variable not configured',
          hint: 'Set YELP_API_KEY in Netlify environment variables',
          documentation: 'https://docs.netlify.com/configure-builds/environment-variables/'
        })
      };
    }

    // Validate API key format (Yelp keys are typically 64 characters)
    if (apiKey.length < 32) {
      console.error('❌ YELP_API_KEY appears to be invalid (too short)');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'YELP_API_KEY appears to be invalid',
          hint: 'Ensure you copied the complete API key from Yelp Developer Console'
        })
      };
    }

    console.log('✅ Creating Yelp client...');
    
    // Create Yelp API client with error handling
    let client;
    try {
      client = yelp.client(apiKey);
    } catch (clientError) {
      console.error('❌ Failed to create Yelp client:', {
        error: clientError.message,
        type: clientError.constructor.name
      });
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to initialize Yelp API client',
          details: clientError.message,
          type: 'client_initialization_error'
        })
      };
    }

    // Extract and validate query parameters
    const { queryStringParameters } = event;
    
    if (!queryStringParameters) {
      console.log('❌ No query parameters provided');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing query parameters',
          required: ['latitude', 'longitude'],
          optional: ['term', 'limit'],
          example: '?latitude=27.951&longitude=-82.457&term=healthy'
        })
      };
    }

    const {
      term = 'healthy food',
      latitude,
      longitude,
      limit = '20'
    } = queryStringParameters;

    console.log('🔍 Processing search parameters:', { 
      term: term.substring(0, 50), 
      latitude, 
      longitude, 
      limit,
      hasAllRequired: !!(latitude && longitude)
    });

    // Validate required parameters
    if (!latitude || !longitude) {
      console.log('❌ Missing required coordinates');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required parameters: latitude and longitude are required',
          received: { 
            latitude: latitude || null, 
            longitude: longitude || null 
          },
          example: 'latitude=27.951&longitude=-82.457'
        })
      };
    }

    // Parse and validate coordinates with enhanced error handling
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const searchLimit = Math.min(Math.max(parseInt(limit) || 20, 1), 50); // Between 1-50

    if (isNaN(lat) || isNaN(lng)) {
      console.log('❌ Invalid coordinate values:', { 
        latitude, 
        longitude, 
        parsedLat: lat, 
        parsedLng: lng 
      });
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid latitude or longitude: must be valid decimal numbers',
          received: { latitude, longitude },
          parsed: { lat: isNaN(lat) ? 'invalid' : lat, lng: isNaN(lng) ? 'invalid' : lng }
        })
      };
    }

    // Validate coordinate ranges with specific error messages
    if (lat < -90 || lat > 90) {
      console.log('❌ Latitude out of valid range:', lat);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid latitude: must be between -90 and 90 degrees',
          received: lat,
          validRange: { min: -90, max: 90 }
        })
      };
    }

    if (lng < -180 || lng > 180) {
      console.log('❌ Longitude out of valid range:', lng);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Invalid longitude: must be between -180 and 180 degrees',
          received: lng,
          validRange: { min: -180, max: 180 }
        })
      };
    }

    // Prepare optimized Yelp API search request
    const searchRequest = {
      term: term.trim().substring(0, 100), // Limit term length
      latitude: lat,
      longitude: lng,
      limit: searchLimit,
      radius: 8047, // 5 miles in meters (Yelp max is ~25 miles)
      sort_by: 'best_match',
      open_now: false // Include closed restaurants for better results
    };

    console.log('🔍 Executing Yelp search:', {
      ...searchRequest,
      estimatedRadius: '5 miles',
      expectedResults: `up to ${searchLimit} businesses`
    });

    // Execute Yelp API call with comprehensive error handling and timing
    try {
      const apiStartTime = Date.now();
      const response = await client.search(searchRequest);
      const apiEndTime = Date.now();
      const apiDuration = apiEndTime - apiStartTime;
      
      console.log(`✅ Yelp API responded in ${apiDuration}ms`);
      
      // Validate response structure
      if (!response || !response.jsonBody) {
        console.error('❌ Invalid Yelp API response structure:', {
          hasResponse: !!response,
          hasJsonBody: !!(response && response.jsonBody),
          responseKeys: response ? Object.keys(response) : []
        });
        return {
          statusCode: 502,
          headers,
          body: JSON.stringify({ 
            error: 'Invalid response from Yelp API',
            details: 'Missing or malformed response body',
            type: 'api_response_error'
          })
        };
      }

      const businesses = response.jsonBody.businesses || [];
      const total = response.jsonBody.total || 0;
      
      // Enhanced response validation and logging
      console.log('📊 Yelp API response analysis:', {
        businessCount: businesses.length,
        totalAvailable: total,
        hasCoordinates: businesses.filter(b => b.coordinates).length,
        hasRatings: businesses.filter(b => b.rating).length,
        hasPhotos: businesses.filter(b => b.image_url).length,
        avgRating: businesses.length > 0 ? 
          (businesses.reduce((sum, b) => sum + (b.rating || 0), 0) / businesses.length).toFixed(1) : 0,
        priceDistribution: {
          '$': businesses.filter(b => b.price === '$').length,
          '$$': businesses.filter(b => b.price === '$$').length,
          '$$$': businesses.filter(b => b.price === '$$$').length,
          '$$$$': businesses.filter(b => b.price === '$$$$').length,
          unspecified: businesses.filter(b => !b.price).length
        }
      });

      // Validate business data quality
      const validBusinesses = businesses.filter(business => {
        const isValid = business.id && 
                       business.name && 
                       business.coordinates && 
                       business.coordinates.latitude && 
                       business.coordinates.longitude;
        
        if (!isValid) {
          console.warn('⚠️ Filtering out invalid business:', {
            id: business.id || 'missing',
            name: business.name || 'missing',
            hasCoordinates: !!(business.coordinates && business.coordinates.latitude)
          });
        }
        
        return isValid;
      });

      if (validBusinesses.length !== businesses.length) {
        console.log(`🔧 Filtered ${businesses.length - validBusinesses.length} invalid businesses`);
      }

      const totalDuration = Date.now() - startTime;
      console.log(`✅ Function completed successfully in ${totalDuration}ms (API: ${apiDuration}ms)`);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(validBusinesses)
      };
      
    } catch (yelpError) {
      const apiDuration = Date.now() - startTime;
      console.error('❌ Yelp API Error:', {
        message: yelpError.message,
        statusCode: yelpError.statusCode,
        type: yelpError.constructor.name,
        duration: apiDuration + 'ms'
      });
      
      // Handle specific Yelp API errors with user-friendly messages
      if (yelpError.statusCode) {
        const errorBody = yelpError.response?.body;
        console.error('❌ Yelp API Error Details:', errorBody);
        
        let userMessage = 'Restaurant search service error';
        let statusCode = yelpError.statusCode;
        
        switch (yelpError.statusCode) {
          case 400:
            userMessage = 'Invalid search parameters provided to restaurant service';
            break;
          case 401:
            userMessage = 'Restaurant search service authentication failed';
            statusCode = 500; // Don't expose auth errors to client
            break;
          case 403:
            userMessage = 'Restaurant search service access denied';
            statusCode = 500;
            break;
          case 429:
            userMessage = 'Restaurant search service is busy. Please try again in a moment.';
            break;
          case 500:
          case 502:
          case 503:
            userMessage = 'Restaurant search service is temporarily unavailable';
            break;
          default:
            userMessage = 'Restaurant search service encountered an error';
        }
        
        return {
          statusCode,
          headers,
          body: JSON.stringify({ 
            error: userMessage,
            code: yelpError.statusCode,
            type: 'yelp_api_error',
            retryable: [429, 500, 502, 503].includes(yelpError.statusCode)
          })
        };
      }
      
      // Handle network or timeout errors
      console.error('❌ Yelp API Network Error:', {
        message: yelpError.message,
        code: yelpError.code,
        type: 'network_error'
      });
      
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({ 
          error: 'Restaurant search service is currently unavailable',
          message: 'Network connectivity issue',
          type: 'network_error',
          retryable: true
        })
      };
    }

  } catch (error) {
    const totalDuration = Date.now() - startTime;
    console.error('❌ Function Error:', {
      message: error.message,
      type: error.constructor.name,
      stack: error.stack?.split('\n').slice(0, 3), // First 3 lines of stack
      duration: totalDuration + 'ms'
    });

    // Return safe error response for production
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: 'Restaurant search function encountered an unexpected error',
        type: 'function_error',
        timestamp: new Date().toISOString(),
        // Include additional debug info only in development
        ...(process.env.NODE_ENV === 'development' && { 
          debug: {
            message: error.message,
            type: error.constructor.name
          }
        })
      })
    };
  }
};