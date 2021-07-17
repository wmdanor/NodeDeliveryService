const Truck = require('../models/truck');

const getTrucksByUserId = async (userId) => {
  // TODO
};

const addTruck = async ({userId, type}) => {
  // TODO
};

const getTruckByUserId = async (id, userId) => {
  // TODO
};

const updateTruckByUserId = async (id, userId, {type}) => {
  // TODO
};

const deleteTruckByUserId = async (id, userId) => {
  // TODO
};

// TODO: only one truck can be assigned to a user, so previous one must be unassigned
const assignTruckByUserId = async (id, userId) => {
  // TODO
};

module.exports = {
  getTrucksByUserId,
  addTruck,
  getTruckByUserId,
  updateTruckByUserId,
  deleteTruckByUserId,
  assignTruckByUserId,
};
