const {
  createBodyValidator,
  createQueryValidator,
} = require('./createValidator');
const {
  offsetLimit,
  loadStatus,
  signUp,
  signIn,
  forgotPassword,
  changePassword,
  postPutTruck,
  postPutLoad,
} = require('./schemas');

module.exports = {
  offsetLimitQueryValidator: createQueryValidator(offsetLimit),
  loadStatusQueryValidator: createQueryValidator(loadStatus),
  signUpValidator: createBodyValidator(signUp),
  signInValidator: createBodyValidator(signIn),
  forgotPasswordValidator: createBodyValidator(forgotPassword),
  changePasswordValidator: createBodyValidator(changePassword),
  postPutTruckValidator: createBodyValidator(postPutTruck),
  postPutLoadValidator: createBodyValidator(postPutLoad),
};
