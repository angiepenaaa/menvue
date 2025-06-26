import React from 'react';
import { Star, Clock, MapPin, ExternalLink } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  distance: string;
  deliveryTime: string;
  image: string;
  location: string;
  isOpen: boolean;
  reviewCount: number;
  priceLevel?: string;
  tags?: string[];
}

interface RestaurantGridProps {
  restaurants: Restaurant[];
  onSelectRestaurant: (id: string) => void;
  loading?: boolean;
}

const RestaurantGrid: React.FC<RestaurantGridProps> = ({ 
  restaurants, 
  onSelectRestaurant, 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded-full w-16" />
                <div className="h-6 bg-gray-200 rounded-full w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">No restaurants found</h3>
        <p className="text-gray-600">Try adjusting your search terms or location</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          onClick={() => onSelectRestaurant(restaurant.id)}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
        >
          {/* Image */}
          <div className="relative h-48">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            
            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                restaurant.isOpen 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {restaurant.isOpen ? 'Open' : 'Closed'}
              </span>
            </div>

            {/* Price Level */}
            {restaurant.priceLevel && (
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
                  {restaurant.priceLevel}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
              {restaurant.name}
            </h3>
            <p className="text-gray-500 text-sm mb-2">{restaurant.cuisine}</p>
            <p className="text-gray-400 text-xs mb-3 line-clamp-1">{restaurant.location}</p>

            {/* Tags */}
            {restaurant.tags && restaurant.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {restaurant.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {restaurant.tags.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    +{restaurant.tags.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium text-gray-700">
                    {restaurant.rating}
                  </span>
                  <span className="ml-1 text-xs text-gray-500">
                    ({restaurant.reviewCount})
                  </span>
                </div>
              </div>

              {/* Distance & Time */}
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span>{restaurant.distance}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>{restaurant.deliveryTime} min</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRestaurant(restaurant.id);
                }}
                className="w-full py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                View Details
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantGrid;