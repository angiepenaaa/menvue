import { createClient } from '@supabase/supabase-js';

// Get environment variables with validation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

// Enhanced environment variable validation
console.log('🔧 Supabase Configuration Check:');
console.log('- URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
console.log('- Anon Key:', supabaseAnonKey ? '✅ Set' : '❌ Missing');
console.log('- Environment:', import.meta.env.MODE);
console.log('- Origin:', window.location.origin);

if (!supabaseUrl || !supabaseAnonKey) {
  const missing = [];
  if (!supabaseUrl) missing.push('VITE_SUPABASE_URL');
  if (!supabaseAnonKey) missing.push('VITE_SUPABASE_ANON_KEY');
  
  console.error('❌ Missing Supabase environment variables:', missing);
  console.error('📝 Please check your .env file and ensure it contains:');
  console.error('   VITE_SUPABASE_URL=https://your-project-ref.supabase.co');
  console.error('   VITE_SUPABASE_ANON_KEY=your_anon_key_here');
  console.error('💡 Get these values from: https://app.supabase.com/project/your-project/settings/api');
  
  throw new Error(`Missing required Supabase environment variables: ${missing.join(', ')}`);
}

// Validate URL format
try {
  new URL(supabaseUrl);
  console.log('✅ Supabase URL format is valid');
} catch (error) {
  console.error('❌ Invalid Supabase URL format:', supabaseUrl);
  throw new Error(`Invalid Supabase URL format: ${supabaseUrl}. Expected format: https://your-project.supabase.co`);
}

console.log('🚀 Creating Supabase client...');

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    redirectTo: `${window.location.origin}/`,
    flowType: 'pkce',
    debug: import.meta.env.MODE === 'development'
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web',
      'X-Client-Version': '2.39.7'
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

console.log('✅ Supabase client created successfully');

// Test connection on initialization
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('❌ Supabase connection test failed:', error.message);
  } else {
    console.log('✅ Supabase connection test successful');
  }
}).catch((error) => {
  console.error('❌ Supabase connection test error:', error.message);
});