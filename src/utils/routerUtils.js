const asyncWrapper = (callback) => {
  return (req, res, next) =>
    callback(req, res)
        .catch(next);
};

const callForDriverWrapper = (callback) => {
  return (req, res, next) => {
    if (req.user.role !== 'DRIVER') {
      next();
    } else {
      callback(req, res).catch(next);
    }
  };
};

const callForShipperWrapper = (callback) => {
  return (req, res, next) => {
    if (req.user.role !== 'SHIPPER') {
      next();
    } else {
      callback(req, res).catch(next);
    }
  };
};

module.exports = {
  asyncWrapper,
  callForDriverWrapper,
  callForShipperWrapper,
};
