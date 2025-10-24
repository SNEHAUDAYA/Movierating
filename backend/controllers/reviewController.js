const Movie = require("../models/Movie");
const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movieId = req.params.movieId;
    const userId = req.user.id;

    // Validate input
    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Please provide both rating and comment",
      });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    // Check if user already reviewed
    const existingReview = await Review.findOne({
      movie: movieId,
      user: userId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this movie",
      });
    }

    const review = await Review.create({
      rating,
      comment,
      movie: movieId,
      user: userId,
    });

    // Update movie ratings
    const reviews = await Review.find({ movie: movieId });
    const totalReviews = reviews.length;
    const avgRating =
      reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews;

    movie.averageRating = avgRating;
    movie.totalReviews = totalReviews;
    await movie.save();

    res.status(201).json({
      success: true,
      data: review,
      averageRating: avgRating,
      totalReviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
