const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtSecretToken} = require('../utils/staticData');
const {ArgumentError} = require('../utils/errors');

const {User} = require('../models/userModel');

const addUser = async ({username, password}) => {
  const user = new User({
    username,
    passwordHash: await bcrypt.hash(password, 10),
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

const getUserToken = async ({username, password}) => {
  const user = await User.findOne({username});

  if (!user) {
    throw new ArgumentError('Invalid username or password', 'username');
  }

  if (!(await bcrypt.compare(password, user.passwordHash))) {
    throw new ArgumentError('Invalid username or password', 'password');
  }

  const token = jwt.sign({
    userId: user._id,
    username: user.username,
  }, jwtSecretToken);

  return token;
};

module.exports = {
  addUser,
  getUserById,
  deleteUserById,
  updateUserPassword,
  getUserToken,
};
