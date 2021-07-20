const Joi = require('joi');
const {
  dimensions,
  truckType,
} = require('./atoms');

const offsetLimit = Joi.object({
  offset: Joi.number().integer().min(0).optional(),
  limit: Joi.number().integer().min(1).max(50).optional(),
});

const loadStatus = Joi.object({
  status: Joi.string().valid(
      'NEW',
      'POSTED',
      'ASSIGNED',
      'SHIPPED',
  ).optional(),
});

const signUp = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid('SHIPPER', 'DRIVER').required(),
});

const signIn = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const forgotPassword = Joi.object({
  email: Joi.string().email().required(),
});

const changePassword = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

const postPutTruck = Joi.object({
  type: truckType,
});

const postPutLoad = Joi.object({
  name: Joi.string().required(),
  payload: Joi.number().required(),
  pickup_address: Joi.string().required(),
  delivery_address: Joi.string().required(),
  dimensions,
});

module.exports = {
  offsetLimit,
  loadStatus,
  signUp,
  signIn,
  forgotPassword,
  changePassword,
  postPutTruck,
  postPutLoad,
};
