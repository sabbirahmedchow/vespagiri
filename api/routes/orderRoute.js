const { Router } = require("express");
const orderController = require("../controller/orderController");

const route = Router();

route.get("/submitOrder", orderController.submitOrder);
route.get("/add-product", orderController.addNewProductForm);

module.exports = route;
