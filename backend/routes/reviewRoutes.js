const express = require('express');
const { addReview, getReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Updated route definitions to handle /:movieId/reviews pattern
router
  .route('/:movieId/reviews')
  .get(protect, getReviews)
  .post(protect, addReview);

module.exports = router;