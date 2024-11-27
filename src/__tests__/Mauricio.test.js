const request = require("supertest");
const app = require("../app.js");

describe("Descripcion: Este test sirve para verificar el endpoint PUT /api/usuario/createOrUpdate", () => {
  it("Debe: crear o actyalizar la direccion del usuario", async () => {
    const crearOActualizar = {
      nombre: "Mauricio",
      apellido: "Ramirez",
      direccion: "Avenida Canada 121",
      celular: "91231244",
      distritoId: 1,
    };

    const response = await request(app)
      .put("/api/direcciones/usuario/createOrUpdate")
      .send(crearOActualizar);

    expect(response.status).toBe(200);

    expect(response.body.data).toEqual({
      id: expect.any(Number),
      nombre: "Mauricio",
      apellido: "Ramirez",
      direccion: "Avenida Canada 121",
      celular: "91231244",
      distritoId: 1,
      usuarioId: 1,
    });

    expect(response.body.data.id).toBeDefined();
  });
});
