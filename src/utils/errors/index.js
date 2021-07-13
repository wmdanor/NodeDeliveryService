/**
 * HttpError class with status code field.
 */
class HttpError extends Error {
  /**
   * @param {number} statusCode
   * @param {string} message
   */
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * BadRequestError extends HttpError.
 * Automatically created with 400 status code.
 */
class BadRequestError extends HttpError {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(400, message);
  }
}

/**
 * UnauthorizedError extends HttpError.
 * Automatically created with 401 status code.
 */
class UnauthorizedError extends HttpError {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(401, message);
  }
}

/**
 * NotFoundError extends HttpError.
 * Automatically created with 404 status code.
 */
class NotFoundError extends HttpError {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(404, message);
  }
}

/**
 * InternalServerError extends HttpError.
 * Automatically created with 500 status code.
 */
class InternalServerError extends HttpError {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(500, message);
  }
}

/**
 * ArgumentError extends basic error class.
 *
 * Do throw ArgumentError if bad arguments are passed.
 */
class ArgumentError extends Error {
  /**
   * @param {string} message error message
   * @param {string} paramName name of parameter that caused exception
   */
  constructor(message, paramName) {
    super(message);
    this.paramName = paramName;
  }
}

module.exports = {
  HttpError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
  ArgumentError,
};
