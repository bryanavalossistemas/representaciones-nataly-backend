const express = require("express");
const distritoController = require("@/controllers/DistritoController");

const router = express.Router();

router.route("/public").get(distritoController.getAllPublic);

module.exports = router;
