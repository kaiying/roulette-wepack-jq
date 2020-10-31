export const NotLoggedInErrorType = {
  lostToken: 'lost Token',
  invalid: 'invalid argument',
  system: 'system error',
};

export const UserNotLoggedInException = function (type, message = '') {
  this.message = `使用者尚未登入，錯誤類型「${type}」 ${message}`;
  this.type = 'UserNotLoginException';
};
