import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, User, CalendarRange, ShoppingCart, Leaf } from 'lucide-react';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import NutritionPreferencesPage from './pages/NutritionPreferencesPage';
import MealPlanBuilder from './pages/MealPlanBuilder';
import OrderPage from './pages/OrderPage';
import OrderStatusPage from './pages/OrderStatusPage';
import ItemDetailPage from './pages/ItemDetailPage';
import HealthyVariationsPage from './pages/HealthyVariationsPage';
import CartDrawer from './components/CartDrawer';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function BottomNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-around items-center">
          <Link
            to="/"
            className={`flex flex-col items-center p-2 ${
              isActive('/') ? 'text-emerald-600' : 'text-gray-600'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            to="/meal-plan"
            className={`flex flex-col items-center p-2 ${
              isActive('/meal-plan') ? 'text-emerald-600' : 'text-gray-600'
            }`}
          >
            <CalendarRange size={24} />
            <span className="text-xs mt-1">Meal Plan</span>
          </Link>
          <Link
            to="/variations"
            className={`flex flex-col items-center p-2 ${
              isActive('/variations') ? 'text-emerald-600' : 'text-gray-600'
            }`}
          >
            <Leaf size={24} />
            <span className="text-xs mt-1">Variations</span>
          </Link>
          <Link
            to="/account"
            className={`flex flex-col items-center p-2 ${
              location.pathname.includes('/account') ? 'text-emerald-600' : 'text-gray-600'
            }`}
          >
            <User size={24} />
            <span className="text-xs mt-1">Account</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div className="pb-20">
                    <HomePage onCartClick={() => setIsCartOpen(true)} />
                    <BottomNav />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/item/:itemId"
              element={
                <ProtectedRoute>
                  <div className="pb-20">
                    <ItemDetailPage />
                    <BottomNav />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <div className="pb-20">
                    <AccountPage />
                    <BottomNav />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/settings"
              element={
                <ProtectedRoute>
                  <div className="pb-20">
                    <AccountSettingsPage />
                    <BottomNav />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/nutrition"
              element={
                <ProtectedRoute>
                  <div className="pb-20">
                    <NutritionPreferencesPage />
                    <BottomNav />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/meal-plan"
              element={
                <ProtectedRoute>
                  <div className="pb-20">
                    <MealPlanBuilder />
                    <BottomNav />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/order"
              element={
                <ProtectedRoute>
                  <OrderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/status"
              element={
                <ProtectedRoute>
                  <OrderStatusPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/variations"
              element={
                <ProtectedRoute>
                  <div className="pb-20">
                    <HealthyVariationsPage />
                    <BottomNav />
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;