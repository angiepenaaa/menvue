import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface GoogleLoginProps {
  redirectTo?: string;
  showWelcome?: boolean;
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({ 
  redirectTo = '/dashboard', 
  showWelcome = true 
}) => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already authenticated and redirect
  useEffect(() => {
    if (!authLoading && user) {
      navigate(redirectTo);
    }
  }, [user, authLoading, navigate, redirectTo]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}${redirectTo}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('Google login error:', error);
        setError(error.message);
      }
    } catch (err: any) {
      console.error('Unexpected error during Google login:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Checking authentication...</span>
        </div>
      </div>
    );
  }

  // Show welcome message if user is logged in
  if (user && showWelcome) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Welcome back, {user.user_metadata?.full_name || user.email}!
        </h3>
        
        <p className="text-gray-600 mb-6">
          You're successfully signed in to menVue.
        </p>
        
        <button
          onClick={() => navigate(redirectTo)}
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          Continue to Dashboard
        </button>
      </div>
    );
  }

  // Show login form if user is not authenticated
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="bg-emerald-600 text-white p-2 rounded-xl flex items-center justify-center" style={{ width: '32px', height: '32px' }}>
            <div className="relative" style={{ width: '20px', height: '20px' }}>
              <div className="absolute inset-0 bg-white transform -rotate-45" style={{ width: '12px', height: '16px', left: '4px', top: '2px' }}></div>
              <div className="absolute bg-white transform rotate-45" style={{ width: '12px', height: '16px', left: '4px', top: '2px' }}></div>
              <div className="absolute text-emerald-600 text-xs font-bold" style={{ left: '6px', top: '6px' }}>✓</div>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to menVue</h2>
        <p className="text-gray-600">
          Sign in to access personalized meal recommendations and track your nutrition goals.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} />
          <div>
            <p className="font-medium">Sign in failed</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Google Sign In Button */}
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg"
      >
        {loading ? (
          <>
            <Loader2 size={24} className="animate-spin" />
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Sign in with Google</span>
          </>
        )}
      </button>

      {/* Additional Info */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>

      {/* Features Preview */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <h3 className="text-sm font-medium text-gray-700 mb-4">What you'll get:</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span>Personalized meal recommendations</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span>Nutrition tracking and goals</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span>AI-powered meal planning</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span>Save favorite restaurants and meals</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleLogin;