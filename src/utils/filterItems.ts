import type { MenuItem } from '../types';

export const filterMenuItemsByCalories = (
  items: MenuItem[],
  maxCalories: number = 500
): MenuItem[] => {
  return items.filter(item => item.calories <= maxCalories);
};

export const filterMenuItemsByRestaurant = (
  items: MenuItem[],
  restaurantId: string
): MenuItem[] => {
  return items.filter(item => item.restaurantId === restaurantId);
};

export const filterMenuItemsBySearch = (
  items: MenuItem[],
  searchTerm: string
): MenuItem[] => {
  if (!searchTerm.trim()) return items;
  
  const lowerCaseSearch = searchTerm.toLowerCase();
  
  return items.filter(item => 
    item.name.toLowerCase().includes(lowerCaseSearch) ||
    item.description.toLowerCase().includes(lowerCaseSearch) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch))
  );
};