const express = require("express");
const compradorController = require("@/controllers/CompradorController");
const authenticate = require("@/middlewares/authenticateMiddleware");

const router = express.Router();

router.use(authenticate);

router
  .route("/direccionComprador")
  .get(compradorController.getDireccionComprardorByUsuarioId);

router
  .route("/direccionComprador/createOrUpdate")
  .put(compradorController.createOrUpdateDireccionCompradorByUsuarioId);

router
  .route("/direccionComprador/delete")
  .delete(compradorController.deleteDireccionCompradorByUsuarioId);

module.exports = router;
