import { NavLink, Link } from "react-router-dom";
import { X, LogIn, User, Heart, ShoppingCart } from "lucide-react";

import useAuth from "../../hooks/useAuth";

const MobileDrawer = ({ isOpen, onClose, navLinks = [] }) => {
  const { isAuthenticated, logout } = useAuth();

  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative flex h-full w-72 max-w-[80vw] flex-col border-r border-white/10 bg-[#0d0d0d] px-5 py-6">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <img src="/icon.png" alt="Logo" className="w-8 h-8" />
            <span className="text-lg font-bold text-white">
              Koda <span className="text-orange-500">Store</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 text-gray-400 rounded-lg hover:bg-white/5 hover:text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-orange-500/10 text-orange-500"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Link
            to="/wishlist"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-white/5 hover:text-white"
          >
            <Heart size={18} />
            Wishlist
          </Link>

          <Link
            to="/cart"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-white/5 hover:text-white"
          >
            <ShoppingCart size={18} />
            Cart
          </Link>
        </nav>

        <div className="pt-4 mt-auto border-t border-white/10">
          {isAuthenticated ? (
            <div className="flex flex-col gap-2">
              <Link
                to="/profile"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-white/5 hover:text-white"
              >
                <User size={18} />
                Profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-3 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-500"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-black bg-orange-500 rounded-lg hover:bg-orange-600"
            >
              <LogIn size={18} />
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
