class HttpError extends Error {
  constructor(message, errorCode) {
    // add a message and code props
    super(message);
    this.code = errorCode;
  }
}

module.exports = HttpError;
