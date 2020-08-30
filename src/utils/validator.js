const { validationError } = require("./errorhandler");
require("@hapi/joi");

module.exports = async (schema, toValidate, next) => {
  try {
    await schema.validateAsync(toValidate, { abortEarly: false });
    next();
  } catch (error) {
    next(validationError(error));
  }
};
