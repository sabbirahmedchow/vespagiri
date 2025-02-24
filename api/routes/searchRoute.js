const { Router } = require("express");
const searchController = require("../controller/searchController");


const route = Router();

route.get("/getSearchDetail", searchController.getSeachResult);

module.exports = route;