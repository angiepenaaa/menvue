import React from 'react';
import { MapPin, Clock, Check, X, Navigation2 } from 'lucide-react';
import { restaurants } from '../data/restaurants';
import { formatDistance } from '../utils/formatDistance';

interface NearbyPickupProps {
  onSelectRestaurant: (id: string) => void;
}

const NearbyPickupSection: React.FC<NearbyPickupProps> = ({ onSelectRestaurant }) => {
  // Filter restaurants within 2 miles and sort by distance
  const nearbyRestaurants = restaurants
    .filter(r => {
      const distance = parseFloat(r.distance.replace(' mi', ''));
      return distance <= 2;
    })
    .sort((a, b) => {
      const distA = parseFloat(a.distance.replace(' mi', ''));
      const distB = parseFloat(b.distance.replace(' mi', ''));
      return distA - distB;
    });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <MapPin className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Nearby Pickup</h2>
              <p className="text-sm text-gray-500">Restaurants within 2 miles</p>
            </div>
          </div>
          <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
            <Navigation2 size={16} />
            Update Location
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {nearbyRestaurants.map((restaurant) => {
            const isOpen = Math.random() > 0.3; // Simulated open status
            const waitTime = Math.floor(Math.random() * 20) + 5; // Simulated wait time 5-25 mins

            return (
              <div
                key={restaurant.id}
                className="py-4 first:pt-0 last:pb-0"
              >
                <button
                  onClick={() => onSelectRestaurant(restaurant.id)}
                  className="w-full flex items-center gap-4 hover:bg-gray-50 p-3 rounded-xl transition-colors"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
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
                      {formatDistance(restaurant.distance)}
                    </div>
                  </div>

                  <div className="text-right">
                    {isOpen && (
                      <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                        <Clock size={14} />
                        <span>{waitTime} mins</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      {restaurant.rating >= 4.5 ? (
                        <>
                          <Check size={14} className="text-emerald-500" />
                          <span>Popular pickup spot</span>
                        </>
                      ) : (
                        <>
                          <Clock size={14} />
                          <span>Regular wait times</span>
                        </>
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