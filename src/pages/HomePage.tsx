import React, { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import RestaurantGrid from '../components/RestaurantGrid';
import MenuList from '../components/MenuList';
import RecommendationList from '../components/RecommendationList';
import MoodSelector from '../components/MoodSelector';
import MoodResults from '../components/MoodResults';
import { restaurants } from '../data/restaurants';
import { menuItems } from '../data/menuItems';
import { userPreferences } from '../data/userPreferences';
import { filterMenuItemsByCalories, filterMenuItemsByRestaurant, filterMenuItemsBySearch } from '../utils/filterItems';
import { getSmartRecommendations, getMoodBasedRecommendations } from '../utils/recommendationEngine';
import { savePreferences } from '../utils/storage';
import { Mood } from '../types';
import { Brain } from 'lucide-react';

interface HomePageProps {
  onCartClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onCartClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRestaurantId, setActiveRestaurantId] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<MenuItem[]>([]);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  useEffect(() => {
    const smartRecommendations = getSmartRecommendations(menuItems, userPreferences);
    setRecommendations(smartRecommendations);
    savePreferences(userPreferences);
  }, []);

  const lowCalorieItems = useMemo(() => {
    return filterMenuItemsByCalories(menuItems, 500);
  }, []);

  const filteredByRestaurant = useMemo(() => {
    if (!activeRestaurantId) return lowCalorieItems;
    return filterMenuItemsByRestaurant(lowCalorieItems, activeRestaurantId);
  }, [lowCalorieItems, activeRestaurantId]);

  const filteredItems = useMemo(() => {
    return filterMenuItemsBySearch(filteredByRestaurant, searchTerm);
  }, [filteredByRestaurant, searchTerm]);

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
      <FilterBar 
        activeRestaurantId={activeRestaurantId}
        setActiveRestaurantId={setActiveRestaurantId}
        restaurantNames={restaurantNames}
      />
      
      <main className="container mx-auto px-4 py-8">
        {!activeRestaurantId && !showMoodSelector && !selectedMood && (
          <div className="mb-8 flex justify-center">
            <button
              onClick={() => setShowMoodSelector(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 rounded-full shadow-sm hover:shadow-md transition-all border border-emerald-100 hover:border-emerald-200"
            >
              <Brain size={20} />
              <span className="font-medium">How are you feeling?</span>
            </button>
          </div>
        )}

        {showMoodSelector && !selectedMood && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
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

        {!activeRestaurantId && !selectedMood && recommendations.length > 0 && !showMoodSelector && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Smart Picks Today</h2>
            <RecommendationList items={recommendations} />
          </div>
        )}
        
        {!activeRestaurantId && !selectedMood && !showMoodSelector ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Restaurants with Low-Calorie Options</h2>
            <RestaurantGrid 
              restaurants={restaurants} 
              onSelectRestaurant={handleSelectRestaurant} 
            />
          </>
        ) : activeRestaurantId && !selectedMood && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {restaurants.find(r => r.id === activeRestaurantId)?.name || 'Restaurant'} 
                <span className="ml-2 text-lg font-normal text-gray-600">
                  Menu Items Under 500 Calories
                </span>
              </h2>
              <button 
                onClick={() => setActiveRestaurantId(null)}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Back to All Restaurants
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