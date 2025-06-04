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