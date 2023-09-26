class NotWhitelistedError extends Error {
  constructor(message: string) {
    message = "WHITELIST_ERROR"
    super(message);
    this.name = "NotWhitelistedError";
  }
}

class InvalidRefreshTokenError extends Error {
  constructor(message: string) {
    message = "REFRESHTOKEN_ERROR"
    super(message);
    this.name = "InvalidRefreshTokenError";
  }
}

export { NotWhitelistedError, InvalidRefreshTokenError }