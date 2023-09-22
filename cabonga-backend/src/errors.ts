class NotWhitelistedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotWhitelistedError";
  }
}

export { NotWhitelistedError }