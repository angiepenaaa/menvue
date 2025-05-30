import OpenAI from 'openai';
import type { MenuItem, HealthyVariation } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateVariation = async (
  item: MenuItem,
  prompt: string
): Promise<HealthyVariation['healthyVersion']> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional nutritionist and chef specializing in healthy recipe modifications."
        },
        {
          role: "user",
          content: `Create a healthy variation of this menu item:
            Name: ${item.name}
            Description: ${item.description}
            Calories: ${item.calories}
            Current Nutrition:
            - Protein: ${item.nutrition.protein}g
            - Carbs: ${item.nutrition.carbs}g
            - Fat: ${item.nutrition.totalFat}g
            
            User's request: ${prompt}
            
            Respond with a JSON object containing:
            {
              "name": "Modified name",
              "description": "Detailed description",
              "calories": number,
              "nutrition": {
                "protein": number,
                "carbs": number,
                "sugars": number,
                "totalFat": number,
                "saturatedFat": number,
                "fiber": number,
                "sodium": number
              },
              "modifications": ["list of changes made"],
              "healthScore": number (0-100),
              "ingredients": ["list of main ingredients"]
            }`
        }
      ]
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result;
  } catch (error) {
    console.error('Error generating variation:', error);
    throw new Error('Failed to generate variation');
  }
};