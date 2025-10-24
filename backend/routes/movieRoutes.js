const express = require('express');
const { getMovies, getMovie } = require('../controllers/movieController');
const { optionalAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(optionalAuth, getMovies);

router.route('/:id')
  .get(optionalAuth, getMovie);

module.exports = router;