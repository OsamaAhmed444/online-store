import React, { useEffect, useState } from "react";
import { getProductReviews } from "../../api/productsApi";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getProductReviews(productId);

      const data = response.data;

      if (Array.isArray(data)) {
        setReviews(data);
      } else if (Array.isArray(data?.reviews)) {
        setReviews(data.reviews);
      } else if (Array.isArray(data?.data)) {
        setReviews(data.data);
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error("Reviews loading failed:", err);
      setError("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center gap-3 py-8">
        <i className="fa-solid fa-spinner fa-spin text-lg" />

        <span className="text-sm text-muted-foreground">
          Loading reviews...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <div className="flex items-center gap-2 text-red-600">
          <i className="fa-solid fa-circle-exclamation" />

          <p className="text-sm">{error}</p>
        </div>

        <button
          type="button"
          onClick={fetchReviews}
          className="mt-3 text-sm font-medium text-red-600 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="rounded-xl border border-border p-6 text-center">
        <i className="fa-regular fa-comment-dots mb-3 text-2xl text-muted-foreground" />

        <p className="text-sm text-muted-foreground">
          No reviews yet. Be the first to review this product!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const rating = Number(review.rating || 0);

        const reviewerName =
          review.user?.name ||
          review.user?.username ||
          review.username ||
          review.userName ||
          "Anonymous";

        return (
          <article
            key={review.id}
            className="rounded-xl border border-border p-5"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-foreground">
                  {reviewerName}
                </p>

                {review.createdAt && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`fa-star text-sm ${
                      star <= rating
                        ? "fa-solid text-yellow-400"
                        : "fa-regular text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>

            {(review.comment || review.content || review.text) && (
              <p className="mt-4 leading-6 text-muted-foreground">
                {review.comment || review.content || review.text}
              </p>
            )}
          </article>
        );
      })}
    </div>
  );
};

export default ReviewList;

