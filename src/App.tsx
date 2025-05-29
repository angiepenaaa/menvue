import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import MealPlanBuilder from './pages/MealPlanBuilder';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage onCartClick={() => setIsCartOpen(true)} />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/settings" element={<AccountSettingsPage />} />
          <Route path="/meal-plan" element={<MealPlanBuilder />} />
        </Routes>
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </Router>
    </CartProvider>
  );
}

export default App;