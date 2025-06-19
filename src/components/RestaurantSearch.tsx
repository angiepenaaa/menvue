import React, { useState } from 'react';
import { Search, MapPin, Star, Clock, Loader2 } from 'lucide-react';
import { yelpBusinessSearch, type RestaurantData } from '../utils/yelpApi';
import { useGeolocation } from '../hooks/useGeolocation';

const RestaurantSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { location, getLocation } = useGeolocation();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const results = await yelpBusinessSearch(
        searchTerm,
        location?.latitude,
        location?.longitude
      );
      setRestaurants(results);
    } catch (err) {
      console.error('Search failed:', err);
      setError('Failed to search restaurants. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = () => {
    if (!location) {
      getLocation();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Restaurant Search</h1>
          <p className="text-gray-600">Find healthy restaurants near you</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for restaurants, cuisines, or dishes..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <button
              type="button"
              onClick={handleLocationSearch}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <MapPin size={20} />
              {location ? 'Location Set' : 'Use Location'}
            </button>
            <button
              type="submit"
              disabled={loading || !searchTerm.trim()}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Search'}
            </button>
          </div>
        </form>

        {/* Location Status */}
        {location && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2">
            <MapPin size={16} className="text-emerald-600" />
            <span className="text-emerald-700 text-sm">
              Searching near your location ({location.latitude.toFixed(4)}, {location.longitude.toFixed(4)})
            </span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-gray-600">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Searching restaurants...</span>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && restaurants.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Found {restaurants.length} restaurants
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video relative">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <MapPin size={12} className="text-emerald-600" />
                      {restaurant.distance}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{restaurant.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                    <p className="text-gray-500 text-xs mb-3">{restaurant.location}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{restaurant.rating}</span>
                        <span className="text-xs text-gray-500">({restaurant.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock size={14} />
                        <span className="text-sm">{restaurant.deliveryTime} min</span>
                      </div>
                    </div>

                    {restaurant.tags && restaurant.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && restaurants.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No restaurants found</h3>
            <p className="text-gray-600">Try adjusting your search terms or location</p>
          </div>
        )}

        {/* Initial State */}
        {!loading && restaurants.length === 0 && !searchTerm && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-6">
              <Search className="w-20 h-20 mx-auto opacity-50" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Search for restaurants</h3>
            <p className="text-gray-600 mb-6">Enter a search term above to find restaurants near you</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  setSearchTerm('healthy');
                  handleSearch({ preventDefault: () => {} } as React.FormEvent);
                }}
                className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors text-sm"
              >
                🥗 Healthy Food
              </button>
              <button
                onClick={() => {
                  setSearchTerm('vegetarian');
                  handleSearch({ preventDefault: () => {} } as React.FormEvent);
                }}
                className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors text-sm"
              >
                🌱 Vegetarian
              </button>
              <button
                onClick={() => {
                  setSearchTerm('juice bar');
                  handleSearch({ preventDefault: () => {} } as React.FormEvent);
                }}
                className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors text-sm"
              >
                🧃 Juice Bars
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantSearch;