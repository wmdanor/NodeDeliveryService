const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = new express.Router();

const {HttpError, NotFoundError} = require('./utils/errors');
const {dbConnectionString} = require('./utils/staticData');
const {apiRouter} = require('./routers/apiRouter');

const morganFormat = 'tiny';

app.use(morgan(morganFormat));
app.use(express.json());

app.use('/api', apiRouter);

app.use((req, res, next) => {
  throw new NotFoundError('404, Resource not found');
});

app.use((err, req, res, next) => {
  const {message} = err;

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({message});
  } else {
    res.status(500).json({message});
  }
});

const start = async () => {
  try {
    await mongoose.connect(dbConnectionString, {
      useNewUrlParser: true, useUnifiedTopology: true,
    });

    app.listen(8080, () => {
      console.log('Server started');
    });
  } catch (err) {
    console.error('Failed to start the server - ', err.message);
  }
};

module.exports = {
  start,
}
