import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

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