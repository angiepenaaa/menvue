import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, DollarSign, Star, Clock } from 'lucide-react';

interface SearchFiltersProps {
  onFiltersChange: (filters: {
    categories?: string;
    price?: string;
    sort_by?: string;
    open_now?: boolean;
    radius?: number;
  }) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    categories: '',
    price: '',
    sort_by: 'best_match',
    open_now: false,
    radius: 8047, // 5 miles in meters
  });

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'salad', label: 'Salads' },
    { value: 'juicebars', label: 'Juice Bars' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'healthmarkets', label: 'Health Food' },
    { value: 'organic_stores', label: 'Organic' },
    { value: 'gluten_free', label: 'Gluten-Free' },
  ];

  const priceOptions = [
    { value: '', label: 'Any Price' },
    { value: '1', label: '$ (Under $15)' },
    { value: '1,2', label: '$$ (Under $30)' },
    { value: '1,2,3', label: '$$$ (Under $60)' },
    { value: '1,2,3,4', label: '$$$$ (All Prices)' },
  ];

  const sortOptions = [
    { value: 'best_match', label: 'Best Match' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'review_count', label: 'Most Reviewed' },
    { value: 'distance', label: 'Distance' },
  ];

  const radiusOptions = [
    { value: 1609, label: '1 mile' },
    { value: 3218, label: '2 miles' },
    { value: 8047, label: '5 miles' },
    { value: 16093, label: '10 miles' },
  ];

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      categories: '',
      price: '',
      sort_by: 'best_match',
      open_now: false,
      radius: 8047,
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const activeFiltersCount = [
    filters.categories,
    filters.price,
    filters.sort_by !== 'best_match' ? filters.sort_by : '',
    filters.open_now ? 'open' : '',
  ].filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Filter Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Filter size={20} className="text-emerald-600" />
          <span className="font-semibold text-gray-800">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronUp size={20} className="text-gray-500" />
        ) : (
          <ChevronDown size={20} className="text-gray-500" />
        )}
      </button>

      {/* Quick Filters (Always Visible) */}
      <div className="px-6 pb-4 border-b border-gray-100">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFilterChange('open_now', !filters.open_now)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filters.open_now
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Clock size={14} />
            Open Now
          </button>
          
          <button
            onClick={() => handleFilterChange('price', filters.price === '1' ? '' : '1')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filters.price === '1'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <DollarSign size={14} />
            Budget-Friendly
          </button>
          
          <button
            onClick={() => handleFilterChange('sort_by', filters.sort_by === 'rating' ? 'best_match' : 'rating')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filters.sort_by === 'rating'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Star size={14} />
            Top Rated
          </button>
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Category
            </label>
            <select
              value={filters.categories}
              onChange={(e) => handleFilterChange('categories', e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Price Range
            </label>
            <select
              value={filters.price}
              onChange={(e) => handleFilterChange('price', e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {priceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Sort By
            </label>
            <select
              value={filters.sort_by}
              onChange={(e) => handleFilterChange('sort_by', e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Radius Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Search Radius
            </label>
            <select
              value={filters.radius}
              onChange={(e) => handleFilterChange('radius', parseInt(e.target.value))}
              className="w-full rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {radiusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={clearFilters}
              className="flex-1 py-2 px-4 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="flex-1 py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;