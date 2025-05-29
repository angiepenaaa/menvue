import React from 'react';
import type { MenuItem as MenuItemType } from '../types';
import { MapPin, Clock, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { restaurants } from '../data/restaurants';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addItem } = useCart();
  const restaurant = restaurants.find(r => r.id === item.restaurantId);

  return (
    <div className="menu-card card-hover">
      <div className="menu-image">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 badge badge-coral">
          {item.calories} cal
        </div>
      </div>
      
      <div className="menu-content">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-500">{restaurant?.name}</h4>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="flex items-center">
              <MapPin size={12} className="mr-1" />
              {restaurant?.distance}
            </span>
            <span className="flex items-center">
              <Clock size={12} className="mr-1" />
              {restaurant?.deliveryTime}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
        
        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, index) => (
            <span key={index} className="badge badge-gray">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-2xl font-bold text-gray-900">{item.price}</span>
          <button
            onClick={() => addItem(item)}
            className="btn btn-primary px-6 py-2.5 flex items-center gap-2"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;