const express = require("express");
const marcaController = require("@/controllers/MarcaController");
const {
  createValidation,
  updateValidation,
} = require("@/validations/marcaValidation");
const validateFields = require("@/middlewares/validateFieldsMiddleware");
const validateId = require("@/middlewares/validateIdMiddleware");
const authenticate = require("@/middlewares/authenticateMiddleware");
const authorize = require("@/middlewares/authorizeMiddleware");

const router = express.Router();

router.use(authenticate, authorize({ rolesId: [1] }));

router
  .route("/")
  .get(marcaController.getAll)
  .post(createValidation, validateFields, marcaController.create);
router
  .route("/:id")
  .get(validateId, marcaController.getById)
  .put(validateId, updateValidation, validateFields, marcaController.update)
  .delete(validateId, marcaController.delete);

module.exports = router;
