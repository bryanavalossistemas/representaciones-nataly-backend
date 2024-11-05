const productoService = require("@/services/ProductoService");
const asyncHandler = require("@/middlewares/asyncHandlerMiddleware");

class ProductoController {
  create = asyncHandler(async (req, res) => {
    const {
      nombre,
      descripcion,
      precioCosto,
      precioVenta,
      stock,
      categoriaId,
      marcaId,
    } = req.body;
    const { files } = req;

    return res.status(201).json({
      success: true,
      data: await productoService.create({
        nombre,
        descripcion,
        precioCosto,
        precioVenta,
        stock,
        categoriaId,
        marcaId,
        files,
      }),
      message: "¡Genial! Tu producto se ha creado. 🎉",
    });
  });

  getAll = asyncHandler(async (req, res) => {
    return res.status(200).json({
      success: true,
      data: await productoService.getAll(),
    });
  });

  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    return res.status(200).json({
      success: true,
      data: await productoService.getById({ id }),
    });
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
      nombre,
      descripcion,
      precioCosto,
      precioVenta,
      stock,
      categoriaId,
      marcaId,
      imagenesProducto,
    } = req.body;
    const { files } = req;

    return res.status(200).json({
      success: true,
      data: await productoService.update({
        id,
        nombre,
        descripcion,
        precioCosto,
        precioVenta,
        stock,
        categoriaId,
        marcaId,
        imagenesProducto,
        files,
      }),
      message: "¡Genial! El producto se ha actualizado. 🎉",
    });
  });

  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await productoService.delete({ id });

    return res.status(204).json({
      success: true,
      message: "¡Genial! El proveedor se ha eliminado. 🎉",
    });
  });
}

module.exports = new ProductoController();
