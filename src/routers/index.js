const express = require('express');
const morgan = require('morgan');
const main = new express.Router();

const {HttpError, NotFoundError} = require('../utils/errors');
const {apiRouter} = require('./apiRouter');

const HttpLog = require('../models/httpLog');

const morganFormat = 'tiny';

main.use(morgan(morganFormat));

main.use((req, res, next) => {
  const method = req.method;
  const endpoint = req.originalUrl;

  res.on('finish', () => {
    const status = res.status;
    const message = JSON.stringify([method, endpoint, status]);
    const log = new HttpLog({message});
    log.save().then();
  });

  next();
});

main.use(express.json());

main.use('/api', apiRouter);

main.use((req, res, next) => {
  throw new NotFoundError('404, Resource not found');
});

main.use((err, req, res, next) => {
  const {message} = err;

  console.log(message);

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({message});
  } else {
    res.status(500).json({message});
  }
});

module.exports = {
  main,
};
