import React, { useState } from 'react';
import { FilterState } from '../types';
import { 
  SlidersHorizontal, 
  Coffee, 
  UtensilsCrossed, 
  Clock,
  Droplets,
  Brain
} from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const cuisineOptions = [
    'Mexican', 'Mediterranean', 'Asian', 'American', 'Plant-Based'
  ];

  const mealTypes = [
    'Breakfast', 'Lunch', 'Dinner', 'Snack'
  ];

  const moodOptions = [
    'Energizing', 'Calming', 'Focus', 'Recovery'
  ];

  const handleChange = (key: keyof FilterState, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const handleArrayToggle = (key: keyof FilterState, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(v => v !== value)
      : [...currentArray, value];
    handleChange(key, newArray);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Filter Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={20} className="text-emerald-600" />
          <span className="font-semibold text-gray-800">Filter Meals</span>
        </div>
        <span className="text-sm text-gray-500">
          {Object.values(filters).flat().filter(Boolean).length} active
        </span>
      </button>

      {/* Filter Content */}
      {isOpen && (
        <div className="p-6 border-t border-gray-100 space-y-6">
          {/* Macronutrient Filters */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-800">Macronutrients</h3>
            
            {/* Sugar */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Sugar Content</label>
              <select
                value={filters.sugar}
                onChange={(e) => handleChange('sugar', e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-2"
              >
                <option value="any">Any</option>
                <option value="low">Low (≤5g)</option>
                <option value="medium">Medium (6-15g)</option>
                <option value="high">High (>15g)</option>
              </select>
            </div>

            {/* Fiber */}
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600">Fiber Content</label>
              <select
                value={filters.fiber}
                onChange={(e) => handleChange('fiber', e.target.value)}
                className="rounded-lg border border-gray-200 px-3 py-2"
              >
                <option value="any">Any</option>
                <option value="low">Low (≤3g)</option>
                <option value="high">High (>3g)</option>
              </select>
            </div>
          </div>

          {/* Prep Time */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-gray-500" />
              <h3 className="font-medium text-gray-800">Prep Time</h3>
            </div>
            <select
              value={filters.prepTime}
              onChange={(e) => handleChange('prepTime', e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2"
            >
              <option value="any">Any Time</option>
              <option value="under_10">Under 10 minutes</option>
              <option value="under_20">Under 20 minutes</option>
              <option value="no_prep">No Prep Needed</option>
            </select>
          </div>

          {/* Cuisine Types */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <UtensilsCrossed size={18} className="text-gray-500" />
              <h3 className="font-medium text-gray-800">Cuisine Type</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cuisineOptions.map((cuisine) => (
                <button
                  key={cuisine}
                  onClick={() => handleArrayToggle('cuisineType', cuisine)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.cuisineType.includes(cuisine)
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Meal Types */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Coffee size={18} className="text-gray-500" />
              <h3 className="font-medium text-gray-800">Meal Type</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {mealTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleArrayToggle('mealType', type)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.mealType.includes(type)
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Hydrating Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets size={18} className="text-gray-500" />
              <span className="font-medium text-gray-800">Hydrating Meals</span>
            </div>
            <button
              onClick={() => handleChange('isHydrating', !filters.isHydrating)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                filters.isHydrating ? 'bg-emerald-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  filters.isHydrating ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Mood Tags */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Brain size={18} className="text-gray-500" />
              <h3 className="font-medium text-gray-800">Mood Match</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((mood) => (
                <button
                  key={mood}
                  onClick={() => handleArrayToggle('moodTags', mood)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.moodTags.includes(mood)
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => onFilterChange({
              sugar: 'any',
              fiber: 'any',
              prepTime: 'any',
              cuisineType: [],
              protein: 'any',
              carbs: 'any',
              fat: 'any',
              mealType: [],
              isHydrating: false,
              moodTags: []
            })}
            className="w-full py-2 text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;