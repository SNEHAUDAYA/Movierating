import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./add-movie-form.css";

export const AddMovieForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    genre: "Action",
    releaseYear: new Date().getFullYear(),
    director: "",
    imageUrl: "",
    actors: "",
    language: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("authToken");
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const createdBy = {
        id: storedUser.id || storedUser._id || null,
        username: storedUser.username || storedUser.name || "",
      };

      const payload = {
        ...form,
        releaseYear: Number(form.releaseYear),
        actors: form.actors ? form.actors.split(",").map(a => a.trim()).filter(Boolean) : [],
        createdBy,
      };

      const url = `${import.meta.env.VITE_API_BASE_URL}/admin/movies`;
      await axios.post(url, payload, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "application/json",
        },
      });

      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to add movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="add-movie-page">
      <div className="add-movie-card">
        <header className="add-movie-header">
          <h2>Add New Movie</h2>
          <p className="muted">Fill out the details below to add a movie to the catalog.</p>
        </header>

        <form onSubmit={handleSubmit} className="add-movie-form" noValidate>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" value={form.title} onChange={handleChange} required />
            </div>

            <div className="form-field">
              <label htmlFor="genre">Genre</label>
              <select id="genre" name="genre" value={form.genre} onChange={handleChange}>
                <option>Action</option>
                <option>Comedy</option>
                <option>Drama</option>
                <option>Horror</option>
                <option>Sci-Fi</option>
                <option>Romance</option>
                <option>Thriller</option>
                <option>Animation</option>
                <option>Documentary</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="releaseYear">Release Year</label>
              <input id="releaseYear" name="releaseYear" type="number" value={form.releaseYear} onChange={handleChange} required />
            </div>

            <div className="form-field">
              <label htmlFor="director">Director</label>
              <input id="director" name="director" value={form.director} onChange={handleChange} required />
            </div>

            <div className="form-field">
              <label htmlFor="language">Language</label>
              <input id="language" name="language" value={form.language} onChange={handleChange} />
            </div>

            <div className="form-field">
              <label htmlFor="imageUrl">Image URL</label>
              <input id="imageUrl" name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="https://example.com/poster.jpg" />
            </div>

            <div className="form-field full">
              <label htmlFor="actors">Actors (comma separated)</label>
              <input id="actors" name="actors" value={form.actors} onChange={handleChange} placeholder="Actor One, Actor Two" />
            </div>

            <div className="form-field full">
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" value={form.description} onChange={handleChange} rows="5" required />
            </div>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin')}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Saving..." : "Add Movie"}</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddMovieForm;