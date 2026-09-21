import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

import { useCart } from "../../hooks/useCart";

const ProductCard = ({ product }) => {
  const { addItemToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const image =
    product?.images?.[0] ||
    product?.imageUrls?.[0] ||
    product?.image ||
    "";

  const price = Number(product?.price || 0);
  const discountPrice =
    product?.discountPrice != null ? Number(product.discountPrice) : null;
  const hasDiscount = discountPrice != null && discountPrice < price;

  const rating = Number(product?.rating || 0);

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
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111214] transition hover:border-orange-500/50"
    >
      <div className="aspect-square w-full overflow-hidden bg-[#1a1b1f]">
        {image ? (
          <img
            src={image}
            alt={product?.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-600">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4">
        {product?.category?.name && (
          <p className="mb-1 text-xs font-medium text-orange-500">
            {product.category.name}
          </p>
        )}

        <h3 className="text-sm font-semibold text-white line-clamp-2">
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
                  : "text-gray-700"
              }
            />
          ))}
          {rating > 0 && (
            <span className="ml-1 text-xs text-gray-500">
              {rating.toFixed(1)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white">
              ${(hasDiscount ? discountPrice : price).toFixed(2)}
            </span>

            {hasDiscount && (
              <span className="text-xs text-gray-500 line-through">
                ${price.toFixed(2)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={loading}
            className="flex items-center justify-center w-9 h-9 text-black transition bg-orange-500 rounded-lg hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
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
