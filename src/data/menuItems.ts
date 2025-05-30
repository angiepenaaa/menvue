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
  {
    id: 'ch-1',
    name: 'Chicken Burrito Bowl',
    description: 'Grilled chicken, brown rice, black beans, fresh salsa, and guacamole',
    calories: 450,
    price: '$9.95',
    image: 'https://images.pexels.com/photos/5737247/pexels-photo-5737247.jpeg',
    tags: ['Lunch', 'High Protein', 'Gluten-Free'],
    restaurantId: 'chipotle',
    ingredients: ['Grilled Chicken', 'Brown Rice', 'Black Beans', 'Fresh Salsa', 'Guacamole', 'Lettuce'],
    nutrition: {
      protein: 32,
      carbs: 45,
      sugars: 3,
      totalFat: 15,
      saturatedFat: 2.5,
      fiber: 8,
      sodium: 750
    }
  },
  {
    id: 'sw-1',
    name: 'Mediterranean Quinoa Bowl',
    description: 'Fresh quinoa bowl with chickpeas, feta, olives, and tahini dressing',
    calories: 380,
    price: '$11.95',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    tags: ['Lunch', 'Vegetarian', 'Mediterranean'],
    restaurantId: 'sweetgreen',
    ingredients: ['Quinoa', 'Chickpeas', 'Feta Cheese', 'Kalamata Olives', 'Cherry Tomatoes', 'Tahini Dressing'],
    nutrition: {
      protein: 15,
      carbs: 48,
      sugars: 6,
      totalFat: 12,
      saturatedFat: 3,
      fiber: 7,
      sodium: 680
    }
  },
  {
    id: 'pn-1',
    name: 'Turkey Avocado Club',
    description: 'Roasted turkey, avocado, bacon, and tomatoes on whole grain bread',
    calories: 420,
    price: '$8.95',
    image: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg',
    tags: ['Lunch', 'High Protein', 'Sandwich'],
    restaurantId: 'panera',
    ingredients: ['Turkey', 'Avocado', 'Bacon', 'Tomatoes', 'Lettuce', 'Whole Grain Bread', 'Mayo'],
    nutrition: {
      protein: 28,
      carbs: 38,
      sugars: 5,
      totalFat: 18,
      saturatedFat: 4,
      fiber: 6,
      sodium: 890
    }
  },
  {
    id: 'cv-1',
    name: 'Greek Power Bowl',
    description: 'Fresh mixed greens, grilled chicken, hummus, and Mediterranean toppings',
    calories: 440,
    price: '$12.95',
    image: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg',
    tags: ['Lunch', 'Mediterranean', 'High Protein'],
    restaurantId: 'cava',
    ingredients: ['Grilled Chicken', 'Mixed Greens', 'Hummus', 'Feta Cheese', 'Red Onions', 'Cucumber', 'Greek Dressing'],
    nutrition: {
      protein: 35,
      carbs: 32,
      sugars: 4,
      totalFat: 22,
      saturatedFat: 5,
      fiber: 8,
      sodium: 720
    }
  },
  {
    id: 'bl-1',
    name: 'Teriyaki Salmon Bowl',
    description: 'Grilled salmon with brown rice, roasted vegetables, and teriyaki glaze',
    calories: 480,
    price: '$13.95',
    image: 'https://images.pexels.com/photos/842142/pexels-photo-842142.jpeg',
    tags: ['Dinner', 'High Protein', 'Omega-3'],
    restaurantId: 'bolay',
    ingredients: ['Salmon', 'Brown Rice', 'Broccoli', 'Carrots', 'Teriyaki Sauce', 'Sesame Seeds'],
    nutrition: {
      protein: 38,
      carbs: 42,
      sugars: 8,
      totalFat: 20,
      saturatedFat: 4,
      fiber: 6,
      sodium: 850
    }
  }
];