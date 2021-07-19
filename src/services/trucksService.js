const Truck = require('../models/truck');

const getAvailableTrucks = async () => {
  // TODO
};

const getTrucksByDriverId = async (userId) => {
  // TODO
};

const addTruck = async ({userId, type}) => {
  // TODO
};

const getTruck = async (id) => {
  // TODO
};

const getTruckByDriverId = async (id, userId) => {
  // TODO
};

const setTruckStatus = async (id, {type}) => {
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
  getAvailableTrucks,
  getTrucksByDriverId,
  addTruck,
  getTruck,
  getTruckByDriverId,
  setTruckStatus,
  updateTruckByDriverId,
  deleteTruckByDriverId,
  assignTruckByDriverId,
};
