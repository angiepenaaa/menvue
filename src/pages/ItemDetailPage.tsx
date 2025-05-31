import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Scale, Flame, Leaf, Minus, Plus, Check } from 'lucide-react';
import { menuItems } from '../data/menuItems';
import { restaurants } from '../data/restaurants';
import { useCart } from '../context/CartContext';
import CalorieBadge from '../components/CalorieBadge';

const ItemDetailPage: React.FC = () => {
  const [quantity, setQuantity] = React.useState(1);
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  const [showAddedToCart, setShowAddedToCart] = React.useState(false);
  const navigate = useNavigate();
  const { itemId } = useParams();
  const { addItem } = useCart();

  const item = menuItems.find(item => item.id === itemId);
  const restaurant = item ? restaurants.find(r => r.id === item.restaurantId) : null;

  const handleAddToCart = () => {
    addItem(item!, [], quantity);
    setShowAddedToCart(true);
    setTimeout(() => {
      setShowAddedToCart(false);
      navigate(-1);
    }, 1500);
  };

  const toggleOption = (option: string) => {
    setSelectedOptions(current =>
      current.includes(option)
        ? current.filter(o => o !== option)
        : [...current, option]
    );
  };

  const totalPrice = parseFloat(item?.price.replace('$', '') || '0') * quantity;

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
      icon: <Flame className="text-orange-600\" size={24} />, 
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
          <div className="mb-6">
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

          {/* Customization Options */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Customize Your Order</h3>
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {item.ingredients?.map((ingredient) => (
                <button
                  key={ingredient}
                  onClick={() => toggleOption(ingredient)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-700">{ingredient}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedOptions.includes(ingredient)
                      ? 'bg-emerald-600 border-emerald-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedOptions.includes(ingredient) && (
                      <Check size={12} className="text-white" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quantity</h3>
            <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-4">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                disabled={quantity === 1}
              >
                <Minus size={20} className={quantity === 1 ? 'text-gray-300' : 'text-gray-600'} />
              </button>
              <span className="text-xl font-semibold text-gray-900 w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Plus size={20} className="text-gray-600" />
              </button>
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
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg ${
        showAddedToCart ? 'bg-emerald-600' : ''
      }`}>
        <div className="container mx-auto max-w-2xl flex items-center justify-between">
          {showAddedToCart ? (
            <div className="w-full flex items-center justify-center">
              <span className="text-white font-medium flex items-center gap-2">
                <Check size={20} />
                Added to Cart!
              </span>
            </div>
          ) : (
            <>
              <div>
                <span className="text-3xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleAddToCart}
                className="px-8 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;