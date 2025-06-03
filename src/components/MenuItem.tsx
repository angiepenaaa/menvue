import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { MenuItem as MenuItemType } from '../types';
import CalorieBadge from './CalorieBadge';
import ActivityMatchBadge from './ActivityMatchBadge';
import { restaurants } from '../data/restaurants';
import { MapPin, Clock, ChevronDown, ChevronUp, ShoppingCart, X, Leaf, Scale, Flame, Apple, Wheat, Salad as Salt, Check, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface MenuItemProps {
  item: MenuItemType;
}

const isValidImageUrl = (url: string): boolean => {
  return url.startsWith('https://images.pexels.com/');
};

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  if (!isValidImageUrl(item.image)) {
    return null;
  }

  const navigate = useNavigate();
  const restaurant = restaurants.find(r => r.id === item.restaurantId);
  const { addItem } = useCart();

  const nutritionMetrics = [
    { 
      icon: <Scale className="text-emerald-600\" size={18} />, 
      label: 'Protein', 
      value: item.nutrition.protein,
      unit: 'g',
      color: 'emerald'
    },
    { 
      icon: <Flame className="text-orange-600\" size={18} />, 
      label: 'Carbs', 
      value: item.nutrition.carbs,
      unit: 'g',
      color: 'orange'
    },
    { 
      icon: <Leaf className="text-yellow-600\" size={18} />, 
      label: 'Fat', 
      value: item.nutrition.totalFat,
      unit: 'g',
      color: 'yellow'
    }
  ];

  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col transform transition duration-300 hover:shadow-lg border border-gray-100 cursor-pointer"
      onClick={() => navigate(`/item/${item.id}`)}
    >
        <div className="relative h-56">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 z-10">
            <CalorieBadge calories={item.calories} />
          </div>
          <div 
            className="absolute top-4 left-4 w-3 h-3 rounded-full"
            style={{ 
              backgroundColor: item.calories <= 500 ? '#A5D6A7' : '#FFF59D',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
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
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{item.description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.slice(0, 3).map((tag, index) => (
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
            {item.tags.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-50 text-gray-600">
                +{item.tags.length - 3} more
              </span>
            )}
          </div>
          
          {/* Price and Action */}
          <div className="flex items-center flex-wrap gap-4 pt-4 mt-auto border-t border-gray-100">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-gray-900">{item.price}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addItem(item, []);
              }}
              className="flex-shrink-0 px-6 py-2.5 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2 ml-auto"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
  );
};

export default MenuItem;