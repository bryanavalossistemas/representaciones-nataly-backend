const asyncHandler = require("@/middlewares/asyncHandlerMiddleware");
const distritoService = require("@/services/DistritoService");

class DistritoController {
  getAllPublic = asyncHandler(async (req, res) => {
    return res.status(200).json({
      success: true,
      data: await distritoService.getAllPublic(),
    });
  });
}

module.exports = new DistritoController();
