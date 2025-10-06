import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';
import bahubaliBg from '../assets/images/backgrounds/bahubali2-bg.jpeg';

export const HeroSection = ({ movies = [] }) => {
  const heroMovies = movies.slice(0, 4); 

  return (
    <div className="hero-section">
      {heroMovies.map((movie, index) => (
        <div
          key={movie._id}
          className="hero-slide"
          style={{
          backgroundImage: `url(${bahubaliBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
         }}
        >
          <div className="hero-overlay">
            <h2 className="hero-title">{movie.title}</h2>
            <p className="hero-description">{movie.description.substring(0, 120)}...</p>
            <Link to={`/movies/${movie._id}`} className="review-btn">Review</Link>
          </div>
        </div>
      ))}
    </div>
  );
};