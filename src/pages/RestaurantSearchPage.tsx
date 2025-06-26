import React, { useState } from 'react';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import YelpSearchBar from '../components/YelpSearchBar';
import SearchFilters from '../components/SearchFilters';
import RestaurantGrid from '../components/RestaurantGrid';
import { searchBusinesses, convertYelpToRestaurant, getFallbackRestaurants } from '../utils/yelpApi';

const RestaurantSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({});

  const handleSearch = async (term: string, location: string) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const searchParams = {
        term,
        location,
        limit: 20,
        ...currentFilters,
      };

      const response = await searchBusinesses(searchParams);
      const convertedRestaurants = response.businesses.map(convertYelpToRestaurant);
      setRestaurants(convertedRestaurants);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err.message || 'Failed to search restaurants');
      
      // Show fallback data on error
      setRestaurants(getFallbackRestaurants());
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (filters: any) => {
    setCurrentFilters(filters);
    // If we've already searched, re-search with new filters
    if (hasSearched && restaurants.length > 0) {
      // You could implement auto-search here or wait for user to search again
    }
  };

  const handleSelectRestaurant = (id: string) => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={false} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Search Restaurants</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <YelpSearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Filters */}
        {hasSearched && (
          <div className="mb-8">
            <SearchFilters onFiltersChange={handleFiltersChange} />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} />
            <div>
              <p className="font-medium">API Error</p>
              <p className="text-sm">{error}</p>
              <p className="text-sm mt-1">Showing sample data instead. To use real data, add your Yelp API key to .env file.</p>
            </div>
          </div>
        )}

        {/* Results */}
        {hasSearched && (
          <div>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {loading ? 'Searching...' : `Found ${restaurants.length} restaurants`}
              </h2>
            </div>

            {/* Restaurant Grid */}
            <RestaurantGrid
              restaurants={restaurants}
              onSelectRestaurant={handleSelectRestaurant}
              loading={loading}
            />
          </div>
        )}

        {/* Initial State */}
        {!hasSearched && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-6">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Search for restaurants</h3>
            <p className="text-gray-600 mb-6">Enter a search term and location to find restaurants near you</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => handleSearch('healthy food', 'Brandon, FL')}
                className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors"
              >
                🥗 Healthy Food
              </button>
              <button
                onClick={() => handleSearch('salads', 'Brandon, FL')}
                className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors"
              >
                🥬 Salads
              </button>
              <button
                onClick={() => handleSearch('vegetarian', 'Brandon, FL')}
                className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors"
              >
                🌱 Vegetarian
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantSearchPage;