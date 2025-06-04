export interface AIConfig {
  model?: string;
  tools?: Record<string, unknown>;
  maxSteps?: number;
}

export interface AIResponse {
  text: string;
  timestamp: string;
  model: string;
}

export interface CacheEntry {
  response: AIResponse;
  timestamp: number;
}

export interface AIError extends Error {
  code?: string;
  retryAfter?: number;
}