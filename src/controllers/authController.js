const {
  addUser,
  getUserToken,
} = require('../services/usersService');
const {ArgumentError, BadRequestError} = require('../utils/errors');

const registerUser = async (req, res) => {
  const {
    username,
    password,
  } = req.body;

  await addUser({username, password});

  res.json({message: 'Success'});
};

const loginUser = async (req, res) => {
  const {
    username,
    password,
  } = req.body;

  try {
    const token = await getUserToken({username, password});

    res.json({
      message: 'Success',
      jwt_token: token,
    });
  } catch (err) {
    if (err instanceof ArgumentError) {
      throw new BadRequestError(err.message);
    } else {
      throw err;
    }
  }
};

const restorePassword = async (req, res) => {
  // TODO
};

module.exports = {
  registerUser,
  loginUser,
  restorePassword,
};
