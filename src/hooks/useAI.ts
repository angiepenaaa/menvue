import { useState } from 'react';
import { generateAIResponse } from '../lib/ai';
import type { AIConfig, AIResponse } from '../types/ai';

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const generate = async (message: string, config?: AIConfig): Promise<AIResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      return await generateAIResponse(message, config);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to generate AI response');
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    generate,
    loading,
    error
  };
}