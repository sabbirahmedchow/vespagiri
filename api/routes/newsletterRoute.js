const { Router } = require("express");
const newsletterController = require("../controller/newsletterController");

const route = Router();

route.post("/addToNewsletter", newsletterController.addToNewsletter);

module.exports = route;
