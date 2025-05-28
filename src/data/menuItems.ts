import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // First Watch
  {
    id: '101',
    name: 'Healthy Turkey',
    description: 'Egg white omelet with turkey, spinach, house-roasted onions and tomatoes',
    calories: 330,
    price: '$14.29',
    image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg',
    tags: ['Breakfast', 'Protein', 'Low Carb'],
    restaurantId: '1',
    nutrition: {
      protein: 28,
      carbs: 12,
      sugars: 3,
      totalFat: 18,
      saturatedFat: 4,
      fiber: 3,
      sodium: 680
    },
    ingredients: ['egg whites', 'turkey breast', 'spinach', 'onions', 'tomatoes', 'olive oil', 'black pepper', 'sea salt']
  },
  {
    id: '102',
    name: 'A.M. Superfoods Bowl',
    description: 'Non-fat vanilla Greek yogurt, fresh fruit, nuts and granola',
    calories: 460,
    price: '$12.99',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    tags: ['Bowl', 'Vegetarian', 'Breakfast'],
    restaurantId: '1',
    nutrition: {
      protein: 18,
      carbs: 65,
      sugars: 32,
      totalFat: 14,
      saturatedFat: 2,
      fiber: 8,
      sodium: 120
    },
    ingredients: ['non-fat Greek yogurt', 'mixed berries', 'banana', 'granola', 'honey', 'almonds', 'chia seeds']
  },
  {
    id: '103',
    name: 'Market Veggie Omelet',
    description: 'House-roasted vegetables, fresh herbs and mozzarella',
    calories: 380,
    price: '$13.79',
    image: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg',
    tags: ['Breakfast', 'Vegetarian'],
    restaurantId: '1',
    nutrition: {
      protein: 22,
      carbs: 15,
      sugars: 4,
      totalFat: 24,
      saturatedFat: 8,
      fiber: 4,
      sodium: 580
    },
    ingredients: ['eggs', 'bell peppers', 'mushrooms', 'onions', 'spinach', 'mozzarella cheese', 'fresh herbs', 'olive oil']
  },

  // Chicken Salad Chick
  {
    id: '201',
    name: 'Classic Carol',
    description: 'All-white meat chicken salad with finely-diced celery and mayo',
    calories: 400,
    price: '$11.99',
    image: 'https://images.pexels.com/photos/5945754/pexels-photo-5945754.jpeg',
    tags: ['Lunch', 'Protein', 'Signature'],
    restaurantId: '2',
    nutrition: {
      protein: 25,
      carbs: 8,
      sugars: 2,
      totalFat: 32,
      saturatedFat: 5,
      fiber: 1,
      sodium: 560
    },
    ingredients: ['chicken breast', 'celery', 'mayonnaise', 'seasonings']
  },
  {
    id: '202',
    name: 'Fruity Fran',
    description: 'Chicken salad with Fuji apples, seedless grapes & pecans',
    calories: 440,
    price: '$12.49',
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg',
    tags: ['Lunch', 'Sweet & Savory'],
    restaurantId: '2',
    nutrition: {
      protein: 23,
      carbs: 18,
      sugars: 12,
      totalFat: 34,
      saturatedFat: 5,
      fiber: 3,
      sodium: 520
    },
    ingredients: ['chicken breast', 'Fuji apples', 'grapes', 'pecans', 'mayonnaise', 'seasonings']
  },

  // Zoes Kitchen
  {
    id: '301',
    name: 'Mediterranean Power Bowl',
    description: 'Quinoa, mixed greens, tzatziki, feta, and grilled chicken',
    calories: 450,
    price: '$13.99',
    image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg',
    tags: ['Bowl', 'Mediterranean', 'Protein'],
    restaurantId: '3',
    nutrition: {
      protein: 32,
      carbs: 42,
      sugars: 6,
      totalFat: 22,
      saturatedFat: 4,
      fiber: 8,
      sodium: 720
    },
    ingredients: ['quinoa', 'grilled chicken', 'mixed greens', 'tzatziki', 'feta cheese', 'kalamata olives', 'cucumber']
  },
  {
    id: '302',
    name: 'Cauliflower Rice Bowl',
    description: 'Mediterranean cauliflower rice with grilled vegetables',
    calories: 320,
    price: '$12.99',
    image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg',
    tags: ['Low Carb', 'Vegetarian', 'Gluten-Free'],
    restaurantId: '3',
    nutrition: {
      protein: 8,
      carbs: 24,
      sugars: 6,
      totalFat: 18,
      saturatedFat: 3,
      fiber: 9,
      sodium: 480
    },
    ingredients: ['cauliflower rice', 'grilled vegetables', 'herbs', 'olive oil', 'Mediterranean spices']
  },

  // Tropical Smoothie Cafe
  {
    id: '401',
    name: 'Island Green Smoothie',
    description: 'Spinach, kale, mango, pineapple and banana',
    calories: 280,
    price: '$6.99',
    image: 'https://images.pexels.com/photos/434295/pexels-photo-434295.jpeg',
    tags: ['Smoothie', 'Vegetarian', 'Energy'],
    restaurantId: '4',
    nutrition: {
      protein: 5,
      carbs: 62,
      sugars: 40,
      totalFat: 2,
      saturatedFat: 0,
      fiber: 8,
      sodium: 30
    },
    ingredients: ['spinach', 'kale', 'mango', 'pineapple', 'banana']
  },
  {
    id: '402',
    name: 'Detox Island Green Bowl',
    description: 'Spinach, kale, mango, pineapple, banana topped with granola',
    calories: 410,
    price: '$9.99',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    tags: ['Bowl', 'Vegetarian', 'Energy'],
    restaurantId: '4',
    nutrition: {
      protein: 8,
      carbs: 88,
      sugars: 46,
      totalFat: 6,
      saturatedFat: 1,
      fiber: 12,
      sodium: 45
    },
    ingredients: ['spinach', 'kale', 'mango', 'pineapple', 'banana', 'granola', 'coconut']
  },

  // Panera Bread
  {
    id: '501',
    name: 'Mediterranean Grain Bowl',
    description: 'Cilantro lime rice, quinoa, arugula, and chicken',
    calories: 480,
    price: '$13.99',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    tags: ['Bowl', 'Mediterranean', 'Protein'],
    restaurantId: '5',
    nutrition: {
      protein: 32,
      carbs: 48,
      sugars: 4,
      totalFat: 24,
      saturatedFat: 4,
      fiber: 7,
      sodium: 680
    },
    ingredients: ['cilantro lime rice', 'quinoa', 'arugula', 'grilled chicken', 'kalamata olives', 'feta', 'greek dressing']
  },
  {
    id: '502',
    name: 'Greek Salad',
    description: 'Romaine, feta, kalamata olives, and Greek dressing',
    calories: 380,
    price: '$11.99',
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg',
    tags: ['Salad', 'Vegetarian', 'Mediterranean'],
    restaurantId: '5',
    nutrition: {
      protein: 12,
      carbs: 22,
      sugars: 5,
      totalFat: 28,
      saturatedFat: 8,
      fiber: 4,
      sodium: 890
    },
    ingredients: ['romaine lettuce', 'feta cheese', 'kalamata olives', 'red onions', 'tomatoes', 'pepperoncini', 'Greek dressing']
  }
];