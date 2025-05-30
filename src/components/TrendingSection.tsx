import React from 'react';
import { TrendingUp, Share2, BookmarkPlus, Eye, ArrowRight } from 'lucide-react';
import { trendingItems, trendingCategories, trendingHashtags } from '../data/trendingData';
import { formatNumber } from '../utils/formatNumber';

const TrendingSection: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Trending Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trendingCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="text-3xl mb-3">{category.icon}</div>
            <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
            <p className="text-sm text-gray-500">{category.description}</p>
          </div>
        ))}
      </div>

      {/* Trending Items */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp className="text-emerald-600" />
            Trending Now
          </h2>
          <button className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
            See All
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.trending?.source && (
                  <div className="absolute top-3 left-3 bg-black/75 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    {item.trending.source === 'tiktok' && 'TikTok'}
                    {item.trending.source === 'instagram' && 'Instagram'}
                    {item.trending.source === 'pinterest' && 'Pinterest'}
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {item.calories} cal
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{formatNumber(item.trending?.views || 0)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookmarkPlus size={14} />
                    <span>{formatNumber(item.trending?.saves || 0)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 size={14} />
                    <span>{formatNumber(item.trending?.shares || 0)}</span>
                  </div>
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-2">
                  {item.trending?.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full"
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
      <div className="bg-emerald-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Trending Hashtags</h3>
        <div className="flex flex-wrap gap-2">
          {trendingHashtags.map((tag) => (
            <span
              key={tag}
              className="bg-white text-emerald-600 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-emerald-600 hover:text-white transition-colors"
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