const { Router } = require("express");
const couponController = require("../../controller/adminController/couponController");
const { authenticateToken } = require("../../controller/adminController/authController");

const route = Router();

route.get("/coupon", authenticateToken, couponController.couponForm);

module.exports = route;