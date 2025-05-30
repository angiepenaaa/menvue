import React, { useState } from 'react';
import { ArrowRight, Leaf, TrendingUp, Info } from 'lucide-react';
import type { HealthyVariation } from '../types';

interface VariationCardProps {
  variation: HealthyVariation;
  onClick: () => void;
}

const VariationCard: React.FC<VariationCardProps> = ({ variation, onClick }) => {
  const { originalItem, healthyVersion } = variation;
  const calorieReduction = originalItem.calories - healthyVersion.calories;
  const caloriePercentage = Math.round((calorieReduction / originalItem.calories) * 100);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-48">
        <img
          src={originalItem.image}
          alt={originalItem.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
          <Leaf size={16} />
          <span>Healthy Swap</span>
        </div>
        {healthyVersion.healthScore >= 90 && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
            <TrendingUp size={16} />
            <span>Top Rated</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">{originalItem.name}</h3>
          <span className="text-emerald-600 font-medium">
            -{caloriePercentage}% calories
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Original</span>
            <span className="font-medium">{originalItem.calories} cal</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-emerald-600">Healthy Version</span>
            <span className="font-medium">{healthyVersion.calories} cal</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2 relative">
            <div 
              className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center"
              onMouseEnter={(e) => {
                e.stopPropagation();
                setShowTooltip(true);
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
            >
              <span className="text-emerald-600 font-semibold">{healthyVersion.healthScore}</span>
            </div>
            <span className="text-sm text-gray-600 flex items-center gap-1">
              Health Score
              <Info 
                size={14} 
                className="text-gray-400 cursor-help"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setShowTooltip(true);
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
              />
            </span>
            {showTooltip && (
              <div className="absolute bottom-full left-0 mb-2 w-64 p-4 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-10">
                <p className="mb-2">Health Score is calculated based on:</p>
                <ul className="space-y-1 list-disc list-inside text-gray-300">
                  <li>Nutrient density</li>
                  <li>Protein to calorie ratio</li>
                  <li>Fiber content</li>
                  <li>Added sugar levels</li>
                  <li>Sodium content</li>
                </ul>
                <div className="mt-2 text-xs text-gray-400">
                  Score range: 0-100, higher is better
                </div>
                <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
              </div>
            )}
          </div>
          <button className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            <span className="text-sm font-medium">View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VariationCard;