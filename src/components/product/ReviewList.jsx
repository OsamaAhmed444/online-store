import React, { useEffect, useState } from "react";
import { Star, Pencil, Trash2, X, Check } from "lucide-react";
import {
  getProductReviews,
  addProductReview,
  deleteProductReview,
} from "../../api/productsApi";
import useAuth from "../../hooks/useAuth";

const getReviewId = (review) => review.id || review._id;

const getReviewUserId = (review) =>
  (typeof review.user === "string" ? review.user : null) ||
  review.user?._id ||
  review.user?.id ||
  review.userId ||
  review.user_id ||
  null;

const StarPicker = ({ value, onChange }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => onChange(star)}
        className="transition-transform hover:scale-110"
        aria-label={`Rate ${star} out of 5`}
      >
        <Star
          size={18}
          className={
            star <= value
              ? "fill-yellow-400 text-yellow-400"
              : "fill-transparent text-muted-foreground"
          }
        />
      </button>
    ))}
  </div>
);

const ReviewList = ({ productId, refreshKey }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

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
  }, [productId, refreshKey]);

  const startEditing = (review) => {
    setEditingId(getReviewId(review));
    setEditRating(Number(review.rating || 0));
    setEditComment(review.comment || review.content || review.text || "");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditRating(5);
    setEditComment("");
  };

  const saveEditing = async (reviewId) => {
    if (!editComment.trim()) return;

    try {
      setSavingId(reviewId);

      // The API has no update-review endpoint (only one review per user is
      // allowed), so "editing" replaces the old review with a new one.
      await deleteProductReview(productId, reviewId);
      await addProductReview(productId, {
        rating: editRating,
        comment: editComment.trim(),
      });

      cancelEditing();
      await fetchReviews();
    } catch (err) {
      console.error("Review update failed:", err);
      alert(
        err?.response?.data?.message || "Failed to update review. Please try again."
      );
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      setDeletingId(reviewId);
      await deleteProductReview(productId, reviewId);
      setReviews((prev) => prev.filter((r) => getReviewId(r) !== reviewId));
    } catch (err) {
      console.error("Review deletion failed:", err);
      alert(
        err?.response?.data?.message || "Failed to delete review. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

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
        const reviewId = getReviewId(review);
        const rating = Number(review.rating || 0);
        const isOwner = !!user && getReviewUserId(review) === (user._id || user.id);
        const isEditing = editingId === reviewId;

        const reviewerName =
          review.user?.name ||
          review.user?.username ||
          review.username ||
          review.userName ||
          "Anonymous";

        return (
          <article
            key={reviewId}
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

              <div className="flex items-center gap-3">
                {isEditing ? (
                  <StarPicker value={editRating} onChange={setEditRating} />
                ) : (
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-transparent text-muted-foreground"
                        }
                      />
                    ))}
                  </div>
                )}

                {isOwner && !isEditing && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => startEditing(review)}
                      className="text-muted-foreground transition hover:text-foreground"
                      aria-label="Edit review"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(reviewId)}
                      disabled={deletingId === reviewId}
                      className="text-muted-foreground transition hover:text-red-500 disabled:opacity-50"
                      aria-label="Delete review"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}

                {isEditing && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => saveEditing(reviewId)}
                      disabled={savingId === reviewId}
                      className="text-muted-foreground transition hover:text-green-600 disabled:opacity-50"
                      aria-label="Save review"
                    >
                      <Check size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="text-muted-foreground transition hover:text-foreground"
                      aria-label="Cancel editing"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {isEditing ? (
              <textarea
                value={editComment}
                onChange={(event) => setEditComment(event.target.value)}
                rows={3}
                className="mt-4 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-foreground"
              />
            ) : (
              (review.comment || review.content || review.text) && (
                <p className="mt-4 leading-6 text-muted-foreground">
                  {review.comment || review.content || review.text}
                </p>
              )
            )}
          </article>
        );
      })}
    </div>
  );
};

export default ReviewList;
