const { Router } = require("express");
const brandController = require("../../controller/adminController/brandController");
const { authenticateToken } = require("../../controller/adminController/authController");

const route = Router();

route.get("/brand", authenticateToken, brandController.getBrand);
route.get("/add-brand", authenticateToken, brandController.addNewBrandForm);
route.post("/submitBrand", authenticateToken, brandController.submitBrand);
route.get("/edit-brand/:brandId", authenticateToken, brandController.editBrandForm);
route.post("/editBrand/", authenticateToken, brandController.editBrand);
route.delete("/delete-brand/:brandId", authenticateToken, brandController.deleteBrand);

module.exports = route;
