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
const {nameMiddleware} = require('../middlewares/nameMiddleware');

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
    driverAuthMiddleware, postPutTruckValidator, nameMiddleware,
    asyncWrapper(updateTruckByIdForDriver),
);
trucksRouter.delete(
    '/:id',
    driverAuthMiddleware, nameMiddleware,
    asyncWrapper(deleteTruckByIdForDriver),
);

trucksRouter.post(
    '/:id/assign',
    driverAuthMiddleware, nameMiddleware,
    asyncWrapper(assignTruckByIdForDriver),
);

module.exports = {
  trucksRouter,
};
