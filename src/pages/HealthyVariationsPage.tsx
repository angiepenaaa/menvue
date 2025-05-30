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
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-12 mb-12">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Healthy Food Swaps
            </h1>
            <p className="text-emerald-50 text-xl max-w-2xl leading-relaxed">
              Discover healthier versions of your favorite menu items, carefully crafted to maintain taste while improving nutrition.
            </p>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
            </div>
            <button className="px-6 py-3.5 bg-white border border-gray-200 rounded-2xl text-gray-700 hover:bg-gray-50 flex items-center gap-2 shadow-sm transition-colors">
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            <button className="px-5 py-2.5 bg-emerald-600 text-white rounded-full whitespace-nowrap flex items-center gap-2 shadow-sm hover:bg-emerald-700 transition-colors">
              <Leaf size={18} />
              <span>All Swaps</span>
            </button>
            <button className="px-5 py-2.5 bg-white text-gray-700 rounded-full whitespace-nowrap border border-gray-200 flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-colors">
              <TrendingUp size={18} />
              <span>Most Popular</span>
            </button>
          </div>
        </div>

        {/* Variations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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