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
        <div className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-2xl overflow-hidden">
          <div className="relative z-10 px-8 py-12 md:px-12 md:py-16">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Healthy Food Swaps
            </h1>
            <p className="text-emerald-50 text-lg md:text-xl max-w-2xl leading-relaxed opacity-90">
              Discover healthier versions of your favorite menu items, carefully crafted to maintain taste while improving nutrition.
            </p>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/3"></div>
        </div>

        {/* Search and Filters */}
        <div className="mt-8 mb-12">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 h-12 rounded-xl border-0 bg-white shadow-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-emerald-500 transition-shadow"
              />
            </div>
            <button className="h-12 px-6 bg-white rounded-xl text-gray-700 hover:bg-gray-50 flex items-center gap-2 ring-1 ring-gray-200 transition-colors">
              <Filter size={18} />
              <span className="font-medium">Filters</span>
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-3 mt-4">
            <button className="h-10 px-5 bg-emerald-600 text-white rounded-lg flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-sm">
              <Leaf size={16} />
              <span className="font-medium">All Swaps</span>
            </button>
            <button className="h-10 px-5 bg-white text-gray-700 rounded-lg flex items-center gap-2 ring-1 ring-gray-200 hover:bg-gray-50 transition-colors">
              <TrendingUp size={16} />
              <span className="font-medium">Most Popular</span>
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800">Available Swaps</h2>
            <p className="text-gray-500 mt-1">Find healthier alternatives to your favorite dishes</p>
          </div>
          <div className="text-sm text-gray-500">
            Showing {filteredVariations.length} results
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