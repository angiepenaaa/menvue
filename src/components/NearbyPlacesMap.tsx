import React, { useEffect, useRef } from 'react';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

export default function NearbyPlacesMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Load Google Maps script
    const loadGoogleMaps = () => {
      return new Promise<void>((resolve, reject) => {
        if (window.google) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject('Google Maps failed to load');
        document.head.appendChild(script);
      });
    };

    const initMap = async () => {
      try {
        await loadGoogleMaps();

        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const map = new window.google.maps.Map(mapRef.current!, {
            center: userLocation,
            zoom: 15,
          });

          new window.google.maps.Marker({
            position: userLocation,
            map,
            title: 'You are here',
          });

          const service = new window.google.maps.places.PlacesService(map);
          const request = {
            location: userLocation,
            radius: 1000,
            type: ['restaurant'],
          };

          service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
              results.forEach((place) => {
                if (place.geometry && place.geometry.location) {
                  new window.google.maps.Marker({
                    position: place.geometry.location,
                    map,
                    title: place.name,
                  });
                }
              });
            }
          });
        });
      } catch (err) {
        console.error(err);
      }
    };

    initMap();
  }, []);

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-800">Restaurants Near You</h2>
      <div ref={mapRef} className="w-full h-[400px] rounded-xl shadow" />
    </div>
  );
}
