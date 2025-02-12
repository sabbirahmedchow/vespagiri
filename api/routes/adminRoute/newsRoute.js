const { Router } = require("express");
const newsController = require("../../controller/adminController/newsController");
const { authenticateToken } = require("../../controller/adminController/authController");

const route = Router();

route.get("/news", authenticateToken, newsController.addNewsForm);
route.get("/news-list", authenticateToken, newsController.getNews);
route.get("/edit-news/:newsId", newsController.editNewsForm);


const multer  = require('multer')
var path = require('path');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if(file.fieldname == 'bigimage') {
        cb(null, path.join(__dirname, '../../../public/img/blog/'));
      }
      else {
        cb(null, path.join(__dirname, '../../../public/img/blog/'));
      } 
    },
    filename: function (req, file, cb) {
        if(file.fieldname == 'bigimage') {
            cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
          
        } 
        else {
          cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
        }   
      
    },
  });
 let upload = multer({ storage }); 



route.post("/submitNews", upload.fields([{
    name: 'bigimage', maxCount: 1
  }, 
  {
    name: 'smallimage', maxCount: 1
  }]), newsController.submitNews);

route.post("/updateNews", upload.fields([{
    name: 'bigimage', maxCount: 1
  }, 
  {
    name: 'smallimage', maxCount: 1
  }]), newsController.updateNews);   

  route.delete("/delete-news/:newsId", authenticateToken, newsController.deleteNews);


module.exports = route;
