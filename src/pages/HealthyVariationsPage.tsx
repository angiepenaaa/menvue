import React, { useState, useCallback } from 'react';
import { Leaf, Search, Filter, TrendingUp, Loader2, Sparkles, Brain, MessageSquare } from 'lucide-react';
import Header from '../components/Header';
import VariationCard from '../components/VariationCard';
import { healthyVariations } from '../data/healthyVariations';
import { generateHealthyVariation } from '../lib/openai';

const HealthyVariationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [userQuery, setUserQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAdvisorLoading, setIsAdvisorLoading] = useState(false);

  const filteredVariations = healthyVariations.filter(variation =>
    variation.originalItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    variation.healthyVersion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateVariation = useCallback(async (itemName: string) => {
    setIsGenerating(true);
    try {
      const suggestion = await generateHealthyVariation(itemName);
      setAiSuggestion(suggestion);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleAiAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    setIsAdvisorLoading(true);
    try {
      const response = await generateHealthyVariation(userQuery);
      setAiResponse(response);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsAdvisorLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={false} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-2xl overflow-hidden">
          <div className="relative z-10 px-8 py-12 md:px-12 md:py-16">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-white" />
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                AI-Powered Healthy Food Swaps
              </h1>
            </div>
            <p className="text-emerald-50 text-lg md:text-xl max-w-2xl leading-relaxed opacity-90">
              Discover healthier versions of your favorite menu items, powered by AI and crafted by nutrition experts.
            </p>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/3"></div>
        </div>

        {/* AI Advisor Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">AI Nutrition Advisor</h2>
            </div>
            
            <form onSubmit={handleAiAdvisor} className="space-y-4">
              <div>
                <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your dietary needs and preferences
                </label>
                <textarea
                  id="query"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="Example: I need high-protein, low-carb options that are vegetarian and around 400 calories..."
                  className="w-full h-32 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isAdvisorLoading || !userQuery.trim()}
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isAdvisorLoading ? (
                  <>
                    <Loader2 className="animate-spin\" size={18} />
                    <span>Generating suggestions...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Get Personalized Suggestions</span>
                  </>
                )}
              </button>
            </form>

            {aiResponse && (
              <div className="mt-6 bg-emerald-50 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-semibold text-emerald-800">AI Recommendations</h3>
                </div>
                <div className="prose prose-emerald max-w-none">
                  <p className="text-emerald-700 whitespace-pre-line">{aiResponse}</p>
                </div>
              </div>
            )}
          </div>
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

        {/* AI Suggestion Section */}
        {isGenerating && (
          <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
            <Loader2 className="animate-spin text-emerald-600 mr-2" size={24} />
            <span className="text-gray-600">Generating healthy variation...</span>
          </div>
        )}

        {aiSuggestion && (
          <div className="mb-8 bg-gradient-to-r from-emerald-50 to-white rounded-xl shadow-sm border border-emerald-100">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">AI-Generated Suggestion</h3>
              </div>
              <div className="prose prose-emerald max-w-none">
                <p className="text-gray-600 whitespace-pre-line">{aiSuggestion}</p>
              </div>
            </div>
          </div>
        )}

        {/* Variations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVariations.map((variation) => (
            <VariationCard
              key={variation.originalItem.id}
              variation={variation}
              onClick={() => {
                setSelectedVariation(variation.originalItem.id);
                handleGenerateVariation(variation.originalItem.name);
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HealthyVariationsPage;