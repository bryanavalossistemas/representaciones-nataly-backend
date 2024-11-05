const proveedorService = require("@/services/ProveedorService");
const asyncHandler = require("@/middlewares/asyncHandlerMiddleware");

class ProveedorController {
  create = asyncHandler(async (req, res) => {
    const { nombre, ruc, direccion, celular, telefono, correo } = req.body;

    return res.status(201).json({
      success: true,
      data: await proveedorService.create({
        nombre,
        ruc,
        direccion,
        celular,
        telefono,
        correo,
      }),
      message: "¡Genial! Tu proveedor se ha creado. 🎉",
    });
  });

  getAll = asyncHandler(async (req, res) => {
    return res.status(200).json({
      success: true,
      data: await proveedorService.getAll(),
    });
  });

  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    res.status(200).json(await proveedorService.getById({ id }));
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { nombre, ruc, direccion, celular, telefono, correo } = req.body;

    return res.status(201).json({
      success: true,
      data: await proveedorService.update({
        id,
        nombre,
        ruc,
        direccion,
        celular,
        telefono,
        correo,
      }),
      message: "¡Genial! El proveedor se ha actualizado. 🎉",
    });
  });

  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await proveedorService.delete({ id });

    return res.status(204).json({
      success: true,
      message: "¡Genial! El proveedor se ha eliminado. 🎉",
    });
  });
}

module.exports = new ProveedorController();
