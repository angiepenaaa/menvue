import React from 'react';
import { MenuItem, Mood } from '../types';
import MenuList from './MenuList';

interface MoodResultsProps {
  mood: Mood;
  items: MenuItem[];
  onBack: () => void;
}

const MoodResults: React.FC<MoodResultsProps> = ({ mood, items, onBack }) => {
  const smartPicks = items.slice(0, 3);
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Meals That Match Your Mood {mood.emoji}
          </h2>
          <p className="text-gray-600 mt-1">
            {mood.tip}
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-emerald-600 hover:text-emerald-700 font-medium"
        >
          Change Mood
        </button>
      </div>

      {smartPicks.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Smart Picks for You</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {smartPicks.map((item) => (
              <div key={item.id} className="transform transition-all hover:scale-105">
                <MenuItem item={item} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">All Matching Meals</h3>
        <MenuList items={items} />
      </div>
    </div>
  );
};