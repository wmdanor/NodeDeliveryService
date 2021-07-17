const Truck = require('../models/truck');

const getTrucksByDriverId = async (userId) => {
  // TODO
};

const addTruck = async ({userId, type}) => {
  // TODO
};

const getTruckByDriverId = async (id, userId) => {
  // TODO
};

const updateTruckByDriverId = async (id, userId, {type}) => {
  // TODO
};

const deleteTruckByDriverId = async (id, userId) => {
  // TODO
};

// TODO: only one truck can be assigned to a user, so previous one must be unassigned
const assignTruckByDriverId = async (id, userId) => {
  // TODO
};

module.exports = {
  getTrucksByDriverId,
  addTruck,
  getTruckByDriverId,
  updateTruckByDriverId,
  deleteTruckByDriverId,
  assignTruckByDriverId,
};
