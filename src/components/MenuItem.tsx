import React, { useState } from 'react';
import type { MenuItem as MenuItemType } from '../types';
import CalorieBadge from './CalorieBadge';
import ActivityMatchBadge from './ActivityMatchBadge';
import { restaurants } from '../data/restaurants';
import { MapPin, Clock, ChevronDown, ChevronUp, ShoppingCart, X, Leaf, Scale, Flame, Apple, Wheat, Salad as Salt, Check, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface MenuItemProps {
  item: MenuItemType;
}

const isValidImageUrl = (url: string): boolean => {
  return url.startsWith('https://images.pexels.com/');
};

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  if (!isValidImageUrl(item.image)) {
    return null;
  }

  const [isNutritionOpen, setIsNutritionOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [expandedNutrition, setExpandedNutrition] = useState<string | null>(null);
  const restaurant = restaurants.find(r => r.id === item.restaurantId);
  const { addItem } = useCart();

  const nutritionMetrics = [
    { icon: <Scale size={16} />, label: 'Protein', value: `${item.nutrition.protein}g` },
    { icon: <Flame size={16} />, label: 'Carbs', value: `${item.nutrition.carbs}g` },
    { icon: <Apple size={16} />, label: 'Sugars', value: `${item.nutrition.sugars}g` },
    { icon: <Leaf size={16} />, label: 'Total Fat', value: `${item.nutrition.totalFat}g` },
    { icon: <Wheat size={16} />, label: 'Fiber', value: `${item.nutrition.fiber}g` },
    { icon: <Salt size={16} />, label: 'Sodium', value: `${item.nutrition.sodium}mg` }
  ];

  const toggleIngredient = (ingredient: string) => {
    setRemovedIngredients(current =>
      current.includes(ingredient)
        ? current.filter(i => i !== ingredient)
        : [...current, ingredient]
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(item, removedIngredients);
    setShowDetails(false);
  };

  return (
    <>
      <div 
        className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col transform transition duration-300 hover:shadow-lg border border-gray-100 cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="relative h-56">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <CalorieBadge calories={item.calories} />
          </div>
          {item.activityMatch && <ActivityMatchBadge matches={item.activityMatch} />}
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          {/* Restaurant Info */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1">
              <h4 className="text-emerald-600 font-semibold text-sm tracking-wide uppercase">{restaurant?.name}</h4>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1" />
                  <span>{restaurant?.distance}</span>
                </div>
                <div className="flex items-center ml-4">
                  <Clock size={14} className="mr-1" />
                  <span>{restaurant?.deliveryTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dish Info */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{item.description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  item.activityMatch?.includes(tag)
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-gray-50 text-gray-600'
                }`}
              >
                {tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-50 text-gray-600">
                +{item.tags.length - 3} more
              </span>
            )}
          </div>
          
          {/* Price and Action */}
          <div className="flex items-center flex-wrap gap-4 pt-4 mt-auto border-t border-gray-100">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-gray-900">{item.price}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addItem(item, removedIngredients);
              }}
              className="flex-shrink-0 px-6 py-2.5 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2 ml-auto"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 overflow-hidden" onClick={() => setShowDetails(false)}>
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
          
          <div className="fixed inset-0 overflow-y-auto overscroll-contain">
            <div className="flex min-h-full items-center justify-center p-4">
              <div 
                className="relative bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                {/* Close Button */}
                <div className="fixed top-4 right-4 z-10">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full transition-colors shadow-lg"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="max-h-[85vh] overflow-y-auto overscroll-contain scroll-smooth">
                  <div className="relative h-72">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <CalorieBadge calories={item.calories} />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-6">
                      <h4 className="text-emerald-600 font-semibold text-sm tracking-wide uppercase mb-2">
                        {restaurant?.name}
                      </h4>
                      <h2 className="text-2xl font-bold text-gray-800 mb-3">{item.name}</h2>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>

                    {/* Ingredients Customization */}
                    <div className="mb-8">
                      <h3 className="font-semibold text-gray-800 mb-4">Customize Ingredients</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {item.ingredients?.map((ingredient) => (
                          <button
                            key={ingredient}
                            onClick={() => toggleIngredient(ingredient)}
                            className={`flex items-center justify-between p-3 rounded-lg border ${
                              removedIngredients.includes(ingredient)
                                ? 'border-red-200 bg-red-50'
                                : 'border-emerald-200 bg-emerald-50'
                            }`}
                          >
                            <span className={removedIngredients.includes(ingredient) ? 'line-through text-gray-500' : ''}>
                              {ingredient}
                            </span>
                            {removedIngredients.includes(ingredient) ? (
                              <X size={16} className="text-red-500" />
                            ) : (
                              <Check size={16} className="text-emerald-500" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="font-semibold text-gray-800 mb-4">Dietary Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 text-sm font-medium rounded-full ${
                              item.activityMatch?.includes(tag)
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-gray-50 text-gray-600'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-8">
                      <h3 className="font-semibold text-gray-800 mb-4">Nutrition Information</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {nutritionMetrics.map(({ icon, label, value }) => (
                          <div key={label} className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                              {icon}
                              <span className="text-sm">{label}</span>
                            </div>
                            <div className="text-xl font-semibold text-gray-800">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Fixed Bottom Bar */}
                  <div className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 p-4 flex items-center justify-between shadow-lg">
                    <div>
                      <span className="text-3xl font-bold text-gray-900">{item.price}</span>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="px-8 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                      {removedIngredients.length > 0 && ` (${removedIngredients.length} customizations)`}
                    </button>
                    
                    {/* Detailed Nutrition Information */}
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-800">Detailed Nutrition</h3>
                        <button 
                          onClick={() => setExpandedNutrition(null)}
                          className="text-sm text-emerald-600 hover:text-emerald-700"
                        >
                          {expandedNutrition ? 'Collapse All' : 'Expand All'}
                        </button>
                      </div>
                      <div className="space-y-2">
                        {/* Calories */}
                        <div className="bg-gray-50 rounded-lg">
                          <button
                            onClick={() => setExpandedNutrition(expandedNutrition === 'calories' ? null : 'calories')}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <Flame size={18} className="text-orange-500" />
                              <span className="font-medium text-gray-700">Calories</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{item.calories}</span>
                              {expandedNutrition === 'calories' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                          </button>
                          {expandedNutrition === 'calories' && (
                            <div className="px-4 pb-3 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">From Fat</span>
                                <span>{Math.round(item.nutrition.totalFat * 9)} cal</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">From Carbs</span>
                                <span>{Math.round(item.nutrition.carbs * 4)} cal</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">From Protein</span>
                                <span>{Math.round(item.nutrition.protein * 4)} cal</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Protein */}
                        <div className="bg-gray-50 rounded-lg">
                          <button
                            onClick={() => setExpandedNutrition(expandedNutrition === 'protein' ? null : 'protein')}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <Scale size={18} className="text-emerald-500" />
                              <span className="font-medium text-gray-700">Protein</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{item.nutrition.protein}g</span>
                              {expandedNutrition === 'protein' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                          </button>
                          {expandedNutrition === 'protein' && (
                            <div className="px-4 pb-3">
                              <div className="h-2 bg-emerald-100 rounded-full overflow-hidden mb-2">
                                <div 
                                  className="h-full bg-emerald-500 rounded-full"
                                  style={{ width: `${(item.nutrition.protein / 50) * 100}%` }}
                                />
                              </div>
                              <p className="text-sm text-gray-500">
                                {Math.round((item.nutrition.protein / 50) * 100)}% of daily value
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Carbs */}
                        <div className="bg-gray-50 rounded-lg">
                          <button
                            onClick={() => setExpandedNutrition(expandedNutrition === 'carbs' ? null : 'carbs')}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <Wheat size={18} className="text-amber-500" />
                              <span className="font-medium text-gray-700">Carbohydrates</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{item.nutrition.carbs}g</span>
                              {expandedNutrition === 'carbs' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                          </button>
                          {expandedNutrition === 'carbs' && (
                            <div className="px-4 pb-3 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Dietary Fiber</span>
                                <span>{item.nutrition.fiber}g</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Sugars</span>
                                <span>{item.nutrition.sugars}g</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Net Carbs</span>
                                <span>{item.nutrition.carbs - item.nutrition.fiber}g</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Fats */}
                        <div className="bg-gray-50 rounded-lg">
                          <button
                            onClick={() => setExpandedNutrition(expandedNutrition === 'fats' ? null : 'fats')}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <Leaf size={18} className="text-yellow-500" />
                              <span className="font-medium text-gray-700">Fats</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{item.nutrition.totalFat}g</span>
                              {expandedNutrition === 'fats' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                          </button>
                          {expandedNutrition === 'fats' && (
                            <div className="px-4 pb-3 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Saturated Fat</span>
                                <span>{item.nutrition.saturatedFat}g</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Unsaturated Fat</span>
                                <span>{(item.nutrition.totalFat - item.nutrition.saturatedFat).toFixed(1)}g</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Sodium */}
                        <div className="bg-gray-50 rounded-lg">
                          <button
                            onClick={() => setExpandedNutrition(expandedNutrition === 'sodium' ? null : 'sodium')}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition-colors rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              <Salt size={18} className="text-blue-500" />
                              <span className="font-medium text-gray-700">Sodium</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{item.nutrition.sodium}mg</span>
                              {expandedNutrition === 'sodium' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                          </button>
                          {expandedNutrition === 'sodium' && (
                            <div className="px-4 pb-3">
                              <div className="h-2 bg-blue-100 rounded-full overflow-hidden mb-2">
                                <div 
                                  className="h-full bg-blue-500 rounded-full"
                                  style={{ width: `${(item.nutrition.sodium / 2300) * 100}%` }}
                                />
                              </div>
                              <p className="text-sm text-gray-500">
                                {Math.round((item.nutrition.sodium / 2300) * 100)}% of daily value
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItem;