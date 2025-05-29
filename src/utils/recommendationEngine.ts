import type { MenuItem, UserPreferences, Mood } from '../types';

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

const getMoodNutrientScore = (item: MenuItem, mood: Mood): number => {
  let score = 0;
  
  // Specific nutrient scoring based on mood
  switch (mood.id) {
    case 'stressed':
      // Higher scores for magnesium-rich foods and omega-3s
      if (item.tags.some(tag => 
        tag.toLowerCase().includes('magnesium') ||
        tag.toLowerCase().includes('omega') ||
        tag.toLowerCase().includes('nuts') ||
        tag.toLowerCase().includes('leafy greens')
      )) score += 3;
      break;
      
    case 'low-energy':
      // Higher scores for iron-rich and B-vitamin foods
      if (item.tags.some(tag =>
        tag.toLowerCase().includes('iron') ||
        tag.toLowerCase().includes('protein') ||
        tag.toLowerCase().includes('b-vitamin')
      )) score += 3;
      break;
      
    case 'focus':
      // Higher scores for brain-boosting foods
      if (item.tags.some(tag =>
        tag.toLowerCase().includes('omega') ||
        tag.toLowerCase().includes('antioxidant') ||
        tag.toLowerCase().includes('berries')
      )) score += 3;
      break;
      
    case 'bloated':
      // Higher scores for anti-inflammatory and light foods
      if (item.tags.some(tag =>
        tag.toLowerCase().includes('light') ||
        tag.toLowerCase().includes('anti-inflammatory') ||
        tag.toLowerCase().includes('probiotic')
      )) score += 3;
      break;
  }
  
  return score;
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

const rankByMoodMatch = (items: MenuItem[], mood: Mood): MenuItem[] => {
  return items.sort((a, b) => {
    const aScore = getMoodNutrientScore(a, mood) + 
      mood.tags.filter(tag => 
        a.tags.some(itemTag => itemTag.toLowerCase().includes(tag.toLowerCase()))
      ).length;
    
    const bScore = getMoodNutrientScore(b, mood) + 
      mood.tags.filter(tag => 
        b.tags.some(itemTag => itemTag.toLowerCase().includes(tag.toLowerCase()))
      ).length;

    return bScore - aScore;
  });
};

export const getSmartRecommendations = (
  items: MenuItem[],
  preferences: UserPreferences
): MenuItem[] => {
  let recommendations = [...items];

  recommendations = filterByDiet(recommendations, preferences.dietType);
  recommendations = filterByCalorieRange(recommendations, preferences.calorieRange);
  recommendations = prioritizeByTimeOfDay(recommendations);
  recommendations = rankItems(recommendations, preferences);

  return recommendations.slice(0, 4);
};

export const getMoodBasedRecommendations = (
  items: MenuItem[],
  mood: Mood,
  preferences: UserPreferences
): MenuItem[] => {
  let recommendations = [...items];

  // Apply basic filters
  recommendations = filterByDiet(recommendations, preferences.dietType);
  recommendations = filterByCalorieRange(recommendations, preferences.calorieRange);

  // Apply mood-based ranking with enhanced scoring
  recommendations = rankByMoodMatch(recommendations, mood);

  // Filter out items with no mood matches
  recommendations = recommendations.filter(item => 
    mood.tags.some(tag => 
      item.tags.some(itemTag => itemTag.toLowerCase().includes(tag.toLowerCase()))
    ) || getMoodNutrientScore(item, mood) > 0
  );

  return recommendations;
};