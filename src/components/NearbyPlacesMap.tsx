import React, { useEffect, useRef, useState } from 'react';

const NearbyPlacesMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const map = new google.maps.Map(mapRef.current as HTMLDivElement, {
          center,
          zoom: 14,
        });

        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(
          {
            location: center,
            radius: 1500,
            type: 'restaurant',
          },
          (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
              results.forEach((place) => {
                if (place.geometry?.location) {
                  new google.maps.Marker({
                    map,
                    position: place.geometry.location,
                    title: place.name,
                  });
                }
              });
            } else {
              setError('No restaurants found nearby.');
            }
          }
        );
      },
      () => setError('Unable to retrieve your location.')
    );
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">🍽️ Restaurants Near You</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div
        ref={mapRef}
        className="w-full h-96 rounded-xl border border-gray-300 shadow-sm"
      />
    </div>
  );
};

export default NearbyPlacesMap;
