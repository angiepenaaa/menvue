import type { ReactNode } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  calories: number;
  price: string;
  image: string;
  tags: string[];
  restaurantId: string;
  macros?: {
    protein: number;
    carbs: number;
    fat: number;
  };
  nutrition?: {
    protein: number;
    carbs: number;
    sugars: number;
    totalFat: number;
    saturatedFat: number;
    fiber: number;
    sodium: number;
  };
  ingredients?: string[];
  dietCompatibility?: string[];
  allergens?: string[];
  mealTypes?: string[];
  moodTags?: string[];
  location?: string;
  activityMatch?: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  distance: string;
  deliveryTime: string;
  image: string;
  location?: string;
}

export type HealthGoal = 'maintain' | 'lose-weight' | 'build-muscle' | 'balanced';
export type DietType = 'vegan' | 'vegetarian' | 'pescatarian' | 'keto' | 'no-restrictions';
export type MealType = 'post-workout' | 'light-lunch' | 'energy-snack' | 'low-bloat-dinner' | 'late-night';
export type CalorieRange = '<300' | '300-500' | '500-700' | 'custom';

export interface UserPreferences {
  healthGoal: HealthGoal;
  dietType: DietType;
  allergens: string[];
  mealType: MealType;
  calorieRange: CalorieRange;
  customCalorieRange?: {
    min: number;
    max: number;
  };
  location?: string;
}

export interface Mood {
  id: string;
  name: string;
  emoji: string;
  tags: string[];
  tip?: string;
}

export interface ActivityData {
  stepsToday: number;
  sleepHours: number;
  workoutMinutes: number;
  heartRateResting?: number;
  lastUpdated: string;
}

export interface ActivitySummary {
  icon: ReactNode;
  label: string;
  value: string | number;
  status: 'low' | 'normal' | 'high';
}

export interface ActivityRecommendation {
  type: string;
  reason: string;
  tags: string[];
}