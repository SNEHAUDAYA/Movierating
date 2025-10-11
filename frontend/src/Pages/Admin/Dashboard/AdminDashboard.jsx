// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/stats`
        );
        setStats(res.data.data);
      } catch (err) {
        console.error("Failed to load admin stats:", err);
        setError("Unable to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="container">
          <h1 className="page-title">Admin Dashboard</h1>
          <p>Loading stats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="container">
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="error">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1 className="page-title">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-number">{stats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <h3>Total Movies</h3>
            <p className="stat-number">{stats.totalMovies}</p>
          </div>
          <div className="stat-card">
            <h3>Total Reviews</h3>
            <p className="stat-number">{stats.totalReviews}</p>
          </div>
        </div>

        <div className="admin-actions">
          <Link to="/admin/add-movie" style={{backgroundColor: "#0EACF9", color: "white", padding:"5px 20px", width:"100%", margin:"20px"}} className="btn btn-primary">
            Add Movie
          </Link>
        </div>

        {/* Recent Users */}
        <div className="recent-users-section">
          <h2>Recent Users</h2>
          <div className="users-list">
            {stats.recentUsers.length > 0 ? (
              stats.recentUsers.map((user) => (
                <div key={user._id} className="user-item">
                  <div className="user-info">
                    <strong>{user.username}</strong>
                    <span className="user-email">{user.email}</span>
                  </div>
                  <span className="user-role">
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                </div>
              ))
            ) : (
              <p>No recent users.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
