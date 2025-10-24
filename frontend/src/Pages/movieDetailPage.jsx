import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./MovieDetail.css";

export const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchMovieAndReviews = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // Updated URLs to include /api prefix
        const movieRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/movies/${id}`,
          { headers }
        );
        setMovie(movieRes.data.data);

        const reviewsRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/movies/${id}/reviews`,
          { headers }
        );
        setReviews(reviewsRes.data.data);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchMovieAndReviews();
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/movies/${id}/reviews`,
        newReview,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update reviews list and movie rating
      setReviews([...reviews, response.data.data]);
      setMovie((prev) => ({
        ...prev,
        averageRating: response.data.averageRating,
        totalReviews: response.data.totalReviews,
      }));
      setNewReview({ rating: 5, comment: "" });
      setSubmitError("");
    } catch (err) {
      setSubmitError(err?.response?.data?.message || "Failed to submit review");
    }
  };

  if (loading) return <div className="md-loading">Loading...</div>;
  if (error) return <div className="md-error">{error}</div>;
  if (!movie) return <div className="md-empty">Movie not found</div>;

  const roundedRating = Math.max(
    0,
    Math.min(5, Math.round(movie.averageRating || 0))
  );

  return (
    <section className="movie-detail">
      <div className="md-container">
        <div className="md-media">
          {movie.imageUrl ? (
            <img src={movie.imageUrl} alt={movie.title} className="md-poster" />
          ) : (
            <div className="md-poster md-placeholder" />
          )}
        </div>

        <div className="md-info">
          <h1 className="md-title">{movie.title}</h1>
          <p className="md-sub">
            {movie.genre} • {movie.releaseYear} • {movie.language || "—"}
          </p>

          <div className="md-rating-row">
            <div className="md-stars" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`md-star ${i < roundedRating ? "filled" : ""}`}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="md-score">
              {(movie.averageRating ?? 0).toFixed(1)} / 5
            </div>
            <div className="md-reviews">({movie.totalReviews ?? 0} reviews)</div>
          </div>

          <div className="md-meta">
            <div>
              <strong>Director:</strong> {movie.director || "—"}
            </div>
            <div>
              <strong>Actors:</strong>{" "}
              {Array.isArray(movie.actors) && movie.actors.length
                ? movie.actors.join(", ")
                : "—"}
            </div>
          </div>

          <div className="md-desc">
            <h2>Overview</h2>
            <p>{movie.description || "No description available."}</p>
          </div>

          <div className="md-actions">
            <Link to="/movies" className="md-btn md-btn--muted">
              Back to list
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>Reviews</h2>

        {user ? (
          <form onSubmit={handleSubmitReview} className="review-form">
            <div className="rating-input">
              <label>Rating:</label>
              <select
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview((prev) => ({
                    ...prev,
                    rating: Number(e.target.value),
                  }))
                }
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>
                    {num} stars
                  </option>
                ))}
              </select>
            </div>

            <div className="comment-input">
              <label>Your Review:</label>
              <textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview((prev) => ({
                    ...prev,
                    comment: e.target.value,
                  }))
                }
                required
                minLength={10}
                placeholder="Write your review here (minimum 10 characters)"
              />
            </div>

            {submitError && (
              <div className="error-message">{submitError}</div>
            )}

            <button type="submit" className="submit-review-btn">
              Submit Review
            </button>
          </form>
        ) : (
          <div className="login-prompt">
            <Link to="/login">Login to write a review</Link>
          </div>
        )}

        <div className="reviews-list">
          {reviews.map((review) => (
            <div key={review._id} className="review-item">
              <div className="review-header">
                <div className="stars">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
                <span className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="review-comment">{review.comment}</p>
              <div className="review-author">
                By: {review.user.username || "Anonymous"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieDetail;