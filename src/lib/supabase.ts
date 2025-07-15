import { createClient } from '@supabase/supabase-js';

// Get environment variables with validation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key exists:', !!supabaseAnonKey);
console.log('Environment check:', {
  NODE_ENV: import.meta.env.MODE,
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  urlFormat: supabaseUrl ? 'valid' : 'missing'
});
console.log('Current origin:', window.location.origin);

if (!supabaseUrl || !supabaseAnonKey) {
  const missing = [];
  if (!supabaseUrl) missing.push('VITE_SUPABASE_URL');
  if (!supabaseAnonKey) missing.push('VITE_SUPABASE_ANON_KEY');
  
  console.error('Missing Supabase environment variables:', missing);
  console.error('Please check your .env file and ensure it contains:');
  console.error('VITE_SUPABASE_URL=https://your-project.supabase.co');
  console.error('VITE_SUPABASE_ANON_KEY=your_anon_key');
  
  throw new Error(`Missing required Supabase environment variables: ${missing.join(', ')}`);
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  console.error('Invalid Supabase URL format:', supabaseUrl);
  throw new Error(`Invalid Supabase URL format: ${supabaseUrl}. Expected format: https://your-project.supabase.co`);
}

console.log('Creating Supabase client...');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    redirectTo: `${window.location.origin}/`,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
});

console.log('Supabase client created successfully');