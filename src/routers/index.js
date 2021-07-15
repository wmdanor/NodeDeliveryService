const express = require('express');
const morgan = require('morgan');
const main = new express.Router();

const {HttpError, NotFoundError} = require('../utils/errors');
const {apiRouter} = require('./apiRouter');

const morganFormat = 'tiny';

main.use(morgan(morganFormat));
main.use(express.json());

main.use('/api', apiRouter);

main.use((req, res, next) => {
  throw new NotFoundError('404, Resource not found');
});

main.use((err, req, res, next) => {
  const {message} = err;

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({message});
  } else {
    res.status(500).json({message});
  }
});

module.exports = {
  main,
};
