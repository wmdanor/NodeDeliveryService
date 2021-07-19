const mongoose = require('mongoose');

const HttpLog = mongoose.model('HttpLog', {
  message: {
    type: String,
    required: true,
  },
});

module.exports = HttpLog;
