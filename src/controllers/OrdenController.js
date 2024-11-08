const ordenService = require("@/services/OrdenService");
const asyncHandler = require("@/middlewares/asyncHandlerMiddleware");

class OrdenController {
  create = asyncHandler(async (req, res) => {
    const { nombre, apellido, celular, direccion, distritoId, detallesOrden } =
      req.body;

    console.log(req.body);

    return res.status(201);

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
}

module.exports = new OrdenController();
