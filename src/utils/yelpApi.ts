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
}

export const fetchRestaurants = async (location: string = 'Gainesville, FL'): Promise<RestaurantData[]> => {
  const apiKey = import.meta.env.VITE_YELP_API_KEY;
  
  if (!apiKey) {
    console.error('Yelp API key not found in environment variables');
    throw new Error('Yelp API key not configured');
  }

  try {
    const params = new URLSearchParams({
      term: 'healthy',
      location: location,
      limit: '10',
      categories: 'restaurants,salad,vegetarian,vegan,healthyeating',
      sort_by: 'rating',
      open_now: 'false'
    });

    const response = await fetch(`https://api.yelp.com/v3/businesses/search?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Yelp API error: ${response.status} ${response.statusText}`);
    }

    const data: YelpSearchResponse = await response.json();

    // Transform Yelp data to match our Restaurant interface
    const restaurants: RestaurantData[] = data.businesses.map((business) => ({
      id: business.id,
      name: business.name,
      cuisine: business.categories[0]?.title || 'Restaurant',
      rating: business.rating,
      distance: `${(business.distance / 1609.34).toFixed(1)} mi`, // Convert meters to miles
      deliveryTime: getEstimatedDeliveryTime(business.distance),
      image: business.image_url || 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
      location: business.location.display_address.join(', '),
      coordinates: {
        lat: business.coordinates.latitude,
        lng: business.coordinates.longitude,
      },
      isOpen: !business.is_closed,
      reviewCount: business.review_count,
      actualDistance: business.distance / 1609.34, // Store in miles
    }));

    return restaurants;
  } catch (error) {
    console.error('Error fetching restaurants from Yelp:', error);
    throw error;
  }
};

// Helper function to estimate delivery time based on distance
const getEstimatedDeliveryTime = (distanceInMeters: number): string => {
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
};

// Fallback function to get mock data if API fails
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
      location: 'Gainesville, FL',
      coordinates: { lat: 29.6516, lng: -82.3248 },
      isOpen: true,
      reviewCount: 150,
    },
    {
      id: 'fallback-2',
      name: 'Green Garden Bistro',
      cuisine: 'Vegetarian',
      rating: 4.3,
      distance: '1.2 mi',
      deliveryTime: '20-30',
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
      location: 'Gainesville, FL',
      coordinates: { lat: 29.6516, lng: -82.3248 },
      isOpen: true,
      reviewCount: 89,
    },
  ];
};