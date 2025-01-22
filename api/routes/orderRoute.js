const { Router } = require("express");
const orderController = require("../controller/orderController");
const { authenticateToken } = require("../controller/authController");

const route = Router();

route.get("/submitOrder", authenticateToken, orderController.submitOrder);
route.get("/getUserOrders", authenticateToken, orderController.getUserOrders);

module.exports = route;
