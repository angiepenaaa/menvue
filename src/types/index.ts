import type { ReactNode } from 'react';

// Existing types...
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
}

// New types for filtering
export interface FilterState {
  sugar: 'any' | 'low' | 'medium' | 'high';
  fiber: 'any' | 'low' | 'high';
  prepTime: 'any' | 'under_10' | 'under_20' | 'no_prep';
  cuisineType: string[];
  protein: 'any' | 'low' | 'medium' | 'high';
  carbs: 'any' | 'low' | 'medium' | 'high';
  fat: 'any' | 'low' | 'medium' | 'high';
  mealType: string[];
  isHydrating: boolean;
  moodTags: string[];
}

// Rest of the existing types...