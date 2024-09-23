const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
var bcrypt = require("bcrypt");
require("dotenv").config();

module.exports.login = async(req, res) => {
  try{
    userRes = await User.findOne({ username: req.body.username });
    if (userRes == null) {
      res.send(["This account does not exist.", 0]);
    } 
    else if(userRes.is_active == false){
      res.send(["This account is not activated yet.", 0]);  
    }
    else {
      bcrypt.compare(req.body.password, userRes.password, function(
        err,
        result
      ) {
        if (result == true) {
          const userId = userRes._id;
          const userInfo = { user: userId };
          //JWT token fetch
          const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET);
          
          // set a cookie for access token with options
          res.cookie("accessTokenUser", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
          });
          res.cookie("user_fullname", userRes.fullname);
          if(req.body.page != null){
            res.send(["Successfully Logged In. Redirecting...", 2]);
          }
          res.send(["Successfully Logged In. Redirecting...", 1]);
         
        } else {
          res.send(["Wrong password. Please try again.", 0]);
        }
      });
    }
  
}catch(e){
  res.send(["Error: "+ e.message, 0]);
}
};

//authenticate token as middleware
module.exports.authenticateToken = (req, res, next) => {
  const token = req.cookies["access_token_user"];
 
  if (token != "null") {
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) 
      {
       res.send({
         message: err
       });
      }
      else
      {
        //console.log("user: "+ user.user);
        req.user = user.user;
        next();
      }
    });
  } else {
     
     return res.send({
       message: "Unauthorized Access!"
     });
  }
}

module.exports.logout = (req, res) => {
  res.cookie("accessTokenUser", '', {maxAge: 0}); // for httpOnly cookie
  //for regular cookie
  let cks = req.cookies;
  for(ck in cks){
  res.clearCookie(ck)
  }
  res.send("Successfully logged out.");
}

