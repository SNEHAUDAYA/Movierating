const express = require('express');
const adminMovieController = require('../controllers/adminMovieController');
const { protect } = require('../middleware/authMiddleware');
// destructure the function exported from adminMiddleware
const { isAdmin } = require('../middleware/adminMiddleware');

const router = express.Router();

// sanity checks
if (typeof protect !== 'function') {
  throw new TypeError('authMiddleware.protect must export a function');
}
if (typeof isAdmin !== 'function') {
  throw new TypeError('adminMiddleware.isAdmin must be a function');
}
if (!adminMovieController || typeof adminMovieController.createMovie !== 'function') {
  throw new TypeError('adminMovieController.createMovie must be a function');
}

router.post('/', protect, isAdmin, adminMovieController.createMovie);

module.exports = router;