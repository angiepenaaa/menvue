import React from 'react';
import { Restaurant } from '../types';
import { Star, Clock, MapPin } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="h-48 relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <MapPin size={12} className="mr-1 text-emerald-600" />
          {restaurant.distance}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{restaurant.name}</h3>
        <p className="text-gray-500 text-sm mb-2">{restaurant.cuisine}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Star size={16} className="text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="text-gray-500 mr-1" />
            <span className="text-sm text-gray-500">{restaurant.deliveryTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;