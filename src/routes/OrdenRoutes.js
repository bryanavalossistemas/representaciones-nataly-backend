const express = require("express");
const ordenController = require("@/controllers/OrdenController");

const authenticate = require("@/middlewares/authenticateMiddleware");
const validateId = require("@/middlewares/validateIdMiddleware");

const router = express.Router();

router.use(authenticate);

router
  .route("/")
  .get(ordenController.getAllByUsuarioId)
  .post(ordenController.create);

router.route("/:id").get(validateId, ordenController.getById);

module.exports = router;
