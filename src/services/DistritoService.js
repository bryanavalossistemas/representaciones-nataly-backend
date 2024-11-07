const { Distrito } = require("@/models");

class DistritoService {
  async getAllPublic() {
    const distritos = await Distrito.findAll({
      attributes: ["id", "nombre"],
    });

    return distritos;
  }
}

module.exports = new DistritoService();
