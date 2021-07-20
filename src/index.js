const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const {main} = require('./routers');

const {dbConnectionString} = require('./utils/staticData');

const app = express();

app.use(main);

// mongoose.connect(dbConnectionString, {
//   useNewUrlParser: true, useUnifiedTopology: true,
// }).then(() => {
//   console.log('DB connection established');
// }).catch(() => {
//   console.error('Failed to establish DB connection');
// });

// module.exports = app;
//
// if (require.main === module) {
//   const port = process.env.PORT || 8080;
//
//   try {
//     app.listen(port, () => {
//       console.log(`Server started on port ${port}`);
//     });
//   } catch (err) {
//     console.error('Failed to start the server - ', err.message);
//   }
// }

// nrjbfxmdezbbihen

const sendMail = async (message) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'tempmailserv13@gmail.com',
      pass: 'nrjbfxmdezbbihen',
    },
  });

  await transporter.sendMail({
    from: '"Logging system" <tempmailserv13@gmail.com>',
    to: 'tempmailserv13@gmail.com',
    subject: 'Log email',
    text: `${message}\n${Date.now()}`,
  });
};

const start = async () => {
  try {
    await mongoose.connect(dbConnectionString, {
      useNewUrlParser: true, useUnifiedTopology: true,
    });

    await sendMail('Db connected');

    const port = process.env.PORT || 8080;

    app.listen(port, () => {
      console.log('Server started');
      sendMail('Server started').then();
    });
  } catch (err) {
    console.error('Failed to start the server - ', err.message);
  }
};

start().then(() => {
  console.log('End.');
});
