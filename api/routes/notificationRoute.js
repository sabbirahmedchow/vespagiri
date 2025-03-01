const { Router } = require("express");
const notifyController = require("../controller/notificationController");

const route = Router();

route.post("/send-contact-mail", notifyController.sendContactEmail);
route.post("/sendOrderEmail", notifyController.sendOrderEmail);

module.exports = route;