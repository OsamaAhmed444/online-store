import { NavLink, Link } from "react-router-dom";
import { X, LogIn, User, Heart, ShoppingCart, Sun, Moon } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";

const MobileDrawer = ({ isOpen, onClose, navLinks = [] }) => {
  const { isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

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

      <div className="relative flex h-full w-72 max-w-[80vw] flex-col border-r border-border bg-background px-5 py-6">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <img src="/icon.png" alt="Logo" className="w-8 h-8" />
            <span className="text-lg font-bold text-foreground">
              Koda <span className="text-primary">Store</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:bg-surface-hover hover:text-foreground"
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
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Link
            to="/wishlist"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-surface-hover hover:text-foreground"
          >
            <Heart size={18} />
            Wishlist
          </Link>

          <Link
            to="/cart"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-surface-hover hover:text-foreground"
          >
            <ShoppingCart size={18} />
            Cart
          </Link>

          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-left rounded-lg text-muted-foreground hover:bg-surface-hover hover:text-foreground"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            {isDark ? "Light mode" : "Dark mode"}
          </button>
        </nav>

        <div className="pt-4 mt-auto border-t border-border">
          {isAuthenticated ? (
            <div className="flex flex-col gap-2">
              <Link
                to="/profile"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-muted-foreground hover:bg-surface-hover hover:text-foreground"
              >
                <User size={18} />
                Profile
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-3 text-sm font-semibold rounded-lg bg-danger text-danger-foreground hover:opacity-90"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
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
