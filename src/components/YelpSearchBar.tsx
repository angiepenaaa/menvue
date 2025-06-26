import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface YelpSearchBarProps {
  onSearch: (term: string, location: string) => void;
  loading?: boolean;
}

const YelpSearchBar: React.FC<YelpSearchBarProps> = ({ onSearch, loading = false }) => {
  const [searchTerm, setSearchTerm] = useState('healthy food');
  const [location, setLocation] = useState('Brandon, FL');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() && location.trim()) {
      onSearch(searchTerm.trim(), location.trim());
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Search Restaurants</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Term */}
        <div>
          <label htmlFor="search-term" className="block text-sm font-medium text-gray-700 mb-2">
            What are you looking for?
          </label>
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="search-term"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g., healthy food, salads, vegetarian"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <MapPin size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Brandon, FL or 33511"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={loading || !searchTerm.trim() || !location.trim()}
          className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search size={20} />
              Search Restaurants
            </>
          )}
        </button>
      </form>

      {/* Quick Search Buttons */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-600 mb-3">Quick searches:</p>
        <div className="flex flex-wrap gap-2">
          {[
            'healthy food',
            'salads',
            'vegetarian',
            'juice bars',
            'mediterranean'
          ].map((term) => (
            <button
              key={term}
              onClick={() => {
                setSearchTerm(term);
                onSearch(term, location);
              }}
              disabled={loading}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-emerald-100 hover:text-emerald-700 transition-colors disabled:opacity-50"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YelpSearchBar;