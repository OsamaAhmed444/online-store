import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getProduct } from "../api/productsApi";
import {
  addToWishlist,
  removeFromWishlist,
  getMyWishlist,
} from "../api/wishlistApi";

import { cartContext1 } from "../context/CartContext";
import { getProductImages } from "../utils/productImage";
import { normalizeProduct } from "../utils/normalizeProduct";

import ProductGallery from "../components/product/ProductGallery";
import ReviewList from "../components/product/ReviewList";
import ReviewForm from "../components/product/ReviewForm";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addItemToCart } = useContext(cartContext1);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [cartLoading, setCartLoading] = useState(false);

  const [isWishlist, setIsWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProduct(id);

        setProduct(
          normalizeProduct(
            response.data?.product || response.data?.data || response.data
          )
        );
      } catch (err) {
        console.error("Product loading failed:", err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Check wishlist
  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const response = await getMyWishlist();

        const data = response.data;
        const wishlist = Array.isArray(data)
          ? data
          : data?.items || data?.wishlist || data?.data || [];

        const exists = wishlist.some((item) => {
          const productId =
            item?.productId || item?.product?._id || item?.product?.id || item?._id;

          return String(productId) === String(id);
        });

        setIsWishlist(exists);
      } catch (err) {
        console.error("Wishlist check failed:", err);
      }
    };

    if (id) {
      checkWishlist();
    }
  }, [id]);

  // Add to cart
  const handleAddToCart = async () => {
    try {
      setCartLoading(true);

      await addItemToCart(product.id, quantity);

      toast.success("Product added to cart successfully!");
    } catch (err) {
      console.error("Add to cart failed:", err);
      toast.error("Failed to add product to cart.");
    } finally {
      setCartLoading(false);
    }
  };

  // Add / Remove wishlist
  const handleWishlist = async () => {
    try {
      setWishlistLoading(true);

      if (isWishlist) {
        await removeFromWishlist(product.id);

        setIsWishlist(false);
        toast.success("Product removed from wishlist.");
      } else {
        await addToWishlist(product.id);

        setIsWishlist(true);
        toast.success("Product added to wishlist.");
      }
    } catch (err) {
      console.error("Wishlist action failed:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-foreground" />

          <p className="text-sm text-muted-foreground">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <p className="mb-4 text-red-500">
            {error || "Product not found."}
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
          >
            <i className="fa-solid fa-arrow-left mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const images = getProductImages(product);

  const price = Number(product.price || 0);

  const categoryLabel =
    typeof product.category === "string"
      ? product.category
      : product.category?.name;

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <i className="fa-solid fa-arrow-left" />
          Back to products
        </button>

        {/* Product details */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product Gallery */}
          <div>
            <ProductGallery
              images={images}
              productName={product.name}
            />
          </div>

          {/* Product Information */}
          <div className="flex flex-col">
            {/* Category */}
            {categoryLabel && (
              <p className="mb-3 text-sm font-medium capitalize text-muted-foreground">
                {categoryLabel}
              </p>
            )}

            {/* Product Name */}
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`fa-star fa-sm ${
                      star <= Math.round(product.rating || 0)
                        ? "fa-solid text-yellow-400"
                        : "fa-regular text-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              {product.rating !== undefined &&
                product.rating !== null && (
                  <span className="text-sm text-muted-foreground">
                    {Number(product.rating).toFixed(1)}
                  </span>
                )}
            </div>

            {/* Price */}
            <div className="mt-6">
              <span className="text-3xl font-bold text-foreground">
                ${price.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mt-6 border-t border-border pt-6">
                <h2 className="mb-3 text-base font-semibold text-foreground">
                  Description
                </h2>

                <p className="leading-7 text-muted-foreground">
                  {product.description}
                </p>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-8">
              <p className="mb-3 text-sm font-medium text-foreground">
                Quantity
              </p>

              <div className="flex w-fit items-center overflow-hidden rounded-lg border border-border">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  className="flex h-10 w-10 items-center justify-center text-lg transition hover:bg-muted"
                  aria-label="Decrease quantity"
                >
                  -
                </button>

                <span className="flex h-10 w-12 items-center justify-center border-x border-border text-sm font-medium">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) => current + 1)
                  }
                  className="flex h-10 w-10 items-center justify-center text-lg transition hover:bg-muted"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={cartLoading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <i
                  className={`fa-solid ${
                    cartLoading
                      ? "fa-spinner fa-spin"
                      : "fa-cart-shopping"
                  }`}
                />

                {cartLoading ? "Adding..." : "Add to Cart"}
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                disabled={wishlistLoading}
                className="flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                <i
                  className={`fa-heart ${
                    isWishlist
                      ? "fa-solid text-red-500"
                      : "fa-regular"
                  }`}
                />

                {wishlistLoading
                  ? "Loading..."
                  : isWishlist
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-16 border-t border-border pt-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                Customer Reviews
              </h2>

              <ReviewList productId={product.id} />
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                Write a Review
              </h2>

              <ReviewForm productId={product.id} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailPage;

