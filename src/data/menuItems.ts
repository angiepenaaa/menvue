import type { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
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
  },

  // Chick-fil-A Items
  {
    id: '1501',
    name: 'Grilled Chicken Sandwich',
    description: 'Grilled chicken breast, lettuce, tomato on a toasted multigrain bun',
    calories: 380,
    price: '$5.99',
    image: 'https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg',
    tags: ['Grilled', 'High Protein', 'Sandwich'],
    restaurantId: '15',
    nutrition: {
      protein: 28,
      carbs: 41,
      sugars: 9,
      totalFat: 12,
      saturatedFat: 2.5,
      fiber: 3,
      sodium: 680
    }
  },
  {
    id: '1502',
    name: 'Grilled Chicken Cool Wrap',
    description: 'Grilled chicken, lettuce, red cabbage, carrots in a flaxseed flour flat bread',
    calories: 350,
    price: '$7.29',
    image: 'https://images.pexels.com/photos/1618906/pexels-photo-1618906.jpeg',
    tags: ['Wrap', 'High Protein', 'Low Fat'],
    restaurantId: '15',
    nutrition: {
      protein: 42,
      carbs: 29,
      sugars: 3,
      totalFat: 13,
      saturatedFat: 3.5,
      fiber: 15,
      sodium: 660
    }
  },
  {
    id: '1503',
    name: 'Market Salad',
    description: 'Grilled chicken breast, mixed greens, blue cheese, apples, strawberries, blueberries',
    calories: 340,
    price: '$9.69',
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg',
    tags: ['Salad', 'High Protein', 'Antioxidants'],
    restaurantId: '15',
    nutrition: {
      protein: 27,
      carbs: 26,
      sugars: 16,
      totalFat: 14,
      saturatedFat: 3,
      fiber: 6,
      sodium: 520
    }
  },
  {
    id: '1504',
    name: 'Grilled Chicken Nuggets (8 ct)',
    description: 'Eight piece grilled chicken nuggets, perfect for protein-focused meals',
    calories: 130,
    price: '$5.89',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
    tags: ['Grilled', 'High Protein', 'Low Carb'],
    restaurantId: '15',
    nutrition: {
      protein: 25,
      carbs: 2,
      sugars: 0,
      totalFat: 3,
      saturatedFat: 0.5,
      fiber: 0,
      sodium: 440
    }
  },
  {
    id: '1505',
    name: 'Grilled Chicken Club',
    description: 'Grilled chicken, Colby Jack cheese, bacon, lettuce, tomato',
    calories: 440,
    price: '$7.99',
    image: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg',
    tags: ['Sandwich', 'High Protein', 'Club'],
    restaurantId: '15',
    nutrition: {
      protein: 42,
      carbs: 39,
      sugars: 7,
      totalFat: 18,
      saturatedFat: 7,
      fiber: 3,
      sodium: 680
    }
  },
  {
    id: '1506',
    name: 'Spicy Southwest Salad',
    description: 'Grilled chicken, mixed greens, black beans, corn, tomatoes, peppers',
    calories: 450,
    price: '$9.69',
    image: 'https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg',
    tags: ['Salad', 'Spicy', 'High Protein'],
    restaurantId: '15',
    nutrition: {
      protein: 32,
      carbs: 42,
      sugars: 9,
      totalFat: 19,
      saturatedFat: 6,
      fiber: 8,
      sodium: 590
    }
  },

  // CAVA Menu Items
  {
    id: '1601',
    name: 'Grilled Chicken Bowl',
    description: 'RightRice, grilled chicken, hummus, tzatziki, feta, cucumber, tomatoes',
    calories: 480,
    price: '$13.99',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    tags: ['Bowl', 'High Protein', 'Mediterranean'],
    restaurantId: '16',
    nutrition: {
      protein: 38,
      carbs: 45,
      sugars: 6,
      totalFat: 22,
      saturatedFat: 5,
      fiber: 8,
      sodium: 890
    }
  },
  {
    id: '1602',
    name: 'Falafel & Hummus Bowl',
    description: 'Falafel, hummus, quinoa, mixed greens, cucumber, tomatoes, tahini',
    calories: 420,
    price: '$12.99',
    image: 'https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg',
    tags: ['Bowl', 'Vegetarian', 'Mediterranean'],
    restaurantId: '16',
    nutrition: {
      protein: 18,
      carbs: 58,
      sugars: 8,
      totalFat: 19,
      saturatedFat: 3,
      fiber: 12,
      sodium: 780
    }
  },
  {
    id: '1603',
    name: 'Salmon & Avocado Bowl',
    description: 'Grilled salmon, brown rice, avocado, mixed greens, pickled onions',
    calories: 490,
    price: '$15.99',
    image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg',
    tags: ['Bowl', 'High Protein', 'Omega-3'],
    restaurantId: '16',
    nutrition: {
      protein: 34,
      carbs: 42,
      sugars: 4,
      totalFat: 26,
      saturatedFat: 4,
      fiber: 9,
      sodium: 720
    }
  },
  {
    id: '1604',
    name: 'Mediterranean Salad',
    description: 'Mixed greens, feta, olives, cucumber, tomatoes, red onion, Greek vinaigrette',
    calories: 320,
    price: '$11.99',
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg',
    tags: ['Salad', 'Vegetarian', 'Low Calorie'],
    restaurantId: '16',
    nutrition: {
      protein: 12,
      carbs: 24,
      sugars: 6,
      totalFat: 22,
      saturatedFat: 6,
      fiber: 5,
      sodium: 680
    }
  },
  {
    id: '1605',
    name: 'Harissa Chicken Bowl',
    description: 'Harissa-spiced chicken, quinoa, roasted vegetables, hummus, tahini',
    calories: 470,
    price: '$14.99',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    tags: ['Bowl', 'Spicy', 'High Protein'],
    restaurantId: '16',
    nutrition: {
      protein: 36,
      carbs: 48,
      sugars: 5,
      totalFat: 20,
      saturatedFat: 4,
      fiber: 7,
      sodium: 850
    }
  },
  {
    id: '1606',
    name: 'Cauliflower Quinoa Bowl',
    description: 'Roasted cauliflower, quinoa, hummus, mixed greens, tahini',
    calories: 380,
    price: '$12.99',
    image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg',
    tags: ['Bowl', 'Vegan', 'Low Calorie'],
    restaurantId: '16',
    nutrition: {
      protein: 14,
      carbs: 52,
      sugars: 7,
      totalFat: 18,
      saturatedFat: 2,
      fiber: 10,
      sodium: 640
    }
  }
];