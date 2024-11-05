const { ClienteJuridico, Cliente } = require("@/models");

class ClienteJuridicoService {
  async create({ nombre, ruc, direccion, telefono, celular, correo }) {
    const clienteJuridicoExiste = await ClienteJuridico.findOne({
      where: { ruc },
    });
    if (clienteJuridicoExiste) {
      throw {
        message: "Error de conflicto",
        statusCode: 409,
        errors: [
          {
            message: "El ruc ya está en uso.",
            path: "ruc",
          },
        ],
      };
    }

    const cliente = await Cliente.create({
      nombre,
      direccion,
      celular,
      correo,
    });

    const clienteJuridico = await ClienteJuridico.create({
      ruc,
      telefono,
      clienteId: cliente.id,
    });

    return { cliente, clienteJuridico };
  }

  async getAll() {
    return await ClienteJuridico.findAll({
      include: [{ model: Cliente, as: "cliente" }],
    });
  }

  async getById({ id }) {
    const clienteJuridico = await ClienteJuridico.findByPk(id);
    if (!clienteJuridico) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Cliente jurídico no encontrado.",
            path: "id",
          },
        ],
      };
    }

    return clienteJuridico;
  }

  async update({ id, nombre, ruc, direccion, telefono, celular, correo }) {
    const clienteJuridico = await this.getById({ id });
    if (ruc) {
      const clienteJuridicoExiste = await ClienteJuridico.findOne({
        where: { ruc },
      });

      if (
        clienteJuridicoExiste &&
        clienteJuridicoExiste.id !== clienteJuridico.id
      ) {
        throw {
          message: "Error de conflicto",
          statusCode: 409,
          errors: [
            {
              message: "El ruc ya está en uso.",
              path: "ruc",
            },
          ],
        };
      }
    }

    const cliente = await Cliente.findByPk(clienteJuridico.clienteId);
    await cliente.update({
      nombre,
      direccion,
      celular,
      correo,
    });
    await clienteJuridico.update({ ruc, telefono });

    return { cliente, clienteJuridico };
  }

  async delete({ id }) {
    const clienteJuridico = await this.getById({ id });
    const cliente = await Cliente.findByPk(clienteJuridico.clienteId);
    await clienteJuridico.destroy();
    await cliente.destroy();

    return "Cliente jurídico eliminado correctamente";
  }
}

module.exports = new ClienteJuridicoService();
