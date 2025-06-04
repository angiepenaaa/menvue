import { corsHeaders } from '../_shared/cors.ts';

interface NutritionRequest {
  prompt: string;
}

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders, status: 204 });
    }

    const { prompt }: NutritionRequest = await req.json();

    const response = await fetch('https://api.picaos.com/v1/passthrough/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-pica-secret': Deno.env.get('PICA_SECRET_KEY') ?? '',
        'x-pica-connection-key': Deno.env.get('PICA_OPENAI_CONNECTION_KEY') ?? '',
        'x-pica-action-id': 'conn_mod_def::GDzgIxPFYP0::2bW4lQ29TAuimPnr1tYXww'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-instruct',
        prompt,
        max_tokens: 150
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