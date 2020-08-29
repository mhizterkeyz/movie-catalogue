const swagger = require("swagger-ui-express");
const express = require("express");
const swaggerDoc = require("../swaggerDoc/swagger.json");
const index = require("./api");

const router = express.Router();

router.use("/api/v1/", index);

router.use("/api/docs", swagger.serve, swagger.setup(swaggerDoc));

module.exports = router;
