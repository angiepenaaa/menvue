import React, { useState } from 'react';
import { FilterState } from '../types';
import { 
  SlidersHorizontal, 
  Coffee, 
  UtensilsCrossed, 
  Clock,
  Dumbbell,
  Brain,
  Heart,
  Leaf,
  Timer,
  Tag,
  Gauge
} from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  showUnder500: boolean;
  setShowUnder500: (show: boolean) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filters, 
  onFilterChange,
  showUnder500,
  setShowUnder500
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const mealTypes = [
    'Breakfast', 'Lunch', 'Dinner', 'Snack'
  ];

  const healthGoals = [
    'Build Muscle', 'Lose Weight', 'Maintain Weight', 'Gain Weight'
  ];

  const dietTypes = [
    'Vegan', 'Vegetarian', 'Pescatarian', 'Keto', 'Paleo', 'Gluten-Free', 'Dairy-Free'
  ];

  const macroTags = [
    'High Protein', 'Low Carb', 'Low Sugar', 'High Fiber', 'Low Fat', 'High Fat', 'Balanced Macros'
  ];

  const moodTags = [
    'Post-Workout', 'Feeling Tired', 'Feeling Bloated', 'Need to Focus', 'Comfort Meal', 'Hydrating'
  ];

  const cuisineTypes = [
    'Mediterranean', 'Asian', 'Latin', 'American', 'Indian', 'Middle Eastern', 'Plant-Based'
  ];

  const prepTimes = [
    'Grab-and-Go', 'Under 10 Minutes', 'Dine-In Recommended'
  ];

  const specialTags = [
    'Anti-Inflammatory', 'Gut-Friendly', 'No Added Sugar', 'Low Sodium', 'MenVue Approved'
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

  const clearFilters = () => {
    onFilterChange({
      mealType: [],
      healthGoal: '',
      dietTypes: [],
      macroTags: [],
      moodTags: [],
      cuisineType: [],
      prepTime: '',
      specialTags: [],
    });
    setShowUnder500(false);
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
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {[...Object.values(filters).flat().filter(Boolean), showUnder500 ? 'Under 500 Calories' : ''].filter(Boolean).length} active
          </span>
        </div>
      </button>

      {/* Filter Content */}
      {isOpen && (
        <div className="p-6 border-t border-gray-100 space-y-6">
          {/* Calorie Filter */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Gauge size={18} className="text-gray-500" />
              <h3 className="font-medium text-gray-800">Calories</h3>
            </div>
            <button
              onClick={() => setShowUnder500(!showUnder500)}
              className={`px-3 py-1 rounded-full text-sm ${
                showUnder500
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Under 500 Calories
            </button>
          </div>

          {/* Meal Type */}
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

          {/* Health Goals */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Dumbbell size={18} className="text-gray-500" />
              <h3 className="font-medium text-gray-800">Health Goal</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {healthGoals.map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleChange('healthGoal', goal)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.healthGoal === goal
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>

          {/* Diet Types */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Leaf size={18} className="text-gray-500" />
              <h3 className="font-medium text-gray-800">Diet Type</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {dietTypes.map((diet) => (
                <button
                  key={diet}
                  onClick={() => handleArrayToggle('dietTypes', diet)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.dietTypes.includes(diet)
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>

          {/* Macro Tags */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Heart size={18} className="text-gray-500" />
              <h3 className="font-medium text-gray-800">Macros</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {macroTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleArrayToggle('macroTags', tag)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.macroTags.includes(tag)
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Mood Tags */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Brain size={18} className="text-gray-500" />
              <h3 className="font-medium text-gray-800">Mood Match</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {moodTags.map((mood) => (
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

          {/* Cuisine Types */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <UtensilsCrossed size={18} className="text-gray-500" />
              <h3 className="font-medium text-gray-800">Cuisine Type</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cuisineTypes.map((cuisine) => (
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

          {/* Prep Time */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Timer size={18} className="text-gray-500" />
              <h3 className="font-medium text-gray-800">Prep Time</h3>
            </div>
            <select
              value={filters.prepTime}
              onChange={(e) => handleChange('prepTime', e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Any Time</option>
              {prepTimes.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          {/* Special Tags */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Tag size={18} className="text-gray-500" />
              <h3 className="font-medium text-gray-800">Special Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {specialTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleArrayToggle('specialTags', tag)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.specialTags.includes(tag)
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4 border-t border-gray-100">
            <button
              onClick={clearFilters}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;