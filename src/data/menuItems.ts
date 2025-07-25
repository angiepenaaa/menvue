import type { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
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
    id: 'sb-3',
    name: 'Protein Bistro Box',
    description: 'Hard-boiled eggs, apple slices, grapes, white cheddar cheese, and multigrain muesli bread',
    calories: 320,
    price: '$6.95',
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg',
    tags: ['Breakfast', 'High Protein', 'Balanced'],
    restaurantId: 'starbucks',
    ingredients: ['Hard-boiled Eggs', 'Apple', 'Grapes', 'White Cheddar', 'Multigrain Bread', 'Honey Peanut Butter'],
    nutrition: {
      protein: 23,
      carbs: 36,
      sugars: 18,
      totalFat: 14,
      saturatedFat: 6,
      fiber: 3,
      sodium: 470
    }
  },
  {
    id: 'sb-4',
    name: 'Chicken & Quinoa Protein Bowl',
    description: 'Grilled chicken, quinoa, roasted corn, black beans, and jicama-tomato salad',
    calories: 420,
    price: '$9.95',
    image: 'https://images.pexels.com/photos/1234535/pexels-photo-1234535.jpeg',
    tags: ['Lunch', 'High Protein', 'Gluten-Free'],
    restaurantId: 'starbucks',
    ingredients: ['Grilled Chicken', 'Quinoa', 'Roasted Corn', 'Black Beans', 'Jicama', 'Tomatoes', 'Lime Vinaigrette'],
    nutrition: {
      protein: 27,
      carbs: 42,
      sugars: 6,
      totalFat: 17,
      saturatedFat: 3,
      fiber: 9,
      sodium: 650
    }
  },
  {
    id: 'pg-1',
    name: 'Mediterranean Chicken Bowl',
    description: 'Grilled chicken, quinoa tabbouleh, hummus, and Greek salad',
    calories: 450,
    price: '$12.95',
    image: 'https://images.pexels.com/photos/5718071/pexels-photo-5718071.jpeg',
    tags: ['Lunch', 'Mediterranean', 'High Protein'],
    restaurantId: 'protein-bar',
    ingredients: ['Grilled Chicken', 'Quinoa', 'Hummus', 'Cucumber', 'Tomatoes', 'Feta', 'Olive Oil'],
    nutrition: {
      protein: 35,
      carbs: 48,
      sugars: 4,
      totalFat: 16,
      saturatedFat: 4,
      fiber: 8,
      sodium: 720
    }
  },
  {
    id: 'pg-2',
    name: 'Salmon Superfood Bowl',
    description: 'Grilled salmon, kale, sweet potato, avocado, and ancient grains',
    calories: 480,
    price: '$14.95',
    image: 'https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg',
    tags: ['Dinner', 'Omega-3', 'Superfood'],
    restaurantId: 'protein-bar',
    ingredients: ['Grilled Salmon', 'Kale', 'Sweet Potato', 'Avocado', 'Quinoa', 'Lemon Herb Dressing'],
    nutrition: {
      protein: 32,
      carbs: 45,
      sugars: 7,
      totalFat: 22,
      saturatedFat: 3,
      fiber: 11,
      sodium: 580
    }
  },
  {
    id: 'ce-1',
    name: 'Buffalo Chicken Bowl',
    description: 'Grilled chicken in buffalo sauce with cauliflower rice and blue cheese',
    calories: 380,
    price: '$11.95',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
    tags: ['Lunch', 'Keto', 'Low Carb'],
    restaurantId: 'clean-eatz',
    ingredients: ['Grilled Chicken', 'Buffalo Sauce', 'Cauliflower Rice', 'Blue Cheese', 'Celery'],
    nutrition: {
      protein: 45,
      carbs: 12,
      sugars: 3,
      totalFat: 18,
      saturatedFat: 5,
      fiber: 4,
      sodium: 890
    }
  },
  {
    id: 'ce-2',
    name: 'Teriyaki Tofu Bowl',
    description: 'Grilled tofu, brown rice, roasted vegetables in teriyaki sauce',
    calories: 420,
    price: '$10.95',
    image: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg',
    tags: ['Dinner', 'Vegan', 'Plant-Based'],
    restaurantId: 'clean-eatz',
    ingredients: ['Grilled Tofu', 'Brown Rice', 'Broccoli', 'Carrots', 'Teriyaki Sauce'],
    nutrition: {
      protein: 22,
      carbs: 65,
      sugars: 12,
      totalFat: 10,
      saturatedFat: 1,
      fiber: 7,
      sodium: 620
    }
  },
  {
    id: 'fr-1',
    name: 'Buddha Bowl',
    description: 'Brown rice, roasted vegetables, tofu, and miso ginger dressing',
    calories: 420,
    price: '$11.95',
    image: 'https://images.pexels.com/photos/884600/pexels-photo-884600.jpeg',
    tags: ['Lunch', 'Vegan', 'Buddha Bowl'],
    restaurantId: 'freshii',
    ingredients: ['Brown Rice', 'Roasted Vegetables', 'Tofu', 'Miso Ginger Dressing'],
    nutrition: {
      protein: 18,
      carbs: 65,
      sugars: 10,
      totalFat: 14,
      saturatedFat: 2,
      fiber: 8,
      sodium: 620
    }
  },
  {
    id: 'fr-2',
    name: 'Protein Smoothie Bowl',
    description: 'Protein smoothie base topped with granola, berries, and honey',
    calories: 380,
    price: '$9.95',
    image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg',
    tags: ['Breakfast', 'High Protein', 'Smoothie Bowl'],
    restaurantId: 'freshii',
    ingredients: ['Protein Smoothie', 'Granola', 'Mixed Berries', 'Honey'],
    nutrition: {
      protein: 24,
      carbs: 52,
      sugars: 18,
      totalFat: 8,
      saturatedFat: 1,
      fiber: 6,
      sodium: 280
    }
  },
  {
    id: 'sb-2',
    name: 'Turkey Bacon & Egg White Sandwich',
    description: 'Reduced-fat turkey bacon with egg whites and reduced-fat white cheddar on an English muffin',
    calories: 230,
    price: '$4.95',
    image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg',
    tags: ['Breakfast', 'High Protein', 'Low Fat'],
    restaurantId: 'starbucks',
    ingredients: ['Turkey Bacon', 'Egg Whites', 'Reduced-fat Cheddar', 'English Muffin'],
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
    id: 'sw-2',
    name: 'Harvest Bowl',
    description: 'Wild rice, sweet potatoes, apples, goat cheese with balsamic vinaigrette',
    calories: 430,
    price: '$12.95',
    image: 'https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg',
    tags: ['Lunch', 'Vegetarian', 'Seasonal'],
    restaurantId: 'sweetgreen',
    ingredients: ['Wild Rice', 'Roasted Sweet Potato', 'Apple', 'Goat Cheese', 'Mixed Greens', 'Balsamic Vinaigrette'],
    nutrition: {
      protein: 13,
      carbs: 52,
      sugars: 14,
      totalFat: 15,
      saturatedFat: 4,
      fiber: 8,
      sodium: 540
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
    id: 'ch-2',
    name: 'Veggie Bowl',
    description: 'Fajita veggies, brown rice, black beans, fresh salsa, and guacamole',
    calories: 400,
    price: '$8.95',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    tags: ['Lunch', 'Vegan', 'Gluten-Free'],
    restaurantId: 'chipotle',
    ingredients: ['Fajita Veggies', 'Brown Rice', 'Black Beans', 'Fresh Salsa', 'Guacamole', 'Lettuce'],
    nutrition: {
      protein: 15,
      carbs: 50,
      sugars: 4,
      totalFat: 16,
      saturatedFat: 2,
      fiber: 12,
      sodium: 680
    }
  },
  {
    id: 'pn-1',
    name: 'Turkey Avocado Club',
    description: 'Roasted turkey, avocado, bacon, and tomatoes on whole grain bread',
    calories: 420,
    price: '$8.95',
    image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg',
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
    id: 'pn-2',
    name: 'Mediterranean Veggie Sandwich',
    description: 'Peppadew peppers, feta, cucumbers, hummus on tomato basil bread',
    calories: 340,
    price: '$7.95',
    image: 'https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg',
    tags: ['Lunch', 'Vegetarian', 'Mediterranean'],
    restaurantId: 'panera',
    ingredients: ['Peppadew Peppers', 'Feta Cheese', 'Cucumber', 'Hummus', 'Tomato Basil Bread'],
    nutrition: {
      protein: 13,
      carbs: 44,
      sugars: 5,
      totalFat: 12,
      saturatedFat: 3,
      fiber: 5,
      sodium: 680
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
    id: 'cv-2',
    name: 'Falafel Bowl',
    description: 'Crispy falafel, hummus, tabbouleh, and Mediterranean toppings',
    calories: 380,
    price: '$11.95',
    image: 'https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg',
    tags: ['Lunch', 'Vegetarian', 'Mediterranean'],
    restaurantId: 'cava',
    ingredients: ['Falafel', 'Hummus', 'Tabbouleh', 'Tomatoes', 'Cucumber', 'Tahini Sauce'],
    nutrition: {
      protein: 14,
      carbs: 45,
      sugars: 5,
      totalFat: 18,
      saturatedFat: 2.5,
      fiber: 10,
      sodium: 680
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
  },
  {
    id: 'bl-2',
    name: 'Keto Bowl',
    description: 'Grilled steak, cauliflower rice, avocado, and keto-friendly toppings',
    calories: 420,
    price: '$14.95',
    image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg',
    tags: ['Dinner', 'Keto', 'Low Carb'],
    restaurantId: 'bolay',
    ingredients: ['Grilled Steak', 'Cauliflower Rice', 'Avocado', 'Mushrooms', 'Spinach', 'Garlic Aioli'],
    nutrition: {
      protein: 35,
      carbs: 12,
      sugars: 4,
      totalFat: 28,
      saturatedFat: 6,
      fiber: 8,
      sodium: 720
    }
  },
  {
    id: 'fw-1',
    name: 'Protein Power Bowl',
    description: 'Quinoa, chicken breast, avocado, and power vegetables',
    calories: 380,
    price: '$12.95',
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg',
    tags: ['Breakfast', 'High Protein', 'Gluten-Free'],
    restaurantId: 'first-watch',
    ingredients: ['Quinoa', 'Grilled Chicken', 'Avocado', 'Kale', 'Sweet Potato', 'Almonds'],
    nutrition: {
      protein: 32,
      carbs: 35,
      sugars: 6,
      totalFat: 16,
      saturatedFat: 2,
      fiber: 9,
      sodium: 580
    }
  },
  {
    id: 'fw-2',
    name: 'Superfood Breakfast Bowl',
    description: 'Acai, fresh berries, banana, granola, and honey',
    calories: 340,
    price: '$11.95',
    image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg',
    tags: ['Breakfast', 'Vegetarian', 'Antioxidant-Rich'],
    restaurantId: 'first-watch',
    ingredients: ['Acai Puree', 'Mixed Berries', 'Banana', 'Granola', 'Honey', 'Coconut'],
    nutrition: {
      protein: 8,
      carbs: 62,
      sugars: 28,
      totalFat: 10,
      saturatedFat: 1.5,
      fiber: 11,
      sodium: 95
    }
  }
];