import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import './Navbar.css';

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">MovieReview</Link>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search by movie title or actor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        <div className="nav-actions">
          {user ? (
            <>
              {user.isAdmin && <Link to="/admin" className="nav-link">Admin</Link>}
              <span className="user-greeting">Hi, {user.name}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Sign Up</Link>
            </>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="theme-toggle"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};