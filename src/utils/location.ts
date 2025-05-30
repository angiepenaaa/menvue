import { Restaurant } from '../types';

// Calculate distance between two points using the Haversine formula
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d * 0.621371; // Convert to miles
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function formatDistance(miles: number): string {
  if (miles < 0.1) {
    return 'Less than 0.1 mi';
  }
  return `${miles.toFixed(1)} mi`;
}

export function sortRestaurantsByDistance(
  restaurants: Restaurant[],
  userLat: number,
  userLon: number
): Restaurant[] {
  return [...restaurants].sort((a, b) => {
    const distA = calculateDistance(userLat, userLon, a.coordinates.lat, a.coordinates.lon);
    const distB = calculateDistance(userLat, userLon, b.coordinates.lat, b.coordinates.lon);
    return distA - distB;
  });
}