﻿const {BadRequestError} = require('../utils/errors');
const {
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
  logMessageById,
} = require('../services/loadsService');
const {
  getAvailableTrucks,
  getTruck,
  setTruckStatus,
} = require('../services/trucksService');
const {
  mapTruck,
} = require('../controllers/trucksController').utils;

const parseNaturalNumber = (value) => {
  const parsed = Number.parseInt(value);

  if (Number.isInteger(Number(value)) && value >= 0) {
    return parsed;
  }

  throw new Error('Not a natural number');
};

const parsePagination = (query) => {
  const parsed = {};
  const {offset, limit} = query;

  try {
    parsed.offset = parseNaturalNumber(offset);
  } catch {
    parsed.offset = 0;
  }

  try {
    parsed.limit = parseNaturalNumber(limit);
  } catch {
    parsed.limit = 10;
  }

  return parsed;
};

const mapLoad = (load) => {
  return {
    _id: load._id,
    created_by: load.createdBy,
    assigned_to: load.assignedTo,
    status: load.status,
    state: load.state,
    name: load.name,
    payload: load.payload,
    pickup_address: load.pickupAddress,
    delivery_address: load.deliveryAddress,
    dimensions: load.dimensions,
    logs: load.logs,
    created_date: load.createdDate,
  };
};

