const { DataTypes } = require("sequelize");
const { sequelize } = require("@/config/db");
const Producto = require("./Producto");
const Venta = require("./Venta");

const DetalleVenta = sequelize.define(
  "DetalleVenta",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precioVenta: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const valor = this.getDataValue("precioVenta");
        return valor === null ? null : parseFloat(valor);
      },
    },
    utilidad: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const valor = this.getDataValue("utilidad");
        return valor === null ? null : parseFloat(valor);
      },
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nombreProducto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
			references: {
        model: Producto,
        key: "id",
      },
    },
    ventaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
			references: {
        model: Venta,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = DetalleVenta;
