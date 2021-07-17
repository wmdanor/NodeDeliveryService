const {BadRequestError} = require('../utils/errors');
const {
  getLoadsByShipperId,
  getLoadsByDriverId,
  addLoad,
  getActiveLoadByDriverId,
  iterateActiveLoadStateByDriverId,
  getLoadByShipperId,
  getLoadByDriverId,
  updateLoadByShipperId,
  deleteLoadByShipperId,
  // postLoadByShipperId,
} = require('../services/loadsService');

const mapLoad = (load) => {
  return {
  };
};

const mapLoads = (loads) => {
  const result = [];

  loads.forEach((load) => {
    result.push(mapLoad(load));
  });

  return result;
};


const getLoadsForShipper = async (req, res) => {
  const {userId} = req.user;

  const loads = await getLoadsByShipperId(userId);

  res.json({
    loads: mapLoads(loads),
  });
};

const getLoadsForDriver = async (req, res) => {
  const {userId} = req.user;

  const loads = await getLoadsByDriverId(userId);

  res.json({
    loads: mapLoads(loads),
  });
};

const addLoadForShipper = async (req, res) => {
  const {userId} = req.user;
  const load = {};

  await addLoad(load);

  res.json({
    message: 'Load created successfully',
  });
};

const getActiveLoadForDriver = async (req, res) => {
  // TODO
};

const iterateActiveLoadStateForDriver = async (req, res) => {
  // TODO
};

const getLoadByIdForShipper = async (req, res) => {
  // TODO
};

const getLoadByIdForDriver = async (req, res) => {
  // TODO
};

const updateLoadByIdForShipper = async (req, res) => {
  // TODO
};

const deleteLoadByIdForShipper = async (req, res) => {
  // TODO
};

const postLoadByIdForShipper = async (req, res) => {
  // TODO
};

const getShippingInfoByIdForShipper = async (req, res) => {
  // TODO
};

module.exports = {
  getLoadsForShipper,
  getLoadsForDriver,
  addLoadForShipper,
  getActiveLoadForDriver,
  iterateActiveLoadStateForDriver,
  getLoadByIdForShipper,
  getLoadByIdForDriver,
  updateLoadByIdForShipper,
  deleteLoadByIdForShipper,
  postLoadByIdForShipper,
  getShippingInfoByIdForShipper,
};
