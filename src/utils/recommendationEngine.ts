import { MenuItem, UserPreferences } from '../types';

const getTimeBasedMealType = (): string => {
  const hour = new Date().getHours();
  if (hour < 11) return 'breakfast';
  if (hour < 15) return 'lunch';
  if (hour < 22) return 'dinner';
  return 'late-night';
};

const filterByDiet = (items: MenuItem[], dietType: string): MenuItem[] => {
  if (dietType === 'no-restrictions') return items;
  return items.filter(item => 
    item.tags.some(tag => tag.toLowerCase().includes(dietType.toLowerCase())) ||
    item.dietCompatibility?.includes(dietType)
  );
};

const filterByCalorieRange = (items: MenuItem[], calorieRange: string): MenuItem[] => {
  switch (calorieRange) {
    case '<300':
      return items.filter(item => item.calories < 300);
    case '300-500':
      return items.filter(item => item.calories >= 300 && item.calories <= 500);
    case '500-700':
      return items.filter(item => item.calories > 500 && item.calories <= 700);
    default:
      return items;
  }
};

const prioritizeByTimeOfDay = (items: MenuItem[]): MenuItem[] => {
  const currentMealType = getTimeBasedMealType();
  return items.sort((a, b) => {
    const aRelevance = a.tags.some(tag => tag.toLowerCase().includes(currentMealType)) ? 1 : 0;
    const bRelevance = b.tags.some(tag => tag.toLowerCase().includes(currentMealType)) ? 1 : 0;
    return bRelevance - aRelevance;
  });
};

const rankItems = (items: MenuItem[], preferences: UserPreferences): MenuItem[] => {
  return items.sort((a, b) => {
    let aScore = 0;
    let bScore = 0;

    // Score based on health goal
    if (preferences.healthGoal === 'lose-weight') {
      aScore += a.calories < 400 ? 2 : 0;
      bScore += b.calories < 400 ? 2 : 0;
    }

    // Score based on meal type match
    aScore += a.tags.some(tag => tag.toLowerCase().includes(preferences.mealType)) ? 3 : 0;
    bScore += b.tags.some(tag => tag.toLowerCase().includes(preferences.mealType)) ? 3 : 0;

    return bScore - aScore;
  });
};

export const getSmartRecommendations = (
  items: MenuItem[],
  preferences: UserPreferences
): MenuItem[] => {
  let recommendations = [...items];

  // Apply filters
  recommendations = filterByDiet(recommendations, preferences.dietType);
  recommendations = filterByCalorieRange(recommendations, preferences.calorieRange);
  
  // Prioritize and rank
  recommendations = prioritizeByTimeOfDay(recommendations);
  recommendations = rankItems(recommendations, preferences);

  // Return top 3-5 recommendations
  return recommendations.slice(0, 4);
};