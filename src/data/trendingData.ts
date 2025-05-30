import type { MenuItem } from '../types';
import { menuItems } from './menuItems';

// Helper function to get random items from menuItems
const getRandomItems = (count: number) => {
  const shuffled = [...menuItems].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Add trending data to random menu items
export const trendingItems = getRandomItems(6).map(item => ({
  ...item,
  trending: {
    views: Math.floor(Math.random() * 1000000) + 100000,
    saves: Math.floor(Math.random() * 50000) + 1000,
    shares: Math.floor(Math.random() * 25000) + 500,
    hashtags: [
      '#healthyeating',
      '#cleaneats',
      '#foodtiktok',
      '#healthyswaps',
      '#menuvue'
    ].sort(() => 0.5 - Math.random()).slice(0, 3),
    source: ['tiktok', 'instagram', 'pinterest'][Math.floor(Math.random() * 3)] as 'tiktok' | 'instagram' | 'pinterest'
  }
}));

export const trendingCategories = [
  {
    id: 'viral-swaps',
    name: 'Viral Food Swaps',
    description: 'Trending healthy alternatives to popular dishes'
  },
  {
    id: 'protein-packed',
    name: 'Protein-Packed',
    description: 'High-protein meals under 500 calories'
  },
  {
    id: 'quick-prep',
    name: 'Quick & Clean',
    description: '15-minute healthy meals'
  },
  {
    id: 'macro-friendly',
    name: 'Macro-Friendly',
    description: 'Perfect macros for your goals'
  }
];

export const trendingHashtags = [
  '#healthyswaps',
  '#cleaneating',
  '#mealprep',
  '#healthyfood',
  '#nutrition',
  '#fitfood',
  '#healthylifestyle',
  '#menuvue'
];