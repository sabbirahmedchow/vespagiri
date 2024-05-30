const jwt = require("jsonwebtoken");
const user = require("../model/userModel");
var bcrypt = require("bcrypt");
require("dotenv").config();

module.exports.login = (req, res) => {
  user.findOne({ email: req.body.loginEmail }, function(err, userRes) {
    if (userRes == null) {
      return res.send({
        msgError: "This email address does not exist.",
      });
    } else {
      bcrypt.compare(req.body.loginPassword, userRes.password, function(
        err,
        result
      ) {
        if (result == true) {
          const userId = userRes._id;
          const userInfo = { user: userId };
          //JWT token fetch
          const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
          //JWT refresh token fetch
          const refreshToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1y" });
          return res.send({
            accessToken,
            refreshToken,
            msgSuccess: "Success! You are now authenticated.",
          });
        } else {
          return res.send({
            msgError: "Wrong password. Please try again.",
          });
        }
      });
    }
  });
};

//generate access token
module.exports.generateAccessToken = (req, res) => {
  //console.log(req.body.user);
  const token = jwt.sign({user: req.body.user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
  return res.send({
    token: token
  });
};

//generate refresh token
module.exports. generateRefreshToken = (req, res) => {
  const refreshtoken = jwt.sign({user: req.body.user}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1y" });
  return res.send({
    refreshtoken: refreshtoken
  });
}

//test purpose only
module.exports.getRefreshToken = (req, res) => {

  console.log("get refresh token");
};


//authenticate token as middleware
module.exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
 
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

 module.exports.verifyRefreshToken = (req, res) => {
  //console.log(req.body.token);
  jwt.verify(req.body.token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
     
      if (err) {
        return res.send({
        error: true,
        
      }); 
      //console.log("Something happened!!!");
    }
    else{
      
      return res.send({
        user: user
      })
    }  
    });
 }



