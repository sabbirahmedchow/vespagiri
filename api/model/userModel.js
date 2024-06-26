const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
  fullname: String,
  mobile: String,
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  password: String,
  role: {
    type: String,
    default: "user"
  },
  is_active: {
    type:Boolean,
    default: 0
  },
  avatar: String
  
});

var User = mongoose.model("users", userSchema);

module.exports = User;
