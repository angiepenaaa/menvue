import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.7';
import qs from 'npm:qs@6.11.2';

interface NotificationRequest {
  title: string;
  body: string;
  identities: string[];
  tags?: string[];
}

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders, status: 204 });
    }

    const { title, body, identities, tags = [] }: NotificationRequest = await req.json();

    const formData = qs.stringify({
      ServiceSid: Deno.env.get('TWILIO_SERVICE_SID'),
      Title: title,
      Body: body,
      Identity: identities,
      Tag: tags
    });

    const response = await fetch(`https://api.picaos.com/v1/passthrough/v1/Services/${Deno.env.get('TWILIO_SERVICE_SID')}/Notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'x-pica-secret': Deno.env.get('PICA_SECRET_KEY') ?? '',
        'x-pica-connection-key': Deno.env.get('PICA_TWILIO_CONNECTION_KEY') ?? '',
        'x-pica-action-id': 'conn_mod_def::GC7OZXCmll4::Ry8rWIaaRjG13o4bg6RycA'
      },
      body: formData
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