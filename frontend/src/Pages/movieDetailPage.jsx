import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./MovieDetail.css";

export const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError("");
      try {
        const token =
          localStorage.getItem("token") || localStorage.getItem("authToken");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const url = `${import.meta.env.VITE_API_BASE_URL}/movies/${id}`;
        const res = await axios.get(url, { headers });
        const data = res.data?.data || res.data?.movie || res.data;
        setMovie(data);
      } catch (err) {
        setError(
          err?.response?.data?.message || err?.message || "Failed to load movie"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

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
            <Link to={`/movies/${id}`} className="md-btn">
              Refresh
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetail;