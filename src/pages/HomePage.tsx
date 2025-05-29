import React, { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import RestaurantGrid from '../components/RestaurantGrid';
import MenuList from '../components/MenuList';
import RecommendationList from '../components/RecommendationList';
import MoodSelector from '../components/MoodSelector';
import MoodResults from '../components/MoodResults';
import FilterPanel from '../components/FilterPanel';
import { restaurants } from '../data/restaurants';
import { menuItems } from '../data/menuItems';
import { userPreferences } from '../data/userPreferences';
import { filterMenuItems, filterMenuItemsBySearch } from '../utils/filterItems';
import { getSmartRecommendations, getMoodBasedRecommendations } from '../utils/recommendationEngine';
import { savePreferences } from '../utils/storage';
import { Mood, FilterState } from '../types';
import { Brain, MapPin, Star, TrendingUp } from 'lucide-react';

interface HomePageProps {
  onCartClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onCartClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRestaurantId, setActiveRestaurantId] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<MenuItem[]>([]);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
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
    return filterMenuItemsBySearch(items, searchTerm);
  }, [filters, activeRestaurantId, searchTerm]);

  const restaurantNames = useMemo(() => {
    return restaurants.map(r => ({ id: r.id, name: r.name }));
  }, []);

  const handleSelectRestaurant = (id: string) => {
    setActiveRestaurantId(id);
    setShowMoodSelector(false);
    setSelectedMood(null);
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    const moodBasedItems = getMoodBasedRecommendations(menuItems, mood, userPreferences);
    setRecommendations(moodBasedItems);
  };

  const resetMood = () => {
    setSelectedMood(null);
    setShowMoodSelector(false);
    const smartRecommendations = getSmartRecommendations(menuItems, userPreferences);
    setRecommendations(smartRecommendations);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onCartClick={onCartClick}
      />
      
      <main className="container mx-auto px-4 py-8">
        {!activeRestaurantId && !showMoodSelector && !selectedMood && (
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {greeting}, Angie! 👋
            </h2>
            <p className="text-lg md:text-xl text-gray-600 font-medium">
              Match Me with a Clean Meal
            </p>
          </div>
        )}

        {!activeRestaurantId && !showMoodSelector && !selectedMood && (
          <div className="mb-12">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide justify-center">
              <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-full whitespace-nowrap hover:bg-emerald-700 transition-colors shadow-sm">
                <MapPin size={18} />
                <span className="font-medium">Nearby Pickup</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full whitespace-nowrap border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
                <Star size={18} />
                <span className="font-medium">Top Rated</span>
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full whitespace-nowrap border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
                <TrendingUp size={18} />
                <span className="font-medium">Trending</span>
              </button>
              <button
                onClick={() => setShowMoodSelector(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-full whitespace-nowrap border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Brain size={18} />
                <span className="font-medium">Mood Match</span>
              </button>
            </div>
          </div>
        )}

        {!showMoodSelector && !selectedMood && (
          <div className="mb-12">
            <FilterPanel filters={filters} onFilterChange={setFilters} />
          </div>
        )}

        {showMoodSelector && !selectedMood && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              How are you feeling today?
            </h2>
            <MoodSelector onMoodSelect={handleMoodSelect} />
          </div>
        )}

        {selectedMood && (
          <MoodResults
            mood={selectedMood}
            items={recommendations}
            onBack={resetMood}
          />
        )}

        {!activeRestaurantId && !selectedMood && !showMoodSelector && (
          <>
            {recommendations.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Recommended for You</h2>
                <RecommendationList items={recommendations} />
              </div>
            )}
            
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Popular Restaurants</h2>
            <RestaurantGrid 
              restaurants={restaurants} 
              onSelectRestaurant={handleSelectRestaurant} 
            />
          </>
        )}

        {activeRestaurantId && !selectedMood && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {restaurants.find(r => r.id === activeRestaurantId)?.name}
                </h2>
                <p className="text-gray-600 mt-2">Healthy options under 500 calories</p>
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