const jwt = require("jsonwebtoken");
const user = require("../../model/userModel");
var bcrypt = require("bcrypt");
require("dotenv").config();

module.exports.home = (req, res) => {
  res.render("index", {data: req.cookies});
 
};

module.exports.dashboard = async (req, res) => {
  try
  {
    userRes = await user.findOne({ username: req.body.username, role: "admin" })
    
    bcrypt.compare(req.body.password, userRes.password, function(
        err,
        result
      ) {
        
        if (result == true) {
          const userId = userRes._id;
          const userInfo = { user: userId };

          let info = {
            fullname: userRes.fullname,
            email: userRes.email,
            image: userRes.avatar,
          }

          //JWT token fetch
          const accessToken = jwt.sign(userInfo, process.env.ADMIN_ACCESS_TOKEN_SECRET);
          // set user's fullname, image and email in a cookie for later use
          res.cookie("fullname", userRes.fullname);
          res.cookie("image", userRes.avatar);
          res.cookie("email", userRes.email);

          res
            .cookie("access_token", accessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
            })
          .render("index", {data: info});
          
        }
        else{
          res.render("login", {msg: "Incorrect password."});
        }
     });
}catch (error) {
    res.render("login", {msg: "You are not authorized to login."});
  }
}


//generate access token
module.exports.generateAccessToken = (req, res) => {
  //console.log(req.body.user);
  const token = jwt.sign({user: req.body.user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
  return res.send({
    token: token
  });
};


//authenticate token as middleware
module.exports.authenticateToken = (req, res, next) => {

  if(typeof(req.cookies.access_token) != "undefined"){
    const token = req.cookies.access_token;
  try {
    const data = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET);
    req.userId = data.user;
    return next();
  } catch {
    res.render("login", {msg: "Unauthorized Access. Please login first."});
  }
}
else{
  res.render("login");
}
 
};


//verify if the token is expired
module.exports.verifyAccessToken = (req, res) => {
  //console.log(req.body.token);
  jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRET, (err) => {
     
      if (err) {
        return res.send({
        error: err,
        
      }); 
      //console.log("Something happened!!!");
    }
    else{
      
      return res.send({
        error: ""
      });
    }  
    });
 }

 module.exports.adminlogout = (req, res) => {
  let cks = req.cookies;
  for(ck in cks){
  res.clearCookie(ck)
  }
  res.render("login", {msg: "Successfully logged out."});
}

 


