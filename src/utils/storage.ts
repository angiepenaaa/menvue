import type { UserPreferences } from '../types';

const PREFERENCES_KEY = 'menVue_userPreferences';

export const savePreferences = (preferences: UserPreferences): void => {
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
};

export const loadPreferences = (): UserPreferences | null => {
  const saved = localStorage.getItem(PREFERENCES_KEY);
  return saved ? JSON.parse(saved) : null;
};