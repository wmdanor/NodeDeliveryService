const express = require('express');
const mongoose = require('mongoose');
const {main} = require('./routers');

const {dbConnectionString} = require('./utils/staticData');

const app = express();

app.use(main);

mongoose.connect(dbConnectionString, {
  useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => {
  console.log('DB connection established');
}).catch(() => {
  console.error('Failed to establish DB connection');
});

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 8080;

  try {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start the server - ', err.message);
  }
}

// TODO create readme
// TODO create api docs
