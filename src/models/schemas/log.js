const mongoose = require('mongoose');

const Log = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = Log;
