const { Router } = require("express");
const couponController = require("../controller/couponController");


const route = Router();

route.get("/verifyCouponCode", couponController.verifyCouponCode);

module.exports = route;

