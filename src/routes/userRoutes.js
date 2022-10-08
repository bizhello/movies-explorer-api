const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  aboutMe, patchUser,
} = require('../controller/userControllers');

const userRoutes = express.Router();

userRoutes.get('/me', aboutMe);

userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), patchUser);

module.exports = {
  userRoutes,
};
