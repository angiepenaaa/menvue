import React from 'react';
import { Search, ShoppingCart, User, Home, MapPin, Utensils } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  onCartClick?: () => void;
  showSearch?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  searchTerm = '', 
  setSearchTerm = () => {}, 
  onCartClick = () => {},
  showSearch = true
}) => {
  const { totalItems } = useCart();
  const location = useLocation();
  const isAccountPage = location.pathname.includes('/account');

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {isAccountPage && (
              <Link to="/\" className="text-gray-600 hover:text-emerald-600 transition-colors">
                <Home size={24} />
              </Link>
            )}
            <Link to="/" className="flex items-center">
              <div className="bg-emerald-600 text-white p-2 rounded-lg mr-3">
                <Utensils size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">menVue</h1>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-1" />
                  <span>Brandon, FL</span>
                </div>
              </div>
            </Link>
          </div>
          
          {showSearch && (
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for dishes, cuisines, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          )}
          
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/account"
              className="text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <User size={24} />
            </Link>
            <button
              onClick={onCartClick}
              className="relative text-gray-600 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;