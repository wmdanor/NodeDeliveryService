const mongoose = require('mongoose');

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['SHIPPER', 'DRIVER'],
    required: true,
  },

  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = User;
