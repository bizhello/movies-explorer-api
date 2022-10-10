const { Movie } = require('../models/movieModels');
const { NotFoundError } = require('../../utils/errors/NotFoundError');
const { ForbiddenError } = require('../../utils/errors/ForbiddenError');
const { BadRequestError } = require('../../utils/errors/BadRequestError');

async function getMovies(req, res, next) {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.send(movies);
  } catch (error) {
    next(error);
  }
}

async function postMovies(req, res, next) {
  try {
    const movie = new Movie({
      country: req.body.country,
      director: req.body.director,
      duration: req.body.duration,
      year: req.body.year,
      description: req.body.description,
      image: req.body.image,
      trailerLink: req.body.trailerLink,
      thumbnail: req.body.thumbnail,
      movieId: req.body.movieId,
      nameRU: req.body.nameRU,
      nameEN: req.body.nameEN,
    });
    movie.owner = req.user._id;
    await movie.save();
    res.send(movie);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new BadRequestError('Некорректные данные при создании фильма'));
    } else {
      next(error);
    }
  }
}

async function deleteMovies(req, res, next) {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (movie === null) {
      throw new NotFoundError('Фильм был уже удален');
    } else if (req.user._id === String(movie.owner)) {
      await Movie.deleteOne({ _id: req.params.movieId });
      res.send({ message: 'Фильм удален' });
    } else {
      throw new ForbiddenError('Удалять можно только свои фильмы');
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMovies,
  postMovies,
  deleteMovies,
};
