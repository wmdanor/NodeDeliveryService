const {
  addUser,
  getUserToken,
} = require('../services/usersService');
const {
  ArgumentError,
  BadRequestError,
  InternalServerError,
} = require('../utils/errors');

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

// smtp required
// token access system remake required
// won't be implemented
const restorePassword = async (req, res) => {
  // TODO implement reset password
  throw new InternalServerError('Not implemented');
};

module.exports = {
  registerUser,
  loginUser,
  restorePassword,
};
