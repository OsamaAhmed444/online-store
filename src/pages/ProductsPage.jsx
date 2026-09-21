import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Search, X } from "lucide-react";

import { getProducts, searchProducts } from "../api/productsApi";
import ProductGrid from "../components/product/ProductGrid";
import ProductFilters from "../components/product/ProductFilters";
import Pagination from "../components/common/Pagination";
import useDebounce from "../hooks/useDebounce";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const params = {
          page,
          limit: 12,
          category: filters.category || undefined,
          brand: filters.brand || undefined,
          minPrice: filters.minPrice || undefined,
          maxPrice: filters.maxPrice || undefined,
          sort: filters.sort || undefined,
        };

        const response = debouncedSearch.trim()
          ? await searchProducts({ ...params, q: debouncedSearch.trim() })
          : await getProducts(params);

        const data = response?.data;
        const list = Array.isArray(data)
          ? data
          : data?.products || data?.data || [];

        setProducts(list);
        setTotalPages(data?.totalPages || data?.pages || 1);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Failed to load products.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearch, filters, page]);

  const handleFiltersChange = (nextFilters) => {
    setFilters(nextFilters);
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters({ category: "", brand: "", minPrice: "", maxPrice: "", sort: "" });
    setSearch("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#070809] text-white">
      <section
        className="relative flex h-56 items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/shopbg.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
            Shop
          </p>
          <h1 className="text-3xl font-black md:text-4xl">All Products</h1>
        </div>
      </section>

      <div className="max-w-6xl px-4 py-10 mx-auto">
        <div className="flex flex-col gap-3 mb-6 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute -translate-y-1/2 left-3 top-1/2 text-zinc-500"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search products..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-orange-500"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-200 transition hover:bg-white/5 lg:hidden"
          >
            {showFilters ? <X size={16} /> : <SlidersHorizontal size={16} />}
            Filters
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <ProductFilters
              filters={filters}
              onChange={handleFiltersChange}
              onReset={handleResetFilters}
            />
          </aside>

          <div>
            {error && (
              <div className="p-4 mb-4 text-sm text-red-400 border rounded-xl border-red-500/20 bg-red-500/10">
                {error}
              </div>
            )}

            <ProductGrid products={products} loading={loading} />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
