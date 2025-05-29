import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { Repeat, Dumbbell, Scale, ChevronLeft, ChevronRight, Save } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={false} />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Custom Meal Plan Builder</h1>
        
        {/* Plan Configuration */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Health Goal Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                What's your health goal?
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    setGoal('lose-weight');
                    regeneratePlan();
                  }}
                  className={`p-4 rounded-lg flex flex-col items-center gap-2 border transition-all ${
                    goal === 'lose-weight'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-emerald-200'
                  }`}
                >
                  <Scale size={24} />
                  <span className="text-sm font-medium">Lose Weight</span>
                </button>
                <button
                  onClick={() => {
                    setGoal('maintain');
                    regeneratePlan();
                  }}
                  className={`p-4 rounded-lg flex flex-col items-center gap-2 border transition-all ${
                    goal === 'maintain'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-emerald-200'
                  }`}
                >
                  <Scale size={24} />
                  <span className="text-sm font-medium">Maintain</span>
                </button>
                <button
                  onClick={() => {
                    setGoal('build-muscle');
                    regeneratePlan();
                  }}
                  className={`p-4 rounded-lg flex flex-col items-center gap-2 border transition-all ${
                    goal === 'build-muscle'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-emerald-200'
                  }`}
                >
                  <Dumbbell size={24} />
                  <span className="text-sm font-medium">Build Muscle</span>
                </button>
              </div>
            </div>

            {/* Duration Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Plan Duration
              </label>
              <div className="grid grid-cols-3 gap-3">
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
                    className={`p-4 rounded-lg border transition-all ${
                      duration === days
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-emerald-200'
                    }`}
                  >
                    <span className="font-medium">{days} Days</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Day Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentDay(day => Math.max(1, day - 1))}
            disabled={currentDay === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            Day {currentDay} of {duration}
          </h2>
          <button
            onClick={() => setCurrentDay(day => Math.min(duration, day + 1))}
            disabled={currentDay === duration}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Meal Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {['lunch', 'dinner'].map((mealType) => {
            const meal = weekPlan[currentDay - 1][mealType as keyof DayPlan];
            return (
              <div key={mealType} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 capitalize">{mealType}</h3>
                    <button
                      onClick={() => handleSwap(currentDay - 1, mealType as 'lunch' | 'dinner')}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Repeat size={20} className="text-gray-600" />
                    </button>
                  </div>

                  {meal && (
                    <>
                      <div className="aspect-video rounded-lg overflow-hidden mb-4">
                        <img
                          src={meal.image}
                          alt={meal.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-medium text-gray-800 mb-1">{meal.name}</h4>
                      <p className="text-sm text-gray-500 mb-4">
                        {getRestaurantName(meal.restaurantId)}
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-500">Cal</div>
                          <div className="font-semibold">{meal.calories}</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-500">Protein</div>
                          <div className="font-semibold">{meal.nutrition.protein}g</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-500">Carbs</div>
                          <div className="font-semibold">{meal.nutrition.carbs}g</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-500">Fat</div>
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

        {/* Daily Totals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Totals</h3>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(calculateDayMacros(weekPlan[currentDay - 1])).map(([key, value]) => (
              <div key={key} className="text-center p-4 bg-emerald-50 rounded-lg">
                <div className="text-sm text-emerald-600 font-medium capitalize">{key}</div>
                <div className="text-2xl font-bold text-emerald-700">
                  {key === 'calories' ? value : `${value}g`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={regeneratePlan}
            className="px-6 py-2 text-emerald-600 font-medium hover:bg-emerald-50 rounded-lg transition-colors"
          >
            Regenerate Plan
          </button>
          <button
            onClick={() => alert('Plan saved!')}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
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