import React from 'react';
import { Loader2, Search, UtensilsCrossed, Calendar, MapPin } from 'lucide-react';

interface LoadingStateProps {
  type?: 'search' | 'restaurants' | 'meals' | 'general';
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  type = 'general', 
  message 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'search':
        return <Search className="w-8 h-8 text-emerald-600" />;
      case 'restaurants':
        return <MapPin className="w-8 h-8 text-emerald-600" />;
      case 'meals':
        return <UtensilsCrossed className="w-8 h-8 text-emerald-600" />;
      default:
        return <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />;
    }
  };

  const getMessage = () => {
    if (message) return message;
    
    switch (type) {
      case 'search':
        return 'Searching for healthy options...';
      case 'restaurants':
        return 'Finding nearby restaurants...';
      case 'meals':
        return 'Loading delicious meals...';
      default:
        return 'Loading...';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-6">
        {getIcon()}
        {type !== 'general' && (
          <div className="absolute -inset-2 border-2 border-emerald-200 rounded-full animate-pulse" />
        )}
      </div>
      <p className="text-gray-600 text-lg font-medium text-center">{getMessage()}</p>
      <div className="mt-4 flex gap-1">
        <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
};

interface EmptyStateProps {
  type?: 'search' | 'restaurants' | 'meals' | 'cart' | 'general';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'general',
  title,
  description,
  actionLabel,
  onAction
}) => {
  const getIcon = () => {
    switch (type) {
      case 'search':
        return <Search className="w-16 h-16 text-gray-300" />;
      case 'restaurants':
        return <MapPin className="w-16 h-16 text-gray-300" />;
      case 'meals':
        return <UtensilsCrossed className="w-16 h-16 text-gray-300" />;
      case 'cart':
        return <Calendar className="w-16 h-16 text-gray-300" />;
      default:
        return <div className="w-16 h-16 bg-gray-200 rounded-full" />;
    }
  };

  const getDefaultTitle = () => {
    if (title) return title;
    
    switch (type) {
      case 'search':
        return 'No results found';
      case 'restaurants':
        return 'No restaurants found';
      case 'meals':
        return 'No meals available';
      case 'cart':
        return 'Your cart is empty';
      default:
        return 'Nothing here yet';
    }
  };

  const getDefaultDescription = () => {
    if (description) return description;
    
    switch (type) {
      case 'search':
        return 'Try adjusting your search terms or filters';
      case 'restaurants':
        return 'Try expanding your search area or adjusting filters';
      case 'meals':
        return 'Check back later for new meal options';
      case 'cart':
        return 'Add some delicious meals to get started';
      default:
        return 'There\'s nothing to show right now';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-6">
        {getIcon()}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {getDefaultTitle()}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md">
        {getDefaultDescription()}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="btn-primary"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export const SkeletonCard: React.FC = () => (
  <div className="card p-6 animate-pulse">
    <div className="aspect-video bg-gray-200 rounded-lg mb-4" />
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="flex gap-2">
        <div className="h-6 bg-gray-200 rounded-full w-16" />
        <div className="h-6 bg-gray-200 rounded-full w-20" />
      </div>
    </div>
  </div>
);

export const SkeletonList: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);