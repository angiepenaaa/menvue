// Yelp Fusion API integration
const YELP_API_BASE_URL = 'https://api.yelp.com/v3';

interface YelpBusiness {
  id: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: Array<{
    alias: string;
    title: string;
  }>;
  rating: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
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
  hours?: Array<{
    open: Array<{
      is_overnight: boolean;
      start: string;
      end: string;
      day: number;
    }>;
    hours_type: string;
    is_open_now: boolean;
  }>;
}

interface YelpSearchResponse {
  businesses: YelpBusiness[];
  total: number;
  region: {
    center: {
      longitude: number;
      latitude: number;
    };
  };
}

interface YelpAutocompleteResponse {
  terms: Array<{
    text: string;
  }>;
  businesses: Array<{
    id: string;
    name: string;
  }>;
  categories: Array<{
    alias: string;
    title: string;
  }>;
}

interface YelpBusinessDetailsResponse extends YelpBusiness {
  photos: string[];
  hours: Array<{
    open: Array<{
      is_overnight: boolean;
      start: string;
      end: string;
      day: number;
    }>;
    hours_type: string;
    is_open_now: boolean;
  }>;
}

interface YelpReviewsResponse {
  reviews: Array<{
    id: string;
    rating: number;
    user: {
      id: string;
      profile_url: string;
      image_url: string;
      name: string;
    };
    text: string;
    time_created: string;
    url: string;
  }>;
  total: number;
  possible_languages: string[];
}

export interface RestaurantData {
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

// Cache for storing recent results
const CACHE_KEY = 'yelp_search_cache';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

interface CacheEntry {
  data: any;
  timestamp: number;
  key: string;
}

class YelpCache {
  private getCache(): Record<string, CacheEntry> {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : {};
    } catch {
      return {};
    }
  }

  private setCache(cache: Record<string, CacheEntry>): void {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch {
      // Ignore localStorage errors
    }
  }

  get(key: string): any | null {
    const cache = this.getCache();
    const entry = cache[key];
    
    if (!entry) return null;
    
    const isExpired = Date.now() - entry.timestamp > CACHE_DURATION;
    if (isExpired) {
      this.delete(key);
      return null;
    }
    
    return entry.data;
  }

  set(key: string, data: any): void {
    const cache = this.getCache();
    cache[key] = {
      data,
      timestamp: Date.now(),
      key
    };
    this.setCache(cache);
  }

  delete(key: string): void {
    const cache = this.getCache();
    delete cache[key];
    this.setCache(cache);
  }

  clear(): void {
    localStorage.removeItem(CACHE_KEY);
  }
}

const cache = new YelpCache();

