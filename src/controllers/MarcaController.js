const marcaService = require("@/services/MarcaService");
const asyncHandler = require("@/middlewares/asyncHandlerMiddleware");

class MarcaController {
  create = asyncHandler(async (req, res) => {
    const { nombre } = req.body;

    return res.status(201).json({
      success: true,
      data: await marcaService.create({ nombre }),
      message: "¡Genial! Tu marca se ha creado. 🎉",
    });
  });

  getAll = asyncHandler(async (req, res) => {
    return res.status(201).json({
      success: true,
      data: await marcaService.getAll(),
    });
  });

  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    return res.status(200).json({
      success: true,
      data: await marcaService.getById({ id }),
    });
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    return res.status(200).json({
      success: true,
      data: await marcaService.update({ id, nombre }),
      message: "¡Genial! La marca se ha actualizado. 🎉",
    });
  });

  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await marcaService.delete({ id });

    return res.status(204).json({
      success: true,
      message: "¡Genial! La marca se ha eliminado. 🎉",
    });
  });
}

module.exports = new MarcaController();
