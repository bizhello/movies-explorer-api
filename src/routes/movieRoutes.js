const express = require('express');

const {
  getMovies, postMovies, deleteMovies,
} = require('../controller/movieControllers');
const { createMovieValidation } = require('../../utils/validation');
const { deleteMovieValidation } = require('../../utils/validation');

const movieRoutes = express.Router();

movieRoutes.get('/', getMovies);
movieRoutes.post('/', createMovieValidation, postMovies);

movieRoutes.delete('/:movieId', deleteMovieValidation, deleteMovies);

module.exports = {
  movieRoutes,
};
