const request = require("supertest");
const app = require("../app.js");

describe("Descripcion: Este test sirve para verificar el endpoint GET /api/productos/1/public", () => {
  it("Debe: Darme una respuestas http 200 y un objeto del producto", async () => {
    const response = await request(app).get("/api/productos/1/public");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.body.data).toEqual({
      precioVenta: 200,
      id: 1,
      nombre: "Harina Anita x 50 Kg",
      descripcion: "Descripcion de Harina Anita",
      stock: 99,
      imagenesProducto: [
        {
          id: 1,
          url: "https://res.cloudinary.com/bryanavalossistemas/image/upload/v1730655238/rn-system/jqkzopsns8fjlldnrkww.webp",
          publicId: "rn-system/jqkzopsns8fjlldnrkww",
          productoId: 1,
        },
        {
          id: 4,
          url: "https://res.cloudinary.com/bryanavalossistemas/image/upload/v1730756412/rn-system/cbktfjznnhsbtnfxnazp.webp",
          publicId: "rn-system/cbktfjznnhsbtnfxnazp",
          productoId: 1,
        },
      ],
    });
  });
});

// describe("Descripcion: Este test sirve para verificar el endpoint POST /api/categorias", () => {
//   it("Debe: crear un producto y devolver la información creada", async () => {
//     const nuevaCategoria = {
//       nombre: "Nueva Categoria 5",
//     };

//     const response = await request(app)
//       .post("/api/categorias")
//       .send(nuevaCategoria)
//       .set("Content-Type", "application/json");

//     expect(response.status).toBe(201);

//     expect(response.body.data).toEqual({
//       id: expect.any(Number),
//       nombre: "Nueva Categoria 5",
//     });

//     expect(response.body.data.id).toBeDefined();

//     console.log("Respuesta del servidor:", response.body);
//   });
// });
