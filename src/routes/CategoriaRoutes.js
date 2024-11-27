const express = require("express");
const categoriaController = require("@/controllers/CategoriaController");
const {
  createValidation,
  updateValidation,
} = require("@/validations/categoriaValidation");
const validateFields = require("@/middlewares/validateFieldsMiddleware");
const validateId = require("@/middlewares/validateIdMiddleware");
const authenticate = require("@/middlewares/authenticateMiddleware");
const authorize = require("@/middlewares/authorizeMiddleware");

const router = express.Router();

router.route("/public").get(categoriaController.getAll);

router.route("/:id/public").get(validateId, categoriaController.getByIdPublic);

// router.use(authenticate, authorize({ rolesId: [1] }));

router
  .route("/")
  .get(categoriaController.getAll)
  .post(createValidation, validateFields, categoriaController.create);

router
  .route("/:id")
  .get(validateId, categoriaController.getById)
  .put(validateId, updateValidation, validateFields, categoriaController.update)
  .delete(validateId, categoriaController.delete);

module.exports = router;
