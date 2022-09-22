const mongoose = require('mongoose');
const { isURL } = require('validator');
const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const movieSchema = new Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: { validator: isURL, message: 'Ссылка на постер к фильму не валидна' },
  },
  trailerLink: {
    type: String,
    require: true,
    validate: { validator: isURL, message: 'Ссылка на трейлер к фильму не валидна' },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: { validator: isURL, message: 'Ссылка на минипостер к фильму не валидна' },
  },
  owner: {
    type: ObjectId,
    ref: 'user',
    require: true,
  },
  movieId: {
    type: ObjectId,
    // ref: 'MoviesExplorer',
    require: true,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  },
})

module.exports.User = model('movie', movieSchema);

//   country — страна создания фильма. Обязательное поле-строка.
//   director — режиссёр фильма. Обязательное поле-строка.
//   duration — длительность фильма. Обязательное поле-число.
//   year — год выпуска фильма. Обязательное поле-строка.
//   description — описание фильма. Обязательное поле-строка.
//   image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
//   trailerLink — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
//   thumbnail — миниатюрное изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом.
//   owner — _id пользователя, который сохранил фильм. Обязательное поле.
//   movieId — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
//   nameRU — название фильма на русском языке. Обязательное поле-строка.
//   nameEN — название фильма на английском языке. Обязательное поле-строка.