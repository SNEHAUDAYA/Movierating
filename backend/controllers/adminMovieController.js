const Movie = require('../models/Movie');

async function createMovie(req, res) {
  try {
    const {
      title,
      description,
      genre,
      releaseYear,
      director,
      imageUrl,
      actors = [],
      language,
    } = req.body;

    if (!title || !description || !genre || !releaseYear || !director) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const createdBy = req.user && (req.user._id || req.user.id)
      ? { id: req.user._id || req.user.id, username: req.user.username || req.user.name || "" }
      : (req.body.createdBy || { id: null, username: "" });

    const movie = await Movie.create({
      title,
      description,
      genre,
      releaseYear: Number(releaseYear),
      director,
      imageUrl: imageUrl || "",
      actors: Array.isArray(actors) ? actors : (typeof actors === "string" ? actors.split(",").map(a => a.trim()).filter(Boolean) : []),
      language: language || "",
      createdBy,
    });

    return res.status(201).json({ success: true, data: movie });
  } catch (err) {
    console.error('createMovie error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
}

module.exports = { createMovie };