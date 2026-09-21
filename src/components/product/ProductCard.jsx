import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { useCart } from "../../hooks/useCart";
import { getProductImages } from "../../utils/productImage";

const ProductCard = ({ product }) => {
  const { addItemToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const image = getProductImages(product)[0] || "";

  const price = Number(product?.price || 0);
  const discountPrice =
    product?.discountPrice != null ? Number(product.discountPrice) : null;
  const hasDiscount = discountPrice != null && discountPrice < price;

  const rating = Number(product?.rating || 0);

  const categoryLabel =
    typeof product?.category === "string"
      ? product.category
      : product?.category?.name;

  const handleAddToCart = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      setLoading(true);
      await addItemToCart(product.id, 1);
      toast.success("Product added to cart!");
    } catch (err) {
      toast.error("Failed to add product to cart.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition hover:border-primary/50"
    >
      <div className="aspect-square w-full overflow-hidden bg-muted">
        {image ? (
          <img
            src={image}
            alt={product?.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-muted-foreground">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4">
        {categoryLabel && (
          <p className="mb-1 text-xs font-medium text-primary capitalize">
            {categoryLabel}
          </p>
        )}

        <h3 className="text-sm font-semibold text-foreground line-clamp-2">
          {product?.name}
        </h3>

        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={13}
              className={
                star <= Math.round(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground/40"
              }
            />
          ))}
          {rating > 0 && (
            <span className="ml-1 text-xs text-muted-foreground">
              {rating.toFixed(1)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              ${(hasDiscount ? discountPrice : price).toFixed(2)}
            </span>

            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">
                ${price.toFixed(2)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={loading}
            className="flex items-center justify-center w-9 h-9 text-primary-foreground transition bg-primary rounded-lg hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Add to cart"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ShoppingCart size={16} />
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
