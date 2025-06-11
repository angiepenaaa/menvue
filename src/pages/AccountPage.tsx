import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  UtensilsCrossed,
  CreditCard, 
  History, 
  Bell, 
  LogOut, 
  Calendar, 
  Clock, 
  ChevronRight,
  Flame,
  CheckCircle,
  CalendarDays,
  Trophy,
  DollarSign,
  TrendingUp,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const AccountPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'alltime'>('week');

  const user = {
    name: 'Angie Pena',
    email: 'angie.pena@example.com',
    joinDate: 'March 2024', 
    avatar: '/IMG_2423_Facetune_11-11-2021-18-44-36.jpeg'
  };

  // Mock data - in real app this would come from your database
  const weekStats = {
    healthyStreak: 14,
    cleanMealPercentage: 89,
    mealsPlannedThisWeek: 12,
    mostOrderedMeal: {
      name: 'Mediterranean Quinoa Bowl',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      restaurant: 'Sweetgreen'
    },
    moneySpent: 127.50,
    caloriesSaved: 2300,
    personalBest: 21
  };

  const allTimeStats = {
    healthyStreak: 14,
    cleanMealPercentage: 85,
    mealsPlannedThisWeek: 156, // Total meals planned
    mostOrderedMeal: {
      name: 'Chicken Burrito Bowl',
      image: 'https://images.pexels.com/photos/5737247/pexels-photo-5737247.jpeg',
      restaurant: 'Chipotle'
    },
    moneySpent: 1847.25,
    caloriesSaved: 18400,
    personalBest: 21
  };

  const currentStats = timeframe === 'week' ? weekStats : allTimeStats;

  const menuItems = [
    { icon: <Calendar size={20} />, label: 'Manage Meal Plans', href: '/meal-plan' },
    { icon: <UtensilsCrossed size={20} />, label: 'Nutrition Preferences', href: '/account/nutrition' },
    { icon: <History size={20} />, label: 'Order History', href: '#' }
  ];

  const bottomControls = [
    { icon: <Settings size={20} />, label: 'Account Settings', href: '/account/settings' },
    { icon: <CreditCard size={20} />, label: 'Payment Methods', href: '#' },
    { icon: <Bell size={20} />, label: 'Notifications', href: '#' }
  ];

  const getEncouragementMessage = () => {
    const { healthyStreak, personalBest, mealsPlannedThisWeek } = currentStats;
    const daysToPersonalBest = personalBest - healthyStreak;
    
    if (daysToPersonalBest > 0 && daysToPersonalBest <= 7) {
      return `🔥 You're ${daysToPersonalBest} days away from beating your personal best streak!`;
    } else if (timeframe === 'week' && mealsPlannedThisWeek < 14) {
      const remaining = 14 - mealsPlannedThisWeek;
      return `📅 Only ${remaining} more meals to complete your weekly plan!`;
    } else if (timeframe === 'week') {
      return `💪 You've saved ${currentStats.caloriesSaved.toLocaleString()} calories this week by choosing cleaner meals.`;
    } else {
      return `🌟 Amazing! You've maintained an ${currentStats.cleanMealPercentage}% clean eating rate overall.`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={false} />
      
      <div className="container mx-auto px-4 max-w-4xl py-8">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-emerald-50">
              <img
                src={user.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-1">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-gray-600">
                Member since {user.joinDate}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() => setTimeframe('week')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    timeframe === 'week'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  This Week
                </button>
                <button
                  onClick={() => setTimeframe('alltime')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    timeframe === 'alltime'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All Time
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Snapshot */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Your Progress</h2>
            <div className="text-sm text-gray-500 capitalize">{timeframe === 'week' ? 'This Week' : 'All Time'}</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 transition-all duration-300">
            {/* Healthy Streak */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Flame className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-orange-600 font-medium">🔥 Healthy Streak</p>
                  <p className="text-3xl font-bold text-orange-700">{currentStats.healthyStreak}</p>
                </div>
              </div>
              <p className="text-sm text-orange-600">consecutive days</p>
            </div>

            {/* Clean Meal Percentage */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-emerald-600 font-medium">✅ Clean Meals</p>
                  <p className="text-3xl font-bold text-emerald-700">{currentStats.cleanMealPercentage}%</p>
                </div>
              </div>
              <div className="w-full bg-emerald-100 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${currentStats.cleanMealPercentage}%` }}
                />
              </div>
            </div>

            {/* Meals Planned */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CalendarDays className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-medium">
                    📅 {timeframe === 'week' ? 'Meals This Week' : 'Total Meals'}
                  </p>
                  <p className="text-3xl font-bold text-blue-700">{currentStats.mealsPlannedThisWeek}</p>
                </div>
              </div>
              <p className="text-sm text-blue-600">
                {timeframe === 'week' ? 'planned meals' : 'meals planned'}
              </p>
            </div>
          </div>

          {/* Most Ordered Meal & Money Spent */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Most Ordered Meal */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-purple-600 font-medium">🥇 {timeframe === 'week' ? 'Top Pick This Week' : 'Most Ordered'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <img
                    src={currentStats.mostOrderedMeal.image}
                    alt={currentStats.mostOrderedMeal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-purple-700">{currentStats.mostOrderedMeal.name}</p>
                  <p className="text-sm text-purple-600">{currentStats.mostOrderedMeal.restaurant}</p>
                </div>
              </div>
            </div>

            {/* Money Spent */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-green-600 font-medium">
                    💵 {timeframe === 'week' ? 'Spent This Week' : 'Total Spent'}
                  </p>
                  <p className="text-3xl font-bold text-green-700">${currentStats.moneySpent.toFixed(2)}</p>
                </div>
              </div>
              <p className="text-sm text-green-600">on healthy meals</p>
            </div>
          </div>
        </div>

        {/* Encouragement & Reminders */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 mb-8 border border-emerald-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Keep It Up!</h3>
          </div>
          <p className="text-gray-700 text-xl">{getEncouragementMessage()}</p>
        </div>

        {/* Clean Eating Level Badge (Optional Future Use) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Clean Eating Level 1</h3>
                <p className="text-gray-600">You're building great healthy habits!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="w-20 h-20 relative">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeDasharray={`${currentStats.cleanMealPercentage}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-emerald-600">{currentStats.cleanMealPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all hover:bg-gray-50"
            >
              <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                {item.icon}
              </div>
              <div className="font-medium text-gray-800">{item.label}</div>
            </Link>
          ))}
        </div>

        {/* Bottom Controls */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bottomControls.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all hover:bg-gray-50"
              >
                <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
                  {item.icon}
                </div>
                <div className="font-medium text-gray-800">{item.label}</div>
              </Link>
            ))}
          </div>
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