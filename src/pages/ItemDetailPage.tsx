import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Scale, Flame, Leaf, Check } from 'lucide-react';
import { menuItems } from '../data/menuItems';
import { restaurants } from '../data/restaurants';
import { useCart, CartContextType } from '../context/CartContext';

const ItemDetailPage: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [quantity, setQuantity] = React.useState(1);
  const [removedIngredients, setRemovedIngredients] = React.useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = React.useState('');
  const [showAddedToCart, setShowAddedToCart] = React.useState(false);
  const { addItem, totalItems } = useCart() as CartContextType;
  const navigate = useNavigate();

  const item = menuItems.find(item => item.id === itemId);
  const restaurant = item ? restaurants.find(r => r.id === item.restaurantId) : null;

  const handleAddToCart = () => {
    addItem(item!, removedIngredients, quantity, specialInstructions.trim() || undefined);
    setShowAddedToCart(true);
    setTimeout(() => {
      setShowAddedToCart(false);
      navigate(-1);
    }, 1500);
  };

  const toggleIngredient = (option: string) => {
    setRemovedIngredients(current =>
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
      unit: 'g',
      details: [
        { label: 'Essential Amino Acids', value: Math.round(item.nutrition.protein * 0.4) },
        { label: 'Branch Chain Amino Acids', value: Math.round(item.nutrition.protein * 0.2) },
        { label: 'Other Proteins', value: Math.round(item.nutrition.protein * 0.4) }
      ]
    },
    { 
      icon: <Flame className="text-orange-600\" size={24} />, 
      label: 'Carbs', 
      value: item.nutrition.carbs,
      unit: 'g',
      details: [
        { label: 'Dietary Fiber', value: item.nutrition.fiber },
        { label: 'Sugars', value: item.nutrition.sugars },
        { label: 'Net Carbs', value: item.nutrition.carbs - item.nutrition.fiber }
      ]
    },
    { 
      icon: <Leaf className="text-yellow-600\" size={24} />, 
      label: 'Fat', 
      value: item.nutrition.totalFat,
      unit: 'g',
      details: [
        { label: 'Saturated Fat', value: item.nutrition.saturatedFat },
        { label: 'Unsaturated Fat', value: item.nutrition.totalFat - item.nutrition.saturatedFat },
        { label: 'Trans Fat', value: 0 }
      ]
    }
  ];

  return (
    <div className="relative flex min-h-screen flex-col bg-[#f9fbfa] justify-between">
      {/* Custom Header */}
      <div>
        <div className="flex items-center bg-[#f9fbfa] p-4 pb-2 justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-[#101913] flex size-12 shrink-0 items-center"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        {/* Hero Image */}
        <div className="@container">
          <div className="@[480px]:px-4 @[480px]:py-3">
            <div
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-[#f9fbfa] @[480px]:rounded-xl min-h-[218px]"
              style={{ backgroundImage: `url(${item.image})` }}
            />
          </div>
        </div>

        <h1 className="text-[#101913] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-3 pt-5">
          {item.name}
        </h1>
        <p className="text-[#101913] text-base font-normal leading-normal pb-3 pt-1 px-4">
          {item.description}
        </p>

        <h3 className="text-[#101913] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Customize
        </h3>

        {/* Ingredients Selection */}
        {item.ingredients?.map((ingredient) => (
          <div key={ingredient} className="flex items-center gap-4 bg-[#f9fbfa] px-4 min-h-[72px] py-2 justify-between">
            <div className="flex flex-col justify-center">
              <p className="text-[#101913] text-base font-medium line-clamp-1">{ingredient}</p>
              <p className="text-[#5b8b6c] text-sm font-normal line-clamp-2">
                {removedIngredients.includes(ingredient) ? 'Removed' : 'Included'}
              </p>
            </div>
            <button
              onClick={() => toggleIngredient(ingredient)}
              className={`shrink-0 ${
                removedIngredients.includes(ingredient)
                  ? 'text-red-600'
                  : 'text-[#101913]'
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                removedIngredients.includes(ingredient)
                  ? 'border-red-600'
                  : 'border-[#101913]'
              }`}>
                {removedIngredients.includes(ingredient) && (
                  <Check size={14} />
                )}
              </div>
            </button>
          </div>
        ))}

        {/* Special Instructions */}
        <div className="px-4 py-4">
          <h3 className="text-[#101913] text-lg font-bold leading-tight tracking-[-0.015em] mb-2">
            Special Instructions
          </h3>
          <textarea
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            placeholder="Add any special requests or notes..."
            className="w-full h-32 px-4 py-3 rounded-xl border border-[#d4e3d9] focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none bg-white text-[#101913]"
          />
        </div>

        <h3 className="text-[#101913] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Nutritional Information
        </h3>
        <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
          <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#d4e3d9] py-5">
            <p className="text-[#5b8b6c] text-sm font-normal leading-normal">Calories</p>
            <p className="text-[#101913] text-sm font-normal leading-normal">{item.calories}</p>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#d4e3d9] py-5">
            <p className="text-[#5b8b6c] text-sm font-normal leading-normal">Protein</p>
            <p className="text-[#101913] text-sm font-normal leading-normal">{item.nutrition.protein}g</p>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#d4e3d9] py-5">
            <p className="text-[#5b8b6c] text-sm font-normal leading-normal">Carbs</p>
            <p className="text-[#101913] text-sm font-normal leading-normal">{item.nutrition.carbs}g</p>
          </div>
          <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#d4e3d9] py-5">
            <p className="text-[#5b8b6c] text-sm font-normal leading-normal">Fat</p>
            <p className="text-[#101913] text-sm font-normal leading-normal">{item.nutrition.totalFat}g</p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div>
        <div className="flex px-4 py-3">
          {showAddedToCart ? (
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#2c8b4f] text-[#f9fbfa] text-base font-bold">
              <Check size={20} className="mr-2" />
              Added to Cart!
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#2c8b4f] text-[#f9fbfa] text-base font-bold"
            >
              <span className="truncate">Add to Cart • ${totalPrice.toFixed(2)}</span>
            </button>
          )}
        </div>
        <div className="h-5 bg-[#f9fbfa]"></div>
      </div>
    </div>
  );
};

export default ItemDetailPage;