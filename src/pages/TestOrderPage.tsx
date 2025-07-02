import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, MapPin, Clock, User, ShoppingCart, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DoorDashOrderButton from '../components/DoorDashOrderButton';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { menuItems } from '../data/menuItems';

const TestOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, addItem, clearCart, subtotal, totalItems } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);

  const testRestaurant = {
    name: "Healthy Eats Cafe",
    address: "123 Main St, Brandon, FL 33511",
    phone: "+1234567890"
  };

  // Sample items to load into cart
  const sampleItems = [
    menuItems.find(item => item.name.includes('Mediterranean Quinoa')) || menuItems[0],
    menuItems.find(item => item.name.includes('Green') || item.name.includes('Smoothie')) || menuItems[1]
  ];

  const loadSampleItems = () => {
    // Clear existing cart first
    clearCart();
    
    // Add sample items to cart
    sampleItems.forEach(item => {
      if (item) {
        addItem(item, [], 1); // item, removedIngredients, quantity
      }
    });
  };

  // Auto-load sample items on page load for fast testing
  useEffect(() => {
    if (totalItems === 0) {
      loadSampleItems();
    }
  }, []);

  const testDoorDashConnection = async () => {
    setTestResults(['🧪 Testing DoorDash connection...']);
    
    try {
      // Test the edge function directly
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/createDelivery`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'getDeliveryQuote',
          storeId: 'test_store_123',
          pickupAddress: testRestaurant.address,
          dropoffAddress: '456 Customer Ave, Brandon, FL 33511'
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setTestResults(prev => [...prev, '✅ DoorDash connection successful!', `📦 Quote ID: ${data.external_delivery_id}`]);
      } else {
        setTestResults(prev => [...prev, `❌ DoorDash error: ${data.error}`]);
      }
    } catch (error) {
      setTestResults(prev => [...prev, `❌ Connection failed: ${error.message}`]);
    }
  };
  const calculateTotal = () => {
    const deliveryFee = 2.99;
    const tax = subtotal * 0.08; // 8% tax
    return subtotal + deliveryFee + tax;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={false} />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Test DoorDash Order</h1>
        </div>

        {/* Load Sample Order Button */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-blue-800">🧪 Test Cart</h3>
              <p className="text-sm text-blue-600">
                {totalItems > 0 
                  ? `${totalItems} items in cart • $${subtotal.toFixed(2)}`
                  : 'Cart is empty'
                }
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={testDoorDashConnection}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                🧪 Test DoorDash
              </button>
              <button
                onClick={loadSampleItems}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Load Sample Order
              </button>
            </div>
          </div>
          
          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="mt-4 p-3 bg-white rounded-lg border">
              <h4 className="font-medium text-gray-800 mb-2">Test Results:</h4>
              <div className="space-y-1">
                {testResults.map((result, index) => (
                  <div key={index} className="text-sm font-mono text-gray-700">
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Test Order Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          {/* Restaurant Info */}
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center">
                <Package className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{testRestaurant.name}</h2>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <MapPin size={16} />
                  <span className="text-sm">{testRestaurant.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Your Cart</h3>
              <div className="flex items-center gap-2 text-emerald-600">
                <ShoppingCart size={16} />
                <span className="text-sm font-medium">{totalItems} items</span>
              </div>
            </div>

            {items.length > 0 ? (
              <>
                <div className="space-y-3 mb-6">
                  {items.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex justify-between items-center py-3 border-b border-gray-100">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <span className="font-medium text-gray-800 block">{item.name}</span>
                            <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                            {item.removedIngredients.length > 0 && (
                              <div className="text-xs text-red-500 mt-1">
                                Removed: {item.removedIngredients.join(', ')}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="font-medium text-gray-800">{item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Fee</span>
                      <span>$2.99</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (8%)</span>
                      <span>${(subtotal * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-gray-800 pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <User className="text-blue-600" size={20} />
                    <span className="font-medium text-blue-800">Delivery Details</span>
                  </div>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>456 Customer Ave, Brandon, FL 33511</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>Estimated delivery: 25-35 minutes</span>
                    </div>
                  </div>
                </div>

                {/* DoorDash Order Button */}
                <DoorDashOrderButton
                  restaurantName={testRestaurant.name}
                  restaurantAddress={testRestaurant.address}
                  restaurantPhone={testRestaurant.phone}
                  className="w-full"
                />
              </>
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Cart is Empty</h3>
                <p className="text-gray-500 mb-4">Click "Load Sample Order" above to add test items</p>
                <button
                  onClick={loadSampleItems}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Load Sample Items
                </button>
              </div>
            )}

            {/* Alternative Actions */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() => navigate('/order')}
                className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Go to Real Order Page
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate('/')}
                  className="py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Back to Home
                </button>
                
                <button
                  onClick={clearCart}
                  className="py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-yellow-800 mb-2">🧪 Test Mode Instructions</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Click "Test DoorDash" to verify your environment variables are working</li>
            <li>• This page uses real cart state from the global context</li>
            <li>• Sample items are auto-loaded for fast testing</li>
            <li>• DoorDash orders use sandbox environment (no real delivery)</li>
            <li>• Check browser console for detailed API logs</li>
            <li>• Cart state persists across page navigation</li>
          </ul>
        </div>
        
        {/* Environment Status */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-medium text-green-800 mb-2">✅ Environment Status</h3>
          <div className="text-sm text-green-700 space-y-1">
            <div>Supabase URL: {import.meta.env.VITE_SUPABASE_URL ? '✅ Configured' : '❌ Missing'}</div>
            <div>Supabase Anon Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Configured' : '❌ Missing'}</div>
            <div>DoorDash Environment: sandbox (configured in Supabase)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestOrderPage;