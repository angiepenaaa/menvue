import React from 'react';
import type { MenuItem as MenuItemType, Mood } from '../types';
import MenuList from './MenuList';
import MenuItem from './MenuItem';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MoodResultsProps {
  mood: Mood;
  items: MenuItemType[];
  onBack: () => void;
}

const MoodResults: React.FC<MoodResultsProps> = ({ mood, items, onBack }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const smartPicks = items.slice(0, 3);
  
  const getNutritionalBenefits = (moodId: string) => {
    switch (moodId) {
      case 'post-workout':
        return [
          'Protein helps repair and build muscle tissue',
          'Complex carbs restore glycogen stores',
          'Electrolytes support hydration and recovery',
          'Branch chain amino acids (BCAAs) reduce muscle soreness'
        ];
      case 'stressed':
        return [
          'Magnesium helps regulate stress response',
          'Omega-3 fatty acids reduce inflammation',
          'Complex carbs boost serotonin production',
          'B vitamins support nervous system function'
        ];
      case 'low-energy':
        return [
          'Iron supports oxygen transport and energy production',
          'B vitamins convert food into energy',
          'Protein provides sustained energy release',
          'Complex carbs maintain stable blood sugar'
        ];
      case 'focus':
        return [
          'Omega-3s support brain function and memory',
          'Antioxidants protect brain cells',
          'Low sugar prevents energy crashes',
          'Healthy fats improve cognitive function'
        ];
      case 'bloated':
        return [
          'Low sodium reduces water retention',
          'Anti-inflammatory foods calm digestive system',
          'Light options are easier to digest',
          'Probiotics support gut health'
        ];
      case 'happy':
        return [
          'Balanced nutrients maintain steady mood',
          'Fresh ingredients provide vital vitamins',
          'Protein supports neurotransmitter production',
          'Complex carbs promote sustained energy'
        ];
      default:
        return [];
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Meals That Match Your Mood
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

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 flex items-center justify-between text-left"
        >
          <span className="font-semibold text-gray-800">Nutritional Benefits</span>
          {isOpen ? (
            <ChevronUp className="text-gray-500" size={20} />
          ) : (
            <ChevronDown className="text-gray-500" size={20} />
          )}
        </button>
        
        {isOpen && (
          <div className="px-6 pb-4">
            <ul className="space-y-2">
              {getNutritionalBenefits(mood.id).map((benefit, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="mr-2">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}
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

export default MoodResults;