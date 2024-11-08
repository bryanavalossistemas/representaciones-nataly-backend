const vendedorService = require("@/services/VendedorService");
const asyncHandler = require("@/middlewares/asyncHandlerMiddleware");

class VendedorController {
  create = asyncHandler(async (req, res) => {
    const { nombre, correo, contrasenia, dni, celular, telefono } = req.body;

    return res.status(201).json({
      success: true,
      message: "¡Genial! El vendedor se ha creado. 🎉",
      data: await vendedorService.create({
        nombre,
        correo,
        contrasenia,
        dni,
        celular,
        telefono,
      }),
    });
  });

  getAll = asyncHandler(async (req, res) => {
    return res.status(200).json({
      success: true,
      data: await vendedorService.getAll(),
    });
  });

  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    return res.status(200).json({
      success: true,
      data: await vendedorService.getById({ id }),
    });
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, contrasenia, dni, celular, telefono } = req.body;

    return res.status(200).json({
      success: true,
      message: "¡Genial! El vendedor se ha actualizado. 🎉",
      data: await vendedorService.update({
        id,
        nombre,
        correo,
        contrasenia,
        dni,
        celular,
        telefono,
      }),
    });
  });

  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await vendedorService.delete({ id });

    return res.status(204).json({
      success: true,
      message: "¡Genial! El vendedor se ha eliminado. 🎉",
    });
  });
}

module.exports = new VendedorController();
