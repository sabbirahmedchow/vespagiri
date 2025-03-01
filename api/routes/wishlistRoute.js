const { Router } = require("express");
const wishlistController = require("../controller/wishlistController");
const { authenticateToken } = require("../controller/authController");

const route = Router();

route.post("/addToWishlist", authenticateToken, wishlistController.addWishlist);
route.get("/showWishlist", authenticateToken, wishlistController.getWishlist);
route.delete("/deleteWishlistProduct", authenticateToken, wishlistController.deleteWishlistProduct);

module.exports = route;
