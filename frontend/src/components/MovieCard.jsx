import React from 'react';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie }) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden">
      <img
        src={movie.imageUrl || '/default-movie.jpg'}
        alt={movie.title}
        className=""
        style={ {width: '100%', height: '300px', objectFit: 'cover' }}
      />
      <div className="p-4!">
        <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
        <p className="text-gray-600 mb-2">{movie.genre}</p>
        <p className="text-gray-500 text-sm mb-2">{movie.releaseYear}</p>
        <div className="flex items-center mb-2">
          <span className="text-yellow-400">★</span>
          <span className="ml-1">{movie.averageRating.toFixed(1)}</span>
          <span className="text-gray-500 text-sm ml-2">
            ({movie.totalReviews} reviews)
          </span>
        </div>
        <Link
          to={`/movie/${movie._id}`}
          className="inline-block bg-blue-500 text-white! mt-2! px-4! py-2! rounded hover:bg-blue-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};