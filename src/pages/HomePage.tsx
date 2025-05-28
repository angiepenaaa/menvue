import React, { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import RestaurantGrid from '../components/RestaurantGrid';
import MenuList from '../components/MenuList';
import RecommendationList from '../components/RecommendationList';
import { restaurants } from '../data/restaurants';
import { menuItems } from '../data/menuItems';
import { userPreferences } from '../data/userPreferences';
import { filterMenuItemsByCalories, filterMenuItemsByRestaurant, filterMenuItemsBySearch } from '../utils/filterItems';
import { getSmartRecommendations } from '../utils/recommendationEngine';
import { savePreferences } from '../utils/storage';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRestaurantId, setActiveRestaurantId] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<MenuItem[]>([]);

  // Get recommendations on component mount and save preferences
  useEffect(() => {
    const smartRecommendations = getSmartRecommendations(menuItems, userPreferences);
    setRecommendations(smartRecommendations);
    savePreferences(userPreferences);
  }, []);

  // Filter menu items under 500 calories
  const lowCalorieItems = useMemo(() => {
    return filterMenuItemsByCalories(menuItems);
  }, []);

  // Filter by restaurant if one is selected
  const filteredByRestaurant = useMemo(() => {
    if (!activeRestaurantId) return lowCalorieItems;
    return filterMenuItemsByRestaurant(lowCalorieItems, activeRestaurantId);
  }, [lowCalorieItems, activeRestaurantId]);

  // Apply search filter
  const filteredItems = useMemo(() => {
    return filterMenuItemsBySearch(filteredByRestaurant, searchTerm);
  }, [filteredByRestaurant, searchTerm]);

  // Get restaurant names for filter bar
  const restaurantNames = useMemo(() => {
    return restaurants.map(r => ({ id: r.id, name: r.name }));
  }, []);

  // Handle restaurant selection
  const handleSelectRestaurant = (id: string) => {
    setActiveRestaurantId(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterBar 
        activeRestaurantId={activeRestaurantId}
        setActiveRestaurantId={setActiveRestaurantId}
        restaurantNames={restaurantNames}
      />
      
      <main className="container mx-auto px-4 py-8">
        {!activeRestaurantId && recommendations.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Smart Picks Today</h2>
            <RecommendationList items={recommendations} />
          </div>
        )}
        
        {!activeRestaurantId ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Restaurants with Low-Calorie Options</h2>
            <RestaurantGrid 
              restaurants={restaurants} 
              onSelectRestaurant={handleSelectRestaurant} 
            />
          </>
        ) : (
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

export default HomePage