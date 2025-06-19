import { corsHeaders } from '../_shared/cors.ts';

interface YelpProxyRequest {
  endpoint: string;
  params?: Record<string, string>;
}

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders, status: 204 });
    }

    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405
      });
    }

    const { endpoint, params = {} }: YelpProxyRequest = await req.json();

    if (!endpoint) {
      return new Response(JSON.stringify({ error: 'Endpoint is required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      });
    }

    const yelpApiKey = Deno.env.get('YELP_API_KEY');
    if (!yelpApiKey) {
      return new Response(JSON.stringify({ error: 'Yelp API key not configured' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      });
    }

    // Build the URL with query parameters
    const url = new URL(`https://api.yelp.com/v3${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value);
      }
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${yelpApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Yelp API error:', response.status, errorText);
      
      return new Response(JSON.stringify({ 
        error: `Yelp API error: ${response.status}`,
        details: errorText 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: response.status
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error('Yelp proxy error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});