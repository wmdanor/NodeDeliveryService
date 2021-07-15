const mongoose = require('mongoose');
const schema = require('./schemas/truck');

const Truck = mongoose.model('Truck', schema);

module.exports = Truck;
