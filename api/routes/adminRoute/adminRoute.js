const { Router } = require("express");
const userController = require("../../controller/adminController/adminController");

const route = Router();

// avatar upload
const multer  = require('multer')
var path = require('path');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../admin/public/images/icon/'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

let upload = multer({ storage });


route.get("/users", userController.getUser);
route.get("/account", userController.getAccount);
route.post("/updateAdminData", upload.single('avatar'), userController.updateAdminData);

module.exports = route;
