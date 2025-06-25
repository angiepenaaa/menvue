import React, { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import RestaurantGrid from '../components/RestaurantGrid';
import YelpSearchBar from '../components/YelpSearchBar';
import YelpFilterPanel from '../components/YelpFilterPanel';
import FreshFindsSection from '../components/FreshFindsSection';
import NutritionChatBot from '../components/NutritionChatBot';
import { yelpBusinessSearch, getFallbackRestaurants, type RestaurantData } from '../utils/yelpApi';
import type { YelpSearchFilters } from '../types';
import { Loader2, AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HomePageProps {
  onCartClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onCartClick }) => {
  const { user } = useAuth();
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [restaurantsLoading, setRestaurantsLoading] = useState(true);
  const [restaurantsError, setRestaurantsError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [filters, setFilters] = useState<YelpSearchFilters>({
    term: 'healthy',
    categories: '',
    price: '',
    sortBy: 'best_match',
    openNow: false
  });

  // Handle search from YelpSearchBar
  const handleSearch = async (
    term: string,
    location?: string,
    coordinates?: { lat: number; lng: number }
  ) => {
    console.log('🔍 Starting search with:', { term, location, coordinates });
    setRestaurantsLoading(true);
    setRestaurantsError(null);
    setHasSearched(true);

    try {
      const searchFilters = {
        ...filters,
        term,
        location,
        latitude: coordinates?.lat,
        longitude: coordinates?.lng
      };
      
      console.log('🔍 Search filters:', searchFilters);
      const results = await yelpBusinessSearch(
        searchFilters.term,
        searchFilters.latitude,
        searchFilters.longitude,
        searchFilters.location,
        searchFilters.categories,
        searchFilters.price,
        searchFilters.sortBy,
        searchFilters.openNow
      );
      
      console.log('✅ Search results:', results.length, 'restaurants found');
      setRestaurants(results);
      setFilters(searchFilters);
    } catch (error) {
      console.error('❌ Search failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to search restaurants. Please try again.';
      setRestaurantsError(errorMessage);
      setRestaurants(getFallbackRestaurants());
    } finally {
      setRestaurantsLoading(false);
    }
  };

  // Handle filter changes and re-search
  const handleFiltersChange = (newFilters: YelpSearchFilters) => {
    setFilters(newFilters);
  };

  const handleFilterSearch = async () => {
    if (!hasSearched) return;
    
    setRestaurantsLoading(true);
    setRestaurantsError(null);

    try {
      const results = await yelpBusinessSearch(
        filters.term,
        filters.latitude,
        filters.longitude,
        filters.location,
        filters.categories,
        filters.price,
        filters.sortBy,
        filters.openNow
      );
      
      setRestaurants(results);
    } catch (error) {
      console.error('Filter search failed:', error);
      setRestaurantsError('Failed to apply filters. Please try again.');
    } finally {
      setRestaurantsLoading(false);
    }
  };

  const handleSelectRestaurant = (id: string) => {
    // Navigate to restaurant detail page
    window.location.href = `/item/${id}`;
  };

  // Listen for custom search events from FreshFindsSection
  React.useEffect(() => {
    const handleSearchHealthy = () => {
      handleSearch('healthy');
    };

    window.addEventListener('search-healthy', handleSearchHealthy);
    return () => window.removeEventListener('search-healthy', handleSearchHealthy);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchTerm=""
        setSearchTerm={() => {}}
        onCartClick={onCartClick}
        showSearch={false}
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 bg-gradient-to-r from-emerald-50/50 to-transparent rounded-2xl p-6">
          <div className="relative">
            <div className="w-1 h-8 bg-emerald-500 absolute -left-6 top-1/2 -translate-y-1/2 rounded-r-full" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Find Healthy Restaurants Near You
            </h2>
            <p className="text-gray-600">Discover the best healthy dining options powered by Yelp</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <YelpSearchBar onSearch={handleSearch} />
        </div>

        {/* Fresh Finds Section - Show when no search has been performed */}
        {!hasSearched && (
          <div className="mb-8">
            <FreshFindsSection onSelectRestaurant={handleSelectRestaurant} />
          </div>
        )}

        {/* Filters Panel */}
        {hasSearched && (
          <div className="mb-8">
            <YelpFilterPanel 
              filters={filters} 
              onFiltersChange={handleFiltersChange}
              onSearch={handleFilterSearch}
            />
          </div>
        )}

        {/* Results Section */}
        {hasSearched && (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {restaurantsLoading ? 'Searching...' : `Found ${restaurants.length} restaurants`}
                </h2>
                {filters.location && (
                  <p className="text-gray-600 mt-1">Near {filters.location}</p>
                )}
              </div>
              {!restaurantsLoading && restaurants.length > 0 && (
                <button
                  onClick={handleFilterSearch}
                  className="flex items-center gap-2 px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <RefreshCw size={18} />
                  Refresh
                </button>
              )}
            </div>

            {/* Error State */}
            {restaurantsError && (
              <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg flex items-center gap-2">
                <AlertCircle size={20} />
                <span>{restaurantsError}</span>
              </div>
            )}

            {/* Loading State */}
            {restaurantsLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3 text-gray-600">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Searching restaurants on Yelp...</span>
                </div>
              </div>
            )}

            {/* Results Grid */}
            {!restaurantsLoading && restaurants.length > 0 && (
              <RestaurantGrid 
                restaurants={restaurants} 
                onSelectRestaurant={handleSelectRestaurant} 
              />
            )}

            {/* No Results */}
            {!restaurantsLoading && restaurants.length === 0 && !restaurantsError && (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No restaurants found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
                <button
                  onClick={() => handleSearch('healthy')}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Search for "healthy" restaurants
                </button>
              </div>
            )}
          </>
        )}

        {/* Initial State */}
        {!hasSearched && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-6">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Start your healthy food journey</h3>
            <p className="text-gray-600 mb-6">Search for restaurants, cuisines, or specific dishes above</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => handleSearch('salad')}
                className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors"
              >
                🥗 Salads
              </button>
              <button
                onClick={() => handleSearch('juice bar')}
                className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors"
              >
                🧃 Juice Bars
              </button>
              <button
                onClick={() => handleSearch('vegan')}
                className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors"
              >
                🌱 Vegan
              </button>
              <button
                onClick={() => handleSearch('mediterranean')}
                className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors"
              >
                🫒 Mediterranean
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-200 flex items-center justify-center hover:scale-105 z-40"
      >
        <MessageSquare size={24} />
      </button>

      {/* Nutrition Chat Bot */}
      <NutritionChatBot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        userPreferences={user ? { userId: user.id } : undefined}
      />
    </div>
  );
};

export default HomePage;