const Movie = require('../models/Movie');
const Review = require('../models/Review');

exports.getMovies = async (req, res) => {
  try {
    const { search, genre } = req.query;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (genre) {
      query.genre = genre;
    }

    const movies = await Movie.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: movies.length, data: movies });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.status(200).json({ success: true, data: movie });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};