import React, { useState, useEffect } from 'react';
import { Apple, ArrowLeft, Dumbbell, Leaf, Scale, Check, Loader2, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

interface UserPreferences {
  health_goal: string;
  diet_type: string;
  allergens: string[];
  meal_type: string;
  calorie_range: string;
}

const NutritionPreferencesPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [preferences, setPreferences] = useState<UserPreferences>({
    health_goal: '',
    diet_type: '',
    allergens: [],
    meal_type: '',
    calorie_range: ''
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

  // Load existing preferences on component mount
  useEffect(() => {
    const loadPreferences = async () => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching preferences:', fetchError);
          setError('Failed to load your preferences');
          return;
        }

        if (data) {
          setPreferences({
            health_goal: data.health_goal || '',
            diet_type: data.diet_type || '',
            allergens: data.allergens || [],
            meal_type: data.meal_type || '',
            calorie_range: data.calorie_range || ''
          });
        }
      } catch (err) {
        console.error('Error loading preferences:', err);
        setError('Failed to load your preferences');
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, [user]);

  const toggleAllergen = (allergen: string) => {
    setPreferences(prev => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter(a => a !== allergen)
        : [...prev.allergens, allergen]
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const { error: saveError } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          health_goal: preferences.health_goal,
          diet_type: preferences.diet_type,
          allergens: preferences.allergens,
          meal_type: preferences.meal_type,
          calorie_range: preferences.calorie_range,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (saveError) {
        console.error('Error saving preferences:', saveError);
        setError('Failed to save your preferences. Please try again.');
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/account');
      }, 1500);
    } catch (err) {
      console.error('Error saving preferences:', err);
      setError('Failed to save your preferences. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header showSearch={false} />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3 text-gray-600">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Loading your preferences...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={false} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/account')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Nutrition Preferences</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg flex items-center gap-2">
            <Check size={20} />
            <span>Preferences saved successfully! Redirecting...</span>
          </div>
        )}

        <div className="space-y-8">
          {/* Health Goals */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Health Goal</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {healthGoals.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setPreferences(prev => ({ ...prev, health_goal: id }))}
                  className={`p-6 rounded-xl flex flex-col items-center gap-3 border-2 transition-all hover:shadow-md ${
                    preferences.health_goal === id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-100 hover:border-emerald-200'
                  }`}
                >
                  <Icon size={28} className={preferences.health_goal === id ? 'text-emerald-600' : 'text-gray-400'} />
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
                  onClick={() => setPreferences(prev => ({ ...prev, diet_type: diet }))}
                  className={`p-4 rounded-xl border transition-all hover:shadow-sm ${
                    preferences.diet_type === diet
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-100 hover:border-emerald-200'
                  }`}
                >
                  <Leaf
                    size={20}
                    className={`mb-2 mx-auto ${preferences.diet_type === diet ? 'text-emerald-600' : 'text-gray-400'}`}
                  />
                  <span className="font-medium text-sm">{diet}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Allergens */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Allergens</h2>
            <p className="text-sm text-gray-600 mb-4">Select any allergens you need to avoid</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {allergens.map(allergen => (
                <button
                  key={allergen}
                  onClick={() => toggleAllergen(allergen)}
                  className={`p-4 rounded-xl border relative transition-all hover:shadow-sm ${
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
                  <span className="font-medium text-sm">{allergen}</span>
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
                  onClick={() => setPreferences(prev => ({ ...prev, meal_type: type }))}
                  className={`p-4 rounded-xl border transition-all hover:shadow-sm ${
                    preferences.meal_type === type
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-100 hover:border-emerald-200'
                  }`}
                >
                  <span className="font-medium text-sm">{type}</span>
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
                  onClick={() => setPreferences(prev => ({ ...prev, calorie_range: id }))}
                  className={`p-4 rounded-xl border transition-all hover:shadow-sm ${
                    preferences.calorie_range === id
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
              disabled={saving}
              className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Saving Preferences...
                </>
              ) : (
                <>
                  <Check size={20} />
                  Save Preferences
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionPreferencesPage;