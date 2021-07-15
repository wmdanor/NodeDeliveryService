const mongoose = require('mongoose');
const TruckType = require('./truckType');

const Truck = new mongoose.Schema({
  // User
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  // Load
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    // required: true,
  },
  // TruckType
  truckType: {
    type: TruckType,
    required: true,
  },
  status: {
    type: String,
    enum: ['OL', 'IS'],
    default: 'IS',
    required: true,
  },

  createdDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = Truck;
