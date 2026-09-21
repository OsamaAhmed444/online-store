import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingCart, User, Heart, Sun, Moon } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import useTheme from "../../hooks/useTheme";
import MobileDrawer from "./MobileDrawer";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/products", label: "Products" },
  { to: "/team", label: "Team" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const { isDark, toggleTheme } = useTheme();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const query = search.trim();

    navigate(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/login");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="flex items-center justify-between h-16 max-w-6xl gap-4 px-4 mx-auto">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-lg text-foreground lg:hidden hover:bg-surface-hover"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="hidden items-center gap-2 shrink-0 sm:flex">
            <img
              src="/icon.png"
              alt="Logo"
              className="object-contain w-8 h-8"
            />
            <span className="text-lg font-bold tracking-tight text-foreground">
              Koda <span className="text-primary">Store</span>
            </span>
          </Link>

          <nav className="items-center hidden gap-1 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <form
            onSubmit={handleSearchSubmit}
            className="items-center flex-1 hidden max-w-sm md:flex"
          >
            <div className="relative w-full">
              <Search
                size={16}
                className="absolute -translate-y-1/2 left-3 top-1/2 text-muted-foreground"
              />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                className="w-full rounded-xl border border-border bg-muted py-2 pl-9 pr-3 text-sm text-foreground placeholder-muted-foreground outline-none transition focus:border-primary"
              />
            </div>
          </form>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground transition hover:bg-surface-hover hover:text-foreground"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <Link
              to="/wishlist"
              className="items-center justify-center hidden w-10 h-10 rounded-lg text-muted-foreground sm:flex hover:bg-surface-hover hover:text-foreground"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:bg-surface-hover hover:text-foreground"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-[10px] font-bold text-primary-foreground bg-primary rounded-full -top-1 -right-1">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="items-center hidden gap-2 lg:flex">
                <Link
                  to="/profile"
                  className="flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:bg-surface-hover hover:text-foreground"
                  aria-label="Profile"
                >
                  <User size={20} />
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg bg-danger px-4 py-2 text-sm font-semibold text-danger-foreground transition hover:opacity-90"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover lg:block"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
};

export default Navbar;
