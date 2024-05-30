const { Router } = require("express");
const brandController = require("../controller/brandController");


const route = Router();

route.get("/getAllBrands", brandController.getAllBrands);

module.exports = route;