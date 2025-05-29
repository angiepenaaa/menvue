import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, User, CalendarRange, ShoppingCart } from 'lucide-react';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import MealPlanBuilder from './pages/MealPlanBuilder';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';

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
    <CartProvider>
      <Router>
        <div className="pb-20"> {/* Add padding to account for fixed bottom nav */}
          <Routes>
            <Route path="/" element={<HomePage onCartClick={() => setIsCartOpen(true)} />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/settings" element={<AccountSettingsPage />} />
            <Route path="/meal-plan" element={<MealPlanBuilder />} />
          </Routes>
          <BottomNav />
        </div>
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </Router>
    </CartProvider>
  );
}

export default App;