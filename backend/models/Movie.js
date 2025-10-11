const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Animation', 'Documentary'],
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: '',
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  actors: [String],
  language: String,

  // added createdBy
  createdBy: {
    id: { type: String, default: null },
    username: { type: String, default: "" }
  },
});

module.exports = mongoose.model('Movie', MovieSchema);