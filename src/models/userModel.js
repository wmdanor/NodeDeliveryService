const mongoose = require('mongoose');

const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },

  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = {User};
