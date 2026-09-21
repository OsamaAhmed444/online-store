import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function MobileDrawer({ isOpen, onClose }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  if (!isOpen) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* 1.Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* 2.Drawer Content */}
      <div className="fixed right-0 top-0 bottom-0 w-4/5 max-w-xs bg-white dark:bg-[#0c0d0e] text-gray-900 dark:text-white shadow-2xl flex flex-col justify-between p-5 border-l border-gray-200 dark:border-gray-800 transition-colors duration-200">
        <div>
          {/*Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <img 
                src="/icon.png" 
                alt="Nexora Logo" 
                className="w-6 h-6 object-contain" 
              />
              <span className="font-bold text-base tracking-wide text-gray-900 dark:text-white">Nexora</span>
            </div>
            {/*close button */}
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* bar search*/}
          <div className="mt-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-gray-100 dark:bg-[#16181d] text-xs text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg px-3 py-2 border border-gray-300 dark:border-gray-800 focus:outline-none dark:focus:outline-none focus:border-orange-500  dark:focus:border-orange-500"
              />
              <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/*Navigation Links */}
          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={onClose}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${isActive('/') ? 'bg-orange-500/10 text-orange-500' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'}`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={onClose}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${isActive('/shop') ? 'bg-orange-500/10 text-orange-500' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'}`}
            >
              Shop
            </Link>
            <Link
              to="/orders"
              onClick={onClose}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${isActive('/orders') ? 'bg-orange-500/10 text-orange-500' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'}`}
            >
              My Orders
            </Link>
            <Link
              to="/wishlist"
              onClick={onClose}
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between transition ${isActive('/wishlist') ? 'bg-orange-500/10 text-orange-500' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'}`}
            >
              <span>Wishlist</span>
              <svg className="w-4 h-4 text-gray-400 dark:hover:text-orange-500 hover:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
          </nav>
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                    {user.name || 'User'}
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    {user.role || 'Member'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => { logout(); onClose(); }} 
                className="text-xs text-red-500 hover:underline font-medium px-2 py-1"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              onClick={onClose}
              className="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold py-2.5 rounded-lg transition"
            >
              Login / Sign Up
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}