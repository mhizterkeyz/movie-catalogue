const Users = require("../models/Users");
const { badRequestError } = require("../utils/errorhandler");
const { signToken } = require("../utils/jwt");

const createSingleUser = async (data) => {
  const check = await Users.findOne({
    $or: [{ username: data.username }, { email: data.email }],
  });
  if (check) {
    throw badRequestError("A user already exists with thesame credentials");
  }
  const user = await Users.create(data);
  const jwt = signToken(user._id);
  return { ...user.toJson(), jwt };
};
const getSingleUser = (param) => {
  return Users.findOne(param);
};
module.exports = {
  createSingleUser,
  getSingleUser,
};
