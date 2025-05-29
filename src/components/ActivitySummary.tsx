import React from 'react';
import type { ActivitySummary } from '../types';
import { Footprints, Moon, Heart, Timer } from 'lucide-react';

interface ActivitySummaryProps {
  data: {
    stepsToday: number;
    sleepHours: number;
    workoutMinutes: number;
    heartRateResting?: number;
  };
}

const ActivitySummary: React.FC<ActivitySummaryProps> = ({ data }) => {
  const summaries: ActivitySummary[] = [
    {
      icon: <Footprints className="w-5 h-5" />,
      label: 'Steps',
      value: data.stepsToday.toLocaleString(),
      status: data.stepsToday > 10000 ? 'high' : data.stepsToday > 5000 ? 'normal' : 'low'
    },
    {
      icon: <Moon className="w-5 h-5" />,
      label: 'Sleep',
      value: `${data.sleepHours}h`,
      status: data.sleepHours >= 7 ? 'normal' : data.sleepHours >= 6 ? 'low' : 'low'
    },
    {
      icon: <Timer className="w-5 h-5" />,
      label: 'Workout',
      value: `${data.workoutMinutes}m`,
      status: data.workoutMinutes > 30 ? 'high' : data.workoutMinutes > 15 ? 'normal' : 'low'
    }
  ];

  if (data.heartRateResting) {
    summaries.push({
      icon: <Heart className="w-5 h-5" />,
      label: 'Heart Rate',
      value: `${data.heartRateResting} bpm`,
      status: data.heartRateResting < 60 ? 'normal' : data.heartRateResting < 70 ? 'normal' : 'high'
    });
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Activity</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaries.map((summary, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              summary.status === 'high' ? 'bg-emerald-100 text-emerald-600' :
              summary.status === 'low' ? 'bg-orange-100 text-orange-600' :
              'bg-blue-100 text-blue-600'
            }`}>
              {summary.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{summary.label}</p>
              <p className="font-semibold text-gray-800">{summary.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivitySummary;