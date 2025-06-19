import React, { useState, useEffect } from 'react';
import { MapPin, Star, Clock, Sparkles, ChevronRight, Loader2, RefreshCw } from 'lucide-react';
import { yelpBusinessSearch, type RestaurantData } from '../utils/yelpApi';
import { useGeolocation } from '../hooks/useGeolocation';

interface FreshFindsSectionProps {
  onSelectRestaurant: (id: string) => void;
}

const FreshFindsSection: React.FC<FreshFindsSectionProps> = ({ onSelectRestaurant }) => {
  const [recommendations, setRecommendations] = useState<RestaurantData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { location, getLocation } = useGeolocation();

  const fetchFreshFinds = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get current time to determine meal type
      const currentHour = new Date().getHours();
      let searchTerms = ['healthy'];
      
      // Time-based recommendations
      if (currentHour >= 6 && currentHour < 11) {
        searchTerms = ['breakfast', 'coffee', 'juice bar', 'acai bowls'];
      } else if (currentHour >= 11 && currentHour < 16) {
        searchTerms = ['lunch', 'salad', 'poke', 'mediterranean'];
      } else if (currentHour >= 16 && currentHour < 22) {
        searchTerms = ['dinner', 'healthy', 'vegetarian', 'organic'];
      } else {
        searchTerms = ['late night', 'healthy', 'smoothies'];
      }

      // Fetch multiple searches and combine results
      const searchPromises = searchTerms.slice(0, 2).map(term =>
        yelpBusinessSearch(
          term,
          location?.latitude,
          location?.longitude,
          undefined,
          undefined,
          undefined,
          'rating', // Sort by rating for quality
          false,
          10 // Limit per search
        )
      );

      const results = await Promise.all(searchPromises);
      const allRestaurants = results.flat();

      // Remove duplicates and filter for quality
      const uniqueRestaurants = allRestaurants
        .filter((restaurant, index, self) => 
          index === self.findIndex(r => r.id === restaurant.id)
        )
        .filter(restaurant => 
          restaurant.rating >= 4.0 && // High rated only
          restaurant.reviewCount >= 10 && // Established places
          parseFloat(restaurant.distance.replace(' mi', '')) <= 5 // Within 5 miles
        )
        .sort((a, b) => {
          // Sort by a combination of rating and proximity
          const aScore = a.rating * 0.7 + (5 - parseFloat(a.distance.replace(' mi', ''))) * 0.3;
          const bScore = b.rating * 0.7 + (5 - parseFloat(b.distance.replace(' mi', ''))) * 0.3;
          return bScore - aScore;
        })
        .slice(0, 8); // Show top 8

      setRecommendations(uniqueRestaurants);
    } catch (err) {
      console.error('Error fetching fresh finds:', err);
      setError('Unable to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (location) {
      fetchFreshFinds();
    } else {
      getLocation();
    }
  }, [location]);

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

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Sparkles className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Fresh Finds For You</h2>
            <p className="text-gray-600 text-sm">Discovering nearby favorites...</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3 text-gray-600">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Finding the best spots near you...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || recommendations.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Sparkles className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Fresh Finds For You</h2>
            <p className="text-gray-600 text-sm">Personalized recommendations</p>
          </div>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">{error || 'No recommendations available right now'}</p>
          <button
            onClick={fetchFreshFinds}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
                {greeting} • Based on your location
              </p>
            </div>
          </div>
          <button
            onClick={fetchFreshFinds}
            className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
            title="Refresh recommendations"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        {location && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <MapPin size={14} />
            <span>Within 5 miles of your location</span>
          </div>
        )}
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

                  {/* Tags */}
                  {restaurant.tags && restaurant.tags.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {restaurant.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {restaurant.tags.length > 2 && (
                        <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
                          +{restaurant.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
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
          <button
            onClick={() => {
              // Trigger a search for "healthy" to show all results
              window.dispatchEvent(new CustomEvent('search-healthy'));
            }}
            className="px-6 py-2 text-emerald-600 hover:text-emerald-700 font-medium hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-2 mx-auto"
          >
            View all nearby restaurants
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreshFindsSection;