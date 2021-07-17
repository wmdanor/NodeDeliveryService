const Load = require('../models/load');

const method = async () => {
};

module.exports = {
  getLoadsByShipperId,
  getLoadsByDriverId,
  addLoad,
  getActiveLoadByDriverId,
  setActiveLoadStateByDriverId,
  setLoadStatus,
  getLoadByShipperId,
  getLoadByDriverId,
  updateLoadByShipperId,
  deleteLoadByShipperId,

  // postLoadByShipperId,
};
