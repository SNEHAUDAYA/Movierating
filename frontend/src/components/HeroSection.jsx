import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

export const HeroSection = ({ movies }) => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const movie = movies[current];

  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `${
          movie.imageUrl ? `url(${movie.imageUrl})` : "none"
        }`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="dark-overlay"></div>

      <div className="hero-content fade-in">
        <img src={movie.imageUrl} alt={movie.title} className="hero-poster" />
        <div className="hero-text">
          <h2 className="hero-title">{movie.title}</h2>
          <span>★ {movie.averageRating.toFixed(1)}</span>
          <p className="hero-year">{movie.year}</p>
          <span className="reviews mx-2!">({movie.totalReviews} reviews)</span>
          <Link to={`/movie/${movie._id}`} className="review-btn">
            Review
          </Link>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="hero-dots">
        {movies.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};
