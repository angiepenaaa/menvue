import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import { Repeat } from 'lucide-react';
import MealPlanCard from '../components/MealPlanCard';
import { menuItems } from '../data/menuItems';

interface DayPlan {
  lunch: typeof menuItems[0] | null;
  dinner: typeof menuItems[0] | null;
}

const MealPlanBuilder: React.FC = () => {
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>(
    Array(7).fill({ lunch: null, dinner: null }).map(() => ({
      lunch: menuItems[Math.floor(Math.random() * menuItems.length)],
      dinner: menuItems[Math.floor(Math.random() * menuItems.length)]
    }))
  );

  const handleSwap = (dayIndex: number, mealType: 'lunch' | 'dinner') => {
    setWeekPlan(currentPlan => {
      const newPlan = [...currentPlan];
      let newMeal;
      do {
        newMeal = menuItems[Math.floor(Math.random() * menuItems.length)];
      } while (newMeal.id === currentPlan[dayIndex][mealType]?.id);
      
      newPlan[dayIndex] = {
        ...newPlan[dayIndex],
        [mealType]: newMeal
      };
      return newPlan;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Weekly Meal Plan</h1>
      
      <div className="space-y-8">
        {weekPlan.map((day, dayIndex) => (
          <div key={dayIndex} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {format(addDays(new Date(), dayIndex), 'EEEE, MMMM d')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Lunch */}
              <div className="relative">
                <h3 className="text-emerald-600 font-medium mb-3">Lunch</h3>
                {day.lunch && (
                  <div className="relative">
                    <button
                      onClick={() => handleSwap(dayIndex, 'lunch')}
                      className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <Repeat size={18} className="text-emerald-600" />
                    </button>
                    <MealPlanCard
                      meal_name={day.lunch.name}
                      restaurant={day.lunch.restaurantId}
                      calories={day.lunch.calories}
                      protein={day.lunch.nutrition?.protein || 0}
                      carbs={day.lunch.nutrition?.carbs || 0}
                      fat={day.lunch.nutrition?.totalFat || 0}
                      tags={day.lunch.tags}
                      image_url={day.lunch.image}
                      onTap={() => handleSwap(dayIndex, 'lunch')}
                    />
                  </div>
                )}
              </div>

              {/* Dinner */}
              <div className="relative">
                <h3 className="text-emerald-600 font-medium mb-3">Dinner</h3>
                {day.dinner && (
                  <div className="relative">
                    <button
                      onClick={() => handleSwap(dayIndex, 'dinner')}
                      className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <Repeat size={18} className="text-emerald-600" />
                    </button>
                    <MealPlanCard
                      meal_name={day.dinner.name}
                      restaurant={day.dinner.restaurantId}
                      calories={day.dinner.calories}
                      protein={day.dinner.nutrition?.protein || 0}
                      carbs={day.dinner.nutrition?.carbs || 0}
                      fat={day.dinner.nutrition?.totalFat || 0}
                      tags={day.dinner.tags}
                      image_url={day.dinner.image}
                      onTap={() => handleSwap(dayIndex, 'dinner')}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanBuilder;