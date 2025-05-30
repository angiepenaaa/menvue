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
  ingredients: string[];
  nutrition: {
    protein: number;
    carbs: number;
    sugars: number;
    totalFat: number;
    saturatedFat: number;
    fiber: number;
    sodium: number;
  };
  rating?: {
    score: number;
    count: number;
    reviews: Review[];
  };
  prep_time_min?: number;
  cuisine_type?: string;
  meal_type?: string;
  is_hydrating?: boolean;
  mood_tags?: string[];
  health_goals?: string[];
  diet_types?: string[];
  macro_profile?: string[];
  trending?: {
    views: number;
    saves: number;
    shares: number;
    hashtags: string[];
    source?: 'tiktok' | 'instagram' | 'pinterest';
  };
}

export interface Review {
  id: string;
  userId: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  userImage?: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
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
  coordinates: Coordinates;
}