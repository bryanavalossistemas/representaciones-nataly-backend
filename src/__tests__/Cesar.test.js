const request = require("supertest");
const app = require("../app.js");

describe("Descripcion: Este test sirve para verificar el endpoint POST /api/compras", () => {
  it("Debe: crear una compra y devolver la información creada", async () => {
    const nuevaCompra = {
      proveedorId: 1,
      detallesCompra: [
        { cantidad: 100, precioCosto: 250, productoId: 1 },
        { cantidad: 100, precioCosto: 350, productoId: 2 },
      ],
    };

    const response = await request(app)
      .post("/api/compras")
      .send(nuevaCompra)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);

    expect(response.body.data).toEqual({
      total: 60000,
      id: expect.any(Number),
      fecha: expect.stringMatching(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
      ),
      nombreProveedor: expect.any(String),
      proveedorId: 1,
    });
  });
});
