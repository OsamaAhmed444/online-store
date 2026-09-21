import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Search, X } from "lucide-react";

import { getProducts } from "../api/productsApi";
import { normalizeProducts } from "../utils/normalizeProduct";
import { filterTeamProducts } from "../utils/teamProduct";
import ProductGrid from "../components/product/ProductGrid";
import ProductFilters from "../components/product/ProductFilters";
import Pagination from "../components/common/Pagination";
import useDebounce from "../hooks/useDebounce";

const PAGE_SIZE = 12;

const getCategoryLabel = (product) =>
  typeof product.category === "string" ? product.category : product.category?.name;

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
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  // The API only supports server-side pagination/search, not filtering by
  // subcategory — so the full catalog is fetched once, restricted to this
  // team's products client-side, and filtered/paginated locally from there.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProducts({ limit: 100 });

        const data = response?.data;
        const list = Array.isArray(data)
          ? data
          : data?.products || data?.data || [];

        setAllProducts(filterTeamProducts(normalizeProducts(list)));
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Failed to load products.");
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoryOptions = useMemo(
    () => [...new Set(allProducts.map(getCategoryLabel).filter(Boolean))],
    [allProducts]
  );

  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    const query = debouncedSearch.trim().toLowerCase();
    if (query) {
      list = list.filter((product) =>
        String(product.name || "").toLowerCase().includes(query)
      );
    }

    if (filters.category) {
      list = list.filter((product) => getCategoryLabel(product) === filters.category);
    }

    if (filters.brand) {
      const brandQuery = filters.brand.trim().toLowerCase();
      list = list.filter((product) =>
        String(product.brand || "").toLowerCase().includes(brandQuery)
      );
    }

    if (filters.minPrice) {
      list = list.filter((product) => Number(product.price) >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      list = list.filter((product) => Number(product.price) <= Number(filters.maxPrice));
    }

    if (filters.sort === "price_asc") {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (filters.sort === "price_desc") {
      list.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (filters.sort === "rating") {
      list.sort((a, b) => Number(b.rating || b.averageRating || 0) - Number(a.rating || a.averageRating || 0));
    }

    return list;
  }, [allProducts, debouncedSearch, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const pagedProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
    <div className="min-h-screen bg-background text-foreground">
      <section
        className="relative flex h-56 items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/shopbg.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 text-center text-white">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-primary">
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
              className="absolute -translate-y-1/2 left-3 top-1/2 text-muted-foreground"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search products..."
              className="w-full rounded-xl border border-border bg-muted py-3 pl-10 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition hover:bg-surface-hover lg:hidden"
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
              categoryOptions={categoryOptions}
            />
          </aside>

          <div>
            {error && (
              <div className="p-4 mb-4 text-sm text-red-400 border rounded-xl border-red-500/20 bg-red-500/10">
                {error}
              </div>
            )}

            <ProductGrid products={pagedProducts} loading={loading} />

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
