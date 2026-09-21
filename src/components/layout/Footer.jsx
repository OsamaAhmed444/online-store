import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] text-gray-400">
      <div className="grid max-w-6xl gap-8 px-4 py-12 mx-auto sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="/icon.png" alt="Logo" className="w-8 h-8" />
            <span className="text-lg font-bold text-white">
              Koda <span className="text-orange-500">Store</span>
            </span>
          </div>
          <p className="text-sm leading-6">
            Quality products, faster delivery, and a shopping experience you
            can trust.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/products" className="transition hover:text-orange-500">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="transition hover:text-orange-500">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="transition hover:text-orange-500">
                Wishlist
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">Account</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/profile" className="transition hover:text-orange-500">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/profile/orders" className="transition hover:text-orange-500">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/team" className="transition hover:text-orange-500">
                Our Team
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-white">Follow us</h3>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 transition hover:bg-orange-500 hover:text-black"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 transition hover:bg-orange-500 hover:text-black"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 transition hover:bg-orange-500 hover:text-black"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 transition hover:bg-orange-500 hover:text-black"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-gray-500">
        &copy; {year} Koda Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
