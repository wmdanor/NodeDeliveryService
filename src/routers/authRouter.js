const express = require('express');
const {asyncWrapper} = require('../utils/routerUtils');
const {
  registerUser,
  loginUser,
} = require('../controllers/authController');
const {signUpInValidator} = require('../middlewares/validation');

const authRouter = new express.Router();

authRouter.post('/register', signUpInValidator, asyncWrapper(registerUser));
authRouter.post('/login', signUpInValidator, asyncWrapper(loginUser));

module.exports = {
  authRouter,
};
