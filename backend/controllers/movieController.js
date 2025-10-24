const Movie = require('../models/Movie');
const Review = require('../models/Review');

exports.getMovies = async (req, res) => {
  try {
    const { search, genre, page = 1, limit = 12 } = req.query;
    let query = {};

    // Search and filter conditions
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (genre) {
      query.genre = genre;
    }

    // Execute query with pagination
    const movies = await Movie.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get total documents
    const total = await Movie.countDocuments(query);

    res.status(200).json({
      success: true,
      data: movies,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching movies',
      error: err.message,
    });
  }
};

exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found',
      });
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching movie',
      error: err.message,
    });
  }
};