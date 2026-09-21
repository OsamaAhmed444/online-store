import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";

import { getProducts } from "../api/productsApi";
import ProductGrid from "../components/product/ProductGrid";

const categories = [
  { name: "Electronics", query: "Electronics" },
  { name: "Fashion", query: "Fashion" },
  { name: "Home & Living", query: "Home" },
  { name: "Sports", query: "Sports" },
];

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);

        const response = await getProducts({ featured: true });

        const data = response?.data;
        const list = Array.isArray(data)
          ? data
          : data?.products || data?.data || [];

        setFeatured(list.slice(0, 8));
      } catch (err) {
        setFeatured([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <div className="bg-[#070809] text-white">
      {/* Hero */}
      <section
        className="relative flex min-h-[520px] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/homebg.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-2xl px-4 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            New Season Arrivals
          </p>

          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            Shop Smarter with <span className="text-orange-500">Koda Store</span>
          </h1>

          <p className="max-w-xl mx-auto mt-4 text-lg text-gray-300">
            Quality products. Faster delivery. A shopping experience you can
            trust.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 mt-8 font-bold text-black transition bg-orange-500 rounded-xl hover:bg-orange-600"
          >
            Shop Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-b border-white/10 bg-[#0d0e10]">
        <div className="grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 mx-auto sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <Truck className="text-orange-500" size={26} />
            <div>
              <p className="font-semibold">Fast Delivery</p>
              <p className="text-sm text-gray-400">On all orders</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="text-orange-500" size={26} />
            <div>
              <p className="font-semibold">Secure Payment</p>
              <p className="text-sm text-gray-400">100% protected</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RefreshCw className="text-orange-500" size={26} />
            <div>
              <p className="font-semibold">Easy Returns</p>
              <p className="text-sm text-gray-400">Within 14 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl px-4 py-16 mx-auto">
        <h2 className="mb-8 text-2xl font-bold">Shop by Category</h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.query)}`}
              className="flex h-28 items-center justify-center rounded-2xl border border-white/10 bg-[#111214] text-center font-semibold text-gray-200 transition hover:border-orange-500 hover:text-orange-500"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-6xl px-4 py-16 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Products</h2>

          <Link
            to="/products"
            className="text-sm font-semibold text-orange-500 hover:underline"
          >
            View all
          </Link>
        </div>

        <ProductGrid products={featured} loading={loading} />
      </section>

      {/* Newsletter */}
      <section className="border-t border-white/10 bg-[#0d0e10]">
        <div className="max-w-2xl px-4 py-16 mx-auto text-center">
          <h2 className="text-2xl font-bold">Join our newsletter</h2>
          <p className="mt-2 text-gray-400">
            Get the latest deals and product drops straight to your inbox.
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col gap-3 mt-6 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-orange-500"
            />

            <button
              type="submit"
              className="px-6 py-3 font-bold text-black transition bg-orange-500 rounded-xl hover:bg-orange-600"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
