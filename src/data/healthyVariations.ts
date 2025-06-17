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
  },
  {
    originalItem: menuItems.find(item => item.id === 'bl-2')!,
    healthyVersion: {
      name: 'Plant-Based Keto Bowl',
      description: 'A vegan version of the keto bowl featuring tempeh and plant-based fats',
      calories: 380,
      nutrition: {
        protein: 28,
        carbs: 14,
        sugars: 3,
        totalFat: 24,
        saturatedFat: 3,
        fiber: 12,
        sodium: 550
      },
      modifications: [
        'Replaced steak with marinated tempeh',
        'Added hemp seeds for protein',
        'Included more low-carb vegetables',
        'Used coconut aminos instead of sauce',
        'Added MCT oil for healthy fats'
      ],
      healthScore: 94,
      ingredients: [
        'Marinated tempeh',
        'Cauliflower rice',
        'Hemp seeds',
        'Avocado',
        'Sautéed mushrooms',
        'Coconut aminos'
      ]
    }
  },
  {
    originalItem: menuItems.find(item => item.id === 'sw-1')!,
    healthyVersion: {
      name: 'High-Protein Mediterranean Bowl',
      description: 'A protein-packed version of the Mediterranean bowl with added lean proteins',
      calories: 420,
      nutrition: {
        protein: 38,
        carbs: 35,
        sugars: 4,
        totalFat: 14,
        saturatedFat: 2,
        fiber: 12,
        sodium: 580
      },
      modifications: [
        'Added grilled chicken breast',
        'Increased portion of chickpeas',
        'Reduced olive oil',
        'Added protein-rich seeds',
        'Included more fresh herbs'
      ],
      healthScore: 96,
      ingredients: [
        'Grilled chicken breast',
        'Quinoa',
        'Chickpeas',
        'Pumpkin seeds',
        'Fresh herbs',
        'Light tahini dressing'
      ]
    }
  },
  {
    originalItem: menuItems.find(item => item.id === 'fw-2')!,
    healthyVersion: {
      name: 'Protein Superfood Bowl',
      description: 'A protein-enhanced version of the superfood bowl with added protein sources',
      calories: 310,
      nutrition: {
        protein: 24,
        carbs: 42,
        sugars: 18,
        totalFat: 12,
        saturatedFat: 1,
        fiber: 14,
        sodium: 110
      },
      modifications: [
        'Added plant-based protein powder',
        'Included Greek yogurt',
        'Reduced honey content',
        'Added chia seeds',
        'Increased berry portion'
      ],
      healthScore: 93,
      ingredients: [
        'Acai blend',
        'Plant protein',
        'Greek yogurt',
        'Mixed berries',
        'Chia seeds',
        'Sugar-free granola'
      ]
    }
  },
  {
    originalItem: menuItems.find(item => item.id === 'pn-1')!,
    healthyVersion: {
      name: 'Turkey Power Wrap',
      description: 'A high-protein, low-carb version of the turkey avocado club using a protein wrap',
      calories: 340,
      nutrition: {
        protein: 42,
        carbs: 22,
        sugars: 3,
        totalFat: 14,
        saturatedFat: 2,
        fiber: 9,
        sodium: 720
      },
      modifications: [
        'Used protein-fortified wrap',
        'Doubled turkey portion',
        'Added egg whites',
        'Removed mayo',
        'Added hummus spread'
      ],
      healthScore: 91,
      ingredients: [
        'Protein wrap',
        'Double turkey',
        'Egg whites',
        'Avocado',
        'Hummus',
        'Fresh vegetables'
      ]
    }
  },
  {
    originalItem: menuItems.find(item => item.id === 'cv-1')!,
    healthyVersion: {
      name: 'Super Greek Power Bowl',
      description: 'An enhanced version of the Greek bowl with more protein and superfoods',
      calories: 390,
      nutrition: {
        protein: 45,
        carbs: 28,
        sugars: 3,
        totalFat: 18,
        saturatedFat: 3,
        fiber: 11,
        sodium: 650
      },
      modifications: [
        'Added extra grilled chicken',
        'Included quinoa blend',
        'Added kale mix',
        'Reduced olive oil',
        'Added superfood toppings'
      ],
      healthScore: 97,
      ingredients: [
        'Double grilled chicken',
        'Quinoa-cauliflower blend',
        'Kale mix',
        'Goji berries',
        'Hemp seeds',
        'Light tzatziki'
      ]
    }
  }
];