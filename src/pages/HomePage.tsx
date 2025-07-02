import React, { useState } from 'react';
import Header from '../components/Header';
import FreshFindsSection from '../components/FreshFindsSection';
import NearbyPlacesMap from '../components/NearbyPlacesMap';
import GoogleLogin from '../components/GoogleLogin';
import NutritionChatBot from '../components/NutritionChatBot';
import AIMealModal from '../components/AIMealModal';
import DoorDashOrderButton from '../components/DoorDashOrderButton';
import { MessageSquare, ShoppingCart, Truck, MapPin, Clock, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface HomePageProps {
  onCartClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onCartClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { items, subtotal, totalItems } = useCart();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [showQuickOrder, setShowQuickOrder] = useState(false);

  const handleSelectRestaurant = (id: string) => {
    window.location.href = `/item/${id}`;
  };

  const handleFeatureClick = (feature: string) => {
    switch (feature) {
      case 'healthy-options':
        navigate('/search');
        break;
      case 'nutrition-tracking':
        navigate('/dashboard');
        break;
      case 'meal-planning':
        navigate('/meal-plan');
        break;
      case 'ai-assistant':
        setIsAIModalOpen(true);
        break;
      case 'quick-order':
        setShowQuickOrder(true);
        break;
      default:
        break;
    }
  };

  // Mock order data for quick order demo
  const quickOrderData = {
    restaurant: {
      name: "Healthy Eats Cafe",
      address: "123 Main St, Brandon, FL 33511",
      phone: "+1234567890"
    },
    items: [
      { name: "Mediterranean Quinoa Bowl", price: 12.99, quantity: 1 },
      { name: "Green Smoothie", price: 6.99, quantity: 1 }
    ],
    subtotal: 19.98,
    deliveryFee: 2.99,
    total: 22.97
  };

  // Show login if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          searchTerm=""
          setSearchTerm={() => {}}
          onCartClick={onCartClick}
          showSearch={false}
        />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <GoogleLogin redirectTo="/" showWelcome={true} />
          </div>
        </main>
      </div>
    );
  }

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

        {/* Quick Order Section */}
        {totalItems > 0 && (
          <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-emerald-600" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Your Cart ({totalItems} items)</h3>
                  <p className="text-gray-600">Ready to order • ${subtotal.toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={onCartClick}
                className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
              >
                View Cart
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DoorDashOrderButton
                restaurantName="Sample Restaurant"
                restaurantAddress="123 Main St, Brandon, FL 33511"
                className="w-full"
              />
              <button
                onClick={() => navigate('/order')}
                className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Package size={18} />
                Standard Order
              </button>
            </div>
          </div>
        )}

        {/* Quick Order Demo Section */}
        <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Truck className="text-red-600" size={24} />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Quick Order Demo</h3>
                <p className="text-gray-600">Test DoorDash delivery integration</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/test-order')}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              View Demo
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Package className="text-gray-600" size={20} />
              <span className="font-medium text-gray-800">Sample Order</span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Mediterranean Quinoa Bowl</span>
                <span>$12.99</span>
              </div>
              <div className="flex justify-between">
                <span>Green Smoothie</span>
                <span>$6.99</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-800 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>$22.97</span>
              </div>
            </div>
          </div>
          
          <DoorDashOrderButton
            restaurantName={quickOrderData.restaurant.name}
            restaurantAddress={quickOrderData.restaurant.address}
            restaurantPhone={quickOrderData.restaurant.phone}
            className="w-full"
          />
        </div>

        {/* Fresh Finds Section */}
        <div className="mb-8">
          <FreshFindsSection onSelectRestaurant={handleSelectRestaurant} />
        </div>

        {/* Google Map Section */}
        <div className="mb-8">
          <NearbyPlacesMap />
        </div>

        {/* Features Section */}
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Welcome to menVue</h3>
          <p className="text-gray-600 mb-6">Your healthy eating companion for finding nutritious meals</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={() => handleFeatureClick('healthy-options')}
              className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors cursor-pointer"
            >
              🥗 Healthy Options
            </button>
            <button 
              onClick={() => handleFeatureClick('nutrition-tracking')}
              className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors cursor-pointer"
            >
              📊 Nutrition Tracking
            </button>
            <button 
              onClick={() => handleFeatureClick('meal-planning')}
              className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors cursor-pointer"
            >
              🎯 Meal Planning
            </button>
            <button 
              onClick={() => handleFeatureClick('ai-assistant')}
              className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors cursor-pointer"
            >
              🤖 AI Assistant
            </button>
            <button 
              onClick={() => navigate('/test-order')}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors cursor-pointer"
            >
              🚚 Test Order
            </button>
          </div>
        </div>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-24 right-6 flex flex-col gap-3 z-40">
        {/* Cart Button (if items in cart) */}
        {totalItems > 0 && (
          <button
            onClick={onCartClick}
            className="relative w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-all duration-200 flex items-center justify-center hover:scale-105"
          >
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          </button>
        )}
        
        {/* Chat Button */}
        <button
          onClick={() => setIsChatOpen(true)}
          className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center hover:scale-105"
        >
          <MessageSquare size={24} />
        </button>
      </div>

      {/* Nutrition Chat Bot */}
      <NutritionChatBot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        userPreferences={user ? { userId: user.id } : undefined}
      />

      {/* AI Meal Modal */}
      <AIMealModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
      />

      {/* Quick Order Modal */}
      {showQuickOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Truck className="text-red-600" size={20} />
                  Quick Order
                </h3>
                <button
                  onClick={() => setShowQuickOrder(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="text-gray-600" size={16} />
                    <span className="font-medium text-gray-800">{quickOrderData.restaurant.name}</span>
                  </div>
                  <p className="text-sm text-gray-600">{quickOrderData.restaurant.address}</p>
                </div>

                <div className="space-y-2">
                  {quickOrderData.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-800">{item.name}</span>
                      <span className="font-medium">${item.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 font-semibold">
                    <span>Total</span>
                    <span>${quickOrderData.total}</span>
                  </div>
                </div>

                <DoorDashOrderButton
                  restaurantName={quickOrderData.restaurant.name}
                  restaurantAddress={quickOrderData.restaurant.address}
                  restaurantPhone={quickOrderData.restaurant.phone}
                  className="w-full"
                />
                
                <button
                  onClick={() => setShowQuickOrder(false)}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;