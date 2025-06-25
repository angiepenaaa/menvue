// src/utils/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // This is okay in development for testing
});

export async function askOpenAI(prompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4", // or "gpt-3.5-turbo"
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0]?.message?.content || "No response.";
}