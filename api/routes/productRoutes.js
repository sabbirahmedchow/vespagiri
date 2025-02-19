const { Router } = require("express");
const productController = require("../controller/productController");


const route = Router();

route.get("/getAllProducts", productController.getAllProducts);
route.get("/getFeaturedProducts", productController.getFeaturedProducts);
route.get("/getProductDetail", productController.getProductDetail);
route.get("/getRelatedProduct", productController.getRelatedProduct);
route.get("/getProductsByCategory", productController.getProductsByCategory);
route.get("/getProductsByBrand", productController.getProductsByBrand);
route.get("/getProductsByRange", productController.getProductsByRange);


module.exports = route;