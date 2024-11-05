const clienteService = require("@/services/ClienteService");
const asyncHandler = require("@/middlewares/asyncHandlerMiddleware");

class ClienteJuridicoController {
  create = asyncHandler(async (req, res) => {
    const { nombre, ruc, direccion, celular, telefono, correo } = req.body;

    return res.status(201).json({
      success: true,
      data: await clienteService.create({
        nombre,
        ruc,
        direccion,
        celular,
        telefono,
        correo,
      }),
      message: "¡Genial! Tu cliente se ha creado. 🎉",
    });
  });

  getAll = asyncHandler(async (req, res) => {
    return res.status(200).json({
      success: true,
      data: await clienteService.getAll(),
    });
  });

  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    res.status(200).json(await clienteService.getById({ id }));
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { nombre, ruc, direccion, celular, telefono, correo } = req.body;

    return res.status(200).json({
      success: true,
      data: await clienteService.update({
        id,
        nombre,
        ruc,
        direccion,
        celular,
        telefono,
        correo,
      }),
      message: "¡Genial! El cliente se ha actualizado. 🎉",
    });
  });

  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await clienteService.delete({ id });

    return res.status(204).json({
      success: true,
      message: "¡Genial! El cliente se ha eliminado. 🎉",
    });
  });
}

module.exports = new ClienteJuridicoController();
