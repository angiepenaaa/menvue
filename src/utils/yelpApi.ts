// Yelp Fusion API integration via Netlify Functions
const NETLIFY_FUNCTION_URL = '/.netlify/functions/get-yelp';

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
  photos?: string[];
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

// Helper function to make requests to our Netlify function
async function makeNetlifyRequest(params: URLSearchParams): Promise<YelpBusiness[]> {
  try {
    const url = `${NETLIFY_FUNCTION_URL}?${params.toString()}`;
    console.log('🔍 Making request to:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('📡 Response status:', response.status, response.statusText);
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const responseText = await response.text();
      console.error('❌ Non-OK response:', responseText);
      
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch {
        // If response is not JSON, it might be an HTML error page
        if (responseText.includes('<!doctype') || responseText.includes('<html')) {
          throw new Error(`Netlify function returned HTML instead of JSON. This usually means the function failed to deploy or there's a routing issue. Status: ${response.status}`);
        }
        errorData = { error: responseText };
      }
      
      throw new Error(`Netlify function error: ${response.status} ${response.statusText} - ${errorData.error || 'Unknown error'}`);
    }

    const responseText = await response.text();
    console.log('📄 Raw response:', responseText.substring(0, 200) + '...');
    
    let businesses;
    try {
      businesses = JSON.parse(responseText);
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      console.error('❌ Response text that failed to parse:', responseText);
      
      if (responseText.includes('<!doctype') || responseText.includes('<html')) {
        throw new Error('Received HTML response instead of JSON. This usually indicates a CORS issue or the Netlify function is not working properly.');
      }
      
      throw new Error(`Failed to parse JSON response: ${parseError.message}`);
    }
    
    return Array.isArray(businesses) ? businesses : [];
  } catch (error) {
    console.error('Netlify function request failed:', error);
    throw error;
  }
}

// Business search via Netlify function
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

  // For now, we'll use the basic search via our Netlify function
  // Future enhancement: extend the Netlify function to support all these parameters
  const params = new URLSearchParams({
    term: term.trim(),
  });

  if (latitude && longitude) {
    params.append('latitude', latitude.toString());
    params.append('longitude', longitude.toString());
  } else if (location) {
    // For location-based searches, we'll need to enhance the Netlify function
    // For now, default to coordinates if available
    params.append('latitude', '27.951');
    params.append('longitude', '-82.457');
  } else {
    // Default to Brandon, FL coordinates
    params.append('latitude', '27.951');
    params.append('longitude', '-82.457');
  }

  try {
    const businesses = await makeNetlifyRequest(params);
    
    const restaurants: RestaurantData[] = businesses.map((business) => ({
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

// Autocomplete suggestions - simplified for now
export async function yelpAutocomplete(
  text: string,
  latitude?: number,
  longitude?: number
): Promise<{ terms: Array<{ text: string }>; businesses: Array<{ id: string; name: string }>; categories: Array<{ alias: string; title: string }> }> {
  if (!text.trim()) {
    return { terms: [], businesses: [], categories: [] };
  }

  // For now, return some basic suggestions
  // Future enhancement: create a separate Netlify function for autocomplete
  const suggestions = [
    'healthy food',
    'salads',
    'juice bars',
    'vegetarian',
    'vegan',
    'mediterranean',
    'organic'
  ].filter(term => term.toLowerCase().includes(text.toLowerCase()));

  return {
    terms: suggestions.map(term => ({ text: term })),
    businesses: [],
    categories: []
  };
}

// Business details - enhanced to work with our function
export async function yelpBusinessDetails(id: string): Promise<YelpBusiness> {
  const cacheKey = `details_${id}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  // For now, we'll need to enhance our Netlify function to support business details
  // This is a placeholder that will need to be implemented
  throw new Error('Business details not yet implemented via Netlify function');
}

// Business reviews - enhanced to work with our function
export async function yelpBusinessReviews(id: string): Promise<any> {
  const cacheKey = `reviews_${id}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  // For now, we'll need to enhance our Netlify function to support reviews
  // This is a placeholder that will need to be implemented
  throw new Error('Business reviews not yet implemented via Netlify function');
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
};

// Legacy function to maintain compatibility
export const fetchRestaurants = yelpBusinessSearch;