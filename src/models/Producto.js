const { DataTypes } = require("sequelize");
const { sequelize } = require("@/config/db");
const Categoria = require("./Categoria");
const Marca = require("./Marca");

const Producto = sequelize.define(
  "Producto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precioCosto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const valor = this.getDataValue("precioCosto");
        return valor === null ? null : parseFloat(valor);
      },
    },
    precioVenta: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const valor = this.getDataValue("precioVenta");
        return valor === null ? null : parseFloat(valor);
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Categoria,
        key: "id",
      },
    },
    marcaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Marca,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    defaultScope: {
      order: [["id", "DESC"]],
    },
  }
);

module.exports = Producto;
