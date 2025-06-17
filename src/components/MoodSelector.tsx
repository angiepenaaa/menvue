import React from 'react';
import * as LucideIcons from 'lucide-react';
import { moods } from '../data/moods';
import { Mood } from '../types';

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
      {moods.map((mood) => {
        const IconComponent = LucideIcons[mood.lucideIcon as keyof typeof LucideIcons];
        return (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(mood)}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center gap-4 border border-gray-100"
          >
            <div className="p-4 bg-emerald-50 rounded-full">
              <IconComponent size={32} className="text-emerald-600" />
            </div>
            <span className="text-gray-800 font-medium text-center">{mood.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export default MoodSelector;