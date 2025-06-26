// yelpApi.ts
// ⚠️ Note: Move this logic to a secure backend for production to protect your API key

const YELP_API_BASE_URL = 'https://api.yelp.com/v3';
const YELP_API_KEY = import.meta.env.VITE_YELP_API_KEY;

// ------------------ Interfaces ------------------

export interface YelpBusiness {
  id: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: Array<{ alias: string; title: string }>;
  rating: number;
  coordinates: { latitude: number; longitude: number };
  transactions: string[];
  price?: string;
  location: {
    address1: string;
    address2?: string;
    address3?: string;
    city: string;
    zip_code: string;
    country: string;
    state: string;
    display_address: string[];
  };
  phone: string;
  display_phone: string;
  distance: number;
}

export interface YelpSearchResponse {
  businesses: YelpBusiness[];
  total: number;
  region: { center: { longitude: number; latitude: number } };
}

export interface SearchFilters {
  term?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  categories?: string;
  price?: string;
  open_now?: boolean;
  sort_by?: 'best_match' | 'rating' | 'review_count' | 'distance';
  limit?: number;
}

// ------------------ Yelp API Functions ------------------

export async function searchBusinesses(filters: SearchFilters): Promise<YelpSearchResponse> {
  if (!YELP_API_KEY) throw new Error('Yelp API key is not configured.');

  const params = new URLSearchParams();
  if (filters.term) params.append('term', filters.term);
  if (filters.location) params.append('location', filters.location);
  if (filters.latitude) params.append('latitude', filters.latitude.toString());
  if (filters.longitude) params.append('longitude', filters.longitude.toString());
  if (filters.radius) params.append('radius', Math.min(filters.radius, 40000).toString());
  if (filters.categories) params.append('categories', filters.categories);
  if (filters.price) params.append('price', filters.price);
  if (filters.open_now) params.append('open_now', filters.open_now.toString());
  if (filters.sort_by) params.append('sort_by', filters.sort_by);
  if (filters.limit) params.append('limit', Math.min(filters.limit, 50).toString());

  const url = `${YELP_API_BASE_URL}/businesses/search?${params.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${YELP_API_KEY}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error('Invalid Yelp API key.');
    if (response.status === 400) throw new Error('Invalid search parameters.');
    throw new Error(`Yelp API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

export async function yelpBusinessDetails(businessId: string): Promise<YelpBusiness> {
  if (!YELP_API_KEY) throw new Error('Yelp API key is not configured.');

  const url = `${YELP_API_BASE_URL}/businesses/${businessId}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${YELP_API_KEY}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch business details: ${response.status}`);
  }

  return await response.json();
}

// ------------------ Helper Functions ------------------

export function convertYelpToRestaurant(business: YelpBusiness) {
  return {
    id: business.id,
    name: business.name,
    cuisine: business.categories[0]?.title || 'Restaurant',
    rating: business.rating,
    distance: `${(business.distance / 1609.34).toFixed(1)} mi`,
    deliveryTime: estimateDeliveryTime(business.distance),
    image: business.image_url || 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
    location: business.location.display_address.join(', '),
    coordinates: {
      lat: business.coordinates.latitude,
      lng: business.coordinates.longitude,
    },
    isOpen: !business.is_closed,
    reviewCount: business.review_count,
    priceLevel: business.price || '$',
    tags: business.categories.map(cat => cat.title),
  };
}

function estimateDeliveryTime(distanceInMeters: number): string {
  const miles = distanceInMeters / 1609.34;
  if (miles <= 1) return '15-25';
  if (miles <= 3) return '20-35';
  if (miles <= 5) return '25-40';
  return '30-50';
}

// ------------------ Fallback Mock Data ------------------

export const getFallbackRestaurants = () => [
  {
    id: 'fallback-1',
    name: 'Healthy Eats Cafe',
    cuisine: 'Healthy Food',
    rating: 4.5,
    distance: '0.8 mi',
    deliveryTime: '15-25',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    location: 'Brandon, FL',
    coordinates: { lat: 27.951, lng: -82.457 },
    isOpen: true,
    reviewCount: 150,
    priceLevel: '$$',
    tags: ['Vegetarian', 'Organic'],
  },
  {
    id: 'fallback-2',
    name: 'Green Garden Bistro',
    cuisine: 'Vegetarian',
    rating: 4.3,
    distance: '1.2 mi',
    deliveryTime: '20-30',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
    location: 'Brandon, FL',
    coordinates: { lat: 27.951, lng: -82.457 },
    isOpen: true,
    reviewCount: 89,
    priceLevel: '$',
    tags: ['Vegan', 'Gluten-Free'],
  },
];