// Helper function to make API requests with proper headers
async function makeYelpRequest(endpoint: string): Promise<any> {
  const apiKey = import.meta.env.VITE_YELP_API_KEY;
  
  if (!apiKey) {
    console.error('Yelp API key not found in environment variables');
    throw new Error('Yelp API key not configured');
  }

  try {
    const response = await fetch(`${YELP_API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Yelp API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Yelp API request failed:', error);
    throw error;
  }
}

// Autocomplete suggestions
export async function yelpAutocomplete(
  text: string,
  latitude?: number,
  longitude?: number
): Promise<YelpAutocompleteResponse> {
  if (!text.trim()) {
    return { terms: [], businesses: [], categories: [] };
  }

  const cacheKey = `autocomplete_${text}_${latitude}_${longitude}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const params = new URLSearchParams({
    text: text.trim(),
  });

  if (latitude && longitude) {
    params.append('latitude', latitude.toString());
    params.append('longitude', longitude.toString());
  }

  try {
    const data = await makeYelpRequest(`/autocomplete?${params}`);
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    return { terms: [], businesses: [], categories: [] };
  }
}

// Business search
export async function yelpBusinessSearch(
  term: string = 'healthy',
  latitude?: number,
  longitude?: number,
  location?: string,
  categories?: string,
  price?: string,
  sortBy: string = 'best_match',
  openNow: boolean = false,
  limit: number = 20
): Promise<RestaurantData[]> {
  const cacheKey = `search_${term}_${latitude}_${longitude}_${location}_${categories}_${price}_${sortBy}_${openNow}_${limit}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const params = new URLSearchParams({
    term,
    limit: limit.toString(),
    sort_by: sortBy,
  });

  if (latitude && longitude) {
    params.append('latitude', latitude.toString());
    params.append('longitude', longitude.toString());
  } else if (location) {
    params.append('location', location);
  } else {
    // Default to a location if none provided
    params.append('location', 'New York, NY');
  }

  if (categories) {
    params.append('categories', categories);
  }

  if (price) {
    params.append('price', price);
  }

  if (openNow) {
    params.append('open_now', 'true');
  }

  try {
    const data: YelpSearchResponse = await makeYelpRequest(`/businesses/search?${params}`);
    
    const restaurants: RestaurantData[] = data.businesses.map((business) => ({
      id: business.id,
      name: business.name,
      cuisine: business.categories[0]?.title || 'Restaurant',
      rating: business.rating,
      distance: `${(business.distance / 1609.34).toFixed(1)} mi`,
      deliveryTime: getEstimatedDeliveryTime(business.distance),
      image: business.image_url || 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
      location: business.location.display_address.join(', '),
      coordinates: {
        lat: business.coordinates.latitude,
        lng: business.coordinates.longitude,
      },
      isOpen: !business.is_closed,
      reviewCount: business.review_count,
      actualDistance: business.distance / 1609.34,
      priceLevel: business.price || '$',
      tags: extractTagsFromCategories(business.categories),
    }));

    cache.set(cacheKey, restaurants);
    return restaurants;
  } catch (error) {
    console.error('Error fetching business search results:', error);
    throw error;
  }
}

// Business details
export async function yelpBusinessDetails(id: string): Promise<YelpBusinessDetailsResponse> {
  const cacheKey = `details_${id}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  try {
    const data = await makeYelpRequest(`/businesses/${id}`);
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching business details:', error);
    throw error;
  }
}

// Business reviews
export async function yelpBusinessReviews(id: string): Promise<YelpReviewsResponse> {
  const cacheKey = `reviews_${id}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  try {
    const data = await makeYelpRequest(`/businesses/${id}/reviews`);
    cache.set(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching business reviews:', error);
    throw error;
  }
}

// Helper function to estimate delivery time based on distance
function getEstimatedDeliveryTime(distanceInMeters: number): string {
  const miles = distanceInMeters / 1609.34;
  
  if (miles <= 1) {
    return '15-25';
  } else if (miles <= 3) {
    return '20-35';
  } else if (miles <= 5) {
    return '25-40';
  } else {
    return '30-50';
  }
}

// Helper function to extract relevant tags from Yelp categories
function extractTagsFromCategories(categories: Array<{ alias: string; title: string }>): string[] {
  const healthyTags: Record<string, string> = {
    'vegetarian': 'Vegetarian',
    'vegan': 'Vegan',
    'gluten_free': 'Gluten-Free',
    'organic_stores': 'Organic',
    'raw_food': 'Raw Food',
    'acaibowls': 'Acai Bowls',
    'juicebars': 'Juice Bar',
    'salad': 'Salads',
    'healthmarkets': 'Health Food',
    'mediterranean': 'Mediterranean',
    'poke': 'Poke',
    'smoothies': 'Smoothies',
    'soup': 'Soups',
  };

  const tags: string[] = [];
  
  categories.forEach(category => {
    if (healthyTags[category.alias]) {
      tags.push(healthyTags[category.alias]);
    }
  });

  return tags;
}

// Fallback function for when API fails
export const getFallbackRestaurants = (): RestaurantData[] => {
  return [
    {
      id: 'fallback-1',
      name: 'Healthy Eats Cafe',
      cuisine: 'Healthy Food',
      rating: 4.5,
      distance: '0.8 mi',
      deliveryTime: '15-25',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      location: 'New York, NY',
      coordinates: { lat: 40.7128, lng: -74.0060 },
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
      location: 'New York, NY',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      isOpen: true,
      reviewCount: 89,
      priceLevel: '$',
      tags: ['Vegan', 'Gluten-Free'],
    },
  ];
};

// Legacy function to maintain compatibility
export const fetchRestaurants = yelpBusinessSearch;