import React from 'react';
import type { MenuItem as MenuItemType } from '../types';
import CalorieBadge from './CalorieBadge';
import ActivityMatchBadge from './ActivityMatchBadge';
import { restaurants } from '../data/restaurants';
import { MapPin, Clock } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const restaurant = restaurants.find(r => r.id === item.restaurantId);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col transform transition duration-300 hover:shadow-lg border border-gray-100">
      <div className="relative h-56">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <CalorieBadge calories={item.calories} />
        </div>
        {item.activityMatch && <ActivityMatchBadge matches={item.activityMatch} />}
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        {/* Restaurant Info */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1">
            <h4 className="text-emerald-600 font-semibold text-sm tracking-wide uppercase">{restaurant?.name}</h4>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <div className="flex items-center">
                <MapPin size={14} className="mr-1" />
                <span>{restaurant?.distance}</span>
              </div>
              <div className="flex items-center ml-4">
                <Clock size={14} className="mr-1" />
                <span>{restaurant?.deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dish Info */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                item.activityMatch?.includes(tag)
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-50 text-gray-600'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Nutrition Information */}
        {item.nutrition && (
          <div className="mb-6 p-5 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-lg">
                <span className="text-gray-500 text-xs uppercase tracking-wide">Protein</span>
                <p className="text-lg font-semibold mt-1">{item.nutrition.protein}g</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <span className="text-gray-500 text-xs uppercase tracking-wide">Carbs</span>
                <p className="text-lg font-semibold mt-1">{item.nutrition.carbs}g</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <span className="text-gray-500 text-xs uppercase tracking-wide">Total Fat</span>
                <p className="text-lg font-semibold mt-1">{item.nutrition.totalFat}g</p>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <span className="text-gray-500 text-xs uppercase tracking-wide">Fiber</span>
                <p className="text-lg font-semibold mt-1">{item.nutrition.fiber}g</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Price and Action */}
        <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">{item.price}</span>
          </div>
          <button className="px-6 py-2.5 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem