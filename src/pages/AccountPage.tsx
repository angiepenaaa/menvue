import React from 'react';
import { User, Settings, CreditCard, History, Bell, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const AccountPage: React.FC = () => {
  const user = {
    name: 'Angie Pena',
    email: 'sarah.j@example.com',
    joinDate: 'March 2024',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg'
  };

  const menuItems = [
    { icon: <Settings size={20} />, label: 'Account Settings', href: '/account/settings' },
    { icon: <CreditCard size={20} />, label: 'Payment Methods', href: '#' },
    { icon: <History size={20} />, label: 'Order History', href: '#' },
    { icon: <Bell size={20} />, label: 'Notifications', href: '#' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-emerald-50">
              <img
                src={user.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-gray-500">
                Member since {user.joinDate}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-emerald-600 font-semibold">Total Orders</div>
            <div className="text-3xl font-bold mt-2">24</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-emerald-600 font-semibold">Calories Saved</div>
            <div className="text-3xl font-bold mt-2">4,800</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-emerald-600 font-semibold">Favorite Restaurant</div>
            <div className="text-3xl font-bold mt-2">First Watch</div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                {item.icon}
              </div>
              <div className="font-medium text-gray-800">{item.label}</div>
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-8 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 text-red-600 hover:text-red-700 font-medium transition-colors">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;