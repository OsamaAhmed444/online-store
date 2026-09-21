const sortOptions = [
  { value: "", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

const fieldClasses =
  "w-full rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary";

const ProductFilters = ({ filters, onChange, onReset, categoryOptions = [] }) => {
  const handleField = (field) => (event) => {
    onChange({ ...filters, [field]: event.target.value });
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <h3 className="mb-4 text-sm font-semibold text-foreground">Filters</h3>

      <div className="space-y-4">
        <div>
          <label className="block mb-1.5 text-xs font-medium text-muted-foreground">
            Category
          </label>
          <select
            value={filters.category || ""}
            onChange={handleField("category")}
            className={`${fieldClasses} capitalize`}
          >
            <option value="">All Categories</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category} className="capitalize">
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1.5 text-xs font-medium text-muted-foreground">
            Brand
          </label>
          <input
            type="text"
            value={filters.brand || ""}
            onChange={handleField("brand")}
            placeholder="e.g. Nike"
            className={fieldClasses}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block mb-1.5 text-xs font-medium text-muted-foreground">
              Min Price
            </label>
            <input
              type="number"
              min="0"
              value={filters.minPrice || ""}
              onChange={handleField("minPrice")}
              className={fieldClasses}
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-medium text-muted-foreground">
              Max Price
            </label>
            <input
              type="number"
              min="0"
              value={filters.maxPrice || ""}
              onChange={handleField("maxPrice")}
              className={fieldClasses}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1.5 text-xs font-medium text-muted-foreground">
            Sort by
          </label>
          <select
            value={filters.sort || ""}
            onChange={handleField("sort")}
            className={fieldClasses}
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
          className="w-full rounded-lg border border-border py-2 text-sm font-medium text-muted-foreground transition hover:bg-surface-hover"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
