const compradorService = require("@/services/CompradorService");
const asyncHandler = require("@/middlewares/asyncHandlerMiddleware");

class CompradorController {
  getDireccionComprardorByUsuarioId = asyncHandler(async (req, res) => {
    return res.status(200).json({
      success: true,
      data: await compradorService.getDireccionComprardorByUsuarioId({
        usuarioId: req.usuario.id,
      }),
    });
  });

  createOrUpdateDireccionCompradorByUsuarioId = asyncHandler(
    async (req, res) => {
      const { nombre, apellido, direccion, celular, distritoId } = req.body;

      return res.status(200).json({
        success: true,
        data: await compradorService.createOrUpdateDireccionCompradorByUsuarioId(
          {
            usuarioId: req.usuario.id,
            nombre,
            apellido,
            direccion,
            celular,
            distritoId,
          }
        ),
      });
    }
  );

  deleteDireccionCompradorByUsuarioId = asyncHandler(async (req, res) => {
    return res.status(200).json({
      success: true,
      data: await compradorService.deleteDireccionCompradorByUsuarioId({
        usuarioId: req.usuario.id,
      }),
    });
  });
}

module.exports = new CompradorController();
