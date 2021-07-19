const {BadRequestError} = require('../../utils/errors');

/**
 * Creating validating middleware function
 *
 * @param {Joi.AnySchema} schema Joi schema.
 * @return {function} validating middleware.
 */
function createBodyValidator(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err) {
      next(new BadRequestError(err.message));
    }
  };
}

/**
 * Creating validating middleware function
 *
 * @param {Joi.AnySchema} schema Joi schema.
 * @return {function} validating middleware.
 */
function createQueryValidator(schema) {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.query);
      next();
    } catch (err) {
      next(new BadRequestError(err.message));
    }
  };
}

module.exports = {
  createBodyValidator,
  createQueryValidator,
};
