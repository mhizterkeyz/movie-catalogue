const customError = (status, message = null, name = null) => {
  const error = new Error(message);
  error.status = status;
  error.name = name;
  error.userError = true;
  return error;
};
const validationError = (message) => {
  return customError(422, message, "Validation Error");
};
const authenticationError = (message) => {
  return customError(401, message, "Authentication Error");
};
const authorizationError = (message) => {
  return customError(403, message, "Authorization Error");
};
const notFoundError = (message) => {
  return customError(404, message, "Not Found");
};
const conflictError = (message) => {
  return customError(409, message, "Conflict Error");
};
const badRequestError = (message) => {
  return customError(400, message, "Bad Request");
};

const errorHandler = () => (error, req, res, next) => {
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

module.exports = {
  errorHandler,
  badRequestError,
  conflictError,
  notFoundError,
  authenticationError,
  authorizationError,
  validationError,
  customError,
};
