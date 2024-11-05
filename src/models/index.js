const Rol = require("@/models/Rol");
const Usuario = require("@/models/Usuario");
const Administrador = require("@/models/Administrador");
const Vendedor = require("@/models/Vendedor");
const Cliente = require("@/models/Cliente");
const Proveedor = require("@/models/Proveedor");
const Categoria = require("@/models/Categoria");
const Marca = require("@/models/Marca");
const ImagenProducto = require("@/models/ImagenProducto");
const Producto = require("@/models/Producto");
const DetalleCompra = require("@/models/DetalleCompra");
const Compra = require("@/models/Compra");
const DetalleVenta = require("@/models/DetalleVenta");
const Venta = require("@/models/Venta");

Rol.hasMany(Usuario, {
  as: "usuarios",
  foreignKey: "rolId",
  onDelete: "RESTRICT",
});
Usuario.belongsTo(Rol, {
  as: "rol",
  foreignKey: "rolId",
});

Usuario.hasOne(Administrador, {
  as: "administrador",
  foreignKey: "usuarioId",
  onDelete: "CASCADE",
});
Administrador.belongsTo(Usuario, {
  as: "usuario",
  foreignKey: "usuarioId",
});

Usuario.hasOne(Vendedor, {
  as: "vendedor",
  foreignKey: "usuarioId",
  onDelete: "CASCADE",
});
Vendedor.belongsTo(Usuario, {
  as: "usuario",
  foreignKey: "usuarioId",
});

Categoria.hasMany(Producto, {
  as: "productos",
  foreignKey: "categoriaId",
  onDelete: "SET NULL",
});
Producto.belongsTo(Categoria, {
  as: "categoria",
  foreignKey: "categoriaId",
});

Marca.hasMany(Producto, {
  as: "productos",
  foreignKey: "marcaId",
  onDelete: "SET NULL",
});
Producto.belongsTo(Marca, {
  as: "marca",
  foreignKey: "marcaId",
});

Producto.hasMany(ImagenProducto, {
  as: "imagenesProducto",
  foreignKey: "productoId",
  onDelete: "CASCADE",
});
ImagenProducto.belongsTo(Producto, {
  as: "producto",
  foreignKey: "productoId",
});

Producto.hasMany(DetalleCompra, {
  as: "detallesCompra",
  foreignKey: "productoId",
  onDelete: "SET NULL",
});
DetalleCompra.belongsTo(Producto, { as: "producto", foreignKey: "productoId" });

Compra.hasMany(DetalleCompra, {
  as: "detallesCompra",
  foreignKey: "compraId",
  onDelete: "CASCADE",
});
DetalleCompra.belongsTo(Compra, { as: "compra", foreignKey: "compraId" });

Proveedor.hasMany(Compra, {
  as: "compras",
  foreignKey: "proveedorId",
  onDelete: "SET NULL",
});
Compra.belongsTo(Proveedor, {
  as: "proveedor",
  foreignKey: "proveedorId",
});

Producto.hasMany(DetalleVenta, {
  as: "detallesVenta",
  foreignKey: "productoId",
  onDelete: "SET NULL",
});
DetalleVenta.belongsTo(Producto, { as: "producto", foreignKey: "productoId" });

Venta.hasMany(DetalleVenta, {
  as: "detallesVenta",
  foreignKey: "ventaId",
  onDelete: "CASCADE",
});
DetalleVenta.belongsTo(Venta, { as: "venta", foreignKey: "ventaId" });

Cliente.hasMany(Venta, {
  as: "ventas",
  foreignKey: "clienteId",
  onDelete: "SET NULL",
});
Venta.belongsTo(Cliente, { as: "cliente", foreignKey: "clienteId" });

module.exports = {
  Rol,
  Usuario,
  Administrador,
  Vendedor,
  Cliente,
  Proveedor,
  Categoria,
  Marca,
  ImagenProducto,
  Producto,
  DetalleCompra,
  Compra,
  DetalleVenta,
  Venta,
};
