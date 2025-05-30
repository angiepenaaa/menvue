import type { HealthyVariation } from '../types';
import { menuItems } from './menuItems';

export const healthyVariations: HealthyVariation[] = [
  {
    originalItem: menuItems.find(item => item.id === 'sb-1')!,
    healthyVersion: {
      name: 'Low-Carb Spinach & Feta Wrap',
      description: 'A keto-friendly version using egg whites, spinach, feta cheese in a low-carb wrap',
      calories: 220,
      nutrition: {
        protein: 22,
        carbs: 18,
        sugars: 2,
        totalFat: 6,
        saturatedFat: 2.5,
        fiber: 8,
        sodium: 620
      },
      modifications: [
        'Replaced wheat wrap with low-carb alternative',
        'Added extra egg whites for protein',
        'Increased spinach portion',
        'Reduced feta cheese amount',
        'Added avocado for healthy fats'
      ],
      healthScore: 92,
      ingredients: [
        'Low-carb wrap',
        'Egg whites',
        'Fresh spinach',
        'Reduced-fat feta',
        'Cherry tomatoes',
        'Avocado'
      ]
    }
  },
  {
    originalItem: menuItems.find(item => item.id === 'ch-1')!,
    healthyVersion: {
      name: 'Cauliflower Rice Chicken Bowl',
      description: 'A lower-carb version of the classic burrito bowl using cauliflower rice',
      calories: 350,
      nutrition: {
        protein: 45,
        carbs: 25,
        sugars: 3,
        totalFat: 9,
        saturatedFat: 2,
        fiber: 15,
        sodium: 780
      },
      modifications: [
        'Replaced rice with cauliflower rice',
        'Added extra vegetables',
        'Used lean chicken breast',
        'Reduced sodium content',
        'Added more fiber-rich ingredients'
      ],
      healthScore: 95,
      ingredients: [
        'Cauliflower rice',
        'Grilled chicken breast',
        'Black beans',
        'Fresh tomato salsa',
        'Mixed bell peppers',
        'Romaine lettuce'
      ]
    }
  }
];