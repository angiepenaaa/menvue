import React from 'react';
import { Restaurant } from '../types';
import RestaurantCard from './RestaurantCard';
import { useLocation } from '../hooks/useLocation';
import { sortRestaurantsByDistance, calculateDistance, formatDistance } from '../utils/location';

interface RestaurantGridProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (id: string) => void;
}

const RestaurantGrid: React.FC<RestaurantGridProps> = ({ restaurants, onSelectRestaurant }) => {
  const { latitude, longitude, error, loading } = useLocation();

  // Sort restaurants by distance if we have user location
  const sortedRestaurants = React.useMemo(() => {
    if (latitude && longitude) {
      return sortRestaurantsByDistance(restaurants, latitude, longitude).map(restaurant => ({
        ...restaurant,
        distance: formatDistance(
          calculateDistance(
            latitude,
            longitude,
            restaurant.coordinates.lat,
            restaurant.coordinates.lon
          )
        )
      }));
    }
    return restaurants;
  }, [restaurants, latitude, longitude]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Finding restaurants near you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">{error}</p>
        <p className="text-sm text-gray-500 mt-2">Showing all available restaurants</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sortedRestaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onClick={() => onSelectRestaurant(restaurant.id)}
        />
      ))}
    </div>
  );
};

export default RestaurantGrid;