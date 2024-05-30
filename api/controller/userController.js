const user = require("../model/userModel");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
require("dotenv").config();

const saltRounds = 10;

module.exports.userRegister = (req, res) => {
  
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {  
  const newUser = new user({
    fullname: req.body.name,
    mobile: req.body.number,
    email: req.body.email,
    password: hash,
  });
   newUser.save((err, saveduser) => {
    if (err)
    {
      return res.send({
        msgError: "This email address is already exist.",
      });
    }
    else
    {
      const userInfo = { user: saveduser._id };
      //JWT token fetch
      const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
      //JWT refresh token fetch
      const refreshToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1y" });
      return res.status(200).json({
        accessToken,
        refreshToken,
        msgSuccess: "You are now registered and logged in.",
      });
    }
  });
});
};

module.exports.userAccount = (req, res) =>{
  //console.log("Request user: "+req.user);
  user.findOne({ _id: req.user }, function(err, userRes) {
    if(err){console.log(err);}
    res.send(userRes);
  });
};

module.exports.userUpdateAccount = async (req, res) =>{
  
  if(req.body.password == "")
  {
    await user.findOne({ _id: req.user }, function(err, userRes) {
      if(err){console.log(err);}
      req.body.password = userRes.password;
   });
  }
  else
  {
    const hashP = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashP;
  }
  const data = req.body;
  //console.log(data);
  const id = {_id: req.user };
  user.findByIdAndUpdate(id, data, function(err, userRes) {
    if(err)
    {
      return res.send({
        msgError: "Cannot update profile. Try again"
      });
    }
    else
    {
      res.send({
        msgSuccess: "Profile updated successfully."
      });
    }
  });
};




