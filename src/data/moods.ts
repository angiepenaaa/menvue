import type { Mood } from '../types';

export const moods: Mood[] = [
  {
    id: 'post-workout',
    name: 'Post-Workout',
    lucideIcon: 'Dumbbell',
    tags: ['High Protein', 'Complex Carbs', 'Recovery'],
    tip: 'Protein-rich foods within 30 minutes help muscle recovery, while complex carbs replenish energy stores.'
  },
  {
    id: 'stressed',
    name: 'Feeling Stressed',
    lucideIcon: 'CloudRain',
    tags: ['Magnesium-Rich', 'Omega-3', 'Complex Carbs'],
    tip: 'Foods rich in magnesium and omega-3s can help reduce stress and anxiety levels.'
  },
  {
    id: 'low-energy',
    name: 'Low Energy',
    lucideIcon: 'Battery',
    tags: ['Iron-Rich', 'B-Vitamins', 'Protein'],
    tip: 'Iron-rich foods combined with vitamin C boost energy levels naturally.'
  },
  {
    id: 'focus',
    name: 'Need to Focus',
    lucideIcon: 'Brain',
    tags: ['Omega-3', 'Antioxidants', 'Low Sugar'],
    tip: 'Foods rich in omega-3 fatty acids and antioxidants enhance brain function and concentration.'
  },
  {
    id: 'bloated',
    name: 'Feeling Bloated',
    lucideIcon: 'Leaf',
    tags: ['Low Sodium', 'Anti-Inflammatory', 'Light'],
    tip: 'Light, anti-inflammatory foods can help reduce bloating and improve digestion.'
  },
  {
    id: 'happy',
    name: 'Feeling Good',
    lucideIcon: 'Sun',
    tags: ['Balanced', 'Fresh', 'Energizing'],
    tip: 'Maintain your positive mood with balanced, nutrient-rich meals.'
  }
];