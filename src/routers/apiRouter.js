const express = require('express');

const {authMiddleware} = require('../middlewares/authMiddleware');
const {authRouter} = require('./authRouter');
const {usersRouter} = require('./usersRouter');
const {trucksRouter} = require('./trucksRouter');
const {loadsRouter} = require('./loadsRouter');

const apiRouter = new express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', authMiddleware, usersRouter);
apiRouter.use('/trucks', authMiddleware, trucksRouter);
apiRouter.use('/loads', authMiddleware, loadsRouter);

module.exports = {
  apiRouter,
};
