import React, { useState } from 'react';
import Header from '../components/Header';
import FreshFindsSection from '../components/FreshFindsSection';
import NutritionChatBot from '../components/NutritionChatBot';
import { MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HomePageProps {
  onCartClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onCartClick }) => {
  const { user } = useAuth();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSelectRestaurant = (id: string) => {
    // Navigate to restaurant detail page
    window.location.href = `/item/${id}`;
  };

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
              Find Healthy Menu Options
            </h2>
            <p className="text-gray-600">Discover nutritious meals under 500 calories</p>
          </div>
        </div>

        {/* Fresh Finds Section */}
        <div className="mb-8">
          <FreshFindsSection onSelectRestaurant={handleSelectRestaurant} />
        </div>

        {/* Welcome Message */}
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Welcome to menVue</h3>
          <p className="text-gray-600 mb-6">Your healthy eating companion for finding nutritious meals</p>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full">
              🥗 Healthy Options
            </div>
            <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full">
              📊 Nutrition Tracking
            </div>
            <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full">
              🎯 Meal Planning
            </div>
            <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full">
              🤖 AI Assistant
            </div>
          </div>
        </div>
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