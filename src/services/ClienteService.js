const { Cliente } = require("@/models");

class ClienteService {
  async create({ nombre, ruc, direccion, celular, telefono, correo }) {
    let errors = [];

    const clienteWithNombreExists = await Cliente.findOne({
      where: { nombre },
    });
    if (clienteWithNombreExists) {
      errors.push({
        message: "El nombre ya está en uso.",
        path: "nombre",
      });
    }

    const clienteWithRUCExists = await Cliente.findOne({
      where: { ruc },
    });
    if (clienteWithRUCExists) {
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

    const cliente = await Cliente.create({
      nombre,
      ruc,
      direccion,
      celular,
      telefono,
      correo,
    });

    return cliente;
  }

  async getAll() {
    const clientes = await Cliente.findAll();

    return clientes;
  }

  async getById({ id }) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Cliente no encontrado.",
            path: "id",
          },
        ],
      };
    }

    return cliente;
  }

  async update({ id, nombre, ruc, direccion, celular, telefono, correo }) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Cliente no encontrado.",
            path: "id",
          },
        ],
      };
    }

    let errors = [];

    if (nombre) {
      const clienteWithNombreExists = await Cliente.findOne({
        where: { nombre },
      });
      if (
        clienteWithNombreExists &&
        clienteWithNombreExists.id !== cliente.id
      ) {
        errors.push({
          message: "El nombre ya está en uso.",
          path: "nombre",
        });
      }
    }

    if (ruc) {
      const clienteWithRUCExists = await Cliente.findOne({
        where: { ruc },
      });
      if (clienteWithRUCExists && clienteWithRUCExists.id !== cliente.id) {
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

    await cliente.update({ nombre, ruc, direccion, celular, telefono, correo });

    return cliente;
  }

  async delete({ id }) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Cliente no encontrado.",
            path: "id",
          },
        ],
      };
    }

    await cliente.destroy();

    return cliente;
  }
}

module.exports = new ClienteService();
