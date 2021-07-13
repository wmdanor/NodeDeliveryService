const Joi = require('joi');

// const signUpIn = Joi.object({
//   username: Joi.string().alphanum().min(3).max(20).required(),
//   password: Joi.string().min(8).max(16).required(),
// });

const signUpIn = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// const changePassword = Joi.object({
//   oldPassword: Joi.string().min(8).max(16).required(),
//   newPassword: Joi.string().min(8).max(16).required(),
// });

const changePassword = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

// const offsetLimit = Joi.object({
//   offset: Joi.number().integer().min(0).optional(),
//   limit: Joi.number().integer().min(1).max(100).optional(),
// });

const offsetLimit = Joi.object({
  offset: Joi.optional(),
  limit: Joi.optional(),
});

// const notePayload = Joi.object({
//   text: Joi.string().max(65536).required(),
// });

const notePayload = Joi.object({
  text: Joi.string().required(),
});

module.exports = {
  signUpIn,
  changePassword,
  offsetLimit,
  notePayload,
};
