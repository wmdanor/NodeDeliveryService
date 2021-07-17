const {BadRequestError} = require('../utils/errors');
const {
  getTrucksByUserId,
  addTruck,
  getTruckByUserId,
  updateTruckByUserId,
  deleteTruckByUserId,
  assignTruckByUserId,
} = require('');

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

  const trucks = await getTrucksByUserId(userId);
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

  const truck = await getTruckByUserId(id, userId);

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

  await updateTruckByUserId(id, userId, req.body);

  res.json({
    message: 'Truck details changed successfully',
  });
};

const deleteTruckByIdForDriver = async (req, res) => {
  const {userId} = req.user;
  const {id} = req.params;

  await deleteTruckByUserId(id, userId);

  res.json({
    message: 'Truck deleted successfully',
  });
};

const assignTruckByIdForDriver = async (req, res) => {
  const {userId} = req.user;
  const {id} = req.params;

  await assignTruckByUserId(id, userId);

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
};
