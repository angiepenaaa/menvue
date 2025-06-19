// Update the Restaurant interface in your types file
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  distance: string;
  deliveryTime: string;
  image: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  isOpen: boolean;
  reviewCount: number;
  actualDistance?: number;
  priceLevel?: string;
  tags?: string[];
}

export interface YelpSearchFilters {
  term: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  categories?: string;
  price?: string;
  sortBy: string;
  openNow: boolean;
  radius?: number;
}

export interface Mood {
  id: string;
  name: string;
  lucideIcon: string;
  tags: string[];
  tip: string;
}

// ... rest of the types remain unchanged
export interface HealthyVariation {
  originalItem: any; // Replace with actual type if possible, like MenuItem
  healthyVersion: {
    name: string;
    description: string;
    calories: number;
    nutrition: {
      protein: number;
      carbs: number;
      sugars: number;
      totalFat: number;
      saturatedFat: number;
      fiber: number;
      sodium: number;
    };
    modifications: string[];
  };
}
