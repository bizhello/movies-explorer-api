const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getMovies, postMovies, deleteMovies,
} = require('../controller/movieControllers');

const { regexUrl } = require('../../utils/regexs');

const movieRoutes = express.Router();

movieRoutes.get('/', getMovies);
movieRoutes.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regexUrl),
    trailerLink: Joi.string().required().regex(regexUrl),
    thumbnail: Joi.string().required().regex(regexUrl),
    owner: Joi.string().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), postMovies);

movieRoutes.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovies);

module.exports = {
  movieRoutes,
};
