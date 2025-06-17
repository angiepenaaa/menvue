import type { UserPreferences } from '../types';
import { loadPreferences } from '../utils/storage';

const defaultPreferences: UserPreferences = {
  healthGoal: 'lose-weight',
  dietType: 'no-restrictions',
  allergens: [],
  mealType: 'light-lunch',
  calorieRange: '300-500'
};

export const userPreferences: UserPreferences = loadPreferences() || defaultPreferences;