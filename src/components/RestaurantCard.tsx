import React from 'react';
import type { RestaurantData } from '../utils/yelpApi';
import { Star, Clock, MapPin, Award } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: RestaurantData;
  onClick: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  // Generate array of 5 stars for rating
  const fullStars = Math.floor(restaurant.rating);
  const hasHalfStar = restaurant.rating % 1 >= 0.5;
  const isTopRated = restaurant.rating >= 4.7;

  // Price level display
  const getPriceDisplay = (priceLevel?: string) => {
    if (!priceLevel) return '$';
    return priceLevel;
  };
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="h-48 relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <MapPin size={12} className="mr-1 text-emerald-600" />
          {restaurant.distance}
        </div>
        <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full text-xs font-medium">
          {getPriceDisplay(restaurant.priceLevel)}
        </div>
        {isTopRated && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Award size={14} />
            <span>Top Rated</span>
          </div>
        )}
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Closed
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{restaurant.name}</h3>
        <p className="text-gray-500 text-sm mb-2">{restaurant.cuisine}</p>
        <p className="text-gray-400 text-xs mb-2 line-clamp-1">{restaurant.location}</p>
        
        {/* Tags */}
        {restaurant.tags && restaurant.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {restaurant.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
            {restaurant.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                +{restaurant.tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={`${
                    index < fullStars
                      ? 'text-yellow-400 fill-current'
                      : index === fullStars && hasHalfStar
                      ? 'text-yellow-400 fill-[50%]'
                      : 'text-gray-300'
                  } transition-colors`}
                />
              ))}
              <span className="ml-1 text-sm font-medium text-gray-600">
                {restaurant.rating}
              </span>
              <span className="ml-1 text-xs text-gray-400">
                ({restaurant.reviewCount})
              </span>
            </div>
          </div>
          <div className="flex items-center text-gray-500">
            <Clock size={16} className="mr-1" />
            <span className="text-sm">{restaurant.deliveryTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;