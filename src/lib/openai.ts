import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const getNutritionAdvice = async (query: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a professional nutritionist specializing in personalized dietary recommendations. 
          Focus on providing practical, evidence-based advice that is:
          - Specific to the user's needs and goals
          - Actionable and realistic
          - Based on scientific nutrition principles
          - Includes specific food recommendations
          - Explains the reasoning behind recommendations
          
          Format your response in clear sections:
          1. Summary of recommendations
          2. Specific food suggestions
          3. Meal timing and portions
          4. Additional tips`
        },
        {
          role: "user",
          content: query
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating nutrition advice:', error);
    throw error;
  }
};

export const generateHealthyVariation = async (menuItem: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a nutritionist assistant specialized in creating healthy variations of menu items."
        },
        {
          role: "user",
          content: `${menuItem} - Provide a lower-calorie, high-protein version while preserving flavor.`
        }
      ],
      max_tokens: 1000
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating variation:', error);
    throw error;
  }
};