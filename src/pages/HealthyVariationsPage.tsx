import React, { useState } from 'react';
import { Leaf, Search, Filter, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import VariationCard from '../components/VariationCard';
import { healthyVariations } from '../data/healthyVariations';

const HealthyVariationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);

  const filteredVariations = healthyVariations.filter(variation =>
    variation.originalItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    variation.healthyVersion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={false} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl p-8 md:p-12 mb-12 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Healthy Food Swaps
          </h1>
          <p className="text-emerald-50 text-lg md:text-xl max-w-2xl">
            Discover healthier versions of your favorite menu items, carefully crafted to maintain taste while improving nutrition.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-full whitespace-nowrap flex items-center gap-2">
              <Leaf size={16} />
              <span>All Swaps</span>
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-full whitespace-nowrap border border-gray-200 flex items-center gap-2">
              <TrendingUp size={16} />
              <span>Most Popular</span>
            </button>
          </div>
        </div>

        {/* Variations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVariations.map((variation) => (
            <VariationCard
              key={variation.originalItem.id}
              variation={variation}
              onClick={() => setSelectedVariation(variation.originalItem.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HealthyVariationsPage;