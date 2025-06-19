import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { 
  Repeat, 
  Dumbbell, 
  Scale, 
  ChevronLeft, 
  ChevronRight, 
  Save,
  Utensils,
  Calendar,
  Flame,
  Heart,
  Sparkles,
  Clock,
  Coffee,
  Apple,
  Download,
  Info,
  ChevronDown,
  Edit3,
  Filter,
  Loader2,
  AlertCircle,
  Check
} from 'lucide-react';
import Header from '../components/Header';
import { menuItems } from '../data/menuItems';
import { restaurants } from '../data/restaurants';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

type HealthGoal = 'lose-weight' | 'maintain' | 'build-muscle';
type PlanDuration = 3 | 5 | 7;

interface DayPlan {
  lunch: typeof menuItems[0] | null;
  dinner: typeof menuItems[0] | null;
  breakfast: typeof menuItems[0] | null;
  snack: typeof menuItems[0] | null;
}

interface MealCustomization {
  size: 'Small' | 'Regular' | 'Large';
  notes: string;
  healthyFilter: boolean;
}

interface UserPreferences {
  health_goal: string;
  diet_type: string;
  allergens: string[];
  meal_type: string;
  calorie_range: string;
}

const MealPlanBuilder: React.FC = () => {
  const { user } = useAuth();
  const [goal, setGoal] = useState<HealthGoal>('maintain');
  const [duration, setDuration] = useState<PlanDuration>(5);
  const [currentDay, setCurrentDay] = useState(1);
  const [customizations, setCustomizations] = useState<Record<string, MealCustomization>>({});
  const [showCustomizeModal, setShowCustomizeModal] = useState<string | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>(() => {
    return Array(duration).fill(null).map(() => ({
      lunch: null,
      dinner: null,
      breakfast: null,
      snack: null
    }));
  });
  const [showIngredients, setShowIngredients] = useState<string | null>(null);

  // Load user preferences on component mount
  useEffect(() => {
    const loadUserPreferences = async () => {
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
          setUserPreferences(data);
          // Set goal based on user preferences
          if (data.health_goal) {
            setGoal(data.health_goal as HealthGoal);
          }
        }
      } catch (err) {
        console.error('Error loading preferences:', err);
        setError('Failed to load your preferences');
      } finally {
        setLoading(false);
      }
    };

    loadUserPreferences();
  }, [user]);

  // Generate initial meal plan when preferences are loaded
  useEffect(() => {
    if (userPreferences) {
      regeneratePlan();
    }
  }, [userPreferences, goal, duration]);

  const getDefaultCustomization = (): MealCustomization => ({
    size: 'Regular',
    notes: '',
    healthyFilter: false
  });

  const getMealCustomization = (mealId: string): MealCustomization => {
    return customizations[mealId] || getDefaultCustomization();
  };

  function getFilteredMeal(healthGoal: HealthGoal, preferences?: UserPreferences | null) {
    let filteredItems = [...menuItems];

    // Apply user preferences if available
    if (preferences) {
      // Filter by diet type
      if (preferences.diet_type && preferences.diet_type !== 'No Restrictions') {
        filteredItems = filteredItems.filter(item => 
          item.tags.some(tag => tag.toLowerCase().includes(preferences.diet_type.toLowerCase()))
        );
      }

      // Filter by allergens
      if (preferences.allergens && preferences.allergens.length > 0) {
        filteredItems = filteredItems.filter(item => 
          !preferences.allergens.some(allergen => 
            item.ingredients?.some(ingredient => 
              ingredient.toLowerCase().includes(allergen.toLowerCase())
            )
          )
        );
      }

      // Filter by calorie range
      if (preferences.calorie_range) {
        switch (preferences.calorie_range) {
          case '<300':
            filteredItems = filteredItems.filter(item => item.calories < 300);
            break;
          case '300-500':
            filteredItems = filteredItems.filter(item => item.calories >= 300 && item.calories <= 500);
            break;
          case '500-700':
            filteredItems = filteredItems.filter(item => item.calories > 500 && item.calories <= 700);
            break;
          case '700+':
            filteredItems = filteredItems.filter(item => item.calories > 700);
            break;
        }
      }
    }

    // Apply health goal filters
    switch (healthGoal) {
      case 'build-muscle':
        filteredItems = filteredItems.filter(item => 
          item.nutrition.protein >= 25 && item.calories >= 400
        );
        break;
      case 'lose-weight':
        filteredItems = filteredItems.filter(item => 
          item.calories <= 400 && item.nutrition.fiber >= 5
        );
        break;
      case 'maintain':
        filteredItems = filteredItems.filter(item => 
          item.calories >= 300 && item.calories <= 600
        );
        break;
    }

    // Apply healthy filter if enabled
    const customization = customizations[filteredItems[0]?.id];
    if (customization?.healthyFilter) {
      filteredItems = filteredItems.filter(item => item.calories <= 500);
    }

    return filteredItems.length > 0 
      ? filteredItems[Math.floor(Math.random() * filteredItems.length)]
      : menuItems[Math.floor(Math.random() * menuItems.length)];
  }

  const handleSwap = (dayIndex: number, mealType: keyof DayPlan) => {
    setWeekPlan(currentPlan => {
      const newPlan = [...currentPlan];
      let newMeal;
      do {
        newMeal = getFilteredMeal(goal, userPreferences);
      } while (newMeal?.id === currentPlan[dayIndex][mealType]?.id);
      
      newPlan[dayIndex] = {
        ...newPlan[dayIndex],
        [mealType]: newMeal
      };
      return newPlan;
    });
  };

  const regeneratePlan = () => {
    setWeekPlan(Array(duration).fill(null).map(() => ({
      lunch: getFilteredMeal(goal, userPreferences),
      dinner: getFilteredMeal(goal, userPreferences),
      breakfast: getFilteredMeal(goal, userPreferences),
      snack: getFilteredMeal(goal, userPreferences)
    })));
  };

  const handleSavePlan = async () => {
    if (!user) return;

    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const startDate = new Date();
      const endDate = addDays(startDate, duration - 1);

      // Create meal plan record
      const { data: mealPlan, error: planError } = await supabase
        .from('meal_plans')
        .insert({
          user_id: user.id,
          start_date: startDate.toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0]
        })
        .select()
        .single();

      if (planError) {
        console.error('Error creating meal plan:', planError);
        setError('Failed to save meal plan. Please try again.');
        return;
      }

      // Create meal plan items
      const mealPlanItems = [];
      for (let dayIndex = 0; dayIndex < weekPlan.length; dayIndex++) {
        const day = weekPlan[dayIndex];
        const mealDate = addDays(startDate, dayIndex).toISOString().split('T')[0];

        Object.entries(day).forEach(([mealType, meal]) => {
          if (meal) {
            mealPlanItems.push({
              meal_plan_id: mealPlan.id,
              meal_date: mealDate,
              meal_type: mealType,
              menu_item_id: meal.id
            });
          }
        });
      }

      if (mealPlanItems.length > 0) {
        const { error: itemsError } = await supabase
          .from('meal_plan_items')
          .insert(mealPlanItems);

        if (itemsError) {
          console.error('Error creating meal plan items:', itemsError);
          setError('Failed to save meal plan items. Please try again.');
          return;
        }
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving meal plan:', err);
      setError('Failed to save meal plan. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const calculateDayMacros = (day: DayPlan) => {
    const lunch = day.lunch?.nutrition || { protein: 0, carbs: 0, totalFat: 0, calories: 0 };
    const dinner = day.dinner?.nutrition || { protein: 0, carbs: 0, totalFat: 0, calories: 0 };
    const breakfast = day.breakfast?.nutrition || { protein: 0, carbs: 0, totalFat: 0, calories: 0 };
    const snack = day.snack?.nutrition || { protein: 0, carbs: 0, totalFat: 0, calories: 0 };
    
    const getSizeMultiplier = (mealId: string) => {
      const size = getMealCustomization(mealId).size;
      switch (size) {
        case 'Small': return 0.75;
        case 'Large': return 1.25;
        default: return 1;
      }
    };
    
    return {
      protein: Math.round(
        lunch.protein * getSizeMultiplier(day.lunch?.id || '') +
        dinner.protein * getSizeMultiplier(day.dinner?.id || '') +
        breakfast.protein * getSizeMultiplier(day.breakfast?.id || '') +
        snack.protein * getSizeMultiplier(day.snack?.id || '')
      ),
      carbs: Math.round(
        lunch.carbs * getSizeMultiplier(day.lunch?.id || '') +
        dinner.carbs * getSizeMultiplier(day.dinner?.id || '') +
        breakfast.carbs * getSizeMultiplier(day.breakfast?.id || '') +
        snack.carbs * getSizeMultiplier(day.snack?.id || '')
      ),
      fat: Math.round(
        lunch.totalFat * getSizeMultiplier(day.lunch?.id || '') +
        dinner.totalFat * getSizeMultiplier(day.dinner?.id || '') +
        breakfast.totalFat * getSizeMultiplier(day.breakfast?.id || '') +
        snack.totalFat * getSizeMultiplier(day.snack?.id || '')
      ),
      calories: Math.round(
        (day.lunch?.calories || 0) * getSizeMultiplier(day.lunch?.id || '') +
        (day.dinner?.calories || 0) * getSizeMultiplier(day.dinner?.id || '') +
        (day.breakfast?.calories || 0) * getSizeMultiplier(day.breakfast?.id || '') +
        (day.snack?.calories || 0) * getSizeMultiplier(day.snack?.id || '')
      )
    };
  };

  const getRestaurantName = (id: string) => {
    return restaurants.find(r => r.id === id)?.name || 'Restaurant';
  };

  const goalDescriptions = {
    'lose-weight': 'Focus on low-calorie, high-fiber meals to support your weight loss journey',
    'maintain': 'Balanced meals to maintain your current weight and energy levels',
    'build-muscle': 'Protein-rich meals to support muscle growth and recovery'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header showSearch={false} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3 text-gray-600">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Loading your meal plan...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={false} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 bg-gradient-to-r from-emerald-50/50 to-transparent rounded-2xl p-6">
          <div className="relative">
            <div className="w-1 h-8 bg-emerald-500 absolute -left-6 top-1/2 -translate-y-1/2 rounded-r-full" />
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-6 h-6 text-emerald-600" />
              <h1 className="text-2xl font-bold text-gray-800">Custom Meal Plan Builder</h1>
            </div>
            <p className="text-gray-600">
              {userPreferences 
                ? `Personalized for your ${userPreferences.health_goal?.replace('-', ' ')} goal`
                : 'No time? No problem. We planned your clean week.'
              }
            </p>
          </div>
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
            <span>Meal plan saved successfully!</span>
          </div>
        )}
        
        {/* Feature Pills */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mb-8">
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
            <Calendar size={16} />
            <span>Weekly Planning</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
            <Scale size={16} />
            <span>Macro Tracking</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles size={16} />
            <span>Smart Suggestions</span>
          </div>
          {userPreferences && (
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <Heart size={16} />
              <span>Personalized</span>
            </div>
          )}
        </div>
        
        {/* Plan Configuration */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8 max-w-5xl mx-auto">
          <div className="p-6 space-y-6">
            {/* Health Goal Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="text-emerald-600" />
                Choose Your Goal
                {userPreferences?.health_goal && (
                  <span className="text-sm text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    From your preferences
                  </span>
                )}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'lose-weight', icon: Scale, label: 'Lose Weight' },
                  { id: 'maintain', icon: Heart, label: 'Maintain' },
                  { id: 'build-muscle', icon: Dumbbell, label: 'Build Muscle' }
                ].map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => {
                      setGoal(id as HealthGoal);
                      regeneratePlan();
                    }}
                    className={`p-6 rounded-xl flex flex-col items-center gap-3 border-2 transition-all hover:shadow-md ${
                      goal === id
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-100 hover:border-emerald-200'
                    }`}
                  >
                    <Icon size={28} className={goal === id ? 'text-emerald-600' : 'text-gray-400'} />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </div>
              <p className="mt-4 text-gray-600 bg-gray-50 p-4 rounded-lg">
                {goalDescriptions[goal]}
              </p>
            </div>

            {/* Duration Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="text-emerald-600" />
                Plan Duration
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[3, 5, 7].map((days) => (
                  <button
                    key={days}
                    onClick={() => {
                      setDuration(days as PlanDuration);
                      setWeekPlan(Array(days).fill(null).map(() => ({
                        lunch: getFilteredMeal(goal, userPreferences),
                        dinner: getFilteredMeal(goal, userPreferences),
                        breakfast: getFilteredMeal(goal, userPreferences),
                        snack: getFilteredMeal(goal, userPreferences)
                      })));
                    }}
                    className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                      duration === days
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-100 hover:border-emerald-200'
                    }`}
                  >
                    <div className="text-2xl font-bold mb-1">{days}</div>
                    <div className="text-sm">Days</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Day Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Your Meal Plan</h2>
            <button 
              onClick={() => regeneratePlan()}
              className="px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <Repeat size={18} />
              Re-plan Day
            </button>
          </div>
          
          {/* Day Stepper */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {Array.from({ length: duration }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentDay(idx + 1)}
                className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-medium transition-all ${
                  currentDay === idx + 1
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Daily Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {Object.entries(calculateDayMacros(weekPlan[currentDay - 1])).map(([key, value]) => (
              <div key={key} className="bg-emerald-50 rounded-xl p-4 text-center">
                <div className="text-sm text-emerald-600 font-medium capitalize mb-1">{key}</div>
                <div className="text-2xl font-bold text-emerald-700">
                  {key === 'calories' ? value : `${value}g`}
                </div>
              </div>
            ))}
          </div>

          {/* Meals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => {
              const meal = weekPlan[currentDay - 1][mealType as keyof DayPlan];
              const mealIcons = {
                breakfast: <Coffee size={20} />,
                lunch: <Utensils size={20} />,
                dinner: <Utensils size={20} />,
                snack: <Apple size={20} />
              };
              return (
                <div key={mealType} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="text-emerald-600">
                          {mealIcons[mealType as keyof typeof mealIcons]}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 capitalize">{mealType}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSwap(currentDay - 1, mealType as keyof DayPlan)}
                          className="p-2 hover:bg-emerald-50 rounded-full transition-colors text-emerald-600 group relative"
                        >
                          <Repeat size={20} />
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Swap Meal
                          </span>
                        </button>
                      </div>
                    </div>

                    {meal && (
                      <>
                        <div className="aspect-video rounded-xl overflow-hidden mb-4">
                          <img
                            src={meal.image}
                            alt={meal.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-800 mb-1">{meal.name}</h4>
                          <div className="flex items-center gap-4">
                            <p className="text-sm text-emerald-600">
                              {getRestaurantName(meal.restaurantId)}
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock size={14} className="mr-1" />
                              <span>15-20 min</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Portion Size Selector */}
                        <div className="flex items-center justify-between mb-4">
                          <select
                            value={getMealCustomization(meal.id).size}
                            onChange={(e) => setCustomizations(prev => ({
                              ...prev,
                              [meal.id]: {
                                ...getMealCustomization(meal.id),
                                size: e.target.value as MealCustomization['size']
                              }
                            }))}
                            className="px-3 py-1.5 rounded-lg text-sm bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500"
                          >
                            <option value="Small">Small</option>
                            <option value="Regular">Regular</option>
                            <option value="Large">Large</option>
                          </select>
                          
                          <button
                            onClick={() => setShowCustomizeModal(meal.id)}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <Edit3 size={16} />
                            Customize
                          </button>
                        </div>

                        {/* Dietary Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {meal.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Nutrition Info */}
                        <div className="grid grid-cols-4 gap-2">
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-500">Cal</div>
                            <div className="font-semibold">
                              {Math.round(meal.calories * (getMealCustomization(meal.id).size === 'Small' ? 0.75 : getMealCustomization(meal.id).size === 'Large' ? 1.25 : 1))}
                            </div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-500">Protein</div>
                            <div className="font-semibold">
                              {Math.round(meal.nutrition.protein * (getMealCustomization(meal.id).size === 'Small' ? 0.75 : getMealCustomization(meal.id).size === 'Large' ? 1.25 : 1))}g
                            </div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-500">Carbs</div>
                            <div className="font-semibold">
                              {Math.round(meal.nutrition.carbs * (getMealCustomization(meal.id).size === 'Small' ? 0.75 : getMealCustomization(meal.id).size === 'Large' ? 1.25 : 1))}g
                            </div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-500">Fat</div>
                            <div className="font-semibold">
                              {Math.round(meal.nutrition.totalFat * (getMealCustomization(meal.id).size === 'Small' ? 0.75 : getMealCustomization(meal.id).size === 'Large' ? 1.25 : 1))}g
                            </div>
                          </div>
                        </div>
                        
                        {/* Special Instructions */}
                        {getMealCustomization(meal.id).notes && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                            <div className="font-medium text-gray-700 mb-1">Special Instructions:</div>
                            {getMealCustomization(meal.id).notes}
                          </div>
                        )}

                        {/* View Ingredients Button */}
                        <button
                          onClick={() => setShowIngredients(meal.id)}
                          className="mt-4 text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1"
                        >
                          <Info size={16} />
                          View Ingredients
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customize Modal */}
        {showCustomizeModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Customize Meal</h3>
                  <button
                    onClick={() => setShowCustomizeModal(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ChevronDown size={24} />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Healthy Filter Toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Filter size={20} className="text-emerald-600" />
                      <div>
                        <div className="font-medium text-gray-800">Healthy Filter</div>
                        <div className="text-sm text-gray-500">Only show options under 500 calories</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={getMealCustomization(showCustomizeModal).healthyFilter}
                        onChange={(e) => setCustomizations(prev => ({
                          ...prev,
                          [showCustomizeModal]: {
                            ...getMealCustomization(showCustomizeModal),
                            healthyFilter: e.target.checked
                          }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                  
                  {/* Special Instructions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Instructions
                    </label>
                    <textarea
                      value={getMealCustomization(showCustomizeModal).notes}
                      onChange={(e) => setCustomizations(prev => ({
                        ...prev,
                        [showCustomizeModal]: {
                          ...getMealCustomization(showCustomizeModal),
                          notes: e.target.value
                        }
                      }))}
                      placeholder="E.g., No mayo, sauce on the side..."
                      className="w-full h-32 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                    />
                  </div>
                  
                  <button
                    onClick={() => setShowCustomizeModal(null)}
                    className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fixed Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex justify-between items-center">
          <div className="container mx-auto max-w-5xl flex justify-between items-center">
            <button
              onClick={() => alert('Shopping list downloaded!')}
              className="px-6 py-3 text-emerald-600 font-medium hover:bg-emerald-50 rounded-xl transition-colors flex items-center gap-2"
            >
              <Download size={20} />
              Download Shopping List
            </button>
            <button
              onClick={handleSavePlan}
              disabled={saving}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Saving Plan...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Plan
                </>
              )}
            </button>
          </div>
        </div>

        {/* Ingredients Modal */}
        {showIngredients && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Ingredients & Instructions</h3>
                  <button
                    onClick={() => setShowIngredients(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ChevronDown size={24} />
                  </button>
                </div>
                <div className="prose prose-sm max-w-none">
                  <h4 className="font-medium text-gray-700">Ingredients</h4>
                  <ul className="list-disc pl-4 mb-4">
                    {weekPlan[currentDay - 1][showIngredients as keyof DayPlan]?.ingredients?.map((ingredient, idx) => (
                      <li key={idx} className="text-gray-600">{ingredient}</li>
                    ))}
                  </ul>
                  <h4 className="font-medium text-gray-700">Preparation</h4>
                  <p className="text-gray-600">{weekPlan[currentDay - 1][showIngredients as keyof DayPlan]?.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlanBuilder;