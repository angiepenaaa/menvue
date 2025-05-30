import React, { useState } from 'react';
import { ArrowRight, Leaf, TrendingUp, Wand2 } from 'lucide-react';
import type { HealthyVariation } from '../types';
import AIVariationPrompt from './AIVariationPrompt';
import { generateVariation } from '../utils/aiService';

interface VariationCardProps {
  variation: HealthyVariation;
  onClick: () => void;
}

const VariationCard: React.FC<VariationCardProps> = ({ variation, onClick }) => {
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { originalItem, healthyVersion } = variation;
  const calorieReduction = originalItem.calories - healthyVersion.calories;
  const caloriePercentage = Math.round((calorieReduction / originalItem.calories) * 100);

  const handleGenerateVariation = async (prompt: string) => {
    try {
      setIsGenerating(true);
      const newVariation = await generateVariation(originalItem, prompt);
      // Handle the new variation (e.g., save it, display it)
      console.log('New variation generated:', newVariation);
      setShowAIPrompt(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div 
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                <span className="text-emerald-600 font-semibold">{healthyVersion.healthScore}</span>
              </div>
              <span className="text-sm text-gray-600">Health Score</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAIPrompt(true)}
                className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 px-3 py-1 rounded-full hover:bg-emerald-50 transition-colors"
              >
                <Wand2 size={16} />
                <span className="text-sm font-medium">Customize</span>
              </button>
              <button 
                onClick={onClick}
                className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <span className="text-sm font-medium">View Details</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAIPrompt && (
        <AIVariationPrompt
          item={originalItem}
          onClose={() => setShowAIPrompt(false)}
          onGenerate={handleGenerateVariation}
          isLoading={isGenerating}
        />
      )}
    </>
  );
};

export default VariationCard;