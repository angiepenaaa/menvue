import React, { useState } from 'react';
import { MapPin, Star, Clock, Sparkles, ChevronRight, RefreshCw } from 'lucide-react';
import { restaurants } from '../data/restaurants';

interface FreshFindsSectionProps {
  onSelectRestaurant: (id: string) => void;
}

const FreshFindsSection: React.FC<FreshFindsSectionProps> = ({ onSelectRestaurant }) => {
  const [recommendations] = useState(restaurants.slice(0, 8));

  const getMealTimeGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 11) {
      return { greeting: 'Fresh breakfast spots', emoji: '🌅' };
    } else if (currentHour >= 11 && currentHour < 16) {
      return { greeting: 'Perfect for lunch', emoji: '☀️' };
    } else if (currentHour >= 16 && currentHour < 22) {
      return { greeting: 'Great dinner options', emoji: '🌆' };
    } else {
      return { greeting: 'Late night healthy eats', emoji: '🌙' };
    }
  };

  const { greeting, emoji } = getMealTimeGreeting();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Sparkles className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Fresh Finds For You</h2>
              <p className="text-gray-600 text-sm flex items-center gap-1">
                <span>{emoji}</span>
                {greeting} • Local favorites
              </p>
            </div>
          </div>
          <button className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
            <RefreshCw size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <MapPin size={14} />
          <span>Brandon, FL area</span>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((restaurant, index) => (
            <div
              key={restaurant.id}
              onClick={() => onSelectRestaurant(restaurant.id)}
              className="group bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all duration-200 cursor-pointer hover:shadow-md"
            >
              <div className="flex gap-4">
                {/* Restaurant Image */}
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                {/* Restaurant Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-gray-800 truncate group-hover:text-emerald-600 transition-colors">
                      {restaurant.name}
                    </h3>
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-emerald-600 transition-colors flex-shrink-0 ml-2" />
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate mb-2">{restaurant.cuisine}</p>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-400 fill-current" />
                      <span className="font-medium">{restaurant.rating}</span>
                      <span>({restaurant.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{restaurant.deliveryTime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span>{restaurant.distance}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Indicators */}
              {index < 2 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-emerald-600 font-medium">
                      {index === 0 ? 'Top pick for you' : 'Trending nearby'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-6 text-center">
          <button className="px-6 py-2 text-emerald-600 hover:text-emerald-700 font-medium hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-2 mx-auto">
            View all restaurants
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreshFindsSection;