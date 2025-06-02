import React from 'react';
import { ArrowLeft, Check, Circle, Mouse as House, Glasses as MagnifyingGlass, Receipt, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const OrderStatusPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50 justify-between">
      <div>
        <div className="flex items-center bg-gray-50 p-4 pb-2 justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-gray-800 size-12 flex items-center justify-center"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-gray-800 text-lg font-bold flex-1 text-center pr-12">
            Order
          </h2>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 px-4 min-h-[72px] py-2">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14">
            <img 
              src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
              alt="Restaurant"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-gray-800 text-base font-medium">Healthy Eats</p>
            <p className="text-emerald-700 text-sm">Arriving in 20-30 min</p>
          </div>
        </div>

        <h2 className="text-gray-800 text-[22px] font-bold px-4 pb-3 pt-5">
          Order Status
        </h2>

        <div className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
          {/* Order Placed */}
          <div className="flex flex-col items-center gap-1 pt-3">
            <div className="text-gray-800">
              <Check size={24} />
            </div>
            <div className="w-[1.5px] bg-emerald-200 h-2 grow"></div>
          </div>
          <div className="flex flex-1 flex-col py-3">
            <p className="text-gray-800 text-base font-medium">Order placed</p>
            <p className="text-emerald-700 text-base">10:00 AM</p>
          </div>

          {/* Preparing */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-[1.5px] bg-emerald-200 h-2"></div>
            <div className="text-gray-800">
              <Check size={24} />
            </div>
            <div className="w-[1.5px] bg-emerald-200 h-2 grow"></div>
          </div>
          <div className="flex flex-1 flex-col py-3">
            <p className="text-gray-800 text-base font-medium">Preparing</p>
            <p className="text-emerald-700 text-base">10:15 AM</p>
          </div>

          {/* Out for delivery */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-[1.5px] bg-emerald-200 h-2"></div>
            <div className="text-gray-800">
              <Check size={24} />
            </div>
            <div className="w-[1.5px] bg-emerald-200 h-2 grow"></div>
          </div>
          <div className="flex flex-1 flex-col py-3">
            <p className="text-gray-800 text-base font-medium">Out for delivery</p>
            <p className="text-emerald-700 text-base">10:30 AM</p>
          </div>

          {/* Delivered */}
          <div className="flex flex-col items-center gap-1 pb-3">
            <div className="w-[1.5px] bg-emerald-200 h-2"></div>
            <div className="text-gray-800">
              <Circle size={24} />
            </div>
          </div>
          <div className="flex flex-1 flex-col py-3">
            <p className="text-gray-800 text-base font-medium">Delivered</p>
            <p className="text-emerald-700 text-base">10:45 AM</p>
          </div>
        </div>

        <div className="flex px-4 py-3">
          <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl">
            <img
              src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg"
              alt="Map"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div>
        <div className="flex gap-2 border-t border-emerald-100 bg-gray-50 px-4 pb-3 pt-2">
          <Link
            to="/"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-emerald-700"
          >
            <House className="h-8" />
            <p className="text-xs font-medium tracking-[0.015em]">Home</p>
          </Link>
          <Link
            to="/browse"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-emerald-700"
          >
            <MagnifyingGlass className="h-8" />
            <p className="text-xs font-medium tracking-[0.015em]">Browse</p>
          </Link>
          <Link
            to="/orders"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-gray-800"
          >
            <Receipt className="h-8" />
            <p className="text-xs font-medium tracking-[0.015em]">Orders</p>
          </Link>
          <Link
            to="/account"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-emerald-700"
          >
            <User className="h-8" />
            <p className="text-xs font-medium tracking-[0.015em]">Account</p>
          </Link>
        </div>
        <div className="h-5 bg-gray-50"></div>
      </div>
    </div>
  );
};

export default OrderStatusPage;