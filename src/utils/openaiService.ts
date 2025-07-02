import { openaiService } from '../lib/openai';

export async function getMealRecommendation(input: string): Promise<string[]> {
  try {
    const prompt = `Based on the user's request: "${input}", suggest 3-5 healthy meal options under 500 calories. 
    Format each suggestion as a brief description (1-2 sentences) focusing on ingredients and nutritional benefits.
    Make the suggestions practical and appealing.`;

    const response = await openaiService.chatLikeGPT(prompt);
    
    // Split the response into individual meal suggestions
    const suggestions = response
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.replace(/^\d+\.\s*/, '').trim()) // Remove numbering
      .filter(line => line.length > 10); // Filter out very short lines
    
    return suggestions.length > 0 ? suggestions : [response];
  } catch (error) {
    console.error('Error getting meal recommendation:', error);
    throw error;
  }
}