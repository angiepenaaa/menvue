import React from 'react';
import { MenuItem as MenuItemType } from '../types';
import MenuItem from './MenuItem';

interface RecommendationListProps {
  items: MenuItemType[];
}

const RecommendationList: React.FC<RecommendationListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No recommendations available at this time.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <div key={item.id} className="transform transition-all hover:scale-105">
          <MenuItem item={item} />
        </div>
      ))}
    </div>
  );
};

export default RecommendationList;