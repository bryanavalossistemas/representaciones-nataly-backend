const { Proveedor } = require("@/models");

class ProveedorService {
  async create({ nombre, ruc, direccion, celular, telefono, correo }) {
    let errors = [];

    const proveedorWithNombreExists = await Proveedor.findOne({
      where: { nombre },
    });
    if (proveedorWithNombreExists) {
      errors.push({
        message: "El nombre ya está en uso.",
        path: "nombre",
      });
    }

    const proveedorWithRUCExists = await Proveedor.findOne({
      where: { ruc },
    });
    if (proveedorWithRUCExists) {
      errors.push({
        message: "El ruc ya está en uso.",
        path: "ruc",
      });
    }

    if (errors.length > 0) {
      throw {
        message: "Error de conflicto",
        statusCode: 409,
        errors,
      };
    }

    const proveedor = await Proveedor.create({
      nombre,
      ruc,
      direccion,
      celular,
      telefono,
      correo,
    });

    return proveedor;
  }

  async getAll() {
    const proveedores = await Proveedor.findAll();

    return proveedores;
  }

  async getById({ id }) {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Proveedor no encontrado.",
            path: "id",
          },
        ],
      };
    }

    return proveedor;
  }

  async update({ id, nombre, ruc, direccion, celular, telefono, correo }) {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Proveedor no encontrado.",
            path: "id",
          },
        ],
      };
    }

    let errors = [];

    if (nombre) {
      const proveedorWithNombreExists = await Proveedor.findOne({
        where: { nombre },
      });
      if (
        proveedorWithNombreExists &&
        proveedorWithNombreExists.id !== proveedor.id
      ) {
        errors.push({
          message: "El nombre ya está en uso.",
          path: "nombre",
        });
      }
    }

    if (ruc) {
      const proveedorWithRUCExists = await Proveedor.findOne({
        where: { ruc },
      });
      if (
        proveedorWithRUCExists &&
        proveedorWithRUCExists.id !== proveedor.id
      ) {
        errors.push({
          message: "El ruc ya está en uso.",
          path: "ruc",
        });
      }
    }

    if (errors.length > 0) {
      throw {
        message: "Error de conflicto",
        statusCode: 409,
        errors,
      };
    }

    await proveedor.update({
      nombre,
      ruc,
      direccion,
      celular,
      telefono,
      correo,
    });

    return proveedor;
  }

  async delete({ id }) {
    const proveedor = await Proveedor.findByPk(id);
    if (!proveedor) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Proveedor no encontrado.",
            path: "id",
          },
        ],
      };
    }

    await proveedor.destroy();

    return proveedor;
  }
}

module.exports = new ProveedorService();
