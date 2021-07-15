const mongoose = require('mongoose');
const Log = require('./log');
const Dimensions = require('./dimensions');

const Load = new mongoose.Schema({
  // User
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  // Truck
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    // required: true,
  },
  status: {
    type: String,
    enum: ['NEW', 'POSTED', 'ASSIGNED', 'SHIPPED'],
    default: 'NEW',
    required: true,
  },
  state: {
    type: String,
    enum: [
      'En route to Pick Up',
      'Arrived to Pick Up',
      'En route to delivery',
      'Arrived to delivery',
    ],
    default: null,
    // required: true,
  },
  name: {
    type: String,
    required: true,
  },
  payload: {
    type: Number,
    required: true,
  },
  pickupAddress: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  dimensions: {
    type: Dimensions,
    required: true,
  },

  logs: {
    type: [Log],
    default: [],
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = Load;
