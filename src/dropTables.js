const mongoose = require('mongoose');

const {dbConnectionString} = require('./utils/staticData');

// mongoose.connect(dbConnectionString, {
//   useNewUrlParser: true, useUnifiedTopology: true,
// }).then(() => {
//   console.log('DB connection established');
//
//   mongoose.connection.dropCollection('users', (err, result) => {});
//   mongoose.connection.dropCollection('trucks', (err, result) => {});
//   mongoose.connection.dropCollection('trucktypes', (err, result) => {});
//   mongoose.connection.dropCollection('loads', (err, result) => {});
// }).catch(() => {
//   console.error('Failed to establish DB connection');
// });

const run = async () => {
  try {
    await mongoose.connect(dbConnectionString, {
      useNewUrlParser: true, useUnifiedTopology: true,
    });

    console.log('DB connection established');

    await Promise.all([
      mongoose.connection.dropCollection('users'),
      mongoose.connection.dropCollection('trucks'),
      mongoose.connection.dropCollection('trucktypes'),
      mongoose.connection.dropCollection('loads'),
    ]);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
};

run().then();
