// OpenAI integration for VueBot chat functionality
// Note: This is for development/testing only. In production, move to serverless function.

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Mock OpenAI response for development
export async function askOpenAI(prompt: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Mock responses based on prompt keywords
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('post-workout') || lowerPrompt.includes('after workout')) {
    return `Great question! After a workout, your body needs protein for muscle recovery and carbs to replenish energy stores. Here are some excellent post-workout meal options:

🥗 **Protein-Rich Options:**
• Grilled chicken with quinoa and vegetables
• Greek yogurt with berries and granola
• Salmon with sweet potato
• Protein smoothie with banana and spinach

⏰ **Timing:** Try to eat within 30-60 minutes after your workout for optimal recovery.

💡 **Pro tip:** Aim for a 3:1 or 4:1 ratio of carbs to protein for best results!`;
  }
  
  if (lowerPrompt.includes('low-calorie') || lowerPrompt.includes('weight loss')) {
    return `Perfect! For weight loss, focus on nutrient-dense, low-calorie foods that keep you satisfied. Here are my top recommendations:

🥬 **Lunch Options Under 400 Calories:**
• Large salad with grilled chicken, mixed greens, and vinaigrette
• Vegetable soup with a side of whole grain bread
• Zucchini noodles with lean ground turkey
• Buddha bowl with quinoa, roasted vegetables, and hummus

🔥 **Key Strategies:**
• Fill half your plate with non-starchy vegetables
• Include lean protein in every meal
• Choose whole grains over refined carbs
• Stay hydrated - sometimes thirst feels like hunger!

Would you like specific calorie counts for any of these options?`;
  }
  
  if (lowerPrompt.includes('muscle recovery') || lowerPrompt.includes('recovery')) {
    return `Muscle recovery is crucial for your fitness progress! Here are the best foods to support recovery:

💪 **Top Recovery Foods:**
• **Tart cherry juice** - Natural anti-inflammatory
• **Fatty fish** (salmon, mackerel) - Omega-3s reduce inflammation
• **Greek yogurt** - Casein protein for overnight recovery
• **Sweet potatoes** - Complex carbs + potassium
• **Leafy greens** - Magnesium for muscle function

🍓 **Anti-Inflammatory Powerhouses:**
• Blueberries, strawberries, and other berries
• Turmeric and ginger
• Dark chocolate (70%+ cacao)
• Green tea

⚡ **Quick Recovery Snack:** Greek yogurt with berries and a drizzle of honey - perfect combo of protein, carbs, and antioxidants!`;
  }
  
  if (lowerPrompt.includes('breakfast') || lowerPrompt.includes('morning')) {
    return `Starting your day right sets the tone for healthy choices! Here are my favorite weight-loss friendly breakfast options:

🌅 **High-Protein Breakfasts (Under 350 calories):**
• Veggie omelet with spinach, tomatoes, and feta
• Greek yogurt parfait with berries and a sprinkle of granola
• Avocado toast on whole grain bread with a poached egg
• Protein smoothie with spinach, banana, and protein powder

☕ **Morning Metabolism Boosters:**
• Green tea instead of sugary coffee drinks
• Add cinnamon to your coffee - helps regulate blood sugar
• Start with a glass of lemon water

🥣 **Fiber-Rich Options:**
• Overnight oats with chia seeds and berries
• Steel-cut oatmeal with nuts and fruit

The key is combining protein, healthy fats, and fiber to keep you satisfied until lunch!`;
  }
  
  // Default response for other queries
  return `Thanks for your question! As your personal wellness assistant, I'm here to help you make healthier food choices. 

Here are some general tips I can share:

🥗 **For Healthy Eating:**
• Focus on whole, unprocessed foods
• Include a variety of colorful vegetables
• Choose lean proteins and healthy fats
• Stay hydrated throughout the day

🏃‍♀️ **For Fitness Support:**
• Fuel your workouts with proper nutrition
• Don't skip meals - it can slow your metabolism
• Listen to your body's hunger and fullness cues

💡 **Need something specific?** Try asking me about:
• Post-workout meals
• Low-calorie lunch ideas
• Foods for muscle recovery
• Healthy breakfast options

What specific aspect of nutrition or wellness would you like to explore?`;
}

// Production note: Move this to a serverless function for security
export async function askOpenAIProduction(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return "I'm having trouble connecting right now. Please try again in a moment.";
  }
}