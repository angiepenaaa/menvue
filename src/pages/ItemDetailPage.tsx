import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Scale, Flame, Leaf } from 'lucide-react';
import { menuItems } from '../data/menuItems';
import { restaurants } from '../data/restaurants';
import { useCart } from '../context/CartContext';
import CalorieBadge from '../components/CalorieBadge';

const ItemDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const { addItem } = useCart();

  const item = menuItems.find(item => item.id === itemId);
  const restaurant = item ? restaurants.find(r => r.id === item.restaurantId) : null;

  if (!item || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Item not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const nutritionMetrics = [
    { 
      icon: <Scale className="text-emerald-600" size={24} />, 
      label: 'Protein', 
      value: item.nutrition.protein,
      unit: 'g'
    },
    { 
      icon: <Flame className="text-orange-600" size={24} />, 
      label: 'Carbs', 
      value: item.nutrition.carbs,
      unit: 'g'
    },
    { 
      icon: <Leaf className="text-yellow-600" size={24} />, 
      label: 'Fat', 
      value: item.nutrition.totalFat,
      unit: 'g'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Custom Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800 flex-1 text-center">
              {item.name}
            </h1>
            <div className="w-10" /> {/* Spacer for balance */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-32">
        {/* Hero Image */}
        <div className="relative h-64 md:h-96 -mx-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <CalorieBadge calories={item.calories} />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto mt-8">
          {/* Restaurant & Item Info */}
          <div className="mb-8">
            <h2 className="text-emerald-600 text-sm font-medium tracking-wide uppercase mb-2">
              {restaurant.name}
            </h2>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.name}</h1>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </div>

          {/* Nutrition Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Nutrition</h3>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid grid-cols-3 gap-6">
                {nutritionMetrics.map(({ icon, label, value, unit }) => (
                  <div 
                    key={label} 
                    className="bg-white rounded-lg p-4 flex flex-col items-center shadow-sm"
                  >
                    <div className="mb-2">{icon}</div>
                    <span className="text-2xl font-bold text-gray-900">{value}{unit}</span>
                    <span className="text-sm text-gray-500 mt-1">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Dietary Tags</h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg">
        <div className="container mx-auto max-w-2xl flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-gray-900">{item.price}</span>
          </div>
          <button
            onClick={() => {
              addItem(item, []);
              navigate(-1);
            }}
            className="px-8 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;