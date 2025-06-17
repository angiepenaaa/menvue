import React from 'react';
import { Activity } from 'lucide-react';

interface ActivityMatchBadgeProps {
  matches: string[];
}

const ActivityMatchBadge: React.FC<ActivityMatchBadgeProps> = ({ matches }) => {
  if (!matches || matches.length === 0) return null;

  return (
    <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
      <Activity size={14} />
      <span>Activity Match</span>
    </div>
  );
};

export default ActivityMatchBadge;