import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems } = useCart();
  const [currentLocation, setCurrentLocation] = useState('123 Main St, Apt 4B');
  
  const cartItemCount = getTotalItems();

  const handleSearch = (query) => {
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  const handleLocationClick = () => {
    // In a real app, this would open a location picker
    console.log('Open location picker');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const shouldShowSearch = location.pathname === '/' || location.pathname.startsWith('/category');

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-heading font-bold text-gray-900 hidden sm:block">
                QuickMart
              </span>
            </button>

            {/* Delivery Location */}
            <button
              onClick={handleLocationClick}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <ApperIcon name="MapPin" className="w-4 h-4" />
              <div className="text-left hidden sm:block">
                <p className="text-xs text-gray-500">Deliver to</p>
                <p className="font-medium truncate max-w-32">{currentLocation}</p>
              </div>
              <ApperIcon name="ChevronDown" className="w-4 h-4" />
            </button>
          </div>

          {/* Search Bar */}
          {shouldShowSearch && (
            <div className="flex-1 max-w-2xl mx-4 hidden md:block">
              <SearchBar onSearch={handleSearch} />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Search button for mobile */}
            {shouldShowSearch && (
              <Button
                variant="ghost"
                size="sm"
                icon="Search"
                className="md:hidden"
                onClick={() => {
                  // In a real app, this would open a search modal
                  console.log('Open search modal');
                }}
              />
            )}

            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCartClick}
              className="relative"
            >
              <ApperIcon name="ShoppingCart" className="w-6 h-6" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {shouldShowSearch && (
          <div className="pb-4 md:hidden">
            <SearchBar onSearch={handleSearch} />
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;