const Joi = require("@hapi/joi");
const Format = require("./");
const validator = require("../utils/validator");

const validateUserCreation = () => (req, res, next) => {
  const schema = Joi.object().keys({
    fullName: Format.fullName.required(),
    email: Format.email.required(),
    password: Format.password.required(),
    username: Format.username.required(),
  });
  return validator(schema, req.body, next);
};

module.exports = {
  validateUserCreation,
};
