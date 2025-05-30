import React, { useState } from 'react';
import type { MenuItem as MenuItemType } from '../types';
import CalorieBadge from './CalorieBadge';
import ActivityMatchBadge from './ActivityMatchBadge';
import { restaurants } from '../data/restaurants';
import { MapPin, Clock, ChevronDown, ChevronUp, ShoppingCart, X, Leaf, Scale, Flame, Apple, Wheat, Salad as Salt, Check, Star, ThumbsUp } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [isNutritionOpen, setIsNutritionOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
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
        <div className="fixed inset-0 z-50" onClick={() => setShowDetails(false)}>
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
          
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div 
                className="relative bg-white w-full max-w-2xl rounded-2xl shadow-xl"
                onClick={e => e.stopPropagation()}
              >
                {/* Close Button */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="max-h-[85vh] overflow-y-auto">
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

                    {/* Ratings & Reviews */}
                    {item.rating && (
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-800">Ratings & Reviews</h3>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, index) => (
                                <Star
                                  key={index}
                                  size={18}
                                  className={`${
                                    index < Math.floor(item.rating!.score)
                                      ? 'text-yellow-400 fill-current'
                                      : index < item.rating!.score
                                      ? 'text-yellow-400 fill-[50%]'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-medium text-gray-700">{item.rating.score.toFixed(1)}</span>
                            <span className="text-gray-500">({item.rating.count} reviews)</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {item.rating.reviews.map((review) => (
                            <div key={review.id} className="bg-gray-50 rounded-xl p-4">
                              <div className="flex items-center gap-3 mb-2">
                                {review.userImage ? (
                                  <img
                                    src={review.userImage}
                                    alt={review.username}
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <span className="text-emerald-600 font-medium">
                                      {review.username[0].toUpperCase()}
                                    </span>
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium text-gray-800">{review.username}</p>
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <div className="flex">
                                      {[...Array(5)].map((_, index) => (
                                        <Star
                                          key={index}
                                          size={12}
                                          className={index < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                                        />
                                      ))}
                                    </div>
                                    <span>•</span>
                                    <span>{review.date}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-600">{review.comment}</p>
                              <button className="flex items-center gap-1 text-sm text-gray-500 mt-2 hover:text-emerald-600">
                                <ThumbsUp size={14} />
                                <span>Helpful ({review.helpful})</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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
                  <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex items-center justify-between">
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