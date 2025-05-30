import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronLeft, Utensils, ArrowRight, Plus } from 'lucide-react';
import Header from '../components/Header';
import { restaurants } from '../data/restaurants';
import { menuItems } from '../data/menuItems';
import type { Restaurant, MenuItem } from '../types';

interface HealthyVariation {
  originalItem: MenuItem;
  healthyVersion: {
    name: string;
    description: string;
    calories: number;
    nutrition: MenuItem['nutrition'];
    modifications: string[];
    healthScore: number;
  };
}

const HealthyVariationsPage: React.FC = () => {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [healthyVariation, setHealthyVariation] = useState<HealthyVariation | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserLocation(position),
        (error) => console.error('Error getting location:', error)
      );
    }
  }, []);

  const generateHealthyVariation = async (item: MenuItem) => {
    setLoading(true);
    // Simulated AI response - In production, this would call your AI service
    const healthyVersion = {
      name: `Healthier ${item.name}`,
      description: item.description,
      calories: Math.round(item.calories * 0.7),
      nutrition: {
        protein: item.nutrition.protein,
        carbs: Math.round(item.nutrition.carbs * 0.6),
        sugars: Math.round(item.nutrition.sugars * 0.5),
        totalFat: Math.round(item.nutrition.totalFat * 0.7),
        saturatedFat: Math.round(item.nutrition.saturatedFat * 0.5),
        fiber: item.nutrition.fiber + 2,
        sodium: Math.round(item.nutrition.sodium * 0.7)
      },
      modifications: [
        'Replace regular sauce with light version',
        'Use lean protein option',
        'Add extra vegetables',
        'Reduce portion size by 25%'
      ],
      healthScore: 85
    };

    setHealthyVariation({
      originalItem: item,
      healthyVersion
    });
    setLoading(false);
  };

  const renderNutritionComparison = (original: MenuItem['nutrition'], healthy: MenuItem['nutrition']) => (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-2">Original</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Protein</span>
            <span className="font-medium">{original.protein}g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Carbs</span>
            <span className="font-medium">{original.carbs}g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Fat</span>
            <span className="font-medium">{original.totalFat}g</span>
          </div>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium text-emerald-600 mb-2">Healthy Version</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Protein</span>
            <span className="font-medium">{healthy.protein}g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Carbs</span>
            <span className="font-medium">{healthy.carbs}g</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Fat</span>
            <span className="font-medium">{healthy.totalFat}g</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={false} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Location Banner */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-3">
            <MapPin className="text-emerald-600" size={24} />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Your Location</h2>
              <p className="text-gray-600">
                {userLocation 
                  ? `${userLocation.coords.latitude.toFixed(4)}, ${userLocation.coords.longitude.toFixed(4)}`
                  : 'Detecting location...'}
              </p>
            </div>
          </div>
        </div>

        {!selectedRestaurant ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Nearby Restaurants
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  onClick={() => setSelectedRestaurant(restaurant)}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{restaurant.name}</h3>
                      <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <MapPin size={14} />
                        <span>{restaurant.distance}</span>
                      </div>
                    </div>
                    <ArrowRight className="ml-auto text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : !selectedItem ? (
          <>
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft size={24} />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedRestaurant.name}</h2>
                <p className="text-gray-600">Select a menu item to see its healthy variation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {menuItems
                .filter(item => item.restaurantId === selectedRestaurant.id)
                .map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      generateHealthyVariation(item);
                    }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="h-48">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-600 font-medium">{item.calories} calories</span>
                        <button className="text-emerald-600 hover:text-emerald-700">
                          See Healthy Version
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                <ChevronLeft size={24} />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Healthy Variation</h2>
                <p className="text-gray-600">{selectedItem.name}</p>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              </div>
            ) : healthyVariation && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Original Item */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="h-48">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-800 mb-2">Original Version</h3>
                    <p className="text-sm text-gray-600 mb-4">{selectedItem.description}</p>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Utensils size={16} />
                      <span>{selectedItem.calories} calories</span>
                    </div>
                    {renderNutritionComparison(
                      selectedItem.nutrition,
                      healthyVariation.healthyVersion.nutrition
                    )}
                  </div>
                </div>

                {/* Healthy Version */}
                <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                  <div className="h-48 relative">
                    <img
                      src={selectedItem.image}
                      alt={healthyVariation.healthyVersion.name}
                      className="w-full h-full object-cover brightness-95"
                    />
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Health Score: {healthyVariation.healthyVersion.healthScore}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-emerald-600 mb-2">Healthy Version</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {healthyVariation.healthyVersion.description}
                    </p>
                    <div className="flex items-center gap-2 text-emerald-600 mb-4">
                      <Utensils size={16} />
                      <span>{healthyVariation.healthyVersion.calories} calories</span>
                    </div>

                    <div className="space-y-2 mb-6">
                      <h4 className="font-medium text-gray-800">Modifications:</h4>
                      {healthyVariation.healthyVersion.modifications.map((mod, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <Plus size={14} className="text-emerald-500" />
                          <span>{mod}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        // Add to meal plan logic here
                        alert('Added to meal plan!');
                      }}
                      className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Add to Meal Plan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HealthyVariationsPage;