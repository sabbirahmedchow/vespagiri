const { Router } = require("express");
const categoryController = require("../controller/categoryController");


const route = Router();

route.get("/getAllCategories", categoryController.getAllCategories);

module.exports = route;