import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

// ✅ Background images
import aceBg from "../assets/images/backgrounds/ace-bg.jpg";
import amaranBg from "../assets/images/backgrounds/amaran-bg1.jpg";
import jawanBg from "../assets/images/backgrounds/jawan-bg.jpg";
import luckyBaskarBg from "../assets/images/backgrounds/luckybaskar-bg.jpg";
import goatBg from "../assets/images/backgrounds/goat-bg.jpeg";

// ✅ Movie posters
import acePoster from "../assets/images/posters/ace.jpeg";
import amaranPoster from "../assets/images/posters/amaran.jpeg";
import jawanPoster from "../assets/images/posters/jawaan.jpeg";
import luckyBaskarPoster from "../assets/images/posters/luckybaskar.jpeg";
import goatPoster from "../assets/images/posters/goat.jpeg";

// ✅ Movie Data
const movieData = [
  {
    id: 1,
    title: "ACE",
    bg: aceBg,
    poster: acePoster,
    year: "2023",
  },
  {
    id: 2,
    title: "AMARAN",
    bg: amaranBg,
    poster: amaranPoster,
    year: "2024",
  },
  {
    id: 3,
    title: "JAWAN",
    bg: jawanBg,
    poster: jawanPoster,
    year: "2022",
  },
  {
    id: 4,
    title: "LUCKY BASKAR",
    bg: luckyBaskarBg,
    poster: luckyBaskarPoster,
    year: "2024",
  },
  {
    id: 5,
    title: "GREATEST OF ALL TIME",
    bg: goatBg,
    poster: goatPoster,
    year: "2023",
  },
];

export const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movieData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const movie = movieData[current];

  return (
    <div
      className="hero-section"
      style={{
        backgroundImage: `url(${movie.bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="dark-overlay"></div>

      <div className="hero-content fade-in">
        <img src={movie.poster} alt={movie.title} className="hero-poster" />
        <div className="hero-text">
          <h2 className="hero-title">{movie.title}</h2>
          <p className="hero-year">{movie.year}</p>
          <Link to={`/movies/${movie.id}`} className="review-btn">
            Review
          </Link>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="hero-dots">
        {movieData.map((_, index) => (
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

