const request = require("supertest");
const app = require("../app.js");
//prueba 1 
describe("Descripcion: Este test sirve para verificar el endpoint PUT /api/usuario/createOrUpdate", () => {
  it("Debe: crear o actyalizar la direccion del usuario", async () => {
    const crearOActualizar = {
      nombre: "Mauricio",
      apellido: "Ramirez",
      direccion: "Avenida Canada 121",
      celular: "912312442",
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
      celular: "912312442",
      distritoId: 1,
      usuarioId: 1,
    });

    expect(response.body.data.id).toBeDefined();
  });

//prueba 2
  it("Debe: crear o actyalizar la direccion del usuario", async () => {
    const crearOActualizar = {
      nombre: "Mauricio",
      apellido: "Ramirez",
      direccion: "Avenida Canada 121",
      celular: "912312442",
      distritoId: 59,
    };

    const response = await request(app)
      .put("/api/direcciones/usuario/createOrUpdate")
      .send(crearOActualizar);

    expect(response.status).toBe(404);
    
    expect(response.body.message).toBe("Error de distrito no encontrado")
  });

//Prueba 3
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

    expect(response.status).toBe(404);

    expect(response.body.message).toBe("El numero debe tener 9 digitos exactos.")
  });


//Prueba 4
  it("Debe: crear o actyalizar la direccion del usuario", async () => {
    const crearOActualizar = {
      nombre: "Mauricio324",
      apellido: "Ramirez",
      direccion: "Avenida Canada 121",
      celular: "912312442",
      distritoId: 1,
    };

    const response = await request(app)
      .put("/api/direcciones/usuario/createOrUpdate")
      .send(crearOActualizar);

    expect(response.status).toBe(404);
    
    expect(response.body.message).toBe("El nombre o apellido no deben contener ningun numero.")
  });
});
