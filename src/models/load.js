const mongoose = require('mongoose');
const schema = require('./schemas/load');

const Load = mongoose.model('Load', schema);

module.exports = Load;
