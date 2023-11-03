class NotWhitelistedError extends Error {
  constructor() {
    super();
    this.name = "NotWhitelistedError";
    this.message = "WHITELIST_ERROR"
  }
}

class InvalidRefreshTokenError extends Error {
  constructor() {
    super()
    this.name = "InvalidRefreshTokenError";
    this.message = "REFRESHTOKEN_ERROR"
  }
}

class LoginError extends Error {
  constructor() {
    super();
    this.name = "LoginError";
    this.message = "LOGIN_ERROR"
  }
}


export { NotWhitelistedError, InvalidRefreshTokenError, LoginError }