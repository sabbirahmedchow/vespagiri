const { Router } = require("express");
const categoryController = require("../controller/categoryController");


const route = Router();

route.get("/getAllCategories", categoryController.getAllCategories);
route.post("/submitCategory",  categoryController.submitCategory);
route.get("/edit-category/:catId", categoryController.editCategoryForm);
route.post("/editCategory/", categoryController.editCategory);
route.delete("/delete-category/:catId", categoryController.deleteCategory);

module.exports = route;