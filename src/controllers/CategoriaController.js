const categoriaService = require("@/services/CategoriaService");
const asyncHandler = require("@/middlewares/asyncHandlerMiddleware");

class CategoriaController {
  create = asyncHandler(async (req, res) => {
    const { nombre } = req.body;

    return res.status(201).json({
      success: true,
      data: await categoriaService.create({ nombre }),
      message: "¡Genial! Tu categoría se ha creado. 🎉",
    });
  });

  getAll = asyncHandler(async (req, res) => {
    return res.status(200).json({
      success: true,
      data: await categoriaService.getAll(),
    });
  });

  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    return res.status(200).json({
      success: true,
      data: await categoriaService.getById({ id }),
    });
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    return res.status(200).json({
      success: true,
      data: await categoriaService.update({ id, nombre }),
      message: "¡Genial! La categoría se ha actualizado. 🎉",
    });
  });

  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await categoriaService.delete({ id });

    return res.status(204).json({
      success: true,
      message: "¡Genial! La categoría se ha eliminado. 🎉",
    });
  });
}

module.exports = new CategoriaController();
