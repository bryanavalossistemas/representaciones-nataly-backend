const request = require("supertest");
const app = require("../app.js");

describe("Descripcion: Este test sirve para verificar el endpoint PUT /api/proveedores/1", () => {
  it("Debe: Actualizar un producto y devolver la información creada", async () => {
    const proveedorActualizado = {
      nombre: "Alicorp S.A.C",
      ruc: "20600007522",
      direccion: "Av. Argentina 721",
      celular: "915115894",
      telefono: "4746922",
      correo: "alicorp@gmail.com",
    };

    const response = await request(app)
      .put("/api/proveedores/1")
      .send(proveedorActualizado)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);

    expect(response.body.data).toEqual({
      id: 1,
      nombre: "Alicorp S.A.C",
      ruc: "20600007522",
      direccion: "Av. Argentina 721",
      celular: "915115894",
      telefono: "4746922",
      correo: "alicorp@gmail.com",
    });
  });
});

describe("Descripcion: Este test sirve para verificar el endpoint GET /api/proveedores/1", () => {
  it("Debe: Darme una respuestas http 200 y un objeto del proveedor", async () => {
    const response = await request(app).get("/api/proveedores/1");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.body.data).toEqual({
      id: 1,
      nombre: "Alicorp S.A.C",
      ruc: "20600007522",
      direccion: "Av. Argentina 721",
      celular: "915115894",
      telefono: "4746922",
      correo: "alicorp@gmail.com",
    });
  });
});
