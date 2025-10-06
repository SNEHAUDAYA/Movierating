import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MoviesPage.css';

export const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [actors, setActors] = useState([]); // You'll need to add `actors: [String]` to your Movie model
  const [languages, setLanguages] = useState(['English', 'Hindi', 'Spanish']);
  const [selectedActor, setSelectedActor] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/movies`);
        const movieList = res.data.movies || [];
        setMovies(movieList);
        setFilteredMovies(movieList);

        const allActors = [...new Set(movieList.flatMap(m => m.actors || []))];
        setActors(allActors);
      } catch (err) {
        console.error('Failed to load movies');
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    let result = movies;
    if (selectedActor) {
      result = result.filter(movie => movie.actors?.includes(selectedActor));
    }
    if (selectedLanguage) {
      result = result.filter(movie => movie.language === selectedLanguage);
    }
    setFilteredMovies(result);
  }, [selectedActor, selectedLanguage, movies]);

  return (
    <div className="movies-page">
      <div className="movies-container">
        <aside className="filters-sidebar">
          <h3>Filters</h3>
          
          <div className="filter-group">
            <label>Actor</label>
            <select
              value={selectedActor}
              onChange={(e) => setSelectedActor(e.target.value)}
              className="filter-select"
            >
              <option value="">All Actors</option>
              {actors.map(actor => (
                <option key={actor} value={actor}>{actor}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="filter-select"
            >
              <option value="">All Languages</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </aside>

        <main className="movies-grid">
          {filteredMovies.length === 0 ? (
            <p>No movies found.</p>
          ) : (
            filteredMovies.map(movie => (
              <div key={movie._id} className="movie-item">
                {movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} className="movie-img" />}
                <div className="movie-details">
                  <h3>{movie.title}</h3>
                  <p>{movie.genre} • {movie.releaseYear}</p>
                  <Link to={`/movies/${movie._id}`} className="review-btn">Review</Link>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </div>
  );
};