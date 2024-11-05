const { IGV } = require("@/config/constants");
const { Cliente, Venta, Producto, DetalleVenta } = require("@/models");

class VentaService {
  async create({ clienteId, detallesVenta }) {
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "El cliente no existe.",
            path: "clienteId",
          },
        ],
      };
    }
    const total = detallesVenta.reduce(
      (total, detalleVenta) =>
        total + detalleVenta.cantidad * detalleVenta.precioVenta,
      0
    );
    const subtotal = total / (1 + IGV);
    const igv = subtotal * IGV;
    let utilidad = 0;
    for (let index = 0; index < detallesVenta.length; index++) {
      const producto = await Producto.findByPk(detallesVenta[index].productoId);
      if (!producto) {
        throw {
          message: "Error de recurso no encontrado",
          statusCode: 404,
          errors: [
            {
              message: "El producto no existe.",
              path: "detallesVenta",
            },
          ],
        };
      }
      detallesVenta[index].producto = producto;
      detallesVenta[index].utilidad =
        (detallesVenta[index].precioVenta - producto.precioCosto) *
        detallesVenta[index].cantidad;
      utilidad +=
        (detallesVenta[index].precioVenta - producto.precioCosto) *
        detallesVenta[index].cantidad;
    }
    const venta = await Venta.create({
      fecha: new Date(),
      subtotal,
      igv,
      total,
      utilidad,
      nombreCliente: cliente.nombre,
      clienteId: cliente.id,
    });
    for (let index = 0; index < detallesVenta.length; index++) {
      await DetalleVenta.create({
        cantidad: detallesVenta[index].cantidad,
        precioVenta: detallesVenta[index].precioVenta,
        utilidad: detallesVenta[index].utilidad,
        fecha: new Date(),
        nombreProducto: detallesVenta[index].producto.nombre,
        productoId: detallesVenta[index].producto.id,
        ventaId: venta.id,
      });
      const nuevoStock =
        detallesVenta[index].producto.stock - detallesVenta[index].cantidad;
      await detallesVenta[index].producto.update({ stock: nuevoStock });
    }

    return await Venta.findByPk(venta.id, {
      include: [
        {
          model: Cliente,
          as: "cliente",
        },
        {
          model: DetalleVenta,
          as: "detallesVenta",
          include: [
            {
              model: Producto,
              as: "producto",
            },
          ],
        },
      ],
    });
  }

  async getAll() {
    return await Venta.findAll({
      include: [{ model: DetalleVenta, as: "detallesVenta" }],
    });
  }

  async getById({ id }) {
    const venta = await Venta.findByPk(id);
    if (!venta) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Venta no encontrada.",
            path: "id",
          },
        ],
      };
    }

    return venta;
  }

  async update({ id, clienteId, newDetallesVenta }) {
    console.log({ id, clienteId, newDetallesVenta });
    const venta = await this.getById({ id });
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "El cliente no existe.",
            path: "clienteId",
          },
        ],
      };
    }
    const detallesVenta = await DetalleVenta.findAll({
      where: { ventaId: venta.id },
    });
    for (let index = 0; index < detallesVenta.length; index++) {
      const detalleVenta = await DetalleVenta.findByPk(detallesVenta[index].id);
      const producto = await Producto.findByPk(detallesVenta[index].productoId);
      if (producto) {
        const newStock = producto.stock + detallesVenta[index].cantidad;
        await producto.update({
          stock: newStock,
        });
      }
      await detalleVenta.destroy();
    }
    let utilidadVenta = 0;
    for (let index = 0; index < newDetallesVenta.length; index++) {
      const producto = await Producto.findByPk(
        newDetallesVenta[index].productoId
      );
      if (!producto) {
        throw {
          message: "Error de recurso no encontrado",
          statusCode: 404,
          errors: [
            {
              message: "El producto no existe.",
              path: "newDetallesVenta",
            },
          ],
        };
      }
      const newStock = producto.stock - newDetallesVenta[index].cantidad;
      await producto.update({ stock: newStock });

      const utilidadDetalle =
        (newDetallesVenta[index].precioVenta - producto.precioCosto) *
        newDetallesVenta[index].cantidad;

      utilidadVenta +=
        (newDetallesVenta[index].precioVenta - producto.precioCosto) *
        newDetallesVenta[index].cantidad;

      await DetalleVenta.create({
        fecha: venta.fecha,
        cantidad: newDetallesVenta[index].cantidad,
        precioVenta: newDetallesVenta[index].precioVenta,
        nombreProducto: producto.nombre,
        productoId: producto.id,
        utilidad: utilidadDetalle,
        ventaId: venta.id,
      });
    }
    const total = newDetallesVenta.reduce(
      (total, newDetalleVenta) =>
        total + newDetalleVenta.precioVenta * newDetalleVenta.cantidad,
      0
    );
    const subtotal = total / (1 + IGV);
    const igv = subtotal * IGV;
    await venta.update({
      subtotal,
      igv,
      total,
      utilidad: utilidadVenta,
      nombreCliente: cliente.nombre,
      clienteId: cliente.id,
    });
    return venta;
  }

  async delete({ id }) {
    const venta = await this.getById({ id });
    const detallesVenta = await DetalleVenta.findAll({
      where: { ventaId: venta.id },
    });

    for (let index = 0; index < detallesVenta.length; index++) {
      const producto = await Producto.findByPk(detallesVenta[index].productoId);
      if (producto) {
        const nuevoStock = producto.stock + detallesVenta[index].cantidad;
        await producto.update({ stock: nuevoStock });
      }
    }

    await venta.destroy();

    return "Venta eliminada correctamente";
  }
}

module.exports = new VentaService();
