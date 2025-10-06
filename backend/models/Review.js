const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: 'Movie',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ReviewSchema.index({ movie: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);