const express = require('express');
const {asyncWrapper} = require('../utils/routerUtils');
const {
  registerUser,
  loginUser,
  restorePassword,
} = require('../controllers/authController');
const {
  signUpValidator,
  signInValidator,
  forgotPasswordValidator,
} = require('../middlewares/validation');

const authRouter = new express.Router();

authRouter.post('/register', signUpValidator, asyncWrapper(registerUser));
authRouter.post('/login', signInValidator, asyncWrapper(loginUser));
authRouter.post(
    '/forgot_password',
    forgotPasswordValidator,
    asyncWrapper(restorePassword),
);

module.exports = {
  authRouter,
};
