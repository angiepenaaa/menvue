import { corsHeaders } from '../_shared/cors.ts';

interface ChatMessage {
  role: 'developer' | 'system' | 'user' | 'assistant' | 'tool';
  content: string | any[];
  name?: string;
}

interface ChatCompletionRequest {
  messages: ChatMessage[];
  model?: string;
  n?: number;
  max_completion_tokens?: number | null;
  temperature?: number | null;
  presence_penalty?: number | null;
  frequency_penalty?: number | null;
  logit_bias?: object;
  stop?: string | string[] | null;
  stream?: boolean | null;
  tool_choice?: string | object;
  tools?: any[];
  service_tier?: string | null;
  user?: string;
}

interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
      refusal?: string | null;
      annotations?: any[];
    };
    logprobs: null;
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    prompt_tokens_details?: {
      cached_tokens: number;
      audio_tokens: number;
    };
    completion_tokens_details?: {
      reasoning_tokens: number;
      audio_tokens: number;
      accepted_prediction_tokens: number;
      rejected_prediction_tokens: number;
    };
  };
  service_tier: string;
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

    // Get environment variables
    const picaSecretKey = Deno.env.get('PICA_SECRET_KEY');
    const picaOpenAIConnectionKey = Deno.env.get('PICA_OPENAI_CONNECTION_KEY');

    if (!picaSecretKey || !picaOpenAIConnectionKey) {
      return new Response(JSON.stringify({ 
        error: 'Missing required environment variables: PICA_SECRET_KEY and PICA_OPENAI_CONNECTION_KEY' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      });
    }

    // Parse request body
    const requestBody: ChatCompletionRequest = await req.json();

    // Validate required fields
    if (!requestBody.messages || !Array.isArray(requestBody.messages) || requestBody.messages.length === 0) {
      return new Response(JSON.stringify({ 
        error: 'Missing required field: messages array cannot be empty' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      });
    }

    // Validate message format
    for (const message of requestBody.messages) {
      if (!message.role || !message.content) {
        return new Response(JSON.stringify({ 
          error: 'Invalid message format: each message must have role and content' 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        });
      }

      if (!['developer', 'system', 'user', 'assistant', 'tool'].includes(message.role)) {
        return new Response(JSON.stringify({ 
          error: 'Invalid message role: must be one of developer, system, user, assistant, tool' 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400
        });
      }
    }

    // Set default values
    const chatRequest = {
      messages: requestBody.messages,
      model: requestBody.model || 'gpt-4o',
      n: requestBody.n || 1,
      max_completion_tokens: requestBody.max_completion_tokens,
      temperature: requestBody.temperature ?? 1,
      presence_penalty: requestBody.presence_penalty ?? 0,
      frequency_penalty: requestBody.frequency_penalty ?? 0,
      logit_bias: requestBody.logit_bias,
      stop: requestBody.stop,
      stream: requestBody.stream ?? false,
      tool_choice: requestBody.tool_choice,
      tools: requestBody.tools,
      service_tier: requestBody.service_tier || 'auto',
      user: requestBody.user
    };

    // Remove undefined values to keep the request clean
    Object.keys(chatRequest).forEach(key => {
      if (chatRequest[key as keyof typeof chatRequest] === undefined) {
        delete chatRequest[key as keyof typeof chatRequest];
      }
    });

    console.log('Making OpenAI chat completion request:', {
      model: chatRequest.model,
      messageCount: chatRequest.messages.length,
      temperature: chatRequest.temperature
    });

    // Make request to Pica Passthrough API
    const response = await fetch('https://api.picaos.com/v1/passthrough/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-pica-secret': picaSecretKey,
        'x-pica-connection-key': picaOpenAIConnectionKey,
        'x-pica-action-id': 'conn_mod_def::GDzgi1QfvM4::4OjsWvZhRxmAVuLAuWgfVA'
      },
      body: JSON.stringify(chatRequest)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });

      return new Response(JSON.stringify({ 
        error: 'OpenAI API request failed',
        details: errorData,
        status: response.status
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: response.status
      });
    }

    const data: ChatCompletionResponse = await response.json();

    console.log('OpenAI chat completion successful:', {
      id: data.id,
      model: data.model,
      usage: data.usage
    });

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error('Error in OpenAI chat completion function:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});