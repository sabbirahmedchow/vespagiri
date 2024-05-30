const { Router } = require("express");
const userController = require("../controller/userController");
const { authenticateToken } = require("../controller/authController");

const route = Router();

route.post("/addUser", userController.userRegister);
route.post("/my_account", authenticateToken, userController.userAccount);
route.post("/updateProfile", authenticateToken, userController.userUpdateAccount);

module.exports = route;
