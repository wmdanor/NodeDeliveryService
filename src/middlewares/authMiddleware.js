const jwt = require('jsonwebtoken');
const {UnauthorizedError} = require('../utils/errors');
const {jwtSecretToken} = require('../utils/staticData');

const authMiddleware = (req, res, next) => {
  const {
    authorization,
  } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError('Please, provide "authorization" header');
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    throw new UnauthorizedError('Please, include token to request');
  }

  try {
    const tokenPayload = jwt.verify(token, jwtSecretToken);
    req.user = {
      userId: tokenPayload.userId,
      username: tokenPayload.username,
    };
    next();
  } catch (err) {
    throw new UnauthorizedError(err.message);
  }
};

module.exports = {
  authMiddleware,
};
