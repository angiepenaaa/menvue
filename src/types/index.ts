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

// New Cart Types
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

// Rest of existing types...