import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { Pica } from "@picahq/ai";
import type { AIConfig, AIResponse, CacheEntry } from '../types/ai';

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const RATE_LIMIT = 10; // requests per minute
const cache = new Map<string, CacheEntry>();
const requestTimes: number[] = [];

const pica = new Pica(import.meta.env.VITE_PICA_SECRET_KEY ?? '', {
  connectors: ["*"],
});

function isRateLimited(): boolean {
  const now = Date.now();
  requestTimes.push(now);
  requestTimes.splice(0, requestTimes.length - RATE_LIMIT);
  return requestTimes.length >= RATE_LIMIT && 
         (now - requestTimes[0]) < 60000;
}

function getCacheKey(message: string, config?: AIConfig): string {
  return `${message}-${JSON.stringify(config)}`;
}

function getFromCache(key: string): AIResponse | null {
  const entry = cache.get(key);
  if (!entry) return null;
  
  if (Date.now() - entry.timestamp > CACHE_DURATION) {
    cache.delete(key);
    return null;
  }
  
  return entry.response;
}

export async function generateAIResponse(message: string, config?: AIConfig): Promise<AIResponse> {
  try {
    if (!import.meta.env.VITE_PICA_SECRET_KEY) {
      throw new Error('PICA_SECRET_KEY is not configured');
    }

    const cacheKey = getCacheKey(message, config);
    const cachedResponse = getFromCache(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }

    if (isRateLimited()) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    const system = await pica.generateSystemPrompt();

    const { text } = await generateText({
      model: openai(config?.model ?? "gpt-4.1"),
      system,
      prompt: message,
      tools: config?.tools ?? { ...pica.oneTool },
      maxSteps: config?.maxSteps ?? 10,
    });

    const response = {
      text,
      timestamp: new Date().toISOString(),
      model: config?.model ?? "gpt-4.1"
    };
    
    cache.set(cacheKey, {
      response,
      timestamp: Date.now()
    });
    
    return response;

  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to generate AI response');
  }
}