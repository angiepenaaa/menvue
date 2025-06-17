import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import { corsHeaders } from '../_shared/cors.ts';

interface LocationRequest {
  latitude: number;
  longitude: number;
  radius?: number;
  maxResults?: number;
}

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders, status: 204 });
    }

    const { latitude, longitude, radius = 5000, maxResults = 10 }: LocationRequest = await req.json();

    const response = await fetch('https://api.picaos.com/v1/passthrough/v1/places:searchNearby', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-pica-secret': Deno.env.get('PICA_SECRET_KEY') ?? '',
        'x-pica-connection-key': Deno.env.get('PICA_GOOGLE_PLACES_CONNECTION_KEY') ?? '',
        'x-pica-action-id': 'conn_mod_def::GDsVLrY3vmM::n3jvcD1vRNeKPpwEZFk9qg'
      },
      body: JSON.stringify({
        locationRestriction: {
          circle: {
            radius,
            center: { latitude, longitude }
          }
        },
        maxResultCount: maxResults
      })
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});