import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { Pica } from "@picahq/ai";
import type { AIConfig, AIResponse } from '../types/ai';

const pica = new Pica(import.meta.env.VITE_PICA_SECRET_KEY ?? '', {
  connectors: ["*"],
});

export async function generateAIResponse(message: string, config?: AIConfig): Promise<AIResponse> {
  try {
    if (!import.meta.env.VITE_PICA_SECRET_KEY) {
      throw new Error('PICA_SECRET_KEY is not configured');
    }

    const system = await pica.generateSystemPrompt();

    const { text } = await generateText({
      model: openai(config?.model ?? "gpt-4.1"),
      system,
      prompt: message,
      tools: config?.tools ?? { ...pica.oneTool },
      maxSteps: config?.maxSteps ?? 10,
    });

    return {
      text,
      timestamp: new Date().toISOString(),
      model: config?.model ?? "gpt-4.1"
    };
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to generate AI response');
  }