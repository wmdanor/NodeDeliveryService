const Joi = require('joi');

const dimensions = Joi.object({
  width: Joi.number().min(0).required(),
  length: Joi.number().min(0).required(),
  height: Joi.number().min(0).required(),
});

const truckType = Joi.string().valid(
    'SPRINTER',
    'SMALL STRAIGHT',
    'LARGE STRAIGHT',
).required();

module.exports = {
  dimensions,
  truckType,
};
