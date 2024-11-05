const { connectDB } = require("@/config/db");
const app = require("@/app");
const colors = require("colors");

async function main() {
  try {
    await connectDB();

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(
        colors.cyan.bold(`SERVIDOR FUNCIONANDO EN EL PUERTO ${port}`)
      );
    });
  } catch (error) {
    console.error(colors.red.bold(error.message));
  }
}

main();
