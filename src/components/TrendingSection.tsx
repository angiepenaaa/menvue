import React from 'react';
import { TrendingUp, Share2, BookmarkPlus, Eye, ArrowRight } from 'lucide-react';
import { trendingItems, trendingCategories, trendingHashtags } from '../data/trendingData';
import { formatNumber } from '../utils/formatNumber';

const TrendingSection: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Trending Now</h1>
        <p className="text-gray-600">Discover what's popular in clean eating today</p>
      </div>

      {/* Trending Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {trendingCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300 cursor-pointer group"
          >
            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
              {category.icon}
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">{category.name}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{category.description}</p>
          </div>
        ))}
      </div>

      {/* Trending Items */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <TrendingUp className="text-emerald-600 w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Popular Right Now</h2>
          </div>
          <button className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors">
            View All
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.trending?.source && (
                  <div className="absolute top-4 left-4 bg-black/75 text-white px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm flex items-center gap-2">
                    {item.trending.source === 'tiktok' && (
                      <>
                        <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                        TikTok
                      </>
                    )}
                    {item.trending.source === 'instagram' && (
                      <>
                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
                        Instagram
                      </>
                    )}
                    {item.trending.source === 'pinterest' && (
                      <>
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        Pinterest
                      </>
                    )}
                  </div>
                )}
                <div className="absolute bottom-4 right-4 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  {item.calories} cal
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-gray-800 text-lg mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">{item.description}</p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6 px-2">
                  <div className="flex items-center gap-2">
                    <Eye className="text-gray-400" size={16} />
                    <span>{formatNumber(item.trending?.views || 0)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookmarkPlus className="text-gray-400" size={16} />
                    <span>{formatNumber(item.trending?.saves || 0)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Share2 className="text-gray-400" size={16} />
                    <span>{formatNumber(item.trending?.shares || 0)}</span>
                  </div>
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-2">
                  {item.trending?.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors cursor-pointer"
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
      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-8">
        <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-3">
          <TrendingUp className="text-emerald-600" />
          Trending Hashtags
        </h3>
        <div className="flex flex-wrap gap-3">
          {trendingHashtags.map((tag) => (
            <span
              key={tag}
              className="bg-white text-emerald-600 px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
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