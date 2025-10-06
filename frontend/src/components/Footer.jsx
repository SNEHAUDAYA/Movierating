import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Create Your Account</h4>
          <p>Join our community of movie lovers!</p>
          <div className="footer-buttons">
            <Link to="/login" className="footer-btn">Login</Link>
            <Link to="/register" className="footer-btn primary">Sign Up</Link>
          </div>
        </div>

        <div className="footer-col">
          <h4>Legal & Support</h4>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/help">Help & Support</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MovieReview. All rights reserved.</p>
      </div>
    </footer>
  );
};