import React from 'react';
import { moods } from '../data/moods';
import { Mood } from '../types';

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
      {moods.map((mood) => (
        <button
          key={mood.id}
          onClick={() => onMoodSelect(mood)}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center gap-2 border border-gray-100"
        >
          <span className="text-4xl">{mood.emoji}</span>
          <span className="text-gray-800 font-medium text-center">{mood.name}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector