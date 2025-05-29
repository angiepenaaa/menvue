import React from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm, onCartClick }) => {
  const { totalItems } = useCart();

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search 
                size={20} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search healthy meals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button
              onClick={onCartClick}
              className="relative btn btn-secondary p-3"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center bg-coral-400 text-white text-xs font-medium rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
            
            <button className="btn btn-primary px-6 py-3">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;