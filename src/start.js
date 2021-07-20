const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();

const {HttpError, NotFoundError} = require('./utils/errors');
const {dbConnectionString} = require('./utils/staticData');
const {apiRouter} = require('./routers/apiRouter');

const HttpLog = require('./models/httpLog');

const morganFormat = 'tiny';

app.use(morgan(morganFormat));

app.use((req, res, next) => {
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

    const port = process.env.PORT || 8080;

    app.listen(port, () => {
      console.log('Server started');
    });
  } catch (err) {
    console.error('Failed to start the server - ', err.message);
  }
};

start().then(() => {
  console.log('End.');
});
