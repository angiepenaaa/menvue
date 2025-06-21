import React, { useState, useCallback } from 'react';
import { Leaf, Search, Filter, TrendingUp, Loader2, Sparkles, Brain, MessageSquare, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import { openaiService } from '../lib/openai';
import VariationCard from '../components/VariationCard';
import { healthyVariations } from '../data/healthyVariations';

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
      const response = await openaiService.getNutritionAdvice(
        `Given the menu item "${itemName}", provide a lower-calorie, high-protein version while preserving flavor. Include specific ingredient swaps and explain the nutritional benefits.`
      );
      setAiSuggestion(response.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
      setAiSuggestion('Sorry, I encountered an error generating the variation. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleAiAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    setIsAdvisorLoading(true);
    
    try {
      const response = await openaiService.getNutritionAdvice(userQuery);
      setAiResponse(response.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
      setAiResponse("I apologize, but I encountered an error while processing your request. Please try again with a different query.");
    } finally {
      setIsAdvisorLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={false} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 bg-gradient-to-r from-emerald-50/50 to-transparent rounded-2xl p-6">
          <div className="relative">
            <div className="w-1 h-8 bg-emerald-500 absolute -left-6 top-1/2 -translate-y-1/2 rounded-r-full" />
            <div className="flex items-center gap-3 mb-2">
              <Brain className="w-6 h-6 text-emerald-600" />
              <h1 className="text-2xl font-bold text-gray-800">AI-Powered Menu Variations</h1>
            </div>
            <p className="text-gray-600">Transform your favorite dishes into healthier alternatives</p>
          </div>
        </div>
        
        {/* Feature Pills */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mb-8">
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles size={16} />
            <span>Smart Recommendations</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
            <Leaf size={16} />
            <span>Healthier Options</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
            <MessageSquare size={16} />
            <span>Personalized Advice</span>
          </div>
        </div>

        {/* AI Advisor Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <MessageSquare className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">AI Nutrition Advisor</h2>
                <p className="text-gray-600 mt-1">Get personalized menu recommendations based on your needs</p>
              </div>
            </div>
            
            <form onSubmit={handleAiAdvisor} className="space-y-6">
              <div>
                <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
                  What nutrition advice do you need?
                </label>
                <textarea
                  id="query"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="Example: I'm training for a marathon and need advice on what to eat before and after my runs. I'm vegetarian and tend to feel low energy during long runs."
                  className="w-full h-32 px-6 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-gray-700 placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                disabled={isAdvisorLoading || !userQuery.trim()}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 font-medium"
              >
                {isAdvisorLoading ? (
                  <>
                    <Loader2 className="animate-spin\" size={20} />
                    <span>Generating suggestions...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} />
                    <span>Get Personalized Suggestions</span>
                    <ChevronRight size={20} />
                  </>
                )}
              </button>
            </form>

            {aiResponse && (
              <div className="mt-8 bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-8 border border-emerald-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Brain className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-800">AI Recommendations</h3>
                </div>
                <div className="prose prose-emerald max-w-none">
                  <p className="text-emerald-700 whitespace-pre-line leading-relaxed">{aiResponse}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-12">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 h-12 rounded-xl border-0 bg-gray-50 focus:ring-2 focus:ring-emerald-500 transition-shadow"
              />
            </div>
            <button className="h-12 px-6 bg-gray-50 rounded-xl text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors">
              <Filter size={18} />
              <span className="font-medium">Filters</span>
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Available Variations</h2>
            <p className="text-gray-600 mt-1">Discover healthier alternatives to your favorite dishes</p>
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