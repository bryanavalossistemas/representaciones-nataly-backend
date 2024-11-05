const { Sequelize } = require("sequelize");
const colors = require("colors");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
    dialectOptions:
      process.env.APP_ENV === "production"
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log(colors.blue.bold("CONEXIÓN EXITOSA A LA BASE DE DATOS"));
  } catch (error) {
    throw new Error(`ERROR DE BASE DE DATOS: ${error.message}`);
  }
}

module.exports = { sequelize, connectDB };
