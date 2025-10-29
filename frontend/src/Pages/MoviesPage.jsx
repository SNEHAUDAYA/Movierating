import React, { useState, useEffect } from "react";
import axios from "axios";
import { MovieCard } from "../components/MovieCard";
import "./MoviesPage.css";


export const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    fetchMovies();
  }, [searchTerm, selectedGenre]);

  const fetchMovies = async () => {
    try {
      const token = localStorage.getItem("token");
      let url = `http://localhost:8080/api/movies`;

      // Add query parameters if search or genre filters are applied
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (selectedGenre) params.append("genre", selectedGenre);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMovies(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container! mx-auto! px-4! py-8!">
      <div className="mb-6!">
        <input
          type="text"
          placeholder="Search movies..."
          className="p-2! border! rounded! mr-4!"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2! border! rounded!"
        >
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
          <option value="Animation">Animation</option>
          <option value="Documentary">Documentary</option>
        </select>
      </div>

      <div className="movies-listing-grid">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
