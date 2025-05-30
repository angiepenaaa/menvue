import React from 'react';
import { 
  TrendingUp, 
  Share2, 
  BookmarkPlus, 
  Eye, 
  ArrowRight,
  RefreshCw,
  Dumbbell,
  Timer,
  BarChart3
} from 'lucide-react';
import { trendingItems, trendingCategories, trendingHashtags } from '../data/trendingData';
import { formatNumber } from '../utils/formatNumber';

const TrendingSection: React.FC = () => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'viral-swaps':
        return <RefreshCw className="w-6 h-6 text-emerald-600" />;
      case 'protein-packed':
        return <Dumbbell className="w-6 h-6 text-emerald-600" />;
      case 'quick-prep':
        return <Timer className="w-6 h-6 text-emerald-600" />;
      case 'macro-friendly':
        return <BarChart3 className="w-6 h-6 text-emerald-600" />;
      default:
        return <TrendingUp className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-white p-8 rounded-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-3 tracking-tight">Trending Now</h1>
        <p className="text-gray-600 text-lg">Discover what's popular in clean eating today</p>
      </div>

      {/* Trending Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {trendingCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                {getCategoryIcon(category.id)}
              </div>
              <h3 className="font-semibold text-gray-800 text-lg mb-3">{category.name}</h3>
              <p className="text-gray-500 leading-relaxed">{category.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trending Items */}
      <div>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-2xl">
              <TrendingUp className="text-emerald-600 w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Popular Right Now</h2>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 text-emerald-600 font-medium rounded-full hover:bg-emerald-50 transition-colors">
            View All
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="relative h-64">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.trending?.source && (
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-5 py-2 rounded-full font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full animate-pulse" 
                      style={{
                        backgroundColor: 
                          item.trending.source === 'tiktok' ? '#ff0050' :
                          item.trending.source === 'instagram' ? '#833AB4' : 
                          '#E60023'
                      }}
                    />
                    {item.trending.source.charAt(0).toUpperCase() + item.trending.source.slice(1)}
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-full font-medium">
                  {item.calories} cal
                </div>
              </div>

              <div className="p-8">
                <h3 className="font-semibold text-gray-800 text-xl mb-3">{item.name}</h3>
                <p className="text-gray-600 leading-relaxed mb-8 line-clamp-2">{item.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Eye className="w-5 h-5" />
                    <span className="font-medium">{formatNumber(item.trending?.views || 0)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <BookmarkPlus className="w-5 h-5" />
                    <span className="font-medium">{formatNumber(item.trending?.saves || 0)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Share2 className="w-5 h-5" />
                    <span className="font-medium">{formatNumber(item.trending?.shares || 0)}</span>
                  </div>
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-2">
                  {item.trending?.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm font-medium text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Hashtags */}
      <div className="bg-gradient-to-br from-emerald-50 via-emerald-50/50 to-white rounded-3xl p-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-4">
          <TrendingUp className="text-emerald-600 w-7 h-7" />
          Trending Hashtags
        </h3>
        <div className="flex flex-wrap gap-4">
          {trendingHashtags.map((tag) => (
            <span
              key={tag}
              className="bg-white text-emerald-600 px-6 py-3 rounded-full font-medium cursor-pointer hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;