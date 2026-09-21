import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingCart, User, Heart } from "lucide-react";

import useAuth from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
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
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur">
        <div className="flex items-center justify-between h-16 max-w-6xl gap-4 px-4 mx-auto">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center justify-center w-10 h-10 text-white rounded-lg lg:hidden hover:bg-white/5"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/icon.png" alt="Logo" className="object-contain w-8 h-8" />
            <span className="hidden text-lg font-bold tracking-tight text-white sm:inline">
              Koda <span className="text-orange-500">Store</span>
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
                      ? "bg-orange-500/10 text-orange-500"
                      : "text-gray-300 hover:text-white"
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
                className="absolute -translate-y-1/2 left-3 top-1/2 text-zinc-500"
              />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-orange-500"
              />
            </div>
          </form>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/wishlist"
              className="items-center justify-center hidden w-10 h-10 text-gray-300 rounded-lg sm:flex hover:bg-white/5 hover:text-white"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>

            <Link
              to="/cart"
              className="relative flex items-center justify-center w-10 h-10 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-[10px] font-bold text-black bg-orange-500 rounded-full -top-1 -right-1">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="items-center hidden gap-2 lg:flex">
                <Link
                  to="/profile"
                  className="flex items-center justify-center w-10 h-10 text-gray-300 rounded-lg hover:bg-white/5 hover:text-white"
                  aria-label="Profile"
                >
                  <User size={20} />
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-semibold text-white transition bg-red-600 rounded-lg hover:bg-red-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden px-4 py-2 text-sm font-semibold text-black transition bg-orange-500 rounded-lg lg:block hover:bg-orange-600"
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
