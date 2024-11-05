const { DataTypes } = require("sequelize");
const { sequelize } = require("@/config/db");

const Marca = sequelize.define(
  "Marca",
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
  },
  {
    freezeTableName: true,
    timestamps: false,
    defaultScope: {
      order: [["id", "DESC"]],
    },
  }
);

module.exports = Marca;