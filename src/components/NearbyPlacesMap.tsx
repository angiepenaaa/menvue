import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Loader2, AlertCircle, Navigation, Star, Clock } from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  rating?: number;
  priceLevel?: number;
  vicinity: string;
  isOpen?: boolean;
  position: google.maps.LatLng;
}

const NearbyPlacesMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [userLocation, setUserLocation] = useState<google.maps.LatLng | null>(null);

  useEffect(() => {
    // Check if Google Maps API is loaded
    if (typeof google === 'undefined') {
      setError('Google Maps API is not loaded. Please check your API key configuration.');
      setLoading(false);
      return;
    }

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const center = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        setUserLocation(center);

        // Initialize the map
        const map = new google.maps.Map(mapRef.current as HTMLDivElement, {
          center: center,
          zoom: 14,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        // Add user location marker
        new google.maps.Marker({
          position: center,
          map: map,
          title: 'Your Location',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" fill="#10B981" stroke="#ffffff" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" fill="#ffffff"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(24, 24),
            anchor: new google.maps.Point(12, 12)
          }
        });

        // Search for nearby restaurants
        const service = new google.maps.places.PlacesService(map);
        const request: google.maps.places.PlaceSearchRequest = {
          location: center,
          radius: 1500, // 1.5km radius
          type: 'restaurant',
          keyword: 'healthy food salad vegetarian'
        };

        service.nearbySearch(request, (results, status) => {
          setLoading(false);
          
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const restaurantData: Restaurant[] = [];
            
            results.slice(0, 10).forEach((place, index) => {
              if (place.geometry?.location && place.name) {
                const restaurant: Restaurant = {
                  id: place.place_id || `restaurant-${index}`,
                  name: place.name,
                  rating: place.rating,
                  priceLevel: place.price_level,
                  vicinity: place.vicinity || '',
                  isOpen: place.opening_hours?.open_now,
                  position: place.geometry.location
                };

                restaurantData.push(restaurant);

                // Create marker for restaurant
                const marker = new google.maps.Marker({
                  position: place.geometry.location,
                  map: map,
                  title: place.name,
                  icon: {
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="12" fill="#EF4444" stroke="#ffffff" stroke-width="2"/>
                        <path d="M16 8L18 14H22L18.5 17L20 23L16 19L12 23L13.5 17L10 14H14L16 8Z" fill="#ffffff"/>
                      </svg>
                    `),
                    scaledSize: new google.maps.Size(32, 32),
                    anchor: new google.maps.Point(16, 16)
                  }
                });

                // Add info window
                const infoWindow = new google.maps.InfoWindow({
                  content: `
                    <div style="padding: 8px; max-width: 200px;">
                      <h3 style="margin: 0 0 4px 0; font-weight: bold; color: #1f2937;">${place.name}</h3>
                      ${place.rating ? `<div style="color: #6b7280; font-size: 14px;">⭐ ${place.rating}/5</div>` : ''}
                      ${place.vicinity ? `<div style="color: #6b7280; font-size: 12px; margin-top: 4px;">${place.vicinity}</div>` : ''}
                      ${place.opening_hours?.open_now !== undefined ? 
                        `<div style="color: ${place.opening_hours.open_now ? '#10b981' : '#ef4444'}; font-size: 12px; margin-top: 4px;">
                          ${place.opening_hours.open_now ? 'Open now' : 'Closed'}
                        </div>` : ''
                      }
                    </div>
                  `
                });

                marker.addListener('click', () => {
                  infoWindow.open(map, marker);
                });
              }
            });

            setRestaurants(restaurantData);
          } else {
            setError('No restaurants found nearby. Try expanding your search area.');
          }
        });
      },
      (error) => {
        setLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Location access denied. Please enable location services and refresh the page.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setError('Location request timed out.');
            break;
          default:
            setError('An unknown error occurred while retrieving location.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  }, []);

  const getPriceDisplay = (priceLevel?: number) => {
    if (!priceLevel) return '';
    return '$'.repeat(priceLevel);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <MapPin className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Restaurants Near You</h2>
            <p className="text-gray-600 text-sm">
              {loading ? 'Finding nearby restaurants...' : 
               error ? 'Unable to load map' :
               `Found ${restaurants.length} restaurants within 1.5km`}
            </p>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-gray-50 flex items-center justify-center z-10">
            <div className="flex items-center gap-3 text-gray-600">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Loading map and nearby restaurants...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-6 bg-red-50 border border-red-200 text-red-600 flex items-center gap-3">
            <AlertCircle size={20} />
            <div>
              <p className="font-medium">Unable to load map</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <div
          ref={mapRef}
          className="w-full h-96 bg-gray-100"
          style={{ minHeight: '384px' }}
        />
      </div>

      {/* Restaurant List */}
      {restaurants.length > 0 && (
        <div className="p-6 pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Nearby Restaurants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restaurants.slice(0, 6).map((restaurant) => (
              <div
                key={restaurant.id}
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => {
                  // Center map on restaurant when clicked
                  if (mapRef.current) {
                    const map = new google.maps.Map(mapRef.current, {
                      center: restaurant.position,
                      zoom: 16,
                    });
                  }
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-800 line-clamp-1">{restaurant.name}</h4>
                  {restaurant.rating && (
                    <div className="flex items-center gap-1 text-sm">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="font-medium">{restaurant.rating}</span>
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-2 line-clamp-1">{restaurant.vicinity}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {restaurant.priceLevel && (
                      <span className="text-sm font-medium text-gray-700">
                        {getPriceDisplay(restaurant.priceLevel)}
                      </span>
                    )}
                    {restaurant.isOpen !== undefined && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        restaurant.isOpen 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {restaurant.isOpen ? 'Open' : 'Closed'}
                      </span>
                    )}
                  </div>
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                    View on Map
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {restaurants.length > 6 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                And {restaurants.length - 6} more restaurants on the map
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NearbyPlacesMap;