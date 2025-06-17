import React from 'react';
import { useSubscription } from '../hooks/useSubscription';
import { Crown, AlertCircle, Loader2 } from 'lucide-react';

const SubscriptionBadge: React.FC = () => {
  const { subscription, loading, error } = useSubscription();

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Loading subscription...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-500">
        <AlertCircle className="w-4 h-4" />
        <span>Failed to load subscription</span>
      </div>
    );
  }

  if (!subscription || subscription.subscription_status !== 'active') {
    return null;
  }

  return (
    <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
      <Crown className="w-4 h-4" />
      <span>Premium Member</span>
    </div>
  );
};

export default SubscriptionBadge;