class NotWhitelistedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotWhitelistedError";
  }
}

class InvalidRefreshTokenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidRefreshTokenError";
  }
}

export { NotWhitelistedError, InvalidRefreshTokenError }