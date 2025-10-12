class HttpError extends Error {
  constructor(message, status = 500) {
    this.status = status;
  }
}

module.exports = HttpError;
