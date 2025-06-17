import { supabase } from './supabase';

export async function fetchNearbyRestaurants(latitude: number, longitude: number, radius?: number) {
  const { data, error } = await supabase.functions.invoke('places', {
    body: { latitude, longitude, radius }
  });

  if (error) throw error;
  return data;
}

export async function getNutritionInfo(prompt: string) {
  const { data, error } = await supabase.functions.invoke('nutrition', {
    body: { prompt }
  });

  if (error) throw error;
  return data;
}

export async function sendNotification(title: string, body: string, userIds: string[], tags?: string[]) {
  const { data, error } = await supabase.functions.invoke('notifications', {
    body: { title, body, identities: userIds, tags }
  });

  if (error) throw error;
  return data;
}