import React from 'react';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  activeRestaurantId: string | null;
  setActiveRestaurantId: (id: string | null) => void;
  restaurantNames: { id: string; name: string }[];
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  activeRestaurantId, 
  setActiveRestaurantId,
  restaurantNames
}) => {
  return (
    <div className="bg-white shadow-sm py-3 sticky top-16 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center mr-2">
            <Filter size={16} className="text-gray-500 mr-1" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          
          <button
            onClick={() => setActiveRestaurantId(null)}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
              activeRestaurantId === null
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Restaurants
          </button>
          
          {restaurantNames.map((restaurant) => (
            <button
              key={restaurant.id}
              onClick={() => setActiveRestaurantId(restaurant.id)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeRestaurantId === restaurant.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {restaurant.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;