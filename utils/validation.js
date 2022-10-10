const { celebrate, Joi } = require('celebrate');
const { regexUrl } = require('./regexs');

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message({
        'string.required': 'Поле e-mail обязательно для заполнения',
      }),
    name: Joi.string().required().min(2).max(30)
      .message({
        'string.required': 'Поле с именем обязательно для заполнения',
        'string.min': 'Имя не может быть меньше двух символов',
        'string.max': 'Имя не должно превышать 30 символов',
      }),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regexUrl),
    trailerLink: Joi.string().required().regex(regexUrl),
    thumbnail: Joi.string().required().regex(regexUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  updateUserValidation,
  createMovieValidation,
  deleteMovieValidation,
  createUserValidation,
  loginValidation,
};
