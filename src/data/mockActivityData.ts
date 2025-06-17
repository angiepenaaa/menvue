import type { ActivityData } from '../types';

export const mockActivityData: ActivityData = {
  stepsToday: 12800,
  sleepHours: 5.5,
  workoutMinutes: 45,
  heartRateResting: 62,
  lastUpdated: new Date().toISOString()
};