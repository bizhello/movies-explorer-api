const express = require('express');
const { celebrate, Joi } = require('celebrate');

const authRoutes = express.Router();
const {
  createUser, login, signout,
} = require('../controller/authControllers');

authRoutes.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

authRoutes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

authRoutes.get('/signout', signout);

module.exports = {
  authRoutes,
};
