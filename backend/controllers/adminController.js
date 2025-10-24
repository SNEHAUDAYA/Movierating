const Movie = require("../models/Movie");
const Review = require("../models/Review");
const User = require("../models/User");

exports.createMovie = async (req, res) => {
  try {
    // normalize input fields
    const {
      title,
      description,
      genre,
      releaseYear,
      director,
      imageUrl = "",
      actors = [],
      language = "",
    } = req.body;

    // basic validation
    if (!title || !description || !genre || !releaseYear || !director) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // parse actors into array if provided as CSV string
    let actorsArr = [];
    if (Array.isArray(actors)) {
      actorsArr = actors;
    } else if (typeof actors === "string") {
      actorsArr = actors
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean);
    }

    // createdBy: prefer req.user if available
    const createdBy =
      req.user && (req.user._id || req.user.id)
        ? {
            id: String(req.user._id || req.user.id),
            username: req.user.username || req.user.name || "",
          }
        : req.body.createdBy || { id: null, username: "" };

    const moviePayload = {
      title,
      description,
      genre,
      releaseYear: Number(releaseYear),
      director,
      imageUrl,
      actors: actorsArr,
      language,
      createdBy,
    };

    const movie = await Movie.create(moviePayload);
    res.status(201).json({ success: true, data: movie });
  } catch (err) {
    console.error("admin.createMovie error:", err);
    res
      .status(400)
      .json({
        success: false,
        message: err.message || "Failed to create movie",
      });
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
    res.status(500).json({ success: false, message: "Server error" });
  }
};
