// const mongoose = require('mongoose');
//
// const {dbConnectionString} = require('./utils/staticData');
//
// mongoose.connect(dbConnectionString, {
//   useNewUrlParser: true, useUnifiedTopology: true,
// }).then(() => {
//   console.log('DB connection established');
//
//   get().then();
// }).catch(() => {
//   console.error('Failed to establish DB connection');
// });
//
// const get = async () => {
//   const Test = mongoose.model('Test', {
//     prop: {
//       type: String,
//       required: true,
//     },
//   });
//
//   const test = new Test({
//     prop: 'test',
//   });
//
//   // await test.save();
//
//   // const u = await User.findOne({email: 'example@gmail.com'});
//   // console.log(u, u._id);
//   const q = await Test.findByIdAndUpdate('60f5aeb7f32cf62b64688363', {prop: 'yy'});
//   console.log(q);
// };

const func2 = async () => {
  return 2;
};

const func = async () => {
  return func2();
};

const main = async () => {
  const v = await func();
  console.log(v);
};

main();
