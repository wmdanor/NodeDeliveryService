const Load = require('../models/load');
const {getAssignedTruckByDriverId} = require('./trucksService');

const findDriverTruckId = async (userId) => {
  const truck = await getAssignedTruckByDriverId(userId);

  if (!truck) {
    return null;
  }

  return truck._id;
};

const getLoadsByShipperId = async (userId, options) => {
  const query = {
    createdBy: userId,
  };
  if (options.status) {
    query.status = options.status;
  }

  return Load.find(query)
      .skip(options.offset)
      .limit(options.limit);
};

const getLoadsByDriverId = async (userId, options) => {
  const query = {
    assignedTo: await findDriverTruckId(userId),
  };
  if (options.status) {
    query.status = options.status;
  }

  return Load.find(query)
      .skip(options.offset)
      .limit(options.limit);
};

const addLoad = async ({
  createdBy,
  name,
  payload,
  pickupAddress,
  deliveryAddress,
  dimensions,
}) => {
  const load = new Load({
    createdBy,
    name,
    payload,
    pickupAddress,
    deliveryAddress,
    dimensions,
  });

  await load.save();
};

const getActiveLoadByDriverId = async (userId) =>
  Load.findOne({
    assignedTo: await findDriverTruckId(userId),
    status: 'ASSIGNED',
  });

const assignLoadTo = async (id, assignedTo) =>
  Load.findByIdAndUpdate(id, {assignedTo, status: 'ASSIGNED'});

const setLoadStatus = async (id, status) =>
  Load.findByIdAndUpdate(id, {status});

const setLoadState = async (id, state) =>
  Load.findByIdAndUpdate(id, {state});

const getLoadByShipperId = async (id, userId) =>
  Load.findOne({_id: id, createdBy: userId});

const getLoadByDriverId = async (id, userId) =>
  Load.findOne({_id: id, assignedTo: await findDriverTruckId(userId)});

const updateLoadByShipperId = async (id, userId, {
  createdBy,
  name,
  payload,
  pickupAddress,
  deliveryAddress,
  dimensions,
}) =>
  Load.findOneAndUpdate({_id: id, createdBy: userId}, {
    createdBy,
    name,
    payload,
    pickupAddress,
    deliveryAddress,
    dimensions,
  });

const deleteLoadByShipperId = async (id, userId) =>
  Load.findOneAndDelete({_id: id, createdBy: userId});


module.exports = {
  getLoadsByShipperId,
  getLoadsByDriverId,
  addLoad,
  getActiveLoadByDriverId,
  assignLoadTo,
  setLoadStatus,
  setLoadState,
  getLoadByShipperId,
  getLoadByDriverId,
  updateLoadByShipperId,
  deleteLoadByShipperId,
};
