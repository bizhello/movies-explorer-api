const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');

dotenv.config();
const { routes } = require('./src/routes/index');
const { errorHandler } = require('./utils/errors/errorHandler');
const { requestLogger, errorLogger } = require('./src/middlewares/logger');
const { dataRateLimit } = require('./utils/limiter');

// const allowedCors = [
//   'https://bizhello.nomoredomains.sbs',
//   'http://bizhello.nomoredomains.sbs',
//   'https://praktikum.tk',
//   'http://praktikum.tk',
//   'http://localhost:3000',
//   'https://localhost:3000',
// ];

const limiter = rateLimit(dataRateLimit);

const app = express();

app.disable('x-powered-by');

const {
  dataMovies = 'mongodb://localhost:27017/moviesdb',
  PORT = 3000,
} = process.env; // В production-режиме
//  адрес базы данных берётся из process.env.

// const corsOptions = {
//   credentials: true,
//   origin(origin, callback) {
//     if (allowedCors.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };
app.options('*', cors());
app.use(cors());
// app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

async function main() {
  await mongoose.connect(dataMovies);
  console.log('connected to db');
  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();
