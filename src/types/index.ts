import type { ReactNode } from 'react';

// Menu Item Types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  calories: number;
  price: string;
  image: string;
  tags: string[];
  restaurantId: string;
  nutrition: {
    protein: number;
    carbs: number;
    sugars: number;
    totalFat: number;
    saturatedFat: number;
    fiber: number;
    sodium: number;
  };
  prep_time_min?: number;
  cuisine_type?: string;
  meal_type?: string;
  is_hydrating?: boolean;
  mood_tags?: string[];
  health_goals?: string[];
  diet_types?: string[];
  macro_profile?: string[];
}

// Filter Types
export interface FilterState {
  mealType: string[];
  healthGoal: string;
  dietTypes: string[];
  macroTags: string[];
  moodTags: string[];
  cuisineType: string[];
  prepTime: string;
  specialTags: string[];
  minProtein?: number;
  maxCarbs?: number;
  minFiber?: number;
  maxSugar?: number;
}

// Cart Types
export interface CartItem extends MenuItem {
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

// Activity and Recommendation Types
export interface ActivityData {
  stepsToday: number;
  sleepHours: number;
  workoutMinutes: number;
  heartRateResting?: number;
  lastUpdated: string;
}

export interface ActivityRecommendation {
  type: string;
  reason: string;
  tags: string[];
}

export interface Mood {
  id: string;
  name: string;
  emoji: string;
  tags: string[];
  tip: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  distance: string;
  deliveryTime: string;
  image: string;
  location: string;
}

export interface UserPreferences {
  healthGoal: string;
  dietType: string;
  allergens: string[];
  mealType: string;
  calorieRange: string;
}