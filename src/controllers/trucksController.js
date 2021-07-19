const {BadRequestError} = require('../utils/errors');
const {
  getTrucksByDriverId,
  addTruck,
  getTruckByDriverId,
  updateTruckByDriverId,
  deleteTruckByDriverId,
  assignTruckByDriverId,
} = require('../services/trucksService');

const mapTruck = (truck) => {
  return {
    _id: truck._id,
    created_by: truck.createdBy,
    assigned_to: truck.assignedTo,
    type: truck.truckType.name,
    status: truck.status,
    created_date: truck.createdDate,
  };
};

const getTrucksForDriver = async (req, res) => {
  const {userId} = req.user;

  const trucks = await getTrucksByDriverId(userId);
  const mappedTrucks = [];

  trucks.forEach((truck) => {
    mappedTrucks.push(mapTruck(truck));
  });

  res.json({
    trucks: mappedTrucks,
  });
};

const addTruckForDriver = async (req, res) => {
  const {userId} = req.user;
  const {type} = req.body;

  await addTruck({userId, type});

  res.json({
    message: 'Truck created successfully',
  });
};

const getTruckByIdForDriver = async (req, res) => {
  const {userId} = req.user;
  const {id} = req.params;

  const truck = await getTruckByDriverId(id, userId);

  if (!truck) {
    throw new BadRequestError('Truck with such id not found.');
  }

  res.json({
    truck: mapTruck(truck),
  });
};

const updateTruckByIdForDriver = async (req, res) => {
  const {userId} = req.user;
  const {id} = req.params;

  await updateTruckByDriverId(id, userId, req.body);

  res.json({
    message: 'Truck details changed successfully',
  });
};

const deleteTruckByIdForDriver = async (req, res) => {
  const {userId} = req.user;
  const {id} = req.params;

  await deleteTruckByDriverId(id, userId);

  res.json({
    message: 'Truck deleted successfully',
  });
};

const assignTruckByIdForDriver = async (req, res) => {
  const {userId} = req.user;
  const {id} = req.params;

  await assignTruckByDriverId(id, userId);

  res.json({
    message: 'Truck assigned successfully',
  });
};

module.exports = {
  getTrucksForDriver,
  addTruckForDriver,
  getTruckByIdForDriver,
  updateTruckByIdForDriver,
  deleteTruckByIdForDriver,
  assignTruckByIdForDriver,
  utils: {
    mapTruck,
  },
};
