const express = require("express");
const direccionController = require("@/controllers/DireccionController");
const authenticate = require("@/middlewares/authenticateMiddleware");

const router = express.Router();

router.use(authenticate);

router
  .route("/usuario")
  .get(direccionController.getDireccionByUsuarioId);

router
  .route("/usuario/createOrUpdate")
  .put(direccionController.createOrUpdateDireccionByUsuarioId);

router
  .route("/usuario/delete")
  .delete(direccionController.deleteDireccionByUsuarioId);

module.exports = router;
