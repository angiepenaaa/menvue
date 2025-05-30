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
    ingredients: ['Egg Whites', 'Spinach', 'Feta Cheese', 'Tomatoes', 'Whole Wheat Wrap', 'Garlic Herb Butter'],
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
  // Add ingredients array to all other menu items...
  {
    id: 'sb-2',
    name: 'Turkey Bacon & Egg White Sandwich',
    description: 'Reduced-fat turkey bacon, egg whites, reduced-fat white cheddar on an English muffin',
    calories: 230,
    price: '$4.95',
    image: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg',
    tags: ['Breakfast', 'High Protein', 'Low Fat'],
    restaurantId: 'starbucks',
    ingredients: ['Turkey Bacon', 'Egg Whites', 'Reduced-fat Cheddar', 'English Muffin', 'Light Mayo'],
    nutrition: {
      protein: 17,
      carbs: 28,
      sugars: 2,
      totalFat: 5,
      saturatedFat: 2.5,
      fiber: 2,
      sodium: 560
    }
  }
  // Continue adding ingredients to all other menu items...
];