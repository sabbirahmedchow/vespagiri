const { Router } = require("express");
const authController = require("../controller/authController");

const route = Router();

route.post("/login", authController.login);
route.post("/generateAccessToken", authController.generateAccessToken);
route.post("/authenticateToken", authController.authenticateToken);
route.post("/verifyAccessToken", authController.verifyAccessToken);
route.post("/verifyRefreshToken", authController.verifyRefreshToken);

module.exports = route;