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

  async getNutritionAdvice(userQuery: string, userPreferences?: any) {
    const systemPrompt = `You are a professional nutritionist and meal planning expert for menVue, a healthy eating app. 

Your role is to provide personalized, evidence-based nutrition advice that helps users make healthier food choices. You should:

1. **Be Personalized**: Consider the user's dietary preferences, health goals, and restrictions when provided
2. **Be Practical**: Give actionable advice that users can implement immediately
3. **Be Encouraging**: Maintain a positive, supportive tone that motivates healthy choices
4. **Be Accurate**: Base recommendations on current nutritional science
5. **Be Concise**: Provide clear, well-structured responses that are easy to understand

Focus on:
- Meal planning and preparation tips
- Healthy ingredient substitutions
- Portion control guidance
- Nutritional benefits of foods
- Restaurant ordering strategies
- Managing dietary restrictions

Always encourage users to consult healthcare professionals for medical nutrition therapy or specific health conditions.`;

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      { 
        role: 'user', 
        content: userPreferences 
          ? `User preferences: ${JSON.stringify(userPreferences)}\n\nQuestion: ${userQuery}`
          : userQuery
      }
    ];

    return this.createChatCompletion(messages, {
      temperature: 0.7,
      maxTokens: 800
    });
  }

  async generateMealSuggestions(
    mealType: string,
    dietaryRestrictions: string[] = [],
    calorieTarget?: number,
    healthGoal?: string
  ) {
    const systemPrompt = `You are a meal planning expert for menVue. Generate personalized meal suggestions based on the user's requirements.

Provide 3-5 specific meal suggestions that:
1. Meet the specified dietary requirements
2. Are realistic and achievable
3. Include approximate calorie counts
4. Consider the user's health goals
5. Are delicious and satisfying

Format your response as a structured list with meal names, brief descriptions, and key nutritional highlights.`;

    const userPrompt = `Please suggest ${mealType} meals with the following requirements:
${dietaryRestrictions.length > 0 ? `- Dietary restrictions: ${dietaryRestrictions.join(', ')}` : ''}
${calorieTarget ? `- Target calories: around ${calorieTarget}` : ''}
${healthGoal ? `- Health goal: ${healthGoal}` : ''}

Focus on meals that are both nutritious and enjoyable.`;

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ];

    return this.createChatCompletion(messages, {
      temperature: 0.8,
      maxTokens: 1000
    });
  }

  async analyzeMenuItems(menuItems: any[], userGoals: string) {
    const systemPrompt = `You are a nutrition expert analyzing menu items for menVue users. 

Analyze the provided menu items and recommend the best options based on the user's goals. Consider:
- Nutritional value and balance
- Calorie content
- Ingredient quality
- Preparation methods
- Alignment with health goals

Provide clear recommendations with explanations.`;

    const userPrompt = `Please analyze these menu items and recommend the best options for someone with the goal: "${userGoals}"

Menu items: ${JSON.stringify(menuItems, null, 2)}

Rank the top 3 recommendations and explain why they're good choices.`;

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ];

    return this.createChatCompletion(messages, {
      temperature: 0.6,
      maxTokens: 1200
    });
  }
}

// Export singleton instance
export const openaiService = OpenAIService.getInstance();