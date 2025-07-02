import React, { useState } from 'react';
import { ArrowLeft, Package, MapPin, Clock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DoorDashOrderButton from '../components/DoorDashOrderButton';
import Header from '../components/Header';

const TestOrderPage: React.FC = () => {
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const testRestaurant = {
    name: "Healthy Eats Cafe",
    address: "123 Main St, Brandon, FL 33511",
    phone: "+1234567890"
  };

  const testOrder = {
    items: [
      { name: "Mediterranean Quinoa Bowl", price: 12.99, quantity: 1 },
      { name: "Green Smoothie", price: 6.99, quantity: 1 }
    ],
    subtotal: 19.98,
    deliveryFee: 2.99,
    total: 22.97
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

          {/* Order Items */}
          <div className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Your Test Order</h3>
            <div className="space-y-3 mb-6">
              {testOrder.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <span className="font-medium text-gray-800">{item.name}</span>
                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                  </div>
                  <span className="font-medium text-gray-800">${item.price}</span>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${testOrder.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>${testOrder.deliveryFee}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-800 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${testOrder.total}</span>
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

            {/* Alternative Actions */}
            <div className="mt-4 space-y-3">
              <button
                onClick={() => navigate('/order')}
                className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Go to Real Order Page
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-medium text-yellow-800 mb-2">🧪 Test Mode Instructions</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• This is a test order using DoorDash sandbox environment</li>
            <li>• No real delivery will be created</li>
            <li>• Perfect for testing the integration</li>
            <li>• Check browser console for detailed logs</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestOrderPage;