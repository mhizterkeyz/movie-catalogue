const Joi = require("@hapi/joi");
const validator = require("../utils/validator");
const Format = require("./");

const validateRatingData = () => (req, res, next) => {
  const schema = Joi.object().keys({
    value: Joi.number().min(0.5).max(10.0).required(),
  });
  return validator(schema, req.body, next);
};
const listCreationValidation = () => (req, res, next) => {
  const schema = Joi.object().keys({
    name: Format.string.required(),
    description: Format.string.required(),
  });
  return validator(schema, req.body, next);
};
const validateMovieAdditionData = () => (req, res, next) => {
  const schema = Joi.object().keys({
    id: Joi.string().required(),
  });
  return validator(schema, req.body, next);
};

module.exports = {
  validateRatingData,
  listCreationValidation,
  validateMovieAdditionData,
};
