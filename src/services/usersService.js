const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtSecretToken} = require('../utils/staticData');
const {ArgumentError} = require('../utils/errors');

const User = require('../models/user');

const addUser = async ({email, password, role}) => {
  const user = new User({
    email,
    passwordHash: await bcrypt.hash(password, 10),
    role,
  });

  await user.save();
};

const getUserById = async (userId) => await User.findById(userId);

const deleteUserById = async (userId) =>
  await User.findByIdAndDelete(userId);

const updateUserPassword = async (userId, {oldPassword, newPassword}) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ArgumentError('User does not exist', 'userId');
  }

  if (!(await bcrypt.compare(oldPassword, user.passwordHash))) {
    throw new ArgumentError('Invalid password', 'oldPassword');
  }

  await User.findByIdAndUpdate(userId, {$set: {
    passwordHash: await bcrypt.hash(newPassword, 10),
  }});
};

const getUserToken = async ({email, password}) => {
  const user = await User.findOne({email});

  if (!user) {
    throw new ArgumentError('Invalid email or password', 'email');
  }

  if (!(await bcrypt.compare(password, user.passwordHash))) {
    throw new ArgumentError('Invalid email or password', 'password');
  }

  return jwt.sign({
    userId: user._id,
    email: user.email,
    role: user.role,
  }, jwtSecretToken);
};

module.exports = {
  addUser,
  getUserById,
  deleteUserById,
  updateUserPassword,
  getUserToken,
};
