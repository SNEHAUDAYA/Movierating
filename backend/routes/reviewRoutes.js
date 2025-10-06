const express = require('express');
const { addReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/:movieId/reviews')
  .post(protect, addReview);

module.exports = router;