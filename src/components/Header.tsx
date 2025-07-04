import React from 'react';
import { Search, ShoppingCart, User, MapPin, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import { useGeolocation } from '../hooks/useGeolocation';

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
  const { location: userLocation, loading } = useGeolocation();

  // Get city name from coordinates using reverse geocoding
  const [cityName, setCityName] = React.useState('Brandon, FL');

  React.useEffect(() => {
    if (userLocation) {
      fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${userLocation.latitude}&lon=${userLocation.longitude}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
        .then(res => res.json())
        .then(data => {
          if (data[0]) {
            setCityName(`${data[0].name}, ${data[0].state}`);
          }
        })
        .catch(() => {
          // Fallback to default location if geocoding fails
          setCityName('Brandon, FL');
        });
    }
  }, [userLocation]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <div className="bg-emerald-600 text-white p-2 rounded-xl mr-3 flex items-center justify-center" style={{ width: '40px', height: '40px' }}>
                <div className="relative" style={{ width: '24px', height: '24px' }}>
                  <div className="absolute inset-0 bg-white transform -rotate-45" style={{ width: '16px', height: '20px', left: '4px', top: '2px' }}></div>
                  <div className="absolute bg-white transform rotate-45" style={{ width: '16px', height: '20px', left: '4px', top: '2px' }}></div>
                  <Check className="absolute text-emerald-600" size={16} style={{ left: '4px', top: '4px' }} />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">menVue</h1>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-1" />
                  <span>{loading ? 'Locating...' : cityName}</span>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                placeholder="Search products..."
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