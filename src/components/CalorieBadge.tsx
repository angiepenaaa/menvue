import React from 'react';

interface CalorieBadgeProps {
  calories: number;
  maxCalories?: number;
}

const CalorieBadge: React.FC<CalorieBadgeProps> = ({ calories }) => {
  const getTierStyles = (calories: number) => {
    if (calories <= 500) {
      return {
        background: '#A5D6A7',
        text: '#1B5E20'
      };
    }
    return {
      background: '#FFF59D',
      text: '#F57F17'
    };
  };

  const styles = getTierStyles(calories);

  return (
    <div 
      className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
      style={{ 
        backgroundColor: styles.background,
        color: styles.text
      }}
    >
      <span>{calories}</span>
      <span className="text-xs">cal</span>
    </div>
  );
};

export default CalorieBadge;