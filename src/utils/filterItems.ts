import { MenuItem } from '../types';

export const filterMenuItemsByCalories = (
  items: MenuItem[],
  maxCalories: number
): MenuItem[] => {
  if (!maxCalories) return items;
  return items.filter((item) => item.calories <= maxCalories);
};

export const filterMenuItemsByRestaurant = (
  items: MenuItem[],
  restaurantId: string | null
): MenuItem[] => {
  if (!restaurantId) return items;
  return items.filter((item) => item.restaurantId === restaurantId);
};

export const filterMenuItemsBySearch = (
  items: MenuItem[],
  searchTerm: string
): MenuItem[] => {
  if (!searchTerm) return items;
  const lowercaseSearch = searchTerm.toLowerCase();
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(lowercaseSearch) ||
      item.description.toLowerCase().includes(lowercaseSearch)
  );
};