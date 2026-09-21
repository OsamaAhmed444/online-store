import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-[#0c0d0e] text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800/60 transition-colors duration-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* logo & desc */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/icon.png" 
                alt="Nexora Logo" 
                className="w-7 h-7 object-contain" 
              />
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold tracking-wide text-gray-900 dark:text-white">Nexora</span>
                <span className="text-[8px] tracking-widest text-gray-500 dark:text-gray-400 font-semibold uppercase">KODA STORE</span>
              </div>
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              Shop the future, delivered today. Premium products at the best prices with fast delivery across Egypt.
            </p>
          </div>

          {/*Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold text-xs mb-3 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/shop" className="hover:text-orange-500 transition">Shop</Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-orange-500 transition">My Orders</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-orange-500 transition">Wishlist</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-orange-500 transition">Profile</Link>
              </li>
            </ul>
          </div>

          {/*Customer Service */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold text-xs mb-3 uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#faq" className="hover:text-orange-500 transition">FAQ</a>
              </li>
              <li>
                <a href="#returns" className="hover:text-orange-500 transition">Returns</a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-orange-500 transition">Shipping</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orange-500 transition">Contact Us</a>
              </li>
            </ul>
          </div>

          {/*Follow Us */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold text-xs mb-3 uppercase tracking-wider">Follow Us</h4>
            <div className="flex items-center gap-2">
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 bg-white dark:bg-[#16181d] rounded-lg border border-gray-300 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white hover:border-orange-500 hover:bg-orange-500 dark:hover:text-white dark:hover:border-orange-500 dark:hover:bg-orange-500/10 transition shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Twitter / X */}
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 bg-white dark:bg-[#16181d] rounded-lg border border-gray-300 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white hover:border-orange-500 hover:bg-orange-500 dark:hover:text-white dark:hover:border-orange-500 dark:hover:bg-orange-500/10 transition shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 bg-white dark:bg-[#16181d] rounded-lg border border-gray-300 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white hover:border-orange-500 hover:bg-orange-500 dark:hover:text-white dark:hover:border-orange-500 dark:hover:bg-orange-500/10 transition shadow-sm"
              >
                <svg className="w-4 h-4 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* YouTube */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 bg-white dark:bg-[#16181d] rounded-lg border border-gray-300 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white hover:border-orange-500 hover:bg-orange-500 dark:hover:text-white dark:hover:border-orange-500 dark:hover:bg-orange-500/10 transition shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        
        <div className="pt-6 border-t border-gray-200 dark:border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-500">
          <p>© {new Date().getFullYear()} Nexora Store. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <a href="#terms" className="hover:underline">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}