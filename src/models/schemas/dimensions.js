const mongoose = require('mongoose');

const Dimensions = new mongoose.Schema({
  width: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
});

module.exports = Dimensions;
