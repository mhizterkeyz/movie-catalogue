const { Router } = require("express");
const controller = require("../../controllers/user.controller");
const validation = require("../../validation/user.validation");

const router = Router();

router.post(
  "/signup",
  validation.validateUserCreation(),
  controller.createSingleUser()
);
router.post("/signin", controller.signInSingleUser());

module.exports = router;
