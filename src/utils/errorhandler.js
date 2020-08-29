const customError = (status, message = null, name = null) => {
  const error = new Error(message);
  error.status = status;
  error.name = name;
  error.userError = true;
  return error;
};

exports.customError = customError;
exports.validationError = (message) => {
  return customError(422, message, "Validation Error");
};
exports.authenticationError = (message) => {
  return customError(401, message, "Authentication Error");
};
exports.authorizationError = (message) => {
  return customError(403, message, "Authorization Error");
};
exports.notFoundError = (message) => {
  return customError(404, message, "Not Found");
};
exports.conflictError = (message) => {
  return customError(409, message, "Conflict Error");
};
exports.badRequestError = (message) => {
  return customError(400, message, "Bad Request");
};

module.exports = () => (error, req, res, next) => {
  if (error === "404") {
    error = exports.notFoundError("You have reached an undefined route");
  }
  // Log error if application error
  if (typeof error !== "object" || !error.userError) {
    console.log({ message: error.message, stack: error.stack, ...error });
    error = {};
    error.name = "SERVER_ERROR";
    error.message = "An unexpected error has occurred";
    error.status = 500;
  }

  res.status(error.status).json({
    message: error.message,
    status: error.status,
    error: error.name,
  });
};
