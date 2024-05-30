const { Router } = require("express");
const productController = require("../../controller/adminController/productController");

const route = Router();

//product image upload
const multer  = require('multer')
var path = require('path');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(file.fieldname == 'bigimage') {
        cb(null, path.join(__dirname, '../../../public/img/product/product_big/'));
      } 
      else if(file.fieldname == 'smallimage') {
        cb(null, path.join(__dirname, '../../../public/img/product/product_small/'));
      } 
    },
    filename: function (req, file, cb) {
        if(file.fieldname == 'bigimage') {
            cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
          } 
          else if(file.fieldname == 'smallimage') {
            cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
          }   
      
    },
  });

let upload = multer({ storage });

route.get("/product-list", productController.getProduct);
route.get("/add-product", productController.addNewProductForm);
route.post("/submitProduct", upload.fields([{
    name: 'bigimage', maxCount: 1
  }, {
    name: 'smallimage', maxCount: 1
  }]), productController.submitProduct);

module.exports = route;
