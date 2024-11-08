const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("@/middlewares/errorHandlerMiddleware");

const vendedorRoutes = require("@/routes/vendedorRoutes");
const clienteRoutes = require("@/routes/ClienteRoutes");
const proveedorRoutes = require("@/routes/ProveedorRoutes");
const categoriaRoutes = require("@/routes/CategoriaRoutes");
const marcaRoutes = require("@/routes/MarcaRoutes");
const productoRoutes = require("@/routes/ProductoRoutes");
const compraRoutes = require("@/routes/CompraRoutes");
const ventaRoutes = require("@/routes/VentaRoutes");
const authRoutes = require("@/routes/AuthRoutes");
const distritoRoutes = require("@/routes/DistritoRoutes");
const direccionRoutes = require("@/routes/DireccionRoutes");
const ordenRoutes = require("@/routes/OrdenRoutes");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/hello", (req, res) => {
  return res.json({
    message: `HOLA PROBARE SI PUEDO VER ${process.env.APP_ENV}`,
    code: "201",
  });
});

app.use("/api/vendedores", vendedorRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/proveedores", proveedorRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/marcas", marcaRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/compras", compraRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/distritos", distritoRoutes);
app.use("/api/direcciones", direccionRoutes);
app.use("/api/ordenes", ordenRoutes);

app.use(errorHandler);

module.exports = app;
