import React from 'react';
import { 
  User, 
  Settings, 
  UtensilsCrossed,
  CreditCard, 
  History, 
  Bell, 
  LogOut, 
  Calendar, 
  Gift, 
  Clock, 
  Award,
  Timer,
  Sparkles,
  Zap,
  ChevronRight,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Scale,
  Flame,
  Apple,
  Leaf
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RewardsCard from '../components/RewardsCard';

const AccountPage: React.FC = () => {
  const [expandedStat, setExpandedStat] = React.useState<string | null>(null);

  const user = {
    name: 'Angie Pena',
    email: 'sarah.j@example.com',
    joinDate: 'March 2024', 
    avatar: '/IMG_2423_Facetune_11-11-2021-18-44-36.jpeg'
  };

  const menuItems = [
    { icon: <Calendar size={20} />, label: 'Manage Meal Plans', href: '/meal-plan' },
    { icon: <UtensilsCrossed size={20} />, label: 'Nutrition Preferences', href: '/account/nutrition' },
    { icon: <Gift size={20} />, label: 'Rewards & Perks', href: '#' },
    { icon: <History size={20} />, label: 'Order History', href: '#' }
  ];

  const bottomControls = [
    { icon: <Settings size={20} />, label: 'Account Settings', href: '/account/settings' },
    { icon: <CreditCard size={20} />, label: 'Payment Methods', href: '#' },
    { icon: <Bell size={20} />, label: 'Notifications', href: '#' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={false} />
      
      <div className="container mx-auto px-4 max-w-4xl py-8">
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

        {/* Rewards Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Gift className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Rewards & Perks</h2>
                <p className="text-gray-500 text-sm">Earn points with every healthy choice</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium">
              <Sparkles size={16} />
              Redeem Points
            </button>
          </div>
          <RewardsCard points={2450} tier="Gold" nextTierProgress={75} />
        </div>

        {/* Stats Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Clock className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-medium text-gray-800">Your Progress</h3>
              </div>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                View Details
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-6 border border-emerald-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Clock className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Meals</p>
                    <p className="text-2xl font-bold text-gray-800">156</p>
                  </div>
                </div>
                <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-3/4 transition-all duration-500" />
                </div>
                <p className="mt-3 text-sm text-emerald-600">75% towards next tier</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-6 border border-yellow-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Award className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Healthy Streak</p>
                    <p className="text-2xl font-bold text-gray-800">14 days</p>
                  </div>
                </div>
                <div className="h-2 bg-yellow-100 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full w-1/2 transition-all duration-500" />
                </div>
                <p className="mt-3 text-sm text-yellow-600">Personal best: 21 days</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Timer className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Calories Saved</p>
                    <p className="text-2xl font-bold text-gray-800">4,800</p>
                  </div>
                </div>
                <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full w-4/5 transition-all duration-500" />
                </div>
                <p className="mt-3 text-sm text-purple-600">80% to weekly goal</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <button 
                  onClick={() => setExpandedStat(expandedStat === 'calories' ? null : 'calories')}
                  className="w-full flex flex-col items-center"
                >
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Flame size={16} />
                    <span>Avg. Calories</span>
                    {expandedStat === 'calories' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  <div className="text-xl font-bold text-gray-800">425</div>
                  <div className="text-xs text-emerald-600 mt-1">-15% vs last week</div>
                </button>
                {expandedStat === 'calories' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Breakfast</span>
                        <span className="font-medium">280 cal</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Lunch</span>
                        <span className="font-medium">450 cal</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Dinner</span>
                        <span className="font-medium">545 cal</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <button 
                  onClick={() => setExpandedStat(expandedStat === 'protein' ? null : 'protein')}
                  className="w-full flex flex-col items-center"
                >
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Scale size={16} />
                    <span>Protein/day</span>
                    {expandedStat === 'protein' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  <div className="text-xl font-bold text-gray-800">65g</div>
                  <div className="text-xs text-emerald-600 mt-1">+8% vs goal</div>
                </button>
                {expandedStat === 'protein' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Animal</span>
                        <span className="font-medium">45g</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Plant-based</span>
                        <span className="font-medium">20g</span>
                      </div>
                      <div className="flex justify-between text-sm text-emerald-600">
                        <span>Daily Goal</span>
                        <span>60g</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <button 
                  onClick={() => setExpandedStat(expandedStat === 'meals' ? null : 'meals')}
                  className="w-full flex flex-col items-center"
                >
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Apple size={16} />
                    <span>Clean Meals</span>
                    {expandedStat === 'meals' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  <div className="text-xl font-bold text-gray-800">89%</div>
                  <div className="text-xs text-emerald-600 mt-1">Top 5% of users</div>
                </button>
                {expandedStat === 'meals' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Last 7 days</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Last 30 days</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">All time</span>
                        <span className="font-medium">85%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <button 
                  onClick={() => setExpandedStat(expandedStat === 'points' ? null : 'points')}
                  className="w-full flex flex-col items-center"
                >
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Leaf size={16} />
                    <span>Points/meal</span>
                    {expandedStat === 'points' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                  <div className="text-xl font-bold text-gray-800">125</div>
                  <div className="text-xs text-emerald-600 mt-1">2x multiplier</div>
                </button>
                {expandedStat === 'points' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Base Points</span>
                        <span className="font-medium">50</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Streak Bonus</span>
                        <span className="font-medium">25</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Gold Multiplier</span>
                        <span className="font-medium">50</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                Last updated: Today at 2:45 PM
              </div>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                <RefreshCw size={16} />
                Refresh Stats
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Zap size={18} className="text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Earned 150 Points</p>
                  <p className="text-sm text-gray-500">Ordered from First Watch</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2h ago</span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Award size={18} className="text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Achieved Gold Status</p>
                  <p className="text-sm text-gray-500">Unlocked new perks</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">1d ago</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Powered by MenVue Health Analytics
        </div>
      </div>
    </div>
  );
};

export default AccountPage;