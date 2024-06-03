const { Router } = require("express");
const authController = require("../controller/authController");

const route = Router();

route.post("/userLogin", authController.login);
//route.post("/authenticateToken", authController.authenticateToken);

module.exports = route;