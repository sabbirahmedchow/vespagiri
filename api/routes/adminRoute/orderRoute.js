const { Router } = require("express");
const orderController = require("../../controller/adminController/orderController");

const route = Router();

route.get("/orders", orderController.getOrder);
route.get("/add-product", orderController.addNewProductForm);

module.exports = route;
