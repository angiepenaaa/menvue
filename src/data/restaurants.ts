import { Restaurant } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: 'starbucks',
    name: 'Starbucks',
    cuisine: 'Coffee & Light Bites',
    rating: 4.5,
    distance: '0.3 mi',
    deliveryTime: '10-20',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    location: 'Brandon, FL',
    coordinates: { lat: 27.937801, lng: -82.285201 },
    isOpen: true,
    reviewCount: 1243
  },
  {
    id: 'dunkin',
    name: 'Dunkin\'',
    cuisine: 'Coffee & Breakfast',
    rating: 4.3,
    distance: '0.5 mi',
    deliveryTime: '15-25',
    image: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg',
    location: 'Brandon, FL',
    coordinates: { lat: 27.938901, lng: -82.284101 },
    isOpen: true,
    reviewCount: 856
  },
  // ... rest of the restaurants with added coordinates, isOpen, and reviewCount properties
];