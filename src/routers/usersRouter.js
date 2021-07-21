const express = require('express');
const {asyncWrapper} = require('../utils/routerUtils');
const {
  getCurrentUser,
  deleteCurrentUser,
  changeCurrentUserPassword,
} = require('../controllers/usersController');
const {changePasswordValidator} = require('../middlewares/validation');
const {nameMiddleware} = require('../middlewares/nameMiddleware');

const usersRouter = new express.Router();

usersRouter.get('/me', asyncWrapper(getCurrentUser));
usersRouter.delete('/me', nameMiddleware, asyncWrapper(deleteCurrentUser));
usersRouter.patch(
    '/me',
    changePasswordValidator,
    asyncWrapper(changeCurrentUserPassword),
);

module.exports = {
  usersRouter,
};
