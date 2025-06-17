import { corsHeaders } from '../_shared/cors.ts';

interface ContactRequest {
  email: string;
  firstname: string;
  lastname: string;
  associations?: Array<{
    types: Array<{
      associationCategory: string;
      associationTypeId: number;
    }>;
    to: {
      id: string;
    };
  }>;
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

    const { email, firstname, lastname, associations }: ContactRequest = await req.json();

    // Validate required fields
    if (!email || !firstname || !lastname) {
      return new Response(JSON.stringify({ 
        error: 'Missing required fields: email, firstname, and lastname are required' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        error: 'Invalid email format' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      });
    }

    const requestBody = {
      properties: {
        email,
        firstname,
        lastname
      },
      ...(associations && { associations })
    };

    const response = await fetch('https://api.picaos.com/v1/passthrough/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-pica-secret': Deno.env.get('PICA_SECRET_KEY') ?? '',
        'x-pica-connection-key': Deno.env.get('PICA_HUBSPOT_CONNECTION_KEY') ?? '',
        'x-pica-action-id': 'conn_mod_def::GDcIHDalaS8::eEv4pjvCTcuDT-052kCSgg'
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('HubSpot API error:', data);
      return new Response(JSON.stringify({ 
        error: 'Failed to create contact in HubSpot',
        details: data 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: response.status
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error('Error creating HubSpot contact:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});