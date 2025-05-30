import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Check, Navigation2, Loader2, AlertCircle } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { formatDistance } from '../utils/formatDistance';
import { useGeolocation } from '../hooks/useGeolocation';
import { calculateDistance } from '../utils/calculateDistance';

interface NearbyPickupProps {
  onSelectRestaurant: (id: string) => void;
}

const NearbyPickupSection: React.FC<NearbyPickupProps> = ({ onSelectRestaurant }) => {
  const { location, error, loading, getLocation } = useGeolocation();
  const [nearbyRestaurants, setNearbyRestaurants] = useState(restaurants);
  const [sortBy, setSortBy] = useState<'distance' | 'wait' | 'rating'>('distance');

  useEffect(() => {
    if (location) {
      const restaurantsWithDistance = restaurants.map(restaurant => ({
        ...restaurant,
        actualDistance: calculateDistance(
          location.latitude,
          location.longitude,
          restaurant.coordinates.lat,
          restaurant.coordinates.lng
        )
      }));

      const filtered = restaurantsWithDistance
        .filter(r => r.actualDistance <= 2) // 2 miles radius
        .sort((a, b) => {
          switch (sortBy) {
            case 'distance':
              return a.actualDistance - b.actualDistance;
            case 'wait':
              return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
            case 'rating':
              return b.rating - a.rating;
            default:
              return 0;
          }
        });

      setNearbyRestaurants(filtered);
    }
  }, [location, sortBy]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Finding nearby restaurants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
        <p className="text-gray-800 font-medium mb-2">Location access required</p>
        <p className="text-gray-600 mb-4">Please enable location services to see nearby restaurants</p>
        <button
          onClick={getLocation}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Enable Location
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <MapPin className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Nearby Pickup</h2>
              <p className="text-sm text-gray-500">
                {nearbyRestaurants.length} restaurants within 2 miles
              </p>
            </div>
          </div>
          <button
            onClick={getLocation}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
          >
            <Navigation2 size={16} />
            Update Location
          </button>
        </div>

        {/* Sort Options */}
        <div className="flex gap-2">
          {[
            { value: 'distance', label: 'Nearest' },
            { value: 'wait', label: 'Shortest Wait' },
            { value: 'rating', label: 'Top Rated' }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value as typeof sortBy)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === option.value
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Restaurant List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {nearbyRestaurants.map((restaurant) => {
            const isOpen = restaurant.isOpen; // Now using real data from restaurant object
            const waitTime = parseInt(restaurant.deliveryTime);

            return (
              <div key={restaurant.id} className="p-4">
                <button
                  onClick={() => onSelectRestaurant(restaurant.id)}
                  className="w-full flex items-center gap-4 hover:bg-gray-50 p-3 rounded-xl transition-colors"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-800">{restaurant.name}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isOpen 
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {isOpen ? 'Open' : 'Closed'}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500 mt-1">
                      {restaurant.cuisine} • {formatDistance(restaurant.actualDistance)}
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-yellow-500">
                        <span className="font-medium">{restaurant.rating}</span>
                        <span className="text-gray-400">({restaurant.reviewCount}+ reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    {isOpen && (
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                        <Clock size={14} />
                        <span>{waitTime} mins</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-xs">
                      {restaurant.rating >= 4.5 ? (
                        <span className="text-emerald-600 font-medium flex items-center gap-1">
                          <Check size={14} />
                          Popular pickup spot
                        </span>
                      ) : (
                        <span className="text-gray-500 flex items-center gap-1">
                          <Clock size={14} />
                          Regular wait times
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NearbyPickupSection;