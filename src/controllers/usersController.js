﻿const {ArgumentError, BadRequestError} = require('../utils/errors');
const {
  getUserById,
  deleteUserById,
  updateUserPassword,
} = require('../services/usersService');

const getCurrentUser = async (req, res) => {
  const {userId} = req.user;

  const user = await getUserById(userId);

  if (!user) {
    throw new BadRequestError('Book with such id is not found.');
  }

  const {
    email,
    createdDate,
    role,
  } = user;

  res.json({
    user: {
      _id: userId,
      email,
      created_date: createdDate,
      role,
    },
  });
};

const deleteCurrentUser = async (req, res) => {
  const {userId} = req.user;

  await deleteUserById(userId);

  res.json({message: 'Profile deleted successfully'});
};

const changeCurrentUserPassword = async (req, res) => {
  const {userId} = req.user;

  try {
    await updateUserPassword(userId, req.body);

    res.json({message: 'Password changed successfully'});
  } catch (err) {
    if (err instanceof ArgumentError) {
      throw new BadRequestError(err.message);
    } else {
      throw err;
    }
  }
};

module.exports = {
  getCurrentUser,
  deleteCurrentUser,
  changeCurrentUserPassword,
};
