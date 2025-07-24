import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
    try {
      console.log('Attempting to sign up user:', email);
      
      // Test Supabase connection before attempting signup
      const { data: healthCheck } = await supabase.from('_health').select('*').limit(1);
      console.log('Supabase health check passed');
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) {
        console.error('Supabase signup error:', error);
        throw error;
      }
      console.log('Signup successful');
    } catch (error) {
      console.error('Signup failed:', error);
      if (error.message?.includes('fetch') || error.message?.includes('Failed to fetch')) {
        throw new Error('Unable to connect to authentication service. Please check your internet connection and try again.');
      } else if (error.message?.includes('Invalid API key')) {
        throw new Error('Authentication service configuration error. Please check your Supabase settings.');
      } else if (error.message?.includes('CORS')) {
        throw new Error('Cross-origin request blocked. Please check your Supabase project settings.');
      }
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting to sign in user:', email);
      
      // Test Supabase connection before attempting signin
      try {
        const { data: healthCheck } = await supabase.from('_health').select('*').limit(1);
        console.log('Supabase health check passed');
      } catch (healthError) {
        console.warn('Supabase health check failed, proceeding with auth attempt:', healthError);
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Supabase signin error:', error);
        throw error;
      }
      console.log('Signin successful');
    } catch (error) {
      console.error('Signin failed:', error);
      if (error.message?.includes('fetch') || error.message?.includes('Failed to fetch')) {
        throw new Error('Unable to connect to authentication service. Please check your internet connection and try again.');
      } else if (error.message?.includes('Invalid API key')) {
        throw new Error('Authentication service configuration error. Please check your Supabase settings.');
      } else if (error.message?.includes('CORS')) {
        throw new Error('Cross-origin request blocked. Please check your Supabase project settings.');
      }
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signIn, 
      signUp, 
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}