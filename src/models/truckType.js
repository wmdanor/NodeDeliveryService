const mongoose = require('mongoose');
const schema = require('./schemas/truckType');

// TruckType model only exists for reference of hardcoded values of trucks.
// eslint-disable-next-line max-len
// Should be removed and used only as schema part of truck schema without 'name' field.

const TruckType = mongoose.model('TruckType', schema);

// Default hardcoded type
TruckType.insertMany([
  {
    name: 'SPRINTER',
    dimensions: {
      width: 300,
      length: 250,
      height: 170,
    },
    maxPayload: 1700,
  },
  {
    name: 'SMALL STRAIGHT',
    dimensions: {
      width: 500,
      length: 250,
      height: 170,
    },
    maxPayload: 2500,
  },
  {
    name: 'LARGE STRAIGHT',
    dimensions: {
      width: 700,
      length: 350,
      height: 200,
    },
    maxPayload: 4000,
  },
]).then().catch((err) => {
  console.error(err.message);
});

module.exports = TruckType;
