const {
  addUser,
  getUserToken,
} = require('../services/usersService');
const {ArgumentError, BadRequestError} = require('../utils/errors');

const registerUser = async (req, res) => {
  const {
    email,
    password,
    role,
  } = req.body;

  await addUser({email, password, role});

  res.json({message: 'Profile created successfully'});
};

const loginUser = async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  try {
    const token = await getUserToken({email, password});

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
