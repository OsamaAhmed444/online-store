import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Headset } from "lucide-react";
import { toast } from "react-toastify";

import { getProducts } from "../api/productsApi";
import { normalizeProducts } from "../utils/normalizeProduct";
import { filterTeamProducts } from "../utils/teamProduct";
import ProductGrid from "../components/product/ProductGrid";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "On all orders",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% protected",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "Within 14 days",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Dedicated help",
  },
];

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

        const response = await getProducts({ limit: 100 });

        const data = response?.data;
        const list = Array.isArray(data)
          ? data
          : data?.products || data?.data || [];

        setFeatured(filterTeamProducts(normalizeProducts(list)).slice(0, 8));
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
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section
        className="relative flex min-h-[520px] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/homebg.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-2xl px-4 text-center text-white">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-primary">
            New Season Arrivals
          </p>

          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            Shop Smarter with <span className="text-primary">Koda Store</span>
          </h1>

          <p className="max-w-xl mx-auto mt-4 text-lg text-gray-300">
            Quality products. Faster delivery. A shopping experience you can
            trust.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 mt-8 font-bold text-primary-foreground transition bg-primary rounded-xl hover:bg-primary-hover"
          >
            Shop Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-b border-border bg-surface">
        <div className="grid max-w-6xl grid-cols-2 gap-3 px-4 py-8 mx-auto sm:gap-4 sm:py-10 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-background p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg sm:flex-row sm:items-center sm:gap-4 sm:p-5 sm:text-left"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground sm:h-12 sm:w-12">
                <Icon size={20} className="sm:hidden" />
                <Icon size={22} className="hidden sm:block" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground sm:text-base">{title}</p>
                <p className="text-xs text-muted-foreground sm:text-sm">{description}</p>
              </div>
            </div>
          ))}
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
              className="flex h-28 items-center justify-center rounded-2xl border border-border bg-surface text-center font-semibold text-foreground transition hover:border-primary hover:text-primary"
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
            className="text-sm font-semibold text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        <ProductGrid products={featured} loading={loading} />
      </section>

      {/* Newsletter */}
      <section className="border-t border-border bg-surface">
        <div className="max-w-2xl px-4 py-16 mx-auto text-center">
          <h2 className="text-2xl font-bold">Join our newsletter</h2>
          <p className="mt-2 text-muted-foreground">
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
              className="flex-1 rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />

            <button
              type="submit"
              className="px-6 py-3 font-bold text-primary-foreground transition bg-primary rounded-xl hover:bg-primary-hover"
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
