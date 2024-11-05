const ventaService = require("@/services/VentaService");
const asyncHandler = require("@/middlewares/asyncHandlerMiddleware");

class VentaController {
  create = asyncHandler(async (req, res) => {
    const { clienteId, detallesVenta } = req.body;

    return res.status(201).json({
      success: true,
      data: await ventaService.create({ clienteId, detallesVenta }),
    });
  });

  getAll = asyncHandler(async (req, res) => {
    return res.status(201).json({
      success: true,
      data: await ventaService.getAll(),
    });
  });

  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    res.status(200).json(await ventaService.getById({ id }));
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { clienteId, newDetallesVenta } = req.body;

    return res.status(201).json({
      success: true,
      data: await ventaService.update({ id, clienteId, newDetallesVenta }),
    });
  });

  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;

    return res.status(201).json({
      success: true,
      message: await ventaService.delete({ id }),
    });
  });
}

module.exports = new VentaController();
