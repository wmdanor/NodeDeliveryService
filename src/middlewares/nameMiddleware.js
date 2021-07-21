const {BadRequestError} = require('../utils/errors');
const {getActiveLoadByDriverId} = require('../services/loadsService');

const nameMiddleware = async (req, res, next) => {
  next();
  return;
  const {userId} = req.user;

  try {
    const load = await getActiveLoadByDriverId(userId);

    if (load) {
      next(new BadRequestError(
          'Driver is not able able to change any profile ' +
          'or his trucks info while he is on load',
      ));
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  nameMiddleware,
};
