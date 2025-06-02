import React from 'react';
import { ArrowLeft, MapPin, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const OrderPage: React.FC = () => {
  const navigate = useNavigate();
  
  const orderItems = [
    { name: 'Chicken Salad', quantity: 1, price: 12.99 },
    { name: 'Green Smoothie', quantity: 1, price: 6.99 }
  ];

  const summary = {
    subtotal: orderItems.reduce((sum, item) => sum + item.price, 0),
    deliveryFee: 2.99,
    taxes: 1.50
  };

  const total = summary.subtotal + summary.deliveryFee + summary.taxes;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center bg-white p-4 pb-2 justify-between border-b">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-800 size-12 flex items-center justify-center"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-gray-800 text-lg font-bold flex-1 text-center pr-12">
            Order
          </h2>
        </div>

        {/* Delivery Section */}
        <div className="px-4 pt-4">
          <h3 className="text-gray-800 text-lg font-bold pb-2">Delivery</h3>
          <div className="flex items-center gap-4 bg-white rounded-xl p-4">
            <div className="bg-emerald-50 text-emerald-600 size-12 flex items-center justify-center rounded-lg">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-gray-800 font-medium">Home</p>
              <p className="text-emerald-700 text-sm">Arrives in 20-30 min</p>
            </div>
          </div>
        </div>

        {/* Items Section */}
        <div className="px-4 pt-4">
          <h3 className="text-gray-800 text-lg font-bold pb-2">Items</h3>
          <div className="bg-white rounded-xl divide-y">
            {orderItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-gray-800 font-medium">{item.name}</p>
                  <p className="text-emerald-700 text-sm">{item.quantity} item</p>
                </div>
                <p className="text-gray-800">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Section */}
        <div className="px-4 pt-4">
          <h3 className="text-gray-800 text-lg font-bold pb-2">Payment</h3>
          <div className="bg-white rounded-xl p-4 flex items-center gap-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-6 w-10 rounded"></div>
            <p className="text-gray-800">Credit Card</p>
          </div>
        </div>

        {/* Discounts Section */}
        <div className="px-4 pt-4">
          <h3 className="text-gray-800 text-lg font-bold pb-2">Discounts & Rewards</h3>
          <div className="bg-white rounded-xl divide-y">
            <div className="flex items-center justify-between p-4">
              <p className="text-gray-800">Apply Promo Code</p>
              <ChevronRight size={20} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-between p-4">
              <p className="text-gray-800">Apply Rewards</p>
              <ChevronRight size={20} className="text-gray-600" />
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="px-4 pt-4">
          <h3 className="text-gray-800 text-lg font-bold pb-2">Summary</h3>
          <div className="bg-white rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <p className="text-emerald-700">Subtotal</p>
              <p className="text-gray-800">${summary.subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-emerald-700">Delivery Fee</p>
              <p className="text-gray-800">${summary.deliveryFee.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-emerald-700">Taxes</p>
              <p className="text-gray-800">${summary.taxes.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <p className="text-emerald-700">Total</p>
              <p className="text-gray-800 font-medium">${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="p-4 bg-white border-t mt-8">
        <button className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderPage;