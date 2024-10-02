const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
  fullname: String,
  mobile: String,
  address: String,
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
  avatar: String,
  city: String,
  zip: Number
  
});

var User = mongoose.model("users", userSchema);

module.exports = User;
