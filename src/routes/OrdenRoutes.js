const express = require("express");
const ordenController = require("@/controllers/OrdenController");

const authenticate = require("@/middlewares/authenticateMiddleware");

const router = express.Router();

router.use(authenticate);

router.route("/").post(ordenController.create);

module.exports = router;
