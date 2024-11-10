const { IGV } = require("@/config/constants");
const {
  Producto,
  Orden,
  DetalleOrden,
  DireccionOrden,
  ImagenProducto,
  Distrito,
} = require("@/models");

class OrdenService {
  async create({
    usuario,
    detallesOrden,
    nombre,
    apellido,
    direccion,
    celular,
    distritoId,
  }) {
    let total = 0;
    await Promise.all(
      detallesOrden.map(async (detalleOrden) => {
        const producto = await Producto.findByPk(detalleOrden.productoId);
        if (!producto) {
          throw {
            message: "Error de recurso no encontrado",
            statusCode: 404,
            errors: [
              {
                message: "El producto no existe.",
                path: "detallesOrden",
              },
            ],
          };
        }
        total += producto.precioVenta * detalleOrden.cantidad;

        const nuevoStock = producto.stock - detalleOrden.cantidad;

        await producto.update({ stock: nuevoStock });
      })
    );
    const subtotal = total / (1 + IGV);
    const igv = subtotal * IGV;

    const orden = await Orden.create({
      fecha: new Date(),
      total,
      igv,
      subtotal,
      estaPagado: false,
      nombreUsuario: usuario.nombre,
      usuarioId: usuario.id,
    });

    await DireccionOrden.create({
      nombre,
      apellido,
      direccion,
      celular,
      distritoId,
      ordenId: orden.id,
    });

    await Promise.all(
      detallesOrden.map(async (detalleOrden) => {
        const producto = await Producto.findByPk(detalleOrden.productoId);
        if (!producto) {
          throw {
            message: "Error de recurso no encontrado",
            statusCode: 404,
            errors: [
              {
                message: "El producto no existe.",
                path: "detallesOrden",
              },
            ],
          };
        }

        await DetalleOrden.create({
          nombreProducto: producto.nombre,
          precioVenta: producto.precioVenta,
          cantidad: detalleOrden.cantidad,
          productoId: producto.id,
          ordenId: orden.id,
        });
      })
    );

    return orden;
  }

  async getAllByUsuarioId({ usuarioId }) {
    const ordenes = await Orden.findAll({
      where: { usuarioId },
      include: [{ model: DireccionOrden, as: "direccionOrden" }],
    });

    return ordenes;
  }

  async getById({ id }) {
    const orden = await Orden.findByPk(id, {
      include: [
        {
          model: DireccionOrden,
          as: "direccionOrden",
          include: [{ model: Distrito, as: "distrito" }],
        },
        {
          model: DetalleOrden,
          as: "detallesOrden",
          include: [
            {
              model: Producto,
              as: "producto",
              include: [{ model: ImagenProducto, as: "imagenesProducto" }],
            },
          ],
        },
      ],
    });

    if (!orden) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Categoría no encontrada.",
            path: "id",
          },
        ],
      };
    }

    return orden;
  }
}

module.exports = new OrdenService();
