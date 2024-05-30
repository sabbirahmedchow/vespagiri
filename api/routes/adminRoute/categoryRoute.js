const { Router } = require("express");
const categoryController = require("../../controller/adminController/categoryController");
const { authenticateToken } = require("../../controller/adminController/authController");

const route = Router();

route.get("/category", authenticateToken, categoryController.getCategory);
route.get("/add-category", authenticateToken, categoryController.addNewCategoryForm);
route.post("/submitCategory", authenticateToken, categoryController.submitCategory);
route.get("/edit-category/:catId", authenticateToken, categoryController.editCategoryForm);
route.post("/editCategory/", authenticateToken, categoryController.editCategory);
route.delete("/delete-category/:catId", authenticateToken, categoryController.deleteCategory);

module.exports = route;
