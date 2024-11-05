const compraService = require("@/services/CompraService");
const asyncHandler = require("@/middlewares/asyncHandlerMiddleware");

class CompraController {
  create = asyncHandler(async (req, res) => {
    const { proveedorId, detallesCompra } = req.body;

    return res.status(201).json({
      success: true,
      data: await compraService.create({ proveedorId, detallesCompra }),
    });
  });

  getAll = asyncHandler(async (req, res) => {
    return res.status(201).json({
      success: true,
      data: await compraService.getAll(),
    });
  });

  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    res.status(200).json(await compraService.getById({ id }));
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { proveedorId, newDetallesCompra } = req.body;

    return res.status(201).json({
      success: true,
      data: await compraService.update({ id, proveedorId, newDetallesCompra }),
    });
  });

  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;

    return res.status(201).json({
      success: true,
      message: await compraService.delete({ id }),
    });
  });
}

module.exports = new CompraController();
