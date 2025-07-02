// Google Maps API loader utility
let isLoaded = false;
let isLoading = false;
let loadPromise: Promise<void> | null = null;

export const loadGoogleMapsAPI = (): Promise<void> => {
  // Return existing promise if already loading
  if (loadPromise) {
    return loadPromise;
  }

  // Return resolved promise if already loaded
  if (isLoaded) {
    return Promise.resolve();
  }

  // Prevent multiple simultaneous loads
  if (isLoading) {
    return new Promise((resolve) => {
      const checkLoaded = () => {
        if (isLoaded) {
          resolve();
        } else {
          setTimeout(checkLoaded, 100);
        }
      };
      checkLoaded();
    });
  }

  isLoading = true;

  loadPromise = new Promise((resolve, reject) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      const error = new Error('Google Maps API key not found. Please set VITE_GOOGLE_MAPS_API_KEY in your .env file');
      console.error(error.message);
      isLoading = false;
      reject(error);
      return;
    }

    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      isLoaded = true;
      isLoading = false;
      resolve();
      return;
    }

    // Create callback function name
    const callbackName = 'initGoogleMaps';
    
    // Set up global callback
    (window as any)[callbackName] = () => {
      isLoaded = true;
      isLoading = false;
      delete (window as any)[callbackName];
      resolve();
    };

    // Create and append script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    
    script.onerror = () => {
      isLoading = false;
      delete (window as any)[callbackName];
      const error = new Error('Failed to load Google Maps API');
      console.error(error.message);
      reject(error);
    };

    document.head.appendChild(script);
  });

  return loadPromise;
};

// Check if Google Maps API is loaded
export const isGoogleMapsLoaded = (): boolean => {
  return isLoaded && window.google && window.google.maps;
};

// Type declarations for Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}