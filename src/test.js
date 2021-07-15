const mongoose = require('mongoose');

const {dbConnectionString} = require('./utils/staticData');

mongoose.connect(dbConnectionString, {
  useNewUrlParser: true, useUnifiedTopology: true,
}).then(() => {
  console.log('DB connection established');

  get().then();
}).catch(() => {
  console.error('Failed to establish DB connection');
});

const get = async () => {
  const User = mongoose.model('User', {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['SHIPPER', 'DRIVER'],
      required: true,
    },

    createdDate: {
      type: Date,
      default: Date.now(),
    },
  });

  const user = new User({
    email: 'example@gmail.com',
    passwordHash: 'hjchdkjshjkhjksdah',
    role: 'SHIPPER',
  });

  // await user.save();

  const u = await User.findOne({email: 'example@gmail.com'});
  console.log(u, u._id);
};
