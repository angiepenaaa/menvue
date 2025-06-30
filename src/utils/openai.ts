import { supabase } from './supabase';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatCompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export class OpenAIService {
  private static instance: OpenAIService;

  private constructor() {}

  public static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  // ✅ Simple ChatGPT-style response method
  async chatLikeGPT(prompt: string) {
    const messages: ChatMessage[] = [
      { role: 'user', content: prompt }
    ];

    return this.createChatCompletion(messages, {
      model: 'gpt-4o', // or 'gpt-3.5-turbo'
      temperature: 0.7,
      maxTokens: 1000
    });
  }

  async createChatCompletion(
    messages: ChatMessage[],
    options: ChatCompletionOptions = {}
  ) {
    const {
      model = 'gpt-4o',
      temperature = 0.7,
      maxTokens = 1000,
      stream = false
    } = options;

    try {
      const { data, error } = await supabase.functions.invoke('openai-chat', {
        body: {
          messages,
          model,
          temperature,
          max_completion_tokens: maxTokens,
          stream
        }
      });

      if (error) {
        console.error('OpenAI function error:', error);
        throw new Error(`OpenAI request failed: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Error calling OpenAI chat completion:', error);
      throw error;
    }
  }
}

// ✅ Export your service instance
export const openaiService = OpenAIService.getInstance();
