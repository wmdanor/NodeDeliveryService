const Truck = require('../models/truck');
const TruckType = require('../models/truckType');
const {ArgumentError} = require('../utils/errors');

const findTruckType = async (name) => {
  const types = await TruckType.find({}, {_id: 0, __v: 0});

  return types.find((arg) => arg.name === name);
};

const getAvailableTrucks = async () => Truck.find({status: 'IS'});

const getTrucksByDriverId = async (userId) => Truck.find({createdBy: userId});

const addTruck = async ({userId, type}) => {
  const truckType = await findTruckType(type);

  if (!truckType) {
    throw new ArgumentError('Such truck type does not exist', 'truck.type');
  }

  const truck = new Truck({
    createdBy: userId,
    truckType,
  });

  await truck.save();
};

const getTruck = async (id) => Truck.findById(id);

const getTruckByDriverId = async (id, userId) =>
  Truck.findOne({_id: id, createdBy: userId});

const getAssignedTruckByDriverId = async (userId) =>
  Truck.findOne({assignedTo: userId});

const setTruckStatus = async (id, status) =>
  Truck.findByIdAndUpdate(id, {status});

const updateTruckByDriverId = async (id, userId, {type}) => {
  const truckType = await findTruckType(type);

  if (!truckType) {
    throw new ArgumentError('Such truck type does not exist', 'truck.type');
  }

  return Truck.findOneAndUpdate({_id: id, createdBy: userId}, {truckType});
};

const deleteTruckByDriverId = async (id, userId) =>
  Truck.findOneAndDelete({_id: id, createdBy: userId});

const assignTruckByDriverId = async (id, userId) => {
  await Truck.findOneAndUpdate({assignedTo: userId}, {assignedTo: null});

  return Truck.findOneAndUpdate(
      {_id: id, createdBy: userId},
      {assignedTo: userId},
  );
};

module.exports = {
  getAvailableTrucks,
  getTrucksByDriverId,
  addTruck,
  getTruck,
  getTruckByDriverId,
  getAssignedTruckByDriverId,
  setTruckStatus,
  updateTruckByDriverId,
  deleteTruckByDriverId,
  assignTruckByDriverId,
};
