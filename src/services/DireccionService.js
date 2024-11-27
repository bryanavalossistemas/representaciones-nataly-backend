const { Direccion, Distrito } = require("@/models");

class DireccionService {
  async getDireccionByUsuarioId({ usuarioId }) {
    const direccion = Direccion.findOne({ where: { usuarioId } });

    return direccion;
  }

  async createOrUpdateDireccionByUsuarioId({
    usuarioId,
    nombre,
    apellido,
    direccion,
    celular,
    distritoId,
  }) {
    const nombresFinded = /\d/; 
    if (nombresFinded.test(nombre) || nombresFinded.test(apellido)) {
      throw {
      message: "El nombre o apellido no deben contener ningun numero.",
      statusCode: 404,
      };
    }
    const celularFinded = /^\d{9}$/;
    if (!celularFinded.test(celular)) {
      throw {
        message: "El numero debe tener 9 digitos exactos.",
        statusCode: 404,
      };
    }

    const distritoFinded = await Distrito.findOne({
      where: { id: distritoId },
    });

    if (!distritoFinded) {
      throw {
        message: "Error de distrito no encontrado",
        statusCode: 404,
      };
    }

    const direccionFinded = await Direccion.findOne({ where: { usuarioId } });

    if (direccionFinded) {
      (await direccionFinded).update({
        nombre,
        apellido,
        direccion,
        celular,
        distritoId,
      });
    } else {
      await Direccion.create({
        nombre,
        apellido,
        direccion,
        celular,
        distritoId,
        usuarioId,
      });
    }

    return direccionFinded;
  }

  async deleteDireccionByUsuarioId({ usuarioId }) {
    const direccion = await Direccion.findOne({ where: { usuarioId } });

    if (direccion) {
      (await direccion).destroy();
    }

    return direccion;
  }
}

module.exports = new DireccionService();
