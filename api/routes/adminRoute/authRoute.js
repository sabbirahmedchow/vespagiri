const { Router } = require("express");
const authController = require("../../controller/adminController/authController");

const route = Router();

route.get("/", authController.authenticateToken, authController.home);
route.post("/dashboard", authController.dashboard);
route.get("/adminlogout", authController.adminlogout);

module.exports = route;
