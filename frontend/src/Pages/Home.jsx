import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { HeroSection } from "../components/HeroSection";
import MovieCarousel from "../components/MovieCarousel";
import "./Home.css";

export const Home = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/movies`,
          { headers }
        );
        setAllMovies(response.data.data || []);
      } catch (err) {
        setError("Failed to load movies");
        console.error("Failed to load movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const newMovies = [...allMovies]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);
  const thrillerMovies = allMovies
    .filter((m) => m.genre === "Thriller")
    .slice(0, 6);
  const actionMovies = allMovies
    .filter((m) => m.genre === "Action")
    .slice(0, 6);

  return (
    <div className="home-page">
      <HeroSection movies={newMovies.slice(0, 3)} />

      <section className="movie-section">
        <h2>Latest Releases</h2>
        <div className="movie-grid">
          {newMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="movie-section">
        <h2>Thriller Movies</h2>
        <div className="movie-grid">
          {thrillerMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="movie-section">
        <h2>Action Movies</h2>
        <div className="movie-grid">
          {actionMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>

      <div className="all-movies-btn-container">
        <Link to="/movies" className="all-movies-btn">
          View All Movies
        </Link>
      </div>
    </div>
  );
};

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie._id}`} className="movie-card">
      <div className="movie-image">
        <img
          src={movie.imageUrl || "/default-movie.jpg"}
          alt={movie.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/default-movie.jpg";
          }}
          height={200}
        />
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.releaseYear}</p>
        <div className="rating">
          <span>★ {movie.averageRating.toFixed(1)}</span>
          <span className="reviews">({movie.totalReviews} reviews)</span>
        </div>
      </div>
    </Link>
  );
};
