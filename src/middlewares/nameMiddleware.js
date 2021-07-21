const {BadRequestError} = require('../utils/errors');
const {getActiveLoadByDriverId} = require('../services/loadsService');

const nameMiddleware = (req, res, next) => {
  const {userId} = req.user;

  const promise = getActiveLoadByDriverId(userId);

  promise
      .then((load) => {
        if (!load) {
          next();
        } else {
          throw new BadRequestError(
              'Driver is not able able to change any profile ' +
              'or his trucks info while he is on load',
          );
        }
      })
      .catch(next);
};

module.exports = {
  nameMiddleware,
};
