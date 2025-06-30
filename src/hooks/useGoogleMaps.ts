import { useState, useEffect } from 'react';
import { loadGoogleMapsAPI, isGoogleMapsLoaded } from '../utils/googleMaps';

interface UseGoogleMapsReturn {
  isLoaded: boolean;
  loadError: string | null;
  isLoading: boolean;
}

export const useGoogleMaps = (): UseGoogleMapsReturn => {
  const [isLoaded, setIsLoaded] = useState(isGoogleMapsLoaded());
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoaded) return;

    setIsLoading(true);
    setLoadError(null);

    loadGoogleMapsAPI()
      .then(() => {
        setIsLoaded(true);
        setLoadError(null);
      })
      .catch((error) => {
        setLoadError(error.message);
        setIsLoaded(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isLoaded]);

  return { isLoaded, loadError, isLoading };
};