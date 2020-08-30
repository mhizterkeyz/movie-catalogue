const JWT = require("jsonwebtoken");
const { authenticationError, authorizationError } = require("./errorhandler");
const UsersServic = require("../services/UsersServic");

const signToken = (_id) => {
  return JWT.sign(
    {
      exp:
        Date.now() / 100 +
        86400 * (parseFloat(process.env.JWTExpireDays || 1) || 1),
      _id,
    },
    process.env.JWTSecret
  );
};
const jwt = () => async (req, res, next) => {
  try {
    const { query } = req;
    if (query && query.bearerToken) {
      req.headers.authorization = `Bearer ${query.bearerToken}`;
    }
    if (typeof req.headers.authorization === "string") {
      req.headers.authorization = req.headers.authorization.replace(
        "Bearer",
        ""
      );
    }
    let _id;
    try {
      _id = JWT.verify(req.headers.authorization, process.env.JWTSecret);
    } catch (error) {
      throw authenticationError(error.message);
    }

    const user = await UsersServic.getSingleUser({ _id });
    if (!user) {
      throw authorizationError("unauthorized");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signToken,
  jwt,
};
