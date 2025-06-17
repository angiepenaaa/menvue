import type { ActivityData, ActivityRecommendation, MenuItem } from '../types';

export const getActivityRecommendations = (
  activity: ActivityData
): ActivityRecommendation[] => {
  const recommendations: ActivityRecommendation[] = [];

  // High activity recommendations
  if (activity.stepsToday > 10000 || activity.workoutMinutes > 30) {
    recommendations.push({
      type: 'recovery',
      reason: 'High activity level detected',
      tags: ['High Protein', 'Complex Carbs', 'Recovery']
    });
  }

  // Low sleep recommendations
  if (activity.sleepHours < 6) {
    recommendations.push({
      type: 'energy',
      reason: 'Low sleep detected',
      tags: ['Iron-Rich', 'B-Vitamins', 'Energy']
    });
  }

  // High heart rate recommendations
  if (activity.heartRateResting && activity.heartRateResting > 70) {
    recommendations.push({
      type: 'heart-health',
      reason: 'Elevated resting heart rate',
      tags: ['Low Sodium', 'Heart Healthy', 'Omega-3']
    });
  }

  return recommendations;
};

export const filterByActivityNeeds = (
  items: MenuItem[],
  activity: ActivityData
): MenuItem[] => {
  const recommendations = getActivityRecommendations(activity);
  const recommendedTags = recommendations.flatMap(rec => rec.tags);

  return items
    .filter(item => 
      item.tags.some(tag => 
        recommendedTags.some(recTag => 
          tag.toLowerCase().includes(recTag.toLowerCase())
        )
      )
    )
    .map(item => ({
      ...item,
      activityMatch: item.tags.filter(tag =>
        recommendedTags.some(recTag =>
          tag.toLowerCase().includes(recTag.toLowerCase())
        )
      )
    }));
};