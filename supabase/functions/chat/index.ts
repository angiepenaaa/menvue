import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { openai } from "npm:@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "npm:ai";
import { Pica } from "npm:@picahq/ai";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    const picaSecretKey = Deno.env.get("PICA_SECRET_KEY");

    // Provide detailed error messages for missing environment variables
    const missingVars = [];
    if (!openaiApiKey) missingVars.push("OPENAI_API_KEY");
    if (!picaSecretKey) missingVars.push("PICA_SECRET_KEY");

    if (missingVars.length > 0) {
      const errorMessage = `Missing required environment variables: ${missingVars.join(", ")}. Please set these secrets in your Supabase project using the Supabase CLI or dashboard.`;
      
      return new Response(JSON.stringify({
        error: errorMessage,
        missingVariables: missingVars,
        instructions: "Set these environment variables using: supabase secrets set VARIABLE_NAME=your_value"
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Messages array is required");
    }

    const pica = new Pica(picaSecretKey, {
      connectors: [
        "*"
      ],
      identity: "user_123", // Replace with dynamic identity if available
      identityType: "user"
    });
    const systemPrompt = await pica.generateSystemPrompt();

    const result = streamText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      tools: { ...pica.oneTool },
      messages: convertToCoreMessages(messages),
      maxSteps: 10
    });

    return result.toDataStreamResponse({ headers: corsHeaders });

  } catch (error) {
    console.error("Chat function error:", error);
    
    return new Response(JSON.stringify({
      error: error.message || "Internal Server Error",
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});