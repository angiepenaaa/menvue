import React from 'react';
import { Gift, Star, Award, Sparkles, ChevronRight, Utensils, Clock, Zap } from 'lucide-react';

interface RewardsCardProps {
  points: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  nextTierProgress: number;
}

const RewardsCard: React.FC<RewardsCardProps> = ({ points, tier, nextTierProgress }) => {
  const tiers = {
    Bronze: { color: 'bg-amber-700', textColor: 'text-amber-700', icon: Star },
    Silver: { color: 'bg-gray-400', textColor: 'text-gray-400', icon: Star },
    Gold: { color: 'bg-yellow-500', textColor: 'text-yellow-500', icon: Award },
    Platinum: { color: 'bg-emerald-600', textColor: 'text-emerald-600', icon: Sparkles }
  };

  const currentTier = tiers[tier];
  const TierIcon = currentTier.icon;

  const perks = [
    { icon: Utensils, label: 'Priority Restaurant Access', isActive: true },
    { icon: Clock, label: 'Early Access to New Features', isActive: true },
    { icon: Zap, label: 'Exclusive Daily Rewards', isActive: tier !== 'Bronze' },
    { icon: Gift, label: 'Birthday Rewards', isActive: tier !== 'Bronze' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Tier Banner */}
      <div className={`${currentTier.color} px-6 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <TierIcon className="text-white" size={24} />
          <div>
            <h3 className="text-white font-semibold">{tier} Member</h3>
            <p className="text-white/80 text-sm">{points.toLocaleString()} Points</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm hover:bg-white/30 transition-colors">
          View Benefits
        </button>
      </div>

      {/* Progress to Next Tier */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Progress to Next Tier</span>
          <span className="text-sm font-medium">{nextTierProgress}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${nextTierProgress}%` }}
          />
        </div>
      </div>

      {/* Active Perks */}
      <div className="p-6">
        <h4 className="text-sm font-medium text-gray-800 mb-4">Your Active Perks</h4>
        <div className="space-y-4">
          {perks.map((perk, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between ${
                perk.isActive ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  perk.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-400'
                }`}>
                  <perk.icon size={18} />
                </div>
                <span className={`text-sm ${
                  perk.isActive ? 'text-gray-800' : 'text-gray-400'
                }`}>
                  {perk.label}
                </span>
              </div>
              {perk.isActive && (
                <ChevronRight size={18} className="text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardsCard;