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
};
