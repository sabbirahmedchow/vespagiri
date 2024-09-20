const { Router } = require("express");
const couponController = require("../../controller/adminController/couponController");
const { authenticateToken } = require("../../controller/adminController/authController");

const route = Router();

route.get("/coupon", authenticateToken, couponController.couponForm);
route.post("/getCouponCode", authenticateToken, couponController.getCouponCode);
route.post("/submitCoupon", authenticateToken, couponController.saveCouponCode);
route.get("/coupon-list", authenticateToken, couponController.getAllCoupon);

module.exports = route;