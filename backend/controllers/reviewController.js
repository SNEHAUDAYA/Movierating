const Movie = require('../models/Movie');
const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movieId = req.params.movieId;
    const userId = req.user.id;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    const review = await Review.create({
      rating,
      comment,
      movie: movieId,
      user: userId,
    });

    const reviews = await Review.find({ movie: movieId });
    const totalReviews = reviews.length;
    const avgRating = reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews;

    movie.averageRating = avgRating;
    movie.totalReviews = totalReviews;
    await movie.save();

    res.status(201).json({ success: true, data: review });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this movie' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};