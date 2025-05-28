import { Mood } from '../types';

export const moods: Mood[] = [
  {
    id: 'post-workout',
    name: 'Post-Workout',
    emoji: '💪',
    tags: ['High Protein', 'Complex Carbs'],
    tip: 'Remember to hydrate and consume protein within 30 minutes of your workout!'
  },
  {
    id: 'bloated',
    name: 'Feeling Bloated',
    emoji: '😮‍💨',
    tags: ['Low Sodium', 'Dairy-Free', 'Light'],
    tip: 'Try sipping on warm lemon water or ginger tea to aid digestion.'
  },
  {
    id: 'stressed',
    name: 'Feeling Stressed',
    emoji: '😓',
    tags: ['Comfort', 'Magnesium-Rich', 'Leafy Greens'],
    tip: 'Magnesium-rich foods can help reduce stress and anxiety.'
  },
  {
    id: 'tired',
    name: 'Feeling Tired',
    emoji: '😴',
    tags: ['Iron-Rich', 'B-Vitamins', 'Balanced Carbs'],
    tip: 'Iron-rich foods paired with vitamin C can help boost energy levels.'
  },
  {
    id: 'focus',
    name: 'Need to Focus',
    emoji: '🧠',
    tags: ['Omega-3', 'Antioxidants', 'Low Sugar'],
    tip: 'Omega-3 fatty acids can help improve concentration and mental clarity.'
  },
  {
    id: 'light',
    name: 'Light & Clean',
    emoji: '🥗',
    tags: ['Low Calorie', 'Hydrating', 'High Fiber'],
    tip: 'Stay hydrated with water-rich foods throughout the day.'
  },
  {
    id: 'comfort',
    name: 'Comfort Meal',
    emoji: '🍲',
    tags: ['Warm', 'Satisfying', 'Under 700 Calories'],
    tip: 'You can enjoy comfort food while staying within your calorie goals!'
  }
];