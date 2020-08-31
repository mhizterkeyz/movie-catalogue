/* eslint-disable newline-per-chained-call */
const Joi = require("@hapi/joi");

module.exports = {
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
    })
    .trim()
    .required(),
  username: Joi.string()
    .regex(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)
    .message(
      "username must be 4 to 20 characters long and should contain no spaces"
    ),
  password: Joi.string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?.&])[A-Za-z\d@$!%*.#?&]{6,20}$/)
    .message(
      "password must be 6-20 characters long, and must contain at least one letter, one number and one special character"
    ),
  fullName: Joi.string()
    .regex(/^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/)
    .message(
      "fullname should be at least 4 characters long and just your first and last name"
    ),
  string: Joi.string().min(5),
};
