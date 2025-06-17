import React from 'react';

interface MealPlanCardProps {
  meal_name: string;
  restaurant: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tags: string[];
  image_url: string;
  onTap: () => void;
}

const MealPlanCard: React.FC<MealPlanCardProps> = ({
  meal_name,
  restaurant,
  calories,
  protein,
  carbs,
  fat,
  tags,
  image_url,
  onTap,
}) => {
  return (
    <div
      onClick={onTap}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md active:scale-[0.98] cursor-pointer"
    >
      {/* Image */}
      <div className="aspect-[4/3] relative">
        <img
          src={image_url}
          alt={meal_name}
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-medium"
          style={{ 
            backgroundColor: calories <= 500 ? '#A5D6A7' : '#FFF59D',
            color: calories <= 500 ? '#1B5E20' : '#F57F17'
          }}
        >
          {calories} cal
        </div>
        <div 
          className="absolute top-3 left-3 w-3 h-3 rounded-full"
          style={{ 
            backgroundColor: calories <= 500 ? '#A5D6A7' : '#FFF59D',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Restaurant name */}
        <p className="text-emerald-600 text-sm font-medium mb-1">{restaurant}</p>
        
        {/* Meal name */}
        <h3 className="text-gray-800 font-bold text-lg mb-3 line-clamp-2">
          {meal_name}
        </h3>

        {/* Macros */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <span className="block text-xs text-gray-500 uppercase">Protein</span>
            <span className="font-semibold">{protein}g</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <span className="block text-xs text-gray-500 uppercase">Carbs</span>
            <span className="font-semibold">{carbs}g</span>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <span className="block text-xs text-gray-500 uppercase">Fat</span>
            <span className="font-semibold">{fat}g</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlanCard;