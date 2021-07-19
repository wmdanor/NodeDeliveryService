const mongoose = require('mongoose');

const {dbConnectionString} = require('./utils/staticData');

mongoose.connect(dbConnectionString, {
  useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => {
  console.log('DB connection established');

  mongoose.connection.dropCollection('users', (err, result) => {});
  mongoose.connection.dropCollection('trucks', (err, result) => {});
  mongoose.connection.dropCollection('trucktypes', (err, result) => {});
  mongoose.connection.dropCollection('loads', (err, result) => {});

  process.exit();
}).catch(() => {
  console.error('Failed to establish DB connection');
});
