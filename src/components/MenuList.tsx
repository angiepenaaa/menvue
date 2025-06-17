import React from 'react';
import type { MenuItem as MenuItemType } from '../types';
import MenuItem from './MenuItem';

interface MenuListProps {
  items: MenuItemType[];
}

const MenuList: React.FC<MenuListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-gray-500 text-lg">No items found under 500 calories.</p>
        <p className="text-gray-500">Try another restaurant or search term.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuList;