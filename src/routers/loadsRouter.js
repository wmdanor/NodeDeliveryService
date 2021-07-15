const express = require('express');
const {
  driverAuthMiddleware,
  shipperAuthMiddleware,
} = require('../middlewares/authMiddleware');
const {asyncWrapper} = require('../utils/routerUtils');
const {
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
} = require('../controllers/LoadsController');
const {
  postPutLoadValidator,
  offsetLimitQueryValidator,
  loadStatusQueryValidator,
} = require('../middlewares/validation');

const loadsRouter = new express.Router();

loadsRouter.get(
    '/',
    offsetLimitQueryValidator, loadStatusQueryValidator,
    asyncWrapper(getLoadsForShipper),
    asyncWrapper(getLoadsForDriver),
);
loadsRouter.post(
    '/',
    shipperAuthMiddleware, postPutLoadValidator,
    asyncWrapper(addLoadForShipper),
);

loadsRouter.get(
    '/active',
    driverAuthMiddleware,
    asyncWrapper(getActiveLoadForDriver),
);
loadsRouter.patch(
    '/active/state',
    driverAuthMiddleware,
    asyncWrapper(iterateActiveLoadStateForDriver),
);

loadsRouter.get(
    '/:id',
    asyncWrapper(getLoadByIdForShipper),
    asyncWrapper(getLoadByIdForDriver),
);
loadsRouter.put(
    '/:id',
    shipperAuthMiddleware, postPutLoadValidator,
    asyncWrapper(updateLoadByIdForShipper),
);
loadsRouter.delete(
    '/:id',
    shipperAuthMiddleware,
    asyncWrapper(deleteLoadByIdForShipper),
);

loadsRouter.post(
    '/:id/post',
    shipperAuthMiddleware,
    asyncWrapper(postLoadByIdForShipper),
);
loadsRouter.post(
    '/:id/shipping_info',
    shipperAuthMiddleware,
    asyncWrapper(getShippingInfoByIdForShipper),
);

module.exports = {
  loadsRouter,
};
