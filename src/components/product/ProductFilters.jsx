const sortOptions = [
  { value: "", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const ProductFilters = ({ filters, onChange, onReset }) => {
  const handleField = (field) => (event) => {
    onChange({ ...filters, [field]: event.target.value });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111214] p-5">
      <h3 className="mb-4 text-sm font-semibold text-white">Filters</h3>

      <div className="space-y-4">
        <div>
          <label className="block mb-1.5 text-xs font-medium text-gray-400">
            Category
          </label>
          <input
            type="text"
            value={filters.category || ""}
            onChange={handleField("category")}
            placeholder="e.g. Electronics"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block mb-1.5 text-xs font-medium text-gray-400">
            Brand
          </label>
          <input
            type="text"
            value={filters.brand || ""}
            onChange={handleField("brand")}
            placeholder="e.g. Nike"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600 focus:border-orange-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block mb-1.5 text-xs font-medium text-gray-400">
              Min Price
            </label>
            <input
              type="number"
              min="0"
              value={filters.minPrice || ""}
              onChange={handleField("minPrice")}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-medium text-gray-400">
              Max Price
            </label>
            <input
              type="number"
              min="0"
              value={filters.maxPrice || ""}
              onChange={handleField("maxPrice")}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1.5 text-xs font-medium text-gray-400">
            Sort by
          </label>
          <select
            value={filters.sort || ""}
            onChange={handleField("sort")}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-lg border border-white/10 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
