const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
var bcrypt = require("bcrypt");
require("dotenv").config();

module.exports.login = async(req, res) => {
  try{
    userRes = await User.findOne({ username: req.body.username });
    if (userRes.username == null) {
      res.send("This account does not exist.");
    } else {
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
          res.cookie("access_token_user", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
         
        } else {
          res.send("Wrong password. Please try again.");
        }
      });
    }
  
}catch(e){
  res.send(e.message);
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
        const userInfo = User.findOne({_id: req.user});
        res.cookie("user_fullname", userInfo.full_name, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        next();
      }
    });
  } else {
     
     return res.send({
       message: "Unauthorized Access!"
     });
  }
}


