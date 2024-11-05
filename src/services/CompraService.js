const { Proveedor, Compra, Producto, DetalleCompra } = require("@/models");

class CompraService {
  async create({ proveedorId, detallesCompra }) {
    const proveedor = await Proveedor.findByPk(proveedorId);
    if (!proveedor) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "El proveedor no existe.",
            path: "proveedorId",
          },
        ],
      };
    }
    const total = detallesCompra.reduce(
      (total, detalleCompra) =>
        total + detalleCompra.cantidad * detalleCompra.precioCosto,
      0
    );

    const compra = await Compra.create({
      total,
      fecha: new Date(),
      nombreProveedor: proveedor.nombre,
      proveedorId: proveedor.id,
    });
    for (let index = 0; index < detallesCompra.length; index++) {
      const producto = await Producto.findByPk(
        detallesCompra[index].productoId
      );
      if (!producto) {
        throw {
          message: "Error de recurso no encontrado",
          statusCode: 404,
          errors: [
            {
              message: "El producto no existe.",
              path: "detallesCompra",
            },
          ],
        };
      }
      await DetalleCompra.create({
        cantidad: detallesCompra[index].cantidad,
        precioCosto: detallesCompra[index].precioCosto,
        nombreProducto: producto.nombre,
        productoId: producto.id,
        compraId: compra.id,
      });
      const nuevoStock = producto.stock + detallesCompra[index].cantidad;
      const nuevoPrecioCosto =
        (detallesCompra[index].precioCosto * detallesCompra[index].cantidad +
          producto.precioCosto * producto.stock) /
        (detallesCompra[index].cantidad + producto.stock);
      await producto.update({
        stock: nuevoStock,
        precioCosto: nuevoPrecioCosto,
      });
    }

    return compra;
  }

  async getAll() {
    return await Compra.findAll({
      include: [{ model: DetalleCompra, as: "detallesCompra" }],
    });
  }

  async getById({ id }) {
    const compra = await Compra.findByPk(id);
    if (!compra) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Compra no encontrada.",
            path: "id",
          },
        ],
      };
    }

    return compra;
  }

  async update({ id, proveedorId, newDetallesCompra }) {
    const compra = await this.getById({ id });
    const proveedor = await Proveedor.findByPk(proveedorId);
    if (!proveedor) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "El proveedor no existe.",
            path: "proveedorId",
          },
        ],
      };
    }
    const detallesCompra = await DetalleCompra.findAll({
      where: { compraId: compra.id },
    });
    for (let index = 0; index < detallesCompra.length; index++) {
      const detalleCompra = await DetalleCompra.findByPk(
        detallesCompra[index].id
      );
      const producto = await Producto.findByPk(
        detallesCompra[index].productoId
      );
      if (producto) {
        const newStock = producto.stock - detallesCompra[index].cantidad;
        const newPrecioCosto =
          (producto.precioCosto * producto.stock -
            detallesCompra[index].precioCosto *
              detallesCompra[index].cantidad) /
          (producto.stock - detallesCompra[index].cantidad);
        await producto.update({
          stock: newStock,
          precioCosto: newPrecioCosto,
        });
      }
      await detalleCompra.destroy();
    }
    for (let index = 0; index < newDetallesCompra.length; index++) {
      const producto = await Producto.findByPk(
        newDetallesCompra[index].productoId
      );
      if (!producto) {
        throw {
          message: "Error de recurso no encontrado",
          statusCode: 404,
          errors: [
            {
              message: "El producto no existe.",
              path: "newDetallesCompra",
            },
          ],
        };
      }
      const newStock = producto.stock + newDetallesCompra[index].cantidad;
      const newPrecioCosto =
        (newDetallesCompra[index].precioCosto *
          newDetallesCompra[index].cantidad +
          producto.precioCosto * producto.stock) /
        (newDetallesCompra[index].cantidad + producto.stock);
      await producto.update({
        stock: newStock,
        precioCosto: newPrecioCosto,
      });

      await DetalleCompra.create({
        cantidad: newDetallesCompra[index].cantidad,
        precioCosto: newDetallesCompra[index].precioCosto,
        nombreProducto: producto.nombre,
        productoId: producto.id,
        compraId: compra.id,
      });
    }
    const total = newDetallesCompra.reduce(
      (total, newDetalleCompra) =>
        total + newDetalleCompra.precioCosto * newDetalleCompra.cantidad,
      0
    );
    await compra.update({
      total,
      nombreProveedor: proveedor.nombre,
      proveedorId,
    });
    return compra;
  }

  async delete({ id }) {
    const compra = await this.getById({ id });
    const detallesCompra = await DetalleCompra.findAll({
      where: { compraId: compra.id },
    });
    for (let index = 0; index < detallesCompra.length; index++) {
      const producto = await Producto.findByPk(
        detallesCompra[index].productoId
      );
      if (producto) {
        const nuevoStock = producto.stock - detallesCompra[index].cantidad;
        const nuevoPrecioCosto =
          (producto.precioCosto * producto.stock -
            detallesCompra[index].precioCosto *
              detallesCompra[index].cantidad) /
          (producto.stock - detallesCompra[index].cantidad);
        await producto.update({
          stock: nuevoStock,
          precioCosto: nuevoPrecioCosto,
        });
      }
    }

    await compra.destroy();

    return "Compra eliminada correctamente";
  }
}

module.exports = new CompraService();
