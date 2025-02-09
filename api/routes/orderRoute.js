const { Router } = require("express");
const orderController = require("../controller/orderController");
const { authenticateToken } = require("../controller/authController");

const route = Router();

route.post("/submitOrder", authenticateToken, orderController.submitOrder);
route.get("/getUserOrders", authenticateToken, orderController.getUserOrders);
route.get("/orderDetails", orderController.getOrderDetail);

module.exports = route;
