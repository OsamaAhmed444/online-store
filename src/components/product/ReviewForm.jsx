import React, { useState } from "react";
import { toast } from "react-toastify";
import { addProductReview } from "../../api/productsApi";

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!comment.trim()) {
      setError("Please write a review.");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Please select a rating between 1 and 5.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await addProductReview(productId, {
        rating,
        comment: comment.trim(),
      });

      setComment("");
      setRating(5);

      setSuccess("Your review was submitted successfully!");
      toast.success("Review submitted successfully!");
    } catch (err) {
      console.error("Review submission failed:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to submit review. Please try again."
      );

      toast.error("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border p-6"
    >
      {/* Rating */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-foreground">
          Your Rating
        </label>

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="text-2xl transition-transform hover:scale-110"
              aria-label={`Rate ${star} out of 5`}
            >
              <i
                className={`fa-star ${
                  star <= rating
                    ? "fa-solid text-yellow-400"
                    : "fa-regular text-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          {rating} out of 5 stars
        </p>
      </div>

      {/* Comment */}
      <div className="mt-6">
        <label
          htmlFor="review-comment"
          className="mb-2 block text-sm font-semibold text-foreground"
        >
          Your Review
        </label>

        <textarea
          id="review-comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Write your review..."
          rows={5}
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-foreground"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          <i className="fa-solid fa-circle-exclamation mr-2" />
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-600">
          <i className="fa-solid fa-circle-check mr-2" />
          {success}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <i
          className={`fa-solid ${
            loading ? "fa-spinner fa-spin" : "fa-paper-plane"
          }`}
        />

        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;

