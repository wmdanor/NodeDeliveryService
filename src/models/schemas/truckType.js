const mongoose = require('mongoose');
const Dimensions = require('./dimensions');

const TruckType = new mongoose.Schema({
  // name field should be removed
  name: {
    type: String,
    required: true,
    unique: true,
  },
  dimensions: {
    type: Dimensions,
    required: true,
  },
  maxPayload: {
    type: Number,
    required: true,
  },
});

module.exports = TruckType;
