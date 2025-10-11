import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HeroSection } from '../components/HeroSection';
import MovieCarousel from '../components/MovieCarousel';
import './Home.css';

export const Home = () => {
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/movies`);
        setAllMovies(res.data.data || []);
      } catch (err) {
        console.error('Failed to load movies');
      }
    };
    fetchMovies();
  }, []);

  const newMovies = allMovies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const thrillerMovies = allMovies.filter(m => m.genre === 'Thriller');
  const actionMovies = allMovies.filter(m => m.genre === 'Action');

  return (
    <div className="home-page">
      <HeroSection movies={allMovies} />
      <MovieCarousel />
      <div className="all-movies-btn-container">
        <a href="/movies" className="all-movies-btn">View All Movies</a>
      </div>
    </div>
  );
};