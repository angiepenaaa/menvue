import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

// TypeScript interfaces for request/response
interface ChatMessage {
  role: 'user' | 'system' | 'assistant'
  content: string
}

interface ChatCompletionRequest {
  messages: ChatMessage[]
  model?: string
  temperature?: number
  max_completion_tokens?: number
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }

  try {
    // Get OpenAI API key from environment
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      console.error('OPENAI_API_KEY environment variable is not set')
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Parse and validate request body
    let requestBody: ChatCompletionRequest
    try {
      requestBody = await req.json()
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate required fields
    if (!requestBody.messages || !Array.isArray(requestBody.messages) || requestBody.messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Messages array is required and cannot be empty' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate message format
    for (const message of requestBody.messages) {
      if (!message.role || !message.content) {
        return new Response(
          JSON.stringify({ error: 'Each message must have role and content' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
      if (!['user', 'system', 'assistant'].includes(message.role)) {
        return new Response(
          JSON.stringify({ error: 'Message role must be user, system, or assistant' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
    }

    // Set defaults for optional parameters
    const {
      messages,
      model = 'gpt-4o',
      temperature = 0.7,
      max_completion_tokens = 1000
    } = requestBody

    // Prepare OpenAI API request
    const openaiRequestBody = {
      model,
      messages,
      temperature,
      max_completion_tokens
    }

    console.log(`Making OpenAI request with model: ${model}, messages: ${messages.length}`)

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(openaiRequestBody)
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.text()
      console.error(`OpenAI API error: ${openaiResponse.status} - ${errorData}`)
      
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API request failed',
          status: openaiResponse.status
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const openaiData: OpenAIResponse = await openaiResponse.json()

    // Extract assistant's reply
    const assistantReply = openaiData.choices?.[0]?.message?.content

    if (!assistantReply) {
      console.error('No content in OpenAI response:', openaiData)
      return new Response(
        JSON.stringify({ error: 'No response content from OpenAI' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log('OpenAI request successful')

    // Return only the assistant's reply as text
    return new Response(
      JSON.stringify({ reply: assistantReply }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Unexpected error in openai-chat function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})