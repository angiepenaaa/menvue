import React from 'react';
import type { RestaurantData } from '../utils/yelpApi';
import { Star, Clock, MapPin, Award, Heart, ExternalLink } from 'lucide-react';

interface EnhancedRestaurantCardProps {
  restaurant: RestaurantData;
  onClick: () => void;
  showFavorite?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const EnhancedRestaurantCard: React.FC<EnhancedRestaurantCardProps> = ({ 
  restaurant, 
  onClick,
  showFavorite = false,
  isFavorite = false,
  onToggleFavorite
}) => {
  // Generate array of 5 stars for rating
  const fullStars = Math.floor(restaurant.rating);
  const hasHalfStar = restaurant.rating % 1 >= 0.5;
  const isTopRated = restaurant.rating >= 4.7;
  const isHighlyReviewed = restaurant.reviewCount >= 100;

  // Price level display
  const getPriceDisplay = (priceLevel?: string) => {
    if (!priceLevel) return '$';
    return priceLevel;
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.();
  };

  return (
    <div 
      onClick={onClick}
      className="card card-hover cursor-pointer group relative overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <MapPin size={12} className="text-emerald-600" />
            {restaurant.distance}
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
            {getPriceDisplay(restaurant.priceLevel)}
          </div>
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {isTopRated && (
            <div className="bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Award size={12} />
              <span>Top Rated</span>
            </div>
          )}
          {showFavorite && (
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 text-gray-600 hover:bg-white'
              }`}
            >
              <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
            </button>
          )}
        </div>

        {/* Status overlay */}
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              Closed
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Header */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {restaurant.name}
          </h3>
          <p className="text-gray-500 text-sm mb-1">{restaurant.cuisine}</p>
          <p className="text-gray-400 text-xs line-clamp-1">{restaurant.location}</p>
        </div>
        
        {/* Tags */}
        {restaurant.tags && restaurant.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {restaurant.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="badge badge-emerald text-xs"
              >
                {tag}
              </span>
            ))}
            {restaurant.tags.length > 3 && (
              <span className="badge bg-gray-100 text-gray-600 text-xs">
                +{restaurant.tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        {/* Footer */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={14}
                  className={`${
                    index < fullStars
                      ? 'text-yellow-400 fill-current'
                      : index === fullStars && hasHalfStar
                      ? 'text-yellow-400 fill-[50%]'
                      : 'text-gray-300'
                  } transition-colors`}
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-700">
                {restaurant.rating}
              </span>
              <span className="text-xs text-gray-500">
                ({restaurant.reviewCount}{isHighlyReviewed ? '+' : ''})
              </span>
            </div>
          </div>

          {/* Delivery time */}
          <div className="flex items-center text-gray-500">
            <Clock size={14} className="mr-1" />
            <span className="text-sm font-medium">{restaurant.deliveryTime} min</span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle quick order action
            }}
            className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
          >
            View Menu
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle external link
              window.open(`https://yelp.com/biz/${restaurant.id}`, '_blank');
            }}
            className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ExternalLink size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default EnhancedRestaurantCard;