import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, X } from 'lucide-react';
import { yelpAutocomplete } from '../utils/yelpApi';
import { debounce } from '../utils/debounce';
import { useGeolocation } from '../hooks/useGeolocation';

interface AutocompleteSuggestion {
  type: 'term' | 'business' | 'category';
  text: string;
  id?: string;
}

interface YelpSearchBarProps {
  onSearch: (term: string, location?: string, coordinates?: { lat: number; lng: number }) => void;
  placeholder?: string;
  className?: string;
}

const YelpSearchBar: React.FC<YelpSearchBarProps> = ({
  onSearch,
  placeholder = "Search for healthy restaurants...",
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  const { location, error: locationError, loading: locationLoading, getLocation } = useGeolocation();

  // Debounced autocomplete function
  const debouncedAutocomplete = debounce(async (text: string) => {
    if (!text.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    try {
      const coords = useCurrentLocation && location ? location : undefined;
      const response = await yelpAutocomplete(
        text,
        coords?.latitude,
        coords?.longitude
      );

      const allSuggestions: AutocompleteSuggestion[] = [
        ...response.terms.map(term => ({
          type: 'term' as const,
          text: term.text
        })),
        ...response.businesses.map(business => ({
          type: 'business' as const,
          text: business.name,
          id: business.id
        })),
        ...response.categories.map(category => ({
          type: 'category' as const,
          text: category.title
        }))
      ];

      setSuggestions(allSuggestions.slice(0, 8)); // Limit to 8 suggestions
      setShowSuggestions(true);
    } catch (error) {
      console.error('Autocomplete error:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedAutocomplete(value);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion: AutocompleteSuggestion) => {
    setSearchTerm(suggestion.text);
    setShowSuggestions(false);
    handleSearch(suggestion.text);
  };

  // Handle search execution
  const handleSearch = (term?: string) => {
    const searchQuery = term || searchTerm;
    if (!searchQuery.trim()) return;

    const coords = useCurrentLocation && location ? location : undefined;
    const locationStr = !useCurrentLocation && locationInput.trim() ? locationInput : undefined;

    onSearch(searchQuery, locationStr, coords);
    setShowSuggestions(false);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  // Handle location toggle
  const handleLocationToggle = () => {
    setUseCurrentLocation(!useCurrentLocation);
    if (!useCurrentLocation && !location) {
      getLocation();
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !searchInputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-search with current location on mount
  useEffect(() => {
    if (useCurrentLocation && location && !searchTerm) {
      // Auto-search for "healthy" when location is available
      handleSearch('healthy');
    }
  }, [location, useCurrentLocation]);

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'business':
        return '🏪';
      case 'category':
        return '🏷️';
      default:
        return '🔍';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={placeholder}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm"
          />
          {isLoading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Loader2 size={20} className="text-gray-400 animate-spin" />
            </div>
          )}
          {searchTerm && !isLoading && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSuggestions([]);
                setShowSuggestions(false);
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Location Input */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={useCurrentLocation ? (location ? 'Current Location' : 'Getting location...') : locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Enter city, state, or zip code"
              disabled={useCurrentLocation}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
          <button
            type="button"
            onClick={handleLocationToggle}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              useCurrentLocation
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {locationLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              'Use Current'
            )}
          </button>
        </div>

        {/* Location Error */}
        {locationError && useCurrentLocation && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span>⚠️</span>
            {locationError}
          </p>
        )}
      </form>

      {/* Autocomplete Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${index}`}
              onClick={() => handleSuggestionSelect(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
            >
              <span className="text-lg">{getSuggestionIcon(suggestion.type)}</span>
              <div className="flex-1">
                <span className="text-gray-800">{suggestion.text}</span>
                <span className="ml-2 text-xs text-gray-500 capitalize">
                  {suggestion.type}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default YelpSearchBar;