const reverseMapLoad = (load) => {
  return {
    _id: load._id,
    createdBy: load.created_by,
    assignedTo: load.assigned_to,
    status: load.status,
    state: load.state,
    name: load.name,
    payload: load.payload,
    pickupAddress: load.pickup_address,
    deliveryAddress: load.delivery_address,
    dimensions: load.dimensions,
    logs: load.logs,
    createdDate: load.created_date,
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

  const options = parsePagination(req.query);
  options.status = req.query.status;

  const loads = await getLoadsByShipperId(userId, options);


  res.json({
    loads: mapLoads(loads),
  });
};

const getLoadsForDriver = async (req, res) => {
  const {userId} = req.user;

  const options = parsePagination(req.query);
  options.status = req.query.status;

  const loads = await getLoadsByDriverId(userId, options);

  res.json({
    loads: mapLoads(loads),
  });
};

const addLoadForShipper = async (req, res) => {
  const {userId} = req.user;
  const {
    name,
    payload,
    // eslint-disable-next-line camelcase
    pickup_address,
    // eslint-disable-next-line camelcase
    delivery_address,
    dimensions,
  } = req.body;
  const load = {
    createdBy: userId,
    name,
    payload,
    pickupAddress: pickup_address,
    deliveryAddress: delivery_address,
    dimensions,
  };

  await addLoad(load);

  res.json({
    message: 'Load created successfully',
  });
};

const getActiveLoadForDriver = async (req, res) => {
  const {userId} = req.user;

  const load = await getActiveLoadByDriverId(userId);

  if (!load) {
    throw new BadRequestError('Driver does not have an active load');
  }

  res.json({
    load: mapLoad(load),
  });
};

const iterateActiveLoadStateForDriver = async (req, res) => {
  const {userId} = req.user;

  const load = await getActiveLoadByDriverId(userId);

  if (!load) {
    throw new BadRequestError('Driver does not have an active load');
  }

  const {assignedTo, _id, state} = load;

  const states = [
    'En route to Pick Up', // 0
    'Arrived to Pick Up', // 1
    'En route to delivery', // 2
    'Arrived to delivery', // 3
  ];

  let nextState = 'Arrived to delivery';
  if (state === states[2]) { // if pre-last state
    await setTruckStatus(assignedTo, 'IS');
    await setLoadStatus(_id, 'SHIPPED');
    await logMessageById(_id, `Load status changed to 'SHIPPED'`);
  } else { // every else states
    if (state === states[0]) {
      nextState = states[1];
    } else if (state === states[1]) {
      nextState = states[2];
    } /* else if (load.state === states[2]) {
      nextState = states[3];
    }
    not needed because of "let nextState = 'Arrived to delivery';"
    */
  }

  await setLoadState(_id, nextState);
  await logMessageById(_id, `Load state changed to '${nextState}'`);

  // TODO: what if it was last state already?
  res.json({
    message: `Load state changed to '${nextState}'`,
  });
};

const getLoadByIdForShipper = async (req, res) => {
  const {userId} = req.user;
  const {id} = req.params;

  const load = await getLoadByShipperId(id, userId);

  if (!load) {
    throw new BadRequestError('Load with such id not found');
  }

  res.json({
    load: mapLoad(load),
  });
};

const getLoadByIdForDriver = async (req, res) => {
  const {userId} = req.user;
  const {id} = req.params;

  const load = await getLoadByDriverId(id, userId);

  if (!load) {
    throw new BadRequestError('Load with such id not found');
  }

  res.json({
    load: mapLoad(load),
  });
};

const updateLoadByIdForShipper = async (req, res) => {
  const {userId} = req.user;
  const {id} = req.params;
  const newLoad = reverseMapLoad(req.body);

  const load = await updateLoadByShipperId(id, userId, newLoad);

  if (!load) {
    throw new BadRequestError('Load with such id not found');
  }

  res.json({
    message: 'Load details changed successfully',
  });
};

const deleteLoadByIdForShipper = async (req, res) => {
  const {userId} = req.user;
  const {id} = req.params;

  const load = await deleteLoadByShipperId(id, userId);

  if (!load) {
    throw new BadRequestError('Load with such id not found');
  }

  res.json({
    message: 'Load deleted successfully',
  });
};

const findSuitableTruck = (load, trucks) => {
  const loadDimensions = [
    load.dimensions.width,
    load.dimensions.length,
    load.dimensions.height,
  ].sort();

  for (const truck of trucks) {
    const {
      maxPayload,
      dimensions,
    } = truck.truckType;

    if (maxPayload <= load.payload) {
      continue;
    }

    const truckDimensions = [
      dimensions.width,
      dimensions.length,
      dimensions.height,
    ].sort();

    if (
      loadDimensions[0] <= truckDimensions[0] &&
      loadDimensions[1] <= truckDimensions[1] &&
      loadDimensions[2] <= truckDimensions[2]
    ) {
      return truck;
    }
  }
};

const postLoadByIdForShipper = async (req, res) => {
  // 1. get load by id
  // 2. set 'POSTED' status
  // 3. get all 'IS' trucks
  // 4. compare dimensions and payload
  // 5. truck not found -> status back to 'NEW'
  // truck found -> truck status 'OL', load status 'ASSIGNED'
  // 6. set load field assignedTo and state to 'En route to Pick Up'

  // 1 ------------------------------------------------------------
  const {userId} = req.user;
  const {id} = req.params;

  const load = await getLoadByShipperId(id, userId);

  if (!load) {
    throw new BadRequestError('Load with such id not found');
  }

  if (load.status !== 'NEW' && load.status !== 'POSTED') {
    throw new BadRequestError(
        `Load with '${load.status}' status cannot be posted`,
    );
  }

  // 2 ------------------------------------------------------------
  await setLoadStatus(id, 'POSTED');
  await logMessageById(id, `Load status changed to 'POSTED'`);

  // 3 ------------------------------------------------------------
  const availableTrucks = await getAvailableTrucks();

  // 4 ------------------------------------------------------------
  const suitableTruck = findSuitableTruck(load, availableTrucks);

  // 5 ------------------------------------------------------------
  let driverFound = true;
  if (suitableTruck === null) {
    driverFound = false;
    await setLoadStatus(id, 'NEW');
    await logMessageById(id, `Load status changed to 'NEW'`);
  } else {
    await setTruckStatus(suitableTruck._id, 'OL');
    // await setLoadStatus(id, 'ASSIGNED');
    await assignLoadTo(id, suitableTruck._id);
    await logMessageById(
        id,
        `Load assigned to driver with id ${suitableTruck.assignedTo}`,
    );

    // 6 ----------------------------------------------------------
    await setLoadState(id, 'En route to Pick Up');
    await logMessageById(id, `Load state changed to 'En route to Pick Up'`);
  }

  res.json({
    message: 'Load posted successfully',
    driver_found: driverFound,
  });
};

const getShippingInfoByIdForShipper = async (req, res) => {
  const {userId} = req.user;

  const load = await getLoadByShipperId(userId);

  if (!load) {
    throw new BadRequestError('Load with such id not found');
  }

  const truck = await getTruck(load.assignedTo);

  if (!truck) {
    throw new BadRequestError('Truck with such id not found.');
  }

  res.json({
    load: mapLoad(load),
    truck: mapTruck(truck),
  });
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
