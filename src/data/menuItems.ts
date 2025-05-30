import type { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Starbucks Items
  {
    id: 'sb-1',
    name: 'Spinach & Feta Egg White Wrap',
    description: 'Egg whites, spinach, feta cheese and tomatoes inside a whole-wheat wrap',
    calories: 290,
    price: '$5.45',
    image: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg',
    tags: ['Breakfast', 'High Protein', 'Vegetarian'],
    restaurantId: 'starbucks',
    nutrition: {
      protein: 20,
      carbs: 33,
      sugars: 4,
      totalFat: 8,
      saturatedFat: 3.5,
      fiber: 5,
      sodium: 830
    }
  },
  {
    id: 'sb-2',
    name: 'Turkey Bacon & Egg White Sandwich',
    description: 'Reduced-fat turkey bacon, egg whites, reduced-fat white cheddar on an English muffin',
    calories: 230,
    price: '$4.95',
    image: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg',
    tags: ['Breakfast', 'High Protein', 'Low Fat'],
    restaurantId: 'starbucks',
    nutrition: {
      protein: 17,
      carbs: 28,
      sugars: 2,
      totalFat: 5,
      saturatedFat: 2.5,
      fiber: 2,
      sodium: 560
    }
  },

  // Dunkin' Items
  {
    id: 'dk-1',
    name: 'Veggie Egg White Bowl',
    description: 'Egg whites, spinach, roasted peppers, caramelized onions, and cheddar cheese',
    calories: 250,
    price: '$4.99',
    image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg',
    tags: ['Breakfast', 'High Protein', 'Vegetarian', 'Low Carb'],
    restaurantId: 'dunkin',
    nutrition: {
      protein: 14,
      carbs: 19,
      sugars: 3,
      totalFat: 14,
      saturatedFat: 5,
      fiber: 2,
      sodium: 450
    }
  },
  {
    id: 'dk-2',
    name: 'Turkey Sausage Wake-Up Wrap',
    description: 'Turkey sausage, egg whites, and cheese in a tortilla',
    calories: 240,
    price: '$3.99',
    image: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg',
    tags: ['Breakfast', 'High Protein'],
    restaurantId: 'dunkin',
    nutrition: {
      protein: 11,
      carbs: 24,
      sugars: 1,
      totalFat: 11,
      saturatedFat: 4,
      fiber: 1,
      sodium: 600
    }
  },

  // Panera Items
  {
    id: 'pn-1',
    name: 'Mediterranean Bowl with Chicken',
    description: 'Cilantro lime rice, arugula, grape tomatoes, Kalamata olives, cucumber, hummus',
    calories: 460,
    price: '$12.99',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    tags: ['Mediterranean', 'High Protein', 'Bowl'],
    restaurantId: 'panera',
    nutrition: {
      protein: 32,
      carbs: 48,
      sugars: 3,
      totalFat: 19,
      saturatedFat: 3,
      fiber: 7,
      sodium: 950
    }
  },
  {
    id: 'pn-2',
    name: 'Greek Salad with Chicken',
    description: 'Romaine, grape tomatoes, feta, onions, Kalamata olives, Greek dressing',
    calories: 440,
    price: '$11.99',
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg',
    tags: ['Mediterranean', 'High Protein', 'Salad'],
    restaurantId: 'panera',
    nutrition: {
      protein: 34,
      carbs: 15,
      sugars: 4,
      totalFat: 31,
      saturatedFat: 8,
      fiber: 4,
      sodium: 1040
    }
  },

  // Sweetgreen Items
  {
    id: 'sg-1',
    name: 'Harvest Bowl',
    description: 'Wild rice, kale, sweet potatoes, apples, roasted chicken, almonds, goat cheese',
    calories: 480,
    price: '$13.95',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    tags: ['Bowl', 'High Protein', 'Seasonal'],
    restaurantId: 'sweetgreen',
    nutrition: {
      protein: 30,
      carbs: 56,
      sugars: 11,
      totalFat: 19,
      saturatedFat: 4,
      fiber: 8,
      sodium: 670
    }
  },
  {
    id: 'sg-2',
    name: 'Guacamole Greens',
    description: 'Mesclun, roasted chicken, avocado, tomatoes, tortilla chips, lime cilantro dressing',
    calories: 470,
    price: '$12.95',
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg',
    tags: ['Salad', 'High Protein', 'Mexican-Inspired'],
    restaurantId: 'sweetgreen',
    nutrition: {
      protein: 32,
      carbs: 29,
      sugars: 6,
      totalFat: 28,
      saturatedFat: 5,
      fiber: 9,
      sodium: 700
    }
  },

  // Chipotle Items
  {
    id: 'ch-1',
    name: 'Chicken Burrito Bowl',
    description: 'Brown rice, black beans, chicken, fresh tomato salsa, romaine lettuce',
    calories: 450,
    price: '$9.95',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    tags: ['Bowl', 'High Protein', 'Mexican'],
    restaurantId: 'chipotle',
    nutrition: {
      protein: 42,
      carbs: 51,
      sugars: 4,
      totalFat: 11,
      saturatedFat: 3,
      fiber: 13,
      sodium: 1090
    }
  },
  {
    id: 'ch-2',
    name: 'Veggie Salad Bowl',
    description: 'Romaine, black beans, fajita veggies, fresh tomato salsa, guacamole',
    calories: 400,
    price: '$8.95',
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg',
    tags: ['Salad', 'Vegan', 'Mexican'],
    restaurantId: 'chipotle',
    nutrition: {
      protein: 12,
      carbs: 46,
      sugars: 6,
      totalFat: 23,
      saturatedFat: 4,
      fiber: 16,
      sodium: 850
    }
  },

  // Bolay Items
  {
    id: 'bl-1',
    name: 'Teriyaki Chicken Bowl',
    description: 'Cilantro noodles, chicken, broccoli, mushrooms, carrots, teriyaki sauce',
    calories: 490,
    price: '$12.99',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    tags: ['Bowl', 'High Protein', 'Asian-Inspired'],
    restaurantId: 'bolay',
    nutrition: {
      protein: 38,
      carbs: 54,
      sugars: 12,
      totalFat: 15,
      saturatedFat: 3,
      fiber: 6,
      sodium: 890
    }
  },
  {
    id: 'bl-2',
    name: 'Kale Caesar Bowl',
    description: 'Kale, quinoa, chicken, parmesan, cherry tomatoes, caesar dressing',
    calories: 470,
    price: '$11.99',
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg',
    tags: ['Bowl', 'High Protein', 'Gluten-Free'],
    restaurantId: 'bolay',
    nutrition: {
      protein: 35,
      carbs: 38,
      sugars: 4,
      totalFat: 24,
      saturatedFat: 5,
      fiber: 7,
      sodium: 780
    }
  }
];