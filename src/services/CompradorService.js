const { Comprador, DireccionComprador } = require("@/models");

class CompradorService {
  async getDireccionComprardorByUsuarioId({ usuarioId }) {
    const comprador = await Comprador.findOne({ where: { usuarioId } });
    if (!comprador) {
      return comprador;
    }
    const direccionComprador = DireccionComprador.findOne({
      where: { compradorId: comprador.id },
    });

    return direccionComprador;
  }

  async createOrUpdateDireccionCompradorByUsuarioId({
    usuarioId,
    nombre,
    apellido,
    direccion,
    celular,
    distritoId,
  }) {
    const comprador = await Comprador.findOne({ where: { usuarioId } });
    if (!comprador) {
      return comprador;
    }
    const direccionComprador = await DireccionComprador.findOne({
      where: { compradorId: comprador.id },
    });

    if (direccionComprador) {
      (await direccionComprador).update({
        nombre,
        apellido,
        direccion,
        celular,
        distritoId,
      });
    } else {
      await DireccionComprador.create({
        nombre,
        apellido,
        direccion,
        celular,
        distritoId,
        compradorId: comprador.id,
      });
    }

    return direccionComprador;
  }

  async deleteDireccionCompradorByUsuarioId({ usuarioId }) {
    const comprador = await Comprador.findOne({ where: { usuarioId } });
    if (!comprador) {
      return comprador;
    }
    const direccionComprador = DireccionComprador.findOne({
      where: { compradorId: comprador.id },
    });

    if (direccionComprador) {
      (await direccionComprador).destroy();
    }

    return direccionComprador;
  }
}

module.exports = new CompradorService();
