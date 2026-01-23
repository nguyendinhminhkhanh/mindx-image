const HttpError = require("../httpError");

const valideteInput = (schema, property) => {
  return function (req, res, next) {
    const input = req[property];
    const { error } = schema.validate(input);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((details) => details.message).join(",");
      throw new HttpError(message, 422);
    }
  };
};

module.exports = valideteInput;
