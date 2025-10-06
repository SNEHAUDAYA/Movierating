// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import axios from 'axios';

// Set base URL globally
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

// Add auth header if token exists
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);