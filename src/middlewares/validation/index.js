const {
  createBodyValidator,
  createQueryValidator,
} = require('./createValidator');
const {
  signUpIn,
  changePassword,
  offsetLimit,
  notePayload,
} = require('./schemas');

module.exports = {
  signUpInValidator: createBodyValidator(signUpIn),
  changePasswordValidator: createBodyValidator(changePassword),
  offsetLimitQueryValidator: createQueryValidator(offsetLimit),
  notePayloadValidator: createBodyValidator(notePayload),
};
