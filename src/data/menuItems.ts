import type { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Existing items...
  
  // Clean Eats Kitchen
  {
    id: '1101',
    name: 'Lean Turkey Power Bowl',
    description: 'Ground turkey, quinoa, roasted sweet potatoes, kale, and avocado',
    calories: 420,
    price: '$13.99',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    tags: ['High Protein', 'Gluten-Free', 'Bowl'],
    restaurantId: '11',
    nutrition: {
      protein: 35,
      carbs: 45,
      sugars: 6,
      totalFat: 18,
      saturatedFat: 3,
      fiber: 8,
      sodium: 580
    }
  },
  {
    id: '1102',
    name: 'Grilled Chicken Caesar',
    description: 'Grilled chicken breast, romaine, parmesan, light caesar dressing',
    calories: 380,
    price: '$12.99',
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg',
    tags: ['High Protein', 'Low Carb', 'Salad'],
    restaurantId: '11',
    nutrition: {
      protein: 42,
      carbs: 12,
      sugars: 3,
      totalFat: 22,
      saturatedFat: 5,
      fiber: 4,
      sodium: 720
    }
  },

  // Poke Paradise
  {
    id: '1201',
    name: 'Ahi Tuna Lite Bowl',
    description: 'Sushi-grade tuna, brown rice, edamame, cucumber, seaweed',
    calories: 440,
    price: '$15.99',
    image: 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg',
    tags: ['High Protein', 'Omega-3', 'Bowl'],
    restaurantId: '12',
    nutrition: {
      protein: 38,
      carbs: 48,
      sugars: 4,
      totalFat: 12,
      saturatedFat: 2,
      fiber: 6,
      sodium: 520
    }
  },
  {
    id: '1202',
    name: 'Salmon Avocado Bowl',
    description: 'Fresh salmon, avocado, brown rice, carrots, cucumber',
    calories: 470,
    price: '$16.99',
    image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg',
    tags: ['Omega-3', 'Healthy Fats', 'Bowl'],
    restaurantId: '12',
    nutrition: {
      protein: 32,
      carbs: 45,
      sugars: 3,
      totalFat: 24,
      saturatedFat: 4,
      fiber: 7,
      sodium: 490
    }
  },

  // Green & Grains
  {
    id: '1301',
    name: 'Buddha Bowl',
    description: 'Quinoa, roasted chickpeas, sweet potato, kale, tahini dressing',
    calories: 380,
    price: '$13.99',
    image: 'https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg',
    tags: ['Vegan', 'High Fiber', 'Bowl'],
    restaurantId: '13',
    nutrition: {
      protein: 15,
      carbs: 58,
      sugars: 8,
      totalFat: 16,
      saturatedFat: 2,
      fiber: 12,
      sodium: 420
    }
  },
  {
    id: '1302',
    name: 'Mediterranean Wrap',
    description: 'Falafel, hummus, cucumber, tomato, whole wheat wrap',
    calories: 420,
    price: '$11.99',
    image: 'https://images.pexels.com/photos/1618906/pexels-photo-1618906.jpeg',
    tags: ['Vegan', 'Mediterranean', 'Wrap'],
    restaurantId: '13',
    nutrition: {
      protein: 18,
      carbs: 64,
      sugars: 6,
      totalFat: 14,
      saturatedFat: 2,
      fiber: 10,
      sodium: 580
    }
  },

  // Protein House
  {
    id: '1401',
    name: 'Muscle Builder Bowl',
    description: 'Grilled chicken, brown rice, black beans, broccoli, almonds',
    calories: 480,
    price: '$14.99',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
    tags: ['High Protein', 'Post-Workout', 'Bowl'],
    restaurantId: '14',
    nutrition: {
      protein: 45,
      carbs: 52,
      sugars: 4,
      totalFat: 16,
      saturatedFat: 3,
      fiber: 8,
      sodium: 620
    }
  },
  {
    id: '1402',
    name: 'Lean & Clean Plate',
    description: 'Turkey meatballs, quinoa, roasted vegetables, pesto',
    calories: 420,
    price: '$13.99',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    tags: ['Low Fat', 'High Protein', 'Plate'],
    restaurantId: '14',
    nutrition: {
      protein: 38,
      carbs: 42,
      sugars: 5,
      totalFat: 14,
      saturatedFat: 3,
      fiber: 6,
      sodium: 580
    }
  }
];