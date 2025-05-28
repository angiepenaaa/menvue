import React from 'react';

interface CalorieBadgeProps {
  calories: number;
  maxCalories?: number;
}

const CalorieBadge: React.FC<CalorieBadgeProps> = ({ 
  calories, 
  maxCalories = 500 
}) => {
  // Calculate percentage of max calories
  const percentage = (calories / maxCalories) * 100;
  
  // Determine color based on percentage
  let bgColor = 'bg-green-500';
  
  if (percentage > 90) {
    bgColor = 'bg-orange-500';
  } else if (percentage > 70) {
    bgColor = 'bg-yellow-500';
  }
  
  return (
    <div className="flex items-center">
      <div className={`${bgColor} text-white text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center`}>
        <span>{calories}</span>
        <span className="ml-1 text-xs">cal</span>
      </div>
    </div>
  );
};

export default CalorieBadge;