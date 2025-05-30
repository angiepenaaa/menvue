import React, { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import RestaurantGrid from '../components/RestaurantGrid';
import MenuList from '../components/MenuList';
import RecommendationList from '../components/RecommendationList';
import MoodSelector from '../components/MoodSelector';
import MoodResults from '../components/MoodResults';
import FilterPanel from '../components/FilterPanel';
import TrendingSection from '../components/TrendingSection';
import NearbyPickupSection from '../components/NearbyPickupSection';
import { restaurants } from '../data/restaurants';
import { menuItems } from '../data/menuItems';
import { userPreferences } from '../data/userPreferences';
import { filterMenuItems, filterMenuItemsBySearch } from '../utils/filterItems';
import { getSmartRecommendations, getMoodBasedRecommendations } from '../utils/recommendationEngine';
import { savePreferences } from '../utils/storage';
import { Mood, FilterState } from '../types';
import { Brain, MapPin, Gauge, TrendingUp, ArrowLeft } from 'lucide-react';

interface HomePageProps {
  onCartClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onCartClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRestaurantId, setActiveRestaurantId] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<MenuItem[]>([]);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [showUnder500, setShowUnder500] = useState(false);
  const [showTrending, setShowTrending] = useState(false);
  const [showNearbyPickup, setShowNearbyPickup] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    mealType: [],
    healthGoal: '',
    dietTypes: [],
    macroTags: [],
    moodTags: [],
    cuisineType: [],
    prepTime: '',
    specialTags: []
  });

  // Get current hour to determine greeting
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 
    ? 'Good morning'
    : currentHour < 17 
    ? 'Good afternoon'
    : 'Good evening';

  useEffect(() => {
    const smartRecommendations = getSmartRecommendations(menuItems, userPreferences);
    setRecommendations(smartRecommendations);
    savePreferences(userPreferences);
  }, []);

  const filteredItems = useMemo(() => {
    let items = filterMenuItems(menuItems, filters);
    
    if (activeRestaurantId) {
      items = items.filter(item => item.restaurantId === activeRestaurantId);
    }
    
    if (showUnder500) {
      items = items.filter(item => item.calories <= 500);
    }
    
    return filterMenuItemsBySearch(items, searchTerm);
  }, [filters, activeRestaurantId, searchTerm, showUnder500]);

  const restaurantNames = useMemo(() => {
    return restaurants.map(r => ({ id: r.id, name: r.name }));
  }, []);

  const handleSelectRestaurant = (id: string) => {
    setActiveRestaurantId(id);
    setShowMoodSelector(false);
    setSelectedMood(null);
    setShowTrending(false);
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    const moodBasedItems = getMoodBasedRecommendations(menuItems, mood, userPreferences);
    setRecommendations(moodBasedItems);
  };

  const resetMood = () => {
    setSelectedMood(null);
    setShowMoodSelector(false);
    setShowTrending(false);
    const smartRecommendations = getSmartRecommendations(menuItems, userPreferences);
    setRecommendations(smartRecommendations);
  };

  const resetView = () => {
    setShowTrending(false);
    setShowMoodSelector(false);
    setSelectedMood(null);
    setShowNearbyPickup(false);
    setActiveRestaurantId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onCartClick={onCartClick}
      />
      
      <main className="container mx-auto px-4 py-8">
        {(showTrending || showMoodSelector || selectedMood || activeRestaurantId || showNearbyPickup) && (
          <button
            onClick={resetView}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
        )}

        {/* Welcome Section */}
        {!activeRestaurantId && !showMoodSelector && !selectedMood && !showTrending && !showNearbyPickup && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {greeting}, Angie
            </h2>
            <p className="text-gray-600 italic">Match Me with a Clean Meal</p>
          </div>
        )}

        {/* Quick Filters */}
        {!activeRestaurantId && !showMoodSelector && !selectedMood && !showTrending && !showNearbyPickup && (
          <div className="mb-8">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              <button 
                onClick={() => {
                  setShowNearbyPickup(!showNearbyPickup);
                  setShowTrending(false);
                  setShowMoodSelector(false);
                  setSelectedMood(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap border ${
                  showNearbyPickup
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <MapPin size={16} />
                <span>Nearby Pickup</span>
              </button>
              <button 
                onClick={() => setShowUnder500(!showUnder500)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap border ${
                  showUnder500 
                    ? 'bg-emerald-600 text-white border-emerald-600' 
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Gauge size={16} />
                <span>Under 500 Cals</span>
              </button>
              <button
                onClick={() => {
                  setShowTrending(!showTrending);
                  setShowMoodSelector(false);
                  setSelectedMood(null);
                  setShowNearbyPickup(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap border ${
                  showTrending 
                    ? 'bg-emerald-600 text-white border-emerald-600' 
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <TrendingUp size={16} />
                <span>Trending</span>
              </button>
              <button
                onClick={() => {
                  setShowMoodSelector(true);
                  setShowTrending(false);
                  setShowNearbyPickup(false);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-full whitespace-nowrap border border-gray-200 hover:bg-gray-50"
              >
                <Brain size={16} />
                <span>Mood Match</span>
              </button>
            </div>
          </div>
        )}

        {/* Filters Panel */}
        {!showMoodSelector && !selectedMood && !showTrending && !showNearbyPickup && (
          <div className="mb-8">
            <FilterPanel filters={filters} onFilterChange={setFilters} />
          </div>
        )}

        {showNearbyPickup ? (
          <NearbyPickupSection onSelectRestaurant={setActiveRestaurantId} />
        ) : showTrending ? (
          <TrendingSection />
        ) : showMoodSelector && !selectedMood ? (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
              How are you feeling today?
            </h2>
            <MoodSelector onMoodSelect={handleMoodSelect} />
          </div>
        ) : selectedMood ? (
          <MoodResults
            mood={selectedMood}
            items={recommendations}
            onBack={resetMood}
          />
        ) : !activeRestaurantId ? (
          <>
            {recommendations.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended for You</h2>
                <RecommendationList items={recommendations} />
              </div>
            )}
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Restaurants</h2>
            <RestaurantGrid 
              restaurants={restaurants} 
              onSelectRestaurant={handleSelectRestaurant} 
            />
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {restaurants.find(r => r.id === activeRestaurantId)?.name}
                </h2>
                <p className="text-gray-600 mt-1">Healthy options under 500 calories</p>
              </div>
              <button 
                onClick={() => setActiveRestaurantId(null)}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Back to Restaurants
              </button>
            </div>
            <MenuList items={filteredItems} />
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;