import { MenuItem, FilterState } from '../types';

const isValidMenuItem = (item: MenuItem): boolean => {
  // Check if image URL is valid
  const isValidImage = item.image?.startsWith('https://images.pexels.com/');
  
  // Check if nutrition info exists and has valid values
  const hasValidNutrition = item.nutrition && 
    typeof item.nutrition.protein === 'number' &&
    typeof item.nutrition.carbs === 'number' &&
    typeof item.nutrition.totalFat === 'number' &&
    typeof item.nutrition.fiber === 'number' &&
    typeof item.nutrition.sugars === 'number' &&
    typeof item.nutrition.saturatedFat === 'number';
  
  return isValidImage && hasValidNutrition;
};

export const filterMenuItems = (
  items: MenuItem[],
  filters: FilterState
): MenuItem[] => {
  return items.filter(item => {
    if (!isValidMenuItem(item)) {
      return false;
    }

    // Meal Type Filter
    if (filters.mealType.length > 0 && 
        !filters.mealType.some(type => 
          item.tags.includes(type) || item.meal_type === type
        )) {
      return false;
    }

    // Health Goal Filter
    if (filters.healthGoal && !item.health_goals?.includes(filters.healthGoal)) {
      return false;
    }

    // Diet Types Filter
    if (filters.dietTypes.length > 0 && 
        !filters.dietTypes.some(diet => 
          item.diet_types?.includes(diet) || item.tags.includes(diet)
        )) {
      return false;
    }

    // Macro Tags Filter
    if (filters.macroTags.length > 0 && 
        !filters.macroTags.some(tag => 
          item.macro_profile?.includes(tag) || item.tags.includes(tag)
        )) {
      return false;
    }

    // Mood Tags Filter
    if (filters.moodTags.length > 0 && 
        !filters.moodTags.some(tag => 
          item.mood_tags?.includes(tag) || item.tags.includes(tag)
        )) {
      return false;
    }

    // Cuisine Type Filter
    if (filters.cuisineType.length > 0 && 
        !filters.cuisineType.some(cuisine => 
          item.cuisine_type === cuisine || item.tags.includes(cuisine)
        )) {
      return false;
    }

    // Prep Time Filter
    if (filters.prepTime && item.prep_time_min) {
      switch (filters.prepTime) {
        case 'Grab-and-Go':
          if (item.prep_time_min > 0) return false;
          break;
        case 'Under 10 Minutes':
          if (item.prep_time_min > 10) return false;
          break;
        case 'Dine-In Recommended':
          if (item.prep_time_min < 15) return false;
          break;
      }
    }

    // Special Tags Filter
    if (filters.specialTags.length > 0 && 
        !filters.specialTags.some(tag => item.tags.includes(tag))) {
      return false;
    }

    // Nutrition-based filters
    if (filters.minProtein && item.nutrition.protein < filters.minProtein) {
      return false;
    }
    if (filters.maxCarbs && item.nutrition.carbs > filters.maxCarbs) {
      return false;
    }
    if (filters.minFiber && item.nutrition.fiber < filters.minFiber) {
      return false;
    }
    if (filters.maxSugar && item.nutrition.sugars > filters.maxSugar) {
      return false;
    }

    return true;
  });
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
      item.description.toLowerCase().includes(lowercaseSearch) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowercaseSearch))
  );
};

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