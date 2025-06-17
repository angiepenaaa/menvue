import React, { useState } from 'react';
import { Apple, ArrowLeft, Dumbbell, Leaf, Scale, Check } from 'lucide-react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const NutritionPreferencesPage: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    healthGoal: '',
    dietType: '',
    allergens: [] as string[],
    mealType: '',
    calorieRange: ''
  });

  const healthGoals = [
    { id: 'lose-weight', label: 'Lose Weight', icon: Scale },
    { id: 'maintain', label: 'Maintain Weight', icon: Apple },
    { id: 'build-muscle', label: 'Build Muscle', icon: Dumbbell }
  ];

  const dietTypes = [
    'No Restrictions',
    'Vegetarian',
    'Vegan',
    'Pescatarian',
    'Keto',
    'Paleo',
    'Mediterranean'
  ];

  const allergens = [
    'Dairy',
    'Eggs',
    'Fish',
    'Shellfish',
    'Tree Nuts',
    'Peanuts',
    'Wheat',
    'Soy'
  ];

  const mealTypes = [
    'Light Breakfast',
    'Hearty Breakfast',
    'Light Lunch',
    'Full Lunch',
    'Light Dinner',
    'Full Dinner'
  ];

  const calorieRanges = [
    { id: '<300', label: 'Under 300' },
    { id: '300-500', label: '300-500' },
    { id: '500-700', label: '500-700' },
    { id: '700+', label: 'Over 700' }
  ];

  const toggleAllergen = (allergen: string) => {
    setPreferences(prev => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter(a => a !== allergen)
        : [...prev.allergens, allergen]
    }));
  };

  const handleSave = () => {
    // TODO: Save preferences to Supabase
    navigate('/account');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={false} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/account')}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Nutrition Preferences</h1>
        </div>

        <div className="space-y-8">
          {/* Health Goals */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Health Goal</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {healthGoals.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setPreferences(prev => ({ ...prev, healthGoal: id }))}
                  className={`p-6 rounded-xl flex flex-col items-center gap-3 border-2 transition-all ${
                    preferences.healthGoal === id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-100 hover:border-emerald-200'
                  }`}
                >
                  <Icon size={28} className={preferences.healthGoal === id ? 'text-emerald-600' : 'text-gray-400'} />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Diet Type */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Diet Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {dietTypes.map(diet => (
                <button
                  key={diet}
                  onClick={() => setPreferences(prev => ({ ...prev, dietType: diet }))}
                  className={`p-4 rounded-xl border transition-all ${
                    preferences.dietType === diet
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-100 hover:border-emerald-200'
                  }`}
                >
                  <Leaf
                    size={20}
                    className={`mb-2 ${preferences.dietType === diet ? 'text-emerald-600' : 'text-gray-400'}`}
                  />
                  <span className="font-medium">{diet}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Allergens */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Allergens</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {allergens.map(allergen => (
                <button
                  key={allergen}
                  onClick={() => toggleAllergen(allergen)}
                  className={`p-4 rounded-xl border relative transition-all ${
                    preferences.allergens.includes(allergen)
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-100 hover:border-emerald-200'
                  }`}
                >
                  {preferences.allergens.includes(allergen) && (
                    <div className="absolute top-2 right-2">
                      <Check size={16} className="text-emerald-600" />
                    </div>
                  )}
                  <span className="font-medium">{allergen}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Meal Type */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Preferred Meal Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {mealTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setPreferences(prev => ({ ...prev, mealType: type }))}
                  className={`p-4 rounded-xl border transition-all ${
                    preferences.mealType === type
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-100 hover:border-emerald-200'
                  }`}
                >
                  <span className="font-medium">{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Calorie Range */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Target Calorie Range</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {calorieRanges.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setPreferences(prev => ({ ...prev, calorieRange: id }))}
                  className={`p-4 rounded-xl border transition-all ${
                    preferences.calorieRange === id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-100 hover:border-emerald-200'
                  }`}
                >
                  <span className="font-medium">{label}</span>
                  <span className="block text-sm text-gray-500">calories</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
          <div className="container mx-auto max-w-4xl">
            <button
              onClick={handleSave}
              className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <Check size={20} />
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionPreferencesPage;