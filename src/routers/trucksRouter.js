const express = require('express');
const {driverAuthMiddleware} = require('../middlewares/authMiddleware');
const {asyncWrapper} = require('../utils/routerUtils');
const {
  getTrucksForDriver,
  addTruckForDriver,
  getTruckByIdForDriver,
  updateTruckByIdForDriver,
  deleteTruckByIdForDriver,
  assignTruckByIdForDriver,
} = require('../controllers/trucksController');
const {
  postPutTruckValidator,
} = require('../middlewares/validation');

const trucksRouter = new express.Router();

trucksRouter.get('/', driverAuthMiddleware, asyncWrapper(getTrucksForDriver));
trucksRouter.post(
    '/',
    driverAuthMiddleware, postPutTruckValidator,
    asyncWrapper(addTruckForDriver),
);

trucksRouter.get(
    '/:id',
    driverAuthMiddleware,
    asyncWrapper(getTruckByIdForDriver),
);
trucksRouter.put(
    '/:id',
    driverAuthMiddleware, postPutTruckValidator,
    asyncWrapper(updateTruckByIdForDriver),
);
trucksRouter.delete(
    '/:id',
    driverAuthMiddleware,
    asyncWrapper(deleteTruckByIdForDriver),
);

trucksRouter.post(
    '/:id/assign',
    driverAuthMiddleware,
    asyncWrapper(assignTruckByIdForDriver),
);

module.exports = {
  trucksRouter,
};
