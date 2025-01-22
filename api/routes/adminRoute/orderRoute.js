const { Router } = require("express");
const orderController = require("../../controller/adminController/orderController");

const route = Router();

route.get("/orders", orderController.getOrder);
route.get("/order-detail/:orderId", orderController.orderDetail);
route.post("/changeOrderStatus", orderController.changeOrderStatus);

module.exports = route;
