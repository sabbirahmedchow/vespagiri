const { Router } = require("express");
const newsController = require("../controller/newsController");


const route = Router();

route.get("/getAllNews", newsController.getAllNews);
route.get("/getNewsDetail", newsController.getNewsDetail);

module.exports = route;