import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import MobileDrawer from './MobileDrawer';

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
 
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || document.documentElement.classList.contains('dark');
  });

  const location = useLocation();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <header className="bg-white dark:bg-[#0c0d0e] text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800/60 sticky top-0 z-40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* 1. Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img 
            src="/icon.png" 
            alt="Nexora Logo" 
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain " 
          />
          <div className="flex flex-col leading-none">
            <span className="text-base sm:text-lg font-bold tracking-wide text-gray-900 dark:text-white">Nexora</span>
            <span className="text-[8px] sm:text-[9px] tracking-widest text-gray-500 dark:text-gray-400 font-semibold uppercase">KODA STORE</span>
          </div>
        </Link>

        {/* 2. Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          <Link 
            to="/" 
            className={`transition ${isActive('/') ? 'text-orange-500 border-b-2 border-orange-500 pb-1' : 'text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-500'}`}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className={`transition ${isActive('/shop') ? 'text-orange-500 border-b-2 border-orange-500 pb-1' : 'text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-500'}`}
          >
            Shop
          </Link>
          <Link 
            to="/orders" 
            className={`transition ${isActive('/orders') ? 'text-orange-500 border-b-2 border-orange-500 pb-1' : 'text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-500'}`}
          >
            My Orders
          </Link>
          <Link 
            to="/wishlist" 
            className={`transition ${isActive('/wishlist') ? 'text-orange-500 border-b-2 border-orange-500 pb-1' : 'text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-500'}`}
          >
            Wishlist
          </Link>
        </nav>

        {/* 3. Search Bar */}
        <div className="hidden md:flex flex-1 max-w-sm relative">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full bg-gray-100 dark:bg-[#16181d] text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-800 focus:outline-none dark:focus:outline-none focus:border-orange-500  dark:focus:border-orange-500 transition"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* 4. Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Theme Toggle Switch */}
          <button 
            onClick={toggleDarkMode}
            className="p-1.5 sm:p-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/60"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Wishlist Icon */}
          <Link to="/wishlist" className="hidden sm:block p-2 text-gray-700 dark:text-gray-300 hover:text-orange-500  dark:hover:text-orange-500 transition relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="p-1.5 sm:p-2 text-gray-700 dark:text-gray-300 hover:text-orange-500  dark:hover:text-orange-500 transition relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Section */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#16181d] border border-gray-300 dark:border-gray-800 rounded-lg px-2.5 py-1">
                  <div className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 tracking-wider">
                    {user.role || user.name || 'USER'}
                  </span>
                </div>
                <button 
                  onClick={logout} 
                  className="text-xs text-gray-500 hover:text-red-500 transition ml-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium px-4 py-2 rounded-lg transition">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="lg:hidden p-1.5 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </header>
  );
}