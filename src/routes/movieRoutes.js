const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, postMovies, deleteMovies,
} = require('../controller/movieControllers');

const movieRoutes = express.Router();

movieRoutes.get('/', getMovies);
movieRoutes.post('/', postMovies);

movieRoutes.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovies);

module.exports = {
  movieRoutes,
};