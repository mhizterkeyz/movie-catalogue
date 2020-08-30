const UsersServic = require("../services/UsersServic");
const { authenticationError } = require("../utils/errorhandler");
const { signToken } = require("../utils/jwt");

const createSingleUser = () => async (req, res, next) => {
  try {
    const data = await UsersServic.createSingleUser(req.body);
    res.status(201).json({
      status: 201,
      message: "user created",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const signInSingleUser = () => async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UsersServic.getSingleUser({
      $or: [{ username: username }, { email: username }],
    });
    if (!user || !(await user.authenticate(password))) {
      throw authenticationError("invalid credentials");
    }
    const jwt = signToken(user._id);
    res.status(200).json({
      status: 200,
      message: "signin successful",
      data: { ...user.toJson(), jwt },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSingleUser,
  signInSingleUser,
};
