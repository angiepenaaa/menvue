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
    },
    rating: {
      score: 4.7,
      count: 128,
      reviews: [
        {
          id: 'r1',
          userId: 'u1',
          username: 'Sarah M.',
          rating: 5,
          comment: 'Perfect healthy breakfast option! The feta adds just the right amount of saltiness.',
          date: '2024-03-15',
          helpful: 24,
          userImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
        },
        {
          id: 'r2',
          userId: 'u2',
          username: 'Mike R.',
          rating: 4,
          comment: 'Great protein content and keeps me full until lunch. Wish it was a bit bigger though.',
          date: '2024-03-12',
          helpful: 18
        }
      ]
    }
  },
  {
    id: 'sb-2',
    name: 'Turkey Bacon & Egg White Sandwich',
    description: 'Reduced-fat turkey bacon with egg whites and reduced-fat white cheddar on an English muffin',
    calories: 230,
    price: '$4.95',
    image: 'https://images.pexels.com/photos/3609894/pexels-photo-3609894.jpeg',
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
    },
    rating: {
      score: 4.5,
      count: 95,
      reviews: [
        {
          id: 'r3',
          userId: 'u3',
          username: 'John D.',
          rating: 5,
          comment: 'My go-to breakfast sandwich. Healthy and delicious!',
          date: '2024-03-14',
          helpful: 15
        },
        {
          id: 'r4',
          userId: 'u4',
          username: 'Lisa K.',
          rating: 4,
          comment: 'Good protein-packed breakfast option. The turkey bacon is tasty.',
          date: '2024-03-10',
          helpful: 12
        }
      ]
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
    },
    rating: {
      score: 4.8,
      count: 156,
      reviews: [
        {
          id: 'r5',
          userId: 'u5',
          username: 'Emma S.',
          rating: 5,
          comment: 'The perfect Mediterranean bowl! Love the combination of flavors.',
          date: '2024-03-13',
          helpful: 28
        },
        {
          id: 'r6',
          userId: 'u6',
          username: 'David M.',
          rating: 4,
          comment: 'Fresh and filling. Great vegetarian option.',
          date: '2024-03-11',
          helpful: 20
        }
      ]
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
    },
    rating: {
      score: 4.6,
      count: 142,
      reviews: [
        {
          id: 'r7',
          userId: 'u7',
          username: 'Rachel B.',
          rating: 5,
          comment: 'Love the seasonal ingredients. The sweet potato and apple combo is amazing!',
          date: '2024-03-15',
          helpful: 22
        },
        {
          id: 'r8',
          userId: 'u8',
          username: 'Tom H.',
          rating: 4,
          comment: 'Great fall flavors. Filling and nutritious.',
          date: '2024-03-12',
          helpful: 16
        }
      ]
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
    },
    rating: {
      score: 4.9,
      count: 203,
      reviews: [
        {
          id: 'r9',
          userId: 'u9',
          username: 'Alex P.',
          rating: 5,
          comment: 'Best burrito bowl ever! Perfect portion and so fresh.',
          date: '2024-03-14',
          helpful: 35
        },
        {
          id: 'r10',
          userId: 'u10',
          username: 'Maria G.',
          rating: 5,
          comment: 'Love how customizable it is. The guac is worth the extra!',
          date: '2024-03-11',
          helpful: 28
        }
      ]
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
    },
    rating: {
      score: 4.7,
      count: 167,
      reviews: [
        {
          id: 'r11',
          userId: 'u11',
          username: 'Sophie L.',
          rating: 5,
          comment: 'Amazing vegan option! So flavorful and filling.',
          date: '2024-03-15',
          helpful: 30
        },
        {
          id: 'r12',
          userId: 'u12',
          username: 'Chris B.',
          rating: 4,
          comment: 'Great vegetarian bowl. The fajita veggies are perfectly seasoned.',
          date: '2024-03-13',
          helpful: 22
        }
      ]
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
    },
    rating: {
      score: 4.6,
      count: 145,
      reviews: [
        {
          id: 'r13',
          userId: 'u13',
          username: 'Jennifer R.',
          rating: 5,
          comment: 'Fresh ingredients and perfectly toasted bread. Love it!',
          date: '2024-03-14',
          helpful: 25
        },
        {
          id: 'r14',
          userId: 'u14',
          username: 'Mark S.',
          rating: 4,
          comment: 'Solid sandwich. The avocado makes it extra special.',
          date: '2024-03-12',
          helpful: 19
        }
      ]
    }
  },
  {
    id: 'pn-2',
    name: 'Mediterranean Veggie Sandwich',
    description: 'Peppadew peppers, feta, cucumbers, hummus on tomato basil bread',
    calories: 340,
    price: '$7.95',
    image: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg',
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
    },
    rating: {
      score: 4.5,
      count: 132,
      reviews: [
        {
          id: 'r15',
          userId: 'u15',
          username: 'Laura M.',
          rating: 5,
          comment: 'Best vegetarian sandwich! The peppers add a nice kick.',
          date: '2024-03-15',
          helpful: 21
        },
        {
          id: 'r16',
          userId: 'u16',
          username: 'Peter K.',
          rating: 4,
          comment: 'Fresh and light. Perfect lunch option.',
          date: '2024-03-11',
          helpful: 15
        }
      ]
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
    },
    rating: {
      score: 4.8,
      count: 178,
      reviews: [
        {
          id: 'r17',
          userId: 'u17',
          username: 'Anna D.',
          rating: 5,
          comment: 'Amazing Mediterranean flavors! The chicken is always perfectly cooked.',
          date: '2024-03-14',
          helpful: 32
        },
        {
          id: 'r18',
          userId: 'u18',
          username: 'James W.',
          rating: 5,
          comment: 'Healthy and delicious. Great portion size!',
          date: '2024-03-12',
          helpful: 25
        }
      ]
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
    },
    rating: {
      score: 4.7,
      count: 165,
      reviews: [
        {
          id: 'r19',
          userId: 'u19',
          username: 'Maya H.',
          rating: 5,
          comment: 'Best falafel in town! Love all the fresh toppings.',
          date: '2024-03-15',
          helpful: 28
        },
        {
          id: 'r20',
          userId: 'u20',
          username: 'Daniel F.',
          rating: 4,
          comment: 'Great vegetarian option. The hummus is amazing!',
          date: '2024-03-13',
          helpful: 20
        }
      ]
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
    },
    rating: {
      score: 4.9,
      count: 189,
      reviews: [
        {
          id: 'r21',
          userId: 'u21',
          username: 'Emily R.',
          rating: 5,
          comment: 'The salmon is always cooked perfectly! Love the teriyaki sauce.',
          date: '2024-03-14',
          helpful: 34
        },
        {
          id: 'r22',
          userId: 'u22',
          username: 'Kevin L.',
          rating: 5,
          comment: 'Healthy and delicious. Great portion of salmon!',
          date: '2024-03-12',
          helpful: 27
        }
      ]
    }
  },
  {
    id: 'bl-2',
    name: 'Keto Bowl',
    description: 'Grilled steak, cauliflower rice, avocado, and keto-friendly toppings',
    calories: 420,
    price: '$14.95',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
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
    },
    rating: {
      score: 4.7,
      count: 156,
      reviews: [
        {
          id: 'r23',
          userId: 'u23',
          username: 'Robert M.',
          rating: 5,
          comment: 'Perfect for my keto diet! The steak is always tender.',
          date: '2024-03-15',
          helpful: 29
        },
        {
          id: 'r24',
          userId: 'u24',
          username: 'Sarah K.',
          rating: 4,
          comment: 'Great low-carb option. Love the cauliflower rice!',
          date: '2024-03-13',
          helpful: 22
        }
      ]
    }
  },
  {
    id: 'fw-1',
    name: 'Protein Power Bowl',
    description: 'Quinoa, chicken breast, avocado, and power vegetables',
    calories: 380,
    price: '$12.95',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
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
    },
    rating: {
      score: 4.8,
      count: 142,
      reviews: [
        {
          id: 'r25',
          userId: 'u25',
          username: 'Michael B.',
          rating: 5,
          comment: 'Perfect post-workout meal! Love the protein content.',
          date: '2024-03-14',
          helpful: 26
        },
        {
          id: 'r26',
          userId: 'u26',
          username: 'Jessica H.',
          rating: 5,
          comment: 'Healthy and filling. The avocado makes it extra special!',
          date: '2024-03-12',
          helpful: 20
        }
      ]
    }
  },
  {
    id: 'fw-2',
    name: 'Superfood Breakfast Bowl',
    description: 'Acai, fresh berries, banana, granola, and honey',
    calories: 340,
    price: '$11.95',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
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
    },
    rating: {
      score: 4.6,
      count: 134,
      reviews: [
        {
          id: 'r27',
          userId: 'u27',
          username: 'Amanda C.',
          rating: 5,
          comment: 'Best acai bowl! Love all the fresh fruits and toppings.',
          date: '2024-03-15',
          helpful: 24
        },
        {
          id: 'r28',
          userId: 'u28',
          username: 'Brian T.',
          rating: 4,
          comment: 'Delicious and refreshing. Perfect summer breakfast!',
          date: '2024-03-13',
          helpful: 18
        }
      ]
    }
  }
];