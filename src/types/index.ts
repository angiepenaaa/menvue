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
  isLocked?: boolean;
  specialInstructions?: string;
}

export interface Mood {
  id: string;
  name: string;
  lucideIcon: string;
  tags: string[];
  tip: string;
}

// ... rest of the types remain unchanged