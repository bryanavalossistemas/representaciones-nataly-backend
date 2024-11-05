const express = require("express");
const clienteController = require("@/controllers/ClienteController");
const {
  createValidation,
  updateValidation,
} = require("@/validations/clienteValidation");
const validateFields = require("@/middlewares/validateFieldsMiddleware");
const validateId = require("@/middlewares/validateIdMiddleware");
const authenticate = require("@/middlewares/authenticateMiddleware");
const authorize = require("@/middlewares/authorizeMiddleware");

const router = express.Router();

router.use(authenticate, authorize({ rolesId: [1] }));

router
  .route("/")
  .get(clienteController.getAll)
  .post(createValidation, validateFields, clienteController.create);
router
  .route("/:id")
  .get(validateId, clienteController.getById)
  .put(validateId, updateValidation, validateFields, clienteController.update)
  .delete(validateId, clienteController.delete);

module.exports = router;
