import React from 'react';
import { RestaurantData } from '../utils/yelpApi';
import RestaurantCard from './RestaurantCard';

interface RestaurantGridProps {
  restaurants: RestaurantData[];
  onSelectRestaurant: (id: string) => void;
}

const RestaurantGrid: React.FC<RestaurantGridProps> = ({ restaurants, onSelectRestaurant }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {restaurants.map((restaurant) => (
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