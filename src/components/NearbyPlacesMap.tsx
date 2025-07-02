import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Loader2, AlertCircle, Star, RefreshCw } from 'lucide-react';
import { useGoogleMaps } from '../hooks/useGoogleMaps';

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
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [userLocation, setUserLocation] = useState<google.maps.LatLng | null>(null);
  const [locationStatus, setLocationStatus] = useState<'loading' | 'success' | 'fallback' | 'error'>('loading');
  
  // Use the Google Maps hook to load the API
  const { isLoaded: mapsLoaded, loadError: mapsError, isLoading: mapsLoading } = useGoogleMaps();

  const retryMapLoad = () => {
    setError(null);
    setLoading(true);
    window.location.reload(); // Simple retry by reloading
  };

  useEffect(() => {
    // Check if API key exists
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setError('Google Maps API key is not configured. Please add VITE_GOOGLE_MAPS_API_KEY to your environment variables.');
      setLoading(false);
      return;
    }
    
    // Don't proceed if Maps API is still loading or failed to load
    if (mapsLoading) {
      setLoading(true);
      return;
    }

    if (mapsError) {
      setError('Failed to load Google Maps. This might be due to API key restrictions or network issues.');
      setLoading(false);
      return;
    }

    if (!mapsLoaded || !window.google?.maps) {
      setError('Google Maps is not available. Please check your internet connection and API configuration.');
      setLoading(false);
      return;
    }

    const fallbackLocation = new google.maps.LatLng(27.9333, -82.3248); // Brandon, FL

    const searchNearbyRestaurants = (center: google.maps.LatLng, map: google.maps.Map) => {
      const service = new google.maps.places.PlacesService(map);
      const request: google.maps.places.PlaceSearchRequest = {
        location: center,
        radius: 5000, // 5km radius
        type: 'restaurant',
      };

      service.nearbySearch(request, (results, status) => {
        setLoading(false);
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const restaurantData: Restaurant[] = [];

          results.slice(0, 20).forEach((place, index) => {
            if (place.geometry?.location && place.name) {
              const restaurant: Restaurant = {
                id: place.place_id || `restaurant-${index}`,
                name: place.name,
                rating: place.rating,
                priceLevel: place.price_level,
                vicinity: place.vicinity || '',
                isOpen: place.opening_hours?.isOpen?.(),
                position: place.geometry.location,
              };

              restaurantData.push(restaurant);

              const marker = new google.maps.Marker({
                position: place.geometry.location,
                map,
                title: place.name,
                icon: {
                  url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="14" cy="14" r="10" fill="#F97316" stroke="#ffffff" stroke-width="2"/>
                      <path d="M14 6L16 12H20L16.5 15L18 21L14 17L10 21L11.5 15L8 12H12L14 6Z" fill="#ffffff"/>
                    </svg>
                  `),
                  scaledSize: new google.maps.Size(28, 28),
                  anchor: new google.maps.Point(14, 14),
                },
              });

              const infoWindow = new google.maps.InfoWindow({
                content: `
                  <div style="padding: 8px; max-width: 200px;">
                    <h3 style="margin: 0 0 4px 0; font-weight: bold; color: #1f2937;">${place.name}</h3>
                    ${place.rating ? `<div style="color: #6b7280; font-size: 14px;">⭐ ${place.rating}/5</div>` : ''}
                    ${place.vicinity ? `<div style="color: #6b7280; font-size: 12px; margin-top: 4px;">${place.vicinity}</div>` : ''}
                    ${place.opening_hours?.isOpen?.() !== undefined
                      ? `<div style="color: ${place.opening_hours.isOpen() ? '#10b981' : '#ef4444'}; font-size: 12px; margin-top: 4px;">
                          ${place.opening_hours.isOpen() ? 'Open now' : 'Closed'}
                        </div>`
                      : ''
                    }
                  </div>
                `,
              });

              marker.addListener('click', () => {
                infoWindow.open(map, marker);
              });
            }
          });

          setRestaurants(restaurantData);
        } else {
          console.log('Places API Status:', status);
          if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            setError('No restaurants found in this area. Try a different location.');
          } else if (status === google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
            setError('Too many requests. Please try again later.');
          } else if (status === google.maps.places.PlacesServiceStatus.REQUEST_DENIED) {
            setError('Places API request denied. Check your API key permissions.');
          } else {
            setError(`Places API error: ${status}. Try refreshing the page.`);
          }
        }
      });
    };

    const initializeMap = (center: google.maps.LatLng) => {
      setUserLocation(center);
      setLocationStatus('success');

      const map = new google.maps.Map(mapRef.current as HTMLDivElement, {
        center: center,
        zoom: 14,
        styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });
      googleMapRef.current = map;

      new google.maps.Marker({
        position: center,
        map: map,
        title: 'Your Location',
        icon: {
          url:
            'data:image/svg+xml;charset=UTF-8,' +
            encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" fill="#10B981" stroke="#ffffff" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" fill="#ffffff"/>
              </svg>
            `),
          scaledSize: new google.maps.Size(24, 24),
          anchor: new google.maps.Point(12, 12),
        },
      });

      // Search for nearby restaurants
      searchNearbyRestaurants(center, map);
    };

    const initializeMapWithFallback = (center: google.maps.LatLng) => {
      setUserLocation(center);
      setLocationStatus('fallback');

      const map = new google.maps.Map(mapRef.current as HTMLDivElement, {
        center: center,
        zoom: 13,
        styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });
      googleMapRef.current = map;

      new google.maps.Marker({
        position: center,
        map: map,
        title: 'Brandon, FL (Default Location)',
        icon: {
          url:
            'data:image/svg+xml;charset=UTF-8,' +
            encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" fill="#6B7280" stroke="#ffffff" stroke-width="2"/>
                <circle cx="12" cy="12" r="3" fill="#ffffff"/>
              </svg>
            `),
          scaledSize: new google.maps.Size(24, 24),
          anchor: new google.maps.Point(12, 12),
        },
      });

      // Search for nearby restaurants
      searchNearbyRestaurants(center, map);
    };
    if (!navigator.geolocation) {
      console.log('Geolocation not supported, using fallback location');
      initializeMapWithFallback(fallbackLocation);
      return;
    }

    // Try to get user's location with more permissive settings
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Geolocation success:', position.coords);
        const center = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        initializeMap(center);
      },
      (error) => {
        console.log('Geolocation failed:', error.message, 'Using fallback location');
        initializeMapWithFallback(fallbackLocation);
      },
      {
        enableHighAccuracy: false, // Less strict for better compatibility
        timeout: 5000, // Shorter timeout
        maximumAge: 600000, // 10 minutes cache
      }
    );
  }, [mapsLoaded, mapsError, mapsLoading]); // Add dependencies

  const getPriceDisplay = (priceLevel?: number) => {
    if (!priceLevel) return '';
    return '$'.repeat(priceLevel);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <MapPin className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Restaurants Near You</h2>
            <p className="text-gray-600 text-sm">
              {loading || mapsLoading ? (
                'Finding nearby restaurants...'
              ) : error ? (
                'Unable to load map'
              ) : locationStatus === 'fallback' ? (
                `Showing ${restaurants.length} restaurants in Brandon, FL area`
              ) : (
                `Found ${restaurants.length} restaurants within 5km of your location`
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="relative">
        {(loading || mapsLoading) && (
          <div className="absolute inset-0 bg-gray-50 flex items-center justify-center z-10">
            <div className="flex items-center gap-3 text-gray-600">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>
                {mapsLoading 
                  ? 'Loading Google Maps API...' 
                  : 'Loading map and nearby restaurants...'
                }
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-6 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg">
            <AlertCircle size={20} />
            <div>
              <p className="font-medium">Map temporarily unavailable</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={retryMapLoad}
                className="mt-2 flex items-center gap-2 text-sm bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded transition-colors"
              >
                <RefreshCw size={14} />
                Try again
              </button>
            </div>
          </div>
        )}

        <div
          ref={mapRef}
          className={`w-full h-96 ${error ? 'hidden' : 'bg-gray-100'}`}
          style={{ minHeight: '384px' }}
        />

        {/* Fallback content when map fails */}
        {error && (
          <div className="w-full h-96 bg-gray-50 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">Map View Unavailable</h3>
              <p className="text-gray-500 mb-4">We're working on getting the map back online</p>
              <button
                onClick={retryMapLoad}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <RefreshCw size={16} />
                Retry
              </button>
            </div>
          </div>
        )}
      </div>

      {restaurants.length > 0 && (
        <div className="p-6 pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Nearby Restaurants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restaurants.slice(0, 6).map((restaurant) => (
              <div
                key={restaurant.id}
                className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => {
                  if (googleMapRef.current) {
                    googleMapRef.current.panTo(restaurant.position);
                    googleMapRef.current.setZoom(16);
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
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          restaurant.isOpen
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
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