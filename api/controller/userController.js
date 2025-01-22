const user = require("../model/userModel");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
require("dotenv").config();

const saltRounds = 10;

module.exports.userRegister = async(req, res) => {
  try{
  userByName = await user.findOne({ username: req.body.username});
  userByEmail = await user.findOne({ email: req.body.email});
  //console.log(userRes);
  if(userByName != null && userByName.username == req.body.username)
    {
      res.send("This username is already exists");  
      return false;
    }
  else if(userByEmail != null && userByEmail.email == req.body.email)  
    {
      res.send("This email address is already exists");  
      return false;
    } 
  else{  
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {  
  const newUser = new user({
    fullname: req.body.full_name,
    mobile: req.body.mobile,
    address: req.body.address,
    username: req.body.username,
    email: req.body.email,
    password: hash,
  });
  newUser.save();
  res.send("Please check your email to complete the registration.") 
})
}   
}catch(err){
  res.send("An error occurred. " + err.message);
}
};

module.exports.userAccount = async (req, res) =>{
  //console.log("Request user: "+req.user);
    try{
    userDetail = await user.find({_id: req.user});
    res.send(userDetail);
    }catch(err){
        res.send({error: err.message});
          
    }
};

module.exports.userUpdateAccount = async (req, res) =>{
  console.log(req.body);
  if(req.body.password == "")
  {
    try{
      let userDetail = await user.findOne({ _id: req.body.user_id });
      req.body.password = userDetail.password;
    }catch(err){
      res.send({error: err.message});
    }
  }
  else
  {
    const hashP = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashP;
  }
  const data = req.body;
  console.log(data);
  const id = {_id: req.body.user_id };
  try{
    await user.findByIdAndUpdate(id, data);
    res.send("Profile updated successfully.");
  }catch(err){
    res.send({error: err.message})
  }

};




