import React, { useState } from 'react';
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
  Heart
} from 'lucide-react';
import Header from '../components/Header';
import { menuItems } from '../data/menuItems';
import { restaurants } from '../data/restaurants';

type HealthGoal = 'lose-weight' | 'maintain' | 'build-muscle';
type PlanDuration = 3 | 5 | 7;

interface DayPlan {
  lunch: typeof menuItems[0] | null;
  dinner: typeof menuItems[0] | null;
}

const MealPlanBuilder: React.FC = () => {
  const [goal, setGoal] = useState<HealthGoal>('maintain');
  const [duration, setDuration] = useState<PlanDuration>(5);
  const [currentDay, setCurrentDay] = useState(1);
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>(() => {
    return Array(duration).fill(null).map(() => ({
      lunch: getFilteredMeal(goal),
      dinner: getFilteredMeal(goal)
    }));
  });

  function getFilteredMeal(healthGoal: HealthGoal) {
    const filteredItems = menuItems.filter(item => {
      switch (healthGoal) {
        case 'build-muscle':
          return item.nutrition.protein >= 25 && item.calories >= 400;
        case 'lose-weight':
          return item.calories <= 400 && item.nutrition.fiber >= 5;
        case 'maintain':
          return item.calories >= 300 && item.calories <= 600;
        default:
          return true;
      }
    });
    return filteredItems[Math.floor(Math.random() * filteredItems.length)];
  }

  const handleSwap = (dayIndex: number, mealType: 'lunch' | 'dinner') => {
    setWeekPlan(currentPlan => {
      const newPlan = [...currentPlan];
      let newMeal;
      do {
        newMeal = getFilteredMeal(goal);
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
      lunch: getFilteredMeal(goal),
      dinner: getFilteredMeal(goal)
    })));
  };

  const calculateDayMacros = (day: DayPlan) => {
    const lunch = day.lunch?.nutrition || { protein: 0, carbs: 0, totalFat: 0, calories: 0 };
    const dinner = day.dinner?.nutrition || { protein: 0, carbs: 0, totalFat: 0, calories: 0 };
    
    return {
      protein: lunch.protein + dinner.protein,
      carbs: lunch.carbs + dinner.carbs,
      fat: lunch.totalFat + dinner.totalFat,
      calories: (day.lunch?.calories || 0) + (day.dinner?.calories || 0)
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
            <p className="text-gray-600">No time? No problem. We planned your clean week.</p>
          </div>
        </div>
        
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
        </div>
        
        {/* Plan Configuration */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8 max-w-5xl mx-auto">
          <div className="p-6 space-y-6">
            {/* Health Goal Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="text-emerald-600" />
                Choose Your Goal
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
                    className={`p-6 rounded-xl flex flex-col items-center gap-3 border-2 transition-all ${
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
                        lunch: getFilteredMeal(goal),
                        dinner: getFilteredMeal(goal)
                      })));
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${
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
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentDay(day => Math.max(1, day - 1))}
              disabled={currentDay === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Day {currentDay}
              </h2>
              <p className="text-gray-500">of {duration}</p>
            </div>
            <button
              onClick={() => setCurrentDay(day => Math.min(duration, day + 1))}
              disabled={currentDay === duration}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={24} />
            </button>
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
            {['lunch', 'dinner'].map((mealType) => {
              const meal = weekPlan[currentDay - 1][mealType as keyof DayPlan];
              return (
                <div key={mealType} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Utensils size={20} className="text-emerald-600" />
                        <h3 className="text-lg font-semibold text-gray-800 capitalize">{mealType}</h3>
                      </div>
                      <button
                        onClick={() => handleSwap(currentDay - 1, mealType as 'lunch' | 'dinner')}
                        className="p-2 hover:bg-emerald-50 rounded-full transition-colors text-emerald-600"
                      >
                        <Repeat size={20} />
                      </button>
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
                        <h4 className="font-medium text-gray-800 mb-1">{meal.name}</h4>
                        <p className="text-sm text-emerald-600 mb-4">
                          {getRestaurantName(meal.restaurantId)}
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-500">Cal</div>
                            <div className="font-semibold">{meal.calories}</div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-500">Protein</div>
                            <div className="font-semibold">{meal.nutrition.protein}g</div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-500">Carbs</div>
                            <div className="font-semibold">{meal.nutrition.carbs}g</div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="text-xs text-gray-500">Fat</div>
                            <div className="font-semibold">{meal.nutrition.totalFat}g</div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 max-w-5xl mx-auto">
          <button
            onClick={regeneratePlan}
            className="px-6 py-3 text-emerald-600 font-medium hover:bg-emerald-50 rounded-xl transition-colors flex items-center gap-2"
          >
            <Repeat size={20} />
            Regenerate Plan
          </button>
          <button
            onClick={() => alert('Plan saved!')}
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <Save size={20} />
            Save Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealPlanBuilder;