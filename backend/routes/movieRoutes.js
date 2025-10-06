const express = require('express');
const { getMovies, getMovie } = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getMovies);

router.route('/:id')
  .get(protect, getMovie);

module.exports = router;