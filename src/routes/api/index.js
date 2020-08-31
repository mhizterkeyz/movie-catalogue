const { Router } = require("express");
const auth = require("./auth");
const movie = require("./movie");

const router = Router();

router.use("/auth", auth);
router.use("/movies", movie);

module.exports = router;
