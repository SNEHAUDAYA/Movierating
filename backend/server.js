const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/dbconnection');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const app = express();

const cors = require('cors');
app.use(cors()); // Allows all origins (for development)

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api', require('./routes/reviewRoutes')); // Note: review route uses /api/:movieId/reviews
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/admin/movies', require('./routes/adminMovieRoutes'));// <-- add this line (after other app.use routes)

const adminMovieRoutes = require('./routes/adminMovieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// place after other route mounts and before the error handler
app.use('/api/admin/movies', adminMovieRoutes);
app.use('/api/movies', reviewRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});