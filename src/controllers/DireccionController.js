const direccionService = require("@/services/DireccionService");
const asyncHandler = require("@/middlewares/asyncHandlerMiddleware");

class DireccionController {
  getDireccionByUsuarioId = asyncHandler(async (req, res) => {
    return res.status(200).json({
      success: true,
      data: await direccionService.getDireccionByUsuarioId({
        usuarioId: req.usuario.id,
      }),
    });
  });

  createOrUpdateDireccionByUsuarioId = asyncHandler(async (req, res) => {
    const { nombre, apellido, direccion, celular, distritoId } = req.body;

    return res.status(200).json({
      success: true,
      data: await direccionService.createOrUpdateDireccionByUsuarioId({
        usuarioId: req.usuario?.id || 1,
        nombre,
        apellido,
        direccion,
        celular,
        distritoId,
      }),
    });
  });

  deleteDireccionByUsuarioId = asyncHandler(async (req, res) => {
    return res.status(200).json({
      success: true,
      data: await direccionService.deleteDireccionByUsuarioId({
        usuarioId: req.usuario.id,
      }),
    });
  });
}

module.exports = new DireccionController();
