import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="
          flex h-9 w-9
          items-center justify-center
          rounded-lg
          border border-border
          text-muted-foreground
          transition
          hover:bg-surface-hover
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`
            flex h-9 min-w-9
            items-center justify-center
            rounded-lg
            px-3
            text-sm
            transition
            ${
              page === currentPage
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:bg-surface-hover"
            }
          `}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="
          flex h-9 w-9
          items-center justify-center
          rounded-lg
          border border-border
          text-muted-foreground
          transition
          hover:bg-surface-hover
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}