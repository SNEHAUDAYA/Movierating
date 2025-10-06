const express = require('express');
const { createMovie, getAdminStats } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/adminMiddleware');

const router = express.Router();

router.route('/movies')
  .post(protect, authorize('admin'), createMovie);

router.route('/stats')
  .get(protect, authorize('admin'), getAdminStats);

module.exports = router;