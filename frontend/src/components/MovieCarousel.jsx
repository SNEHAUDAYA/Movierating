import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCarousel.css';

export const MovieCarousel = ({ title, movies = [] }) => {
  return (
    <section className="carousel-section">
      <h2 className="section-title">{title}</h2>
      <div className="carousel-container">
        {movies.slice(0, 10).map((movie, index) => (
          <div key={movie._id} className="movie-card">
            <div className="card-number">{index + 1}</div>
            {movie.imageUrl && (
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="movie-poster"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            )}
            {!movie.imageUrl && (
              <div className="poster-placeholder">
                {movie.title.substring(0, 2)}
              </div>
            )}
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-year">{movie.releaseYear}</p>
              <Link to={`/movies/${movie._id}`} className="review-btn small">Review</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};