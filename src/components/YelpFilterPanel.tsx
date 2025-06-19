import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, DollarSign, Star, Clock, Grid3X3 } from 'lucide-react';
import type { YelpSearchFilters } from '../types';

interface YelpFilterPanelProps {
  filters: YelpSearchFilters;
  onFiltersChange: (filters: YelpSearchFilters) => void;
  onSearch: () => void;
}

const YelpFilterPanel: React.FC<YelpFilterPanelProps> = ({
  filters,
  onFiltersChange,
  onSearch
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'salad', label: 'Salads' },
    { value: 'juicebars', label: 'Juice Bars' },
    { value: 'acaibowls', label: 'Acai Bowls' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'poke', label: 'Poke' },
    { value: 'smoothies', label: 'Smoothies' },
    { value: 'healthmarkets', label: 'Health Food' },
    { value: 'organic_stores', label: 'Organic' },
    { value: 'gluten_free', label: 'Gluten-Free' }
  ];

  const priceOptions = [
    { value: '', label: 'Any Price' },
    { value: '1', label: '$ (Under $15)' },
    { value: '1,2', label: '$$ (Under $30)' },
    { value: '1,2,3', label: '$$$ (Under $60)' },
    { value: '1,2,3,4', label: '$$$$ (All Prices)' }
  ];

  const sortOptions = [
    { value: 'best_match', label: 'Best Match' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'review_count', label: 'Most Reviewed' },
    { value: 'distance', label: 'Distance' }
  ];

  const handleFilterChange = (key: keyof YelpSearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    onFiltersChange({
      term: filters.term,
      location: filters.location,
      latitude: filters.latitude,
      longitude: filters.longitude,
      categories: '',
      price: '',
      sortBy: 'best_match',
      openNow: false,
      radius: undefined
    });
  };

  const activeFiltersCount = [
    filters.categories,
    filters.price,
    filters.sortBy !== 'best_match' ? filters.sortBy : '',
    filters.openNow ? 'open' : ''
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
            onClick={() => handleFilterChange('openNow', !filters.openNow)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filters.openNow
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
            onClick={() => handleFilterChange('sortBy', filters.sortBy === 'rating' ? 'best_match' : 'rating')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filters.sortBy === 'rating'
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
              <Grid3X3 size={16} className="inline mr-2" />
              Category
            </label>
            <select
              value={filters.categories || ''}
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
              <DollarSign size={16} className="inline mr-2" />
              Price Range
            </label>
            <select
              value={filters.price || ''}
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
              <Star size={16} className="inline mr-2" />
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
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
              value={filters.radius || ''}
              onChange={(e) => handleFilterChange('radius', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full rounded-lg border border-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">Default (Auto)</option>
              <option value="1609">1 mile</option>
              <option value="3218">2 miles</option>
              <option value="8047">5 miles</option>
              <option value="16093">10 miles</option>
              <option value="32186">20 miles</option>
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
              onClick={() => {
                onSearch();
                setIsExpanded(false);
              }}
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

export default YelpFilterPanel;