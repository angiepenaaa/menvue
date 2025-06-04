import { useState } from 'react';
import { generateAIResponse } from '../lib/ai';
import type { AIConfig, AIResponse, AIError } from '../types/ai';

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AIError | null>(null);
  const [lastRequestTime, setLastRequestTime] = useState<number>(0);

  const generate = async (message: string, config?: AIConfig): Promise<AIResponse | null> => {
    try {
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime;
      
      if (timeSinceLastRequest < 1000) { // 1 second minimum delay
        throw Object.assign(new Error('Please wait before making another request'), {
          code: 'RATE_LIMIT',
          retryAfter: 1000 - timeSinceLastRequest
        });
      }

      setLoading(true);
      setError(null);
      const response = await generateAIResponse(message, config);
      setLastRequestTime(Date.now());
      return response;

    } catch (err) {
      const error = err as AIError;
      if (error.code === 'RATE_LIMIT' && error.retryAfter) {
        setTimeout(() => setError(null), error.retryAfter);
      }
      setError(error);
      return null;

    } finally {
      setLoading(false);
    }
  };

  return {
    generate,
    loading,
    error,
    canRetry: !error?.code || error.code !== 'RATE_LIMIT'
  };
}