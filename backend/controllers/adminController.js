const User = require('../models/user');
const Movie = require('../models/Movie');
const Review = require('../models/Review');

exports.createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({ success: true, data: movie });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalMovies = await Movie.countDocuments();
    const totalReviews = await Review.countDocuments();
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalMovies,
        totalReviews,
        recentUsers,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};