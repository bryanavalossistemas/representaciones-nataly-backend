const ordenService = require("@/services/OrdenService");
const asyncHandler = require("@/middlewares/asyncHandlerMiddleware");

class OrdenController {
  create = asyncHandler(async (req, res) => {
    const { nombre, apellido, celular, direccion, distritoId, detallesOrden } =
      req.body;

    return res.status(201).json({
      success: true,
      data: await ordenService.create({
        usuario: req.usuario,
        nombre,
        apellido,
        celular,
        direccion,
        distritoId,
        detallesOrden,
      }),
    });
  });

  getAllByUsuarioId = asyncHandler(async (req, res) => {
    return res.status(200).json({
      success: true,
      data: await ordenService.getAllByUsuarioId({ usuarioId: req.usuario.id }),
    });
  });

  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    return res.status(200).json({
      success: true,
      data: await ordenService.getById({ id }),
    });
  });
}

module.exports = new OrdenController();
