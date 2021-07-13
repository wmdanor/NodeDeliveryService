const path = require('path');
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, '../config');
const config = require('config');

// const jwtSecretToken = 'secret';
const jwtSecretToken = config.get('jwtSecretToken');
// const dbConnectionString =
//   'mongodb+srv://main:main1@cluster0.5avs2.mongodb.net/hw2?retryWrites=true&w=majority';
const dbConnectionString = config.get('connectionStrings.main');

module.exports = {
  jwtSecretToken,
  dbConnectionString,
};
