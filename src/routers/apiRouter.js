const express = require('express');

const {authMiddleware} = require('../middlewares/authMiddleware');
const {authRouter} = require('./authRouter');
const {notesRouter} = require('./notesRouter');
const {usersRouter} = require('./usersRouter');

const apiRouter = new express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/notes', [authMiddleware], notesRouter);
apiRouter.use('/users', [authMiddleware], usersRouter);

module.exports = {
  apiRouter,
};